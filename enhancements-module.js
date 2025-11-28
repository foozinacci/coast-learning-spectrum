/**
 * Learning Spectrum - Enhanced Features Module
 * Version: 2.0
 *
 * This module adds:
 * - Advanced question bank management with uniqueness guarantee
 * - Fine-grained grade levels (K.0-5.9)
 * - Enhanced badge system (streak + time-based)
 * - Adaptive diagnostics and learner profiles
 * - Non-punitive feedback questions
 * - Mood-based theming
 */

// ========================================
// FAILSAFE SYSTEM
// ========================================

const EnhancementFailsafe = {
    backupState: null,

    /**
     * Create a backup of current state before applying enhancements
     */
    backup: function() {
        try {
            const currentState = localStorage.getItem('learningSpectrumState');
            if (currentState) {
                this.backupState = currentState;
                localStorage.setItem('learningSpectrumState_backup', currentState);
                console.log('✅ Failsafe: Backup created');
                return true;
            }
        } catch (e) {
            console.error('❌ Failsafe: Backup failed', e);
        }
        return false;
    },

    /**
     * Restore from backup if something goes wrong
     */
    restore: function() {
        try {
            const backup = localStorage.getItem('learningSpectrumState_backup');
            if (backup) {
                localStorage.setItem('learningSpectrumState', backup);
                console.log('✅ Failsafe: State restored from backup');
                return true;
            }
        } catch (e) {
            console.error('❌ Failsafe: Restore failed', e);
        }
        return false;
    },

    /**
     * Validate that enhancements didn't break existing functionality
     */
    validate: function(gameState) {
        const checks = {
            hasStudent: !!gameState.student,
            hasDomains: !!gameState.domains,
            hasSession: !!gameState.session,
            hasBadges: Array.isArray(gameState.badges),
            hasGrades: !!(gameState.student.gradeEnrolled >= 0)
        };

        const allPassed = Object.values(checks).every(v => v === true);

        if (!allPassed) {
            console.error('❌ Failsafe: Validation failed', checks);
        } else {
            console.log('✅ Failsafe: All validation checks passed');
        }

        return allPassed;
    }
};

// ========================================
// FINE-GRAINED GRADE LEVEL SYSTEM (K.0 - 5.9)
// ========================================

const GradeSystemEnhanced = {
    /**
     * Convert traditional grade (0-5) to fine-grained (0.0-5.9)
     * @param {number} grade - Traditional grade (0=K, 1, 2, 3, 4, 5)
     * @param {number} sublevel - Sub-level within grade (0-9)
     * @returns {number} - Fine-grained grade (e.g., 2.3)
     */
    toFineGrade: function(grade, sublevel = 0) {
        if (sublevel < 0 || sublevel > 9) sublevel = 0;
        return parseFloat(`${grade}.${sublevel}`);
    },

    /**
     * Extract grade and sublevel from fine-grained grade
     * @param {number} fineGrade - Fine-grained grade (e.g., 2.3)
     * @returns {object} - {grade: 2, sublevel: 3}
     */
    fromFineGrade: function(fineGrade) {
        const grade = Math.floor(fineGrade);
        const sublevel = Math.round((fineGrade - grade) * 10);
        return { grade, sublevel };
    },

    /**
     * Get appropriate question difficulty for fine-grained grade
     * @param {number} fineGrade - Fine-grained grade
     * @returns {object} - {min, max, target} difficulty bands
     */
    getDifficultyRange: function(fineGrade) {
        const { grade, sublevel } = this.fromFineGrade(fineGrade);
        const baseMin = grade + (sublevel / 10) - 0.3;
        const baseMax = grade + (sublevel / 10) + 0.3;

        return {
            min: Math.max(0, baseMin),
            target: fineGrade,
            max: Math.min(5.9, baseMax)
        };
    },

    /**
     * Determine next level based on performance
     * @param {number} currentGrade - Current fine-grained grade
     * @param {number} accuracy - Recent accuracy (0-1)
     * @returns {number} - Next recommended grade level
     */
    getNextLevel: function(currentGrade, accuracy) {
        const { grade, sublevel } = this.fromFineGrade(currentGrade);

        // Advance if accuracy > 85%
        if (accuracy > 0.85) {
            const newSublevel = (sublevel + 1) % 10;
            const newGrade = newSublevel === 0 ? grade + 1 : grade;
            return this.toFineGrade(Math.min(5, newGrade), newSublevel);
        }

        // Stay at current if accuracy 60-85%
        if (accuracy >= 0.60) {
            return currentGrade;
        }

        // Remediate if accuracy < 60%
        const newSublevel = Math.max(0, sublevel - 1);
        if (newSublevel < sublevel) {
            return this.toFineGrade(grade, newSublevel);
        } else if (grade > 0) {
            return this.toFineGrade(grade - 1, 9);
        }

        return currentGrade; // Already at K.0
    }
};

// ========================================
// QUESTION UNIQUENESS TRACKER
// ========================================

const QuestionUniqueness = {
    // Fisher-Yates shuffled pools per category
    pools: {},
    usedQuestions: new Set(),

    /**
     * Initialize a shuffled pool for a category
     * @param {string} category - Category key (e.g., "reading_K.2")
     * @param {array} questions - Array of questions
     */
    initializePool: function(category, questions) {
        // Create a shuffled copy using Fisher-Yates algorithm
        const pool = [...questions];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        this.pools[category] = {
            questions: pool,
            index: 0,
            totalGenerated: 0
        };
    },

    /**
     * Get next unique question from pool
     * @param {string} category - Category key
     * @returns {object|null} - Question object or null
     */
    getNextQuestion: function(category) {
        if (!this.pools[category]) {
            return null;
        }

        const pool = this.pools[category];

        // If we've exhausted the pool, reshuffle
        if (pool.index >= pool.questions.length) {
            this.reshufflePool(category);
        }

        const question = pool.questions[pool.index];
        pool.index++;
        pool.totalGenerated++;

        // Track uniqueness
        this.usedQuestions.add(question.id);

        return question;
    },

    /**
     * Reshuffle the pool when exhausted
     * @param {string} category - Category key
     */
    reshufflePool: function(category) {
        const pool = this.pools[category];
        const questions = pool.questions;

        // Fisher-Yates shuffle
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        pool.index = 0;
        console.log(`🔄 Reshuffled pool: ${category}`);
    },

    /**
     * Get uniqueness statistics
     * @returns {object} - Statistics on question uniqueness
     */
    getStats: function() {
        let totalGenerated = 0;
        let totalUnique = this.usedQuestions.size;

        Object.values(this.pools).forEach(pool => {
            totalGenerated += pool.totalGenerated;
        });

        const uniquePercent = totalGenerated > 0
            ? (totalUnique / totalGenerated) * 100
            : 0;

        return {
            totalGenerated,
            totalUnique,
            uniquePercent: Math.round(uniquePercent),
            targetMet: uniquePercent >= 75
        };
    }
};

// ========================================
// NON-PUNITIVE FEEDBACK QUESTIONS
// ========================================

const FeedbackQuestions = {
    questions: [
        // Emotion Check-ins
        {
            id: 'FEEDBACK_EMOTION_01',
            type: 'emotion_check_in',
            category: 'Emotions',
            prompt: 'How are you feeling right now?',
            icon: '😊',
            answers: [
                { text: '😊 Great!', value: 'positive', mood: 'success' },
                { text: '😐 Okay', value: 'neutral', mood: 'focused' },
                { text: '😕 Frustrated', value: 'frustrated', mood: 'overwhelmed' },
                { text: '😴 Tired', value: 'tired', mood: 'break' }
            ],
            scorable: false
        },
        {
            id: 'FEEDBACK_EMOTION_02',
            type: 'emotion_check_in',
            category: 'Emotions',
            prompt: 'These questions are...',
            icon: '📊',
            answers: [
                { text: '💪 Just right!', value: 'appropriate', adjustment: 0 },
                { text: '😅 A bit hard', value: 'hard', adjustment: -1 },
                { text: '😴 Too easy', value: 'easy', adjustment: +1 },
                { text: '😰 Way too hard', value: 'very_hard', adjustment: -2 }
            ],
            scorable: false
        },

        // Help-Seeking Strategies
        {
            id: 'FEEDBACK_HELP_01',
            type: 'help_strategy',
            category: 'Focus/Planning',
            prompt: 'What do you do when you get stuck on a hard problem?',
            icon: '🤔',
            answers: [
                { text: '🙋 Ask for help', value: 'ask_help', strategy: 'external_support' },
                { text: '💪 Try different ways', value: 'persist', strategy: 'self_reliance' },
                { text: '⏸️ Take a break', value: 'break', strategy: 'self_regulation' },
                { text: '😓 Give up', value: 'give_up', strategy: 'needs_encouragement' }
            ],
            scorable: false
        },
        {
            id: 'FEEDBACK_HELP_02',
            type: 'help_strategy',
            category: 'Focus/Planning',
            prompt: 'When a word is hard to read, what do you do?',
            icon: '📖',
            answers: [
                { text: '🔊 Sound it out', value: 'phonics', strategy: 'decoding' },
                { text: '🔍 Look for clues', value: 'context', strategy: 'comprehension' },
                { text: '🙋 Ask someone', value: 'ask', strategy: 'external_support' },
                { text: '⏭️ Skip it', value: 'skip', strategy: 'avoidance' }
            ],
            scorable: false
        },

        // Confidence Check
        {
            id: 'FEEDBACK_CONFIDENCE_01',
            type: 'confidence_check',
            category: 'Effort/Emotions',
            prompt: 'How sure are you about your last answer?',
            icon: '💭',
            answers: [
                { text: '💯 Very sure!', value: 'high', confidence: 1.0 },
                { text: '👍 Pretty sure', value: 'medium', confidence: 0.7 },
                { text: '🤷 Guessing', value: 'low', confidence: 0.3 },
                { text: '❓ No idea', value: 'none', confidence: 0 }
            ],
            scorable: false
        },

        // Break Check
        {
            id: 'FEEDBACK_BREAK_01',
            type: 'break_check',
            category: 'Focus/Planning',
            prompt: 'Do you need a break?',
            icon: '⏸️',
            answers: [
                { text: '✅ I\'m good!', value: 'no', needsBreak: false },
                { text: '⏸️ Yes, please', value: 'yes', needsBreak: true },
                { text: '🚀 Keep going!', value: 'energized', needsBreak: false },
                { text: '😴 Really tired', value: 'exhausted', needsBreak: true }
            ],
            scorable: false
        }
    ],

    /**
     * Get a random feedback question based on context
     * @param {string} context - Context for question selection
     * @returns {object} - Feedback question
     */
    getQuestion: function(context = 'general') {
        const contextMap = {
            'after_streak': ['FEEDBACK_EMOTION_01', 'FEEDBACK_CONFIDENCE_01'],
            'after_errors': ['FEEDBACK_EMOTION_02', 'FEEDBACK_HELP_01', 'FEEDBACK_BREAK_01'],
            'mid_session': ['FEEDBACK_BREAK_01', 'FEEDBACK_EMOTION_01'],
            'general': this.questions.map(q => q.id)
        };

        const validIds = contextMap[context] || contextMap['general'];
        const randomId = validIds[Math.floor(Math.random() * validIds.length)];

        return this.questions.find(q => q.id === randomId);
    },

    /**
     * Process feedback response and return adaptation suggestions
     * @param {object} question - The feedback question
     * @param {object} answer - The selected answer
     * @returns {object} - Adaptation recommendations
     */
    processResponse: function(question, answer) {
        const adaptations = {
            difficultyAdjustment: answer.adjustment || 0,
            needsBreak: answer.needsBreak || false,
            mood: answer.mood || null,
            strategy: answer.strategy || null,
            confidence: answer.confidence !== undefined ? answer.confidence : null
        };

        // Generate recommendations
        const recommendations = [];

        if (adaptations.difficultyAdjustment < 0) {
            recommendations.push('Lower difficulty by ' + Math.abs(adaptations.difficultyAdjustment) + ' sub-levels');
        } else if (adaptations.difficultyAdjustment > 0) {
            recommendations.push('Increase difficulty by ' + adaptations.difficultyAdjustment + ' sub-levels');
        }

        if (adaptations.needsBreak) {
            recommendations.push('Suggest break or side-quest');
        }

        if (adaptations.strategy === 'needs_encouragement') {
            recommendations.push('Provide extra encouragement and simpler questions');
        }

        if (adaptations.confidence !== null && adaptations.confidence < 0.5) {
            recommendations.push('Student has low confidence - consider review questions');
        }

        adaptations.recommendations = recommendations;

        return adaptations;
    }
};

// ========================================
// ENHANCED BADGE SYSTEM
// ========================================

const BadgeSystemEnhanced = {
    // Streak-based badges
    streakBadges: [
        { name: 'Triple Threat', icon: '🔥', streak: 3, description: '3 correct in a row!', unlocks: 'drawing_pad' },
        { name: 'Five Alive', icon: '⚡', streak: 5, description: '5 correct in a row!', unlocks: 'music_maker' },
        { name: 'Perfect Ten', icon: '💫', streak: 10, description: '10 correct in a row!', unlocks: 'slime_simulator' },
        { name: 'Streaking Star', icon: '🌟', streak: 20, description: '20 correct in a row!', unlocks: 'mini_game_1' },
        { name: 'Half Century', icon: '🎖️', streak: 50, description: '50 correct in a row!', unlocks: 'avatar_customization' },
        { name: 'Century Master', icon: '👑', streak: 100, description: '100 correct in a row!', unlocks: 'special_theme' }
    ],

    // Time-based badges
    timeBadges: [
        { name: 'Focus Starter', icon: '⏱️', minutes: 5, description: '5 minutes of focused learning', type: 'session' },
        { name: 'Deep Diver', icon: '🏊', minutes: 20, description: '20-minute session!', type: 'session' },
        { name: 'Marathon Learner', icon: '🏃', minutes: 60, description: '1 hour of learning!', type: 'session' },
        { name: 'Daily Scholar', icon: '📅', days: 7, description: '7 days in a row!', type: 'consistency' },
        { name: 'Study Streak', icon: '📚', days: 30, description: '30 days in a row!', type: 'consistency' },
        { name: 'Time Traveler', icon: '⌛', totalMinutes: 600, description: '10 hours total!', type: 'cumulative' },
        { name: 'Scholar Supreme', icon: '🎓', totalMinutes: 3000, description: '50 hours total!', type: 'cumulative' }
    ],

    // Subject mastery badges
    masteryBadges: [
        { name: 'Reading Rockstar', icon: '📖', domain: 'decoding', threshold: 0.85 },
        { name: 'Math Master', icon: '🔢', domain: 'math', threshold: 0.85 },
        { name: 'Comprehension Champion', icon: '💡', domain: 'comprehension', threshold: 0.85 },
        { name: 'Focus Ninja', icon: '🥷', domain: 'executive', threshold: 0.85 },
        { name: 'Fluency Wizard', icon: '✨', domain: 'fluency', threshold: 0.85 },
        { name: 'Emotion Expert', icon: '❤️', domain: 'emotions', threshold: 0.85 }
    ],

    /**
     * Check and award streak badges
     * @param {number} currentStreak - Current correct answer streak
     * @param {array} existingBadges - Already earned badges
     * @returns {array} - New badges to award
     */
    checkStreakBadges: function(currentStreak, existingBadges) {
        const earnedNames = existingBadges.map(b => b.name || b);
        const newBadges = [];

        this.streakBadges.forEach(badge => {
            if (currentStreak >= badge.streak && !earnedNames.includes(badge.name)) {
                newBadges.push({
                    name: badge.name,
                    icon: badge.icon,
                    description: badge.description,
                    dateEarned: new Date().toISOString(),
                    type: 'streak',
                    unlocks: badge.unlocks
                });
            }
        });

        return newBadges;
    },

    /**
     * Check and award time-based badges
     * @param {object} timeStats - {sessionMinutes, consecutiveDays, totalMinutes}
     * @param {array} existingBadges - Already earned badges
     * @returns {array} - New badges to award
     */
    checkTimeBadges: function(timeStats, existingBadges) {
        const earnedNames = existingBadges.map(b => b.name || b);
        const newBadges = [];

        this.timeBadges.forEach(badge => {
            if (earnedNames.includes(badge.name)) return;

            let eligible = false;

            if (badge.type === 'session' && timeStats.sessionMinutes >= badge.minutes) {
                eligible = true;
            } else if (badge.type === 'consistency' && timeStats.consecutiveDays >= badge.days) {
                eligible = true;
            } else if (badge.type === 'cumulative' && timeStats.totalMinutes >= badge.totalMinutes) {
                eligible = true;
            }

            if (eligible) {
                newBadges.push({
                    name: badge.name,
                    icon: badge.icon,
                    description: badge.description,
                    dateEarned: new Date().toISOString(),
                    type: 'time'
                });
            }
        });

        return newBadges;
    },

    /**
     * Check and award mastery badges
     * @param {object} domains - Domain scores {decoding: {score: 0.85}, ...}
     * @param {array} existingBadges - Already earned badges
     * @returns {array} - New badges to award
     */
    checkMasteryBadges: function(domains, existingBadges) {
        const earnedNames = existingBadges.map(b => b.name || b);
        const newBadges = [];

        this.masteryBadges.forEach(badge => {
            if (!earnedNames.includes(badge.name)) {
                const domainScore = domains[badge.domain]?.score || 0;
                if (domainScore >= badge.threshold) {
                    newBadges.push({
                        name: badge.name,
                        icon: badge.icon,
                        description: `Mastered ${badge.domain}!`,
                        dateEarned: new Date().toISOString(),
                        type: 'mastery',
                        domain: badge.domain
                    });
                }
            }
        });

        return newBadges;
    },

    /**
     * Check if a feature is unlocked based on badges
     * @param {string} featureName - Name of feature to check
     * @param {array} badges - User's badges
     * @returns {boolean} - Whether feature is unlocked
     */
    isFeatureUnlocked: function(featureName, badges) {
        // Find the required badge(s) for this feature
        const requirement = this.streakBadges.find(b => b.unlocks === featureName);

        if (!requirement) {
            return true; // No requirement, always unlocked
        }

        // Check if user has the required badge
        return badges.some(b => (b.name || b) === requirement.name);
    }
};

// ========================================
// LEARNER PROFILES & ADAPTIVE SYSTEM
// ========================================

const LearnerProfiles = {
    profiles: {
        'independent_learner': {
            name: 'Independent Learner',
            traits: ['high_confidence', 'self_reliance', 'rarely_asks_help'],
            adaptations: {
                difficultyProgression: 'fast',
                hintFrequency: 'low',
                enrichmentContent: true,
                openEndedQuestions: true
            }
        },
        'needs_encouragement': {
            name: 'Needs Encouragement',
            traits: ['low_confidence', 'frustration', 'frequent_errors'],
            adaptations: {
                difficultyProgression: 'slow',
                hintFrequency: 'high',
                positiveReinforcement: 'extra',
                easierAfterError: true
            }
        },
        'careful_planner': {
            name: 'Careful Planner',
            traits: ['uses_hints', 'takes_time', 'high_focus'],
            adaptations: {
                difficultyProgression: 'moderate',
                hintFrequency: 'moderate',
                complexProblems: true,
                noTimePressure: true
            }
        },
        'fast_but_inattentive': {
            name: 'Fast but Inattentive',
            traits: ['quick_answers', 'careless_errors', 'low_focus'],
            adaptations: {
                difficultyProgression: 'moderate',
                focusExercises: true,
                attentionReminders: true,
                doubleCheckPrompts: true
            }
        }
    },

    /**
     * Determine learner profile based on behavior data
     * @param {object} behaviorData - User behavior metrics
     * @returns {string} - Profile key
     */
    determineProfile: function(behaviorData) {
        const {
            averageConfidence = 0.5,
            helpRequests = 0,
            averageTimePerQuestion = 30,
            errorRate = 0.3,
            hintsUsed = 0
        } = behaviorData;

        // Independent Learner
        if (averageConfidence > 0.7 && helpRequests < 2 && errorRate < 0.2) {
            return 'independent_learner';
        }

        // Needs Encouragement
        if (averageConfidence < 0.4 || errorRate > 0.5) {
            return 'needs_encouragement';
        }

        // Fast but Inattentive
        if (averageTimePerQuestion < 15 && errorRate > 0.3) {
            return 'fast_but_inattentive';
        }

        // Careful Planner
        if (hintsUsed > 5 || averageTimePerQuestion > 45) {
            return 'careful_planner';
        }

        // Default
        return 'independent_learner';
    },

    /**
     * Get adaptation recommendations for a profile
     * @param {string} profileKey - Profile identifier
     * @returns {object} - Adaptation settings
     */
    getAdaptations: function(profileKey) {
        return this.profiles[profileKey]?.adaptations || this.profiles['independent_learner'].adaptations;
    }
};

// ========================================
// MOOD-BASED THEMING SYSTEM
// ========================================

const MoodTheming = {
    moodThemes: {
        'curious': {
            colors: ['#FACC15', '#F97316'], // Yellow to Orange
            glow: 'rgba(250, 204, 21, 0.5)',
            name: 'Curious'
        },
        'focused': {
            colors: ['#10B981', '#14B8A6'], // Green to Teal
            glow: 'rgba(16, 185, 129, 0.5)',
            name: 'Focused'
        },
        'brave': {
            colors: ['#EF4444', '#F97316'], // Red to Orange
            glow: 'rgba(239, 68, 68, 0.5)',
            name: 'Brave'
        },
        'success': {
            colors: ['#3B82F6', '#8B5CF6'], // Blue to Purple
            glow: 'rgba(59, 130, 246, 0.5)',
            name: 'Success'
        },
        'creative': {
            colors: ['#8B5CF6', '#EC4899'], // Purple to Pink
            glow: 'rgba(139, 92, 246, 0.5)',
            name: 'Creative'
        },
        'break': {
            colors: ['#F9FAFB', '#E5E7EB'], // Light Gray
            glow: 'rgba(249, 250, 251, 0.3)',
            name: 'Break'
        },
        'overwhelmed': {
            colors: ['#1F2937', '#374151'], // Dark Gray
            glow: 'rgba(31, 41, 55, 0.5)',
            name: 'Overwhelmed'
        }
    },

    /**
     * Apply mood theme to UI
     * @param {string} mood - Mood key
     */
    applyTheme: function(mood) {
        const theme = this.moodThemes[mood];
        if (!theme) return;

        const root = document.documentElement;

        // Update CSS variables with smooth transition
        root.style.setProperty('--mood-color-1', theme.colors[0]);
        root.style.setProperty('--mood-color-2', theme.colors[1]);
        root.style.setProperty('--mood-glow', theme.glow);
        root.style.setProperty('--mood-border',
            `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`
        );

        // Add transition class to body for smooth color change
        document.body.classList.add('mood-transition');

        // Trigger animation
        this.animateThemeChange(theme);

        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('mood-transition');
        }, 1000);
    },

    /**
     * Animate theme change
     * @param {object} theme - Theme object
     */
    animateThemeChange: function(theme) {
        // Create subtle sparkle effect
        const sparkle = document.createElement('div');
        sparkle.className = 'mood-sparkle';
        sparkle.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            background: radial-gradient(circle at 50% 50%, ${theme.glow} 0%, transparent 70%);
            opacity: 0;
            animation: sparkleIn 0.8s ease-out;
            z-index: 10000;
        `;

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
};

// ========================================
// SIDE QUEST SYSTEM
// ========================================

const SideQuests = {
    quests: [
        {
            id: 'BREATH_EXERCISE',
            trigger: 'frustration',
            type: 'sel',
            title: '🌬️ Breathing Break',
            description: 'Let\'s take a moment to breathe and reset',
            duration: 60, // seconds
            content: {
                type: 'guided_breathing',
                cycles: 3
            }
        },
        {
            id: 'ENCOURAGEMENT_STORY',
            trigger: 'low_confidence',
            type: 'sel',
            title: '💪 You Can Do It!',
            description: 'A quick story about persistence',
            content: {
                type: 'mini_story',
                story: 'courage_story'
            }
        },
        {
            id: 'CHALLENGE_PUZZLE',
            trigger: 'boredom',
            type: 'enrichment',
            title: '🧩 Bonus Challenge!',
            description: 'Try this extra tricky puzzle',
            content: {
                type: 'bonus_question',
                difficulty: 'advanced'
            }
        },
        {
            id: 'CREATE_QUESTION',
            trigger: 'mastery',
            type: 'creative',
            title: '✏️ Make Your Own Question',
            description: 'Create a question for others to solve',
            content: {
                type: 'question_creator'
            }
        }
    ],

    /**
     * Get appropriate side quest based on trigger
     * @param {string} trigger - Trigger condition
     * @returns {object|null} - Side quest or null
     */
    getQuest: function(trigger) {
        const matching = this.quests.filter(q => q.trigger === trigger);
        if (matching.length === 0) return null;

        return matching[Math.floor(Math.random() * matching.length)];
    }
};

// ========================================
// EXPORT MODULE
// ========================================

if (typeof window !== 'undefined') {
    window.LearningSpectrumEnhancements = {
        Failsafe: EnhancementFailsafe,
        GradeSystem: GradeSystemEnhanced,
        QuestionUniqueness: QuestionUniqueness,
        FeedbackQuestions: FeedbackQuestions,
        BadgeSystem: BadgeSystemEnhanced,
        LearnerProfiles: LearnerProfiles,
        MoodTheming: MoodTheming,
        SideQuests: SideQuests,

        // Version info
        version: '2.0',
        initialized: false,

        /**
         * Initialize all enhancements
         * @param {object} gameState - Current game state
         * @returns {boolean} - Success status
         */
        initialize: function(gameState) {
            try {
                console.log('🚀 Initializing Learning Spectrum Enhancements v2.0');

                // Create backup
                EnhancementFailsafe.backup();

                // Validate existing state
                if (!EnhancementFailsafe.validate(gameState)) {
                    console.error('❌ Initial state validation failed');
                    return false;
                }

                // Add enhancement fields to gameState if not present
                if (!gameState.enhancements) {
                    gameState.enhancements = {
                        fineGradeCurrent: GradeSystemEnhanced.toFineGrade(gameState.student.gradeCurrent || 0, 0),
                        fineGradeTarget: GradeSystemEnhanced.toFineGrade(gameState.student.gradeTarget || 0, 5),
                        learnerProfile: 'independent_learner',
                        timeTracking: {
                            totalMinutes: 0,
                            consecutiveDays: 0,
                            lastSessionDate: null,
                            sessionStartTime: null
                        },
                        feedbackHistory: [],
                        unlockedFeatures: []
                    };
                }

                // Initialize question pools (will be done when questions are loaded)

                this.initialized = true;
                console.log('✅ Enhancements initialized successfully');

                return true;
            } catch (error) {
                console.error('❌ Enhancement initialization failed:', error);
                EnhancementFailsafe.restore();
                return false;
            }
        }
    };
}
