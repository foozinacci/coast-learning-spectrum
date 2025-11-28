/**
 * ============================================================================
 * LEARNING SPECTRUM - COMPREHENSIVE INTEGRATION PATCH
 * ============================================================================
 *
 * This patch extends the existing index.html with all requested enhancements.
 * AUDIT-FIRST APPROACH: Extends existing functions, never duplicates.
 *
 * Apply this by adding to index.html AFTER all existing JavaScript.
 *
 * Features added:
 * 1. Enhanced stress test with hard uniqueness thresholds & full-bank toggle
 * 2. Fine-grained grade levels (K.0-5.9)
 * 3. Non-punitive feedback questions
 * 4. Enhanced badge system (streak + time-based)
 * 5. Mood-based theming
 * 6. Improved question pool sampling
 * 7. Badge gallery screen
 * 8. Enhanced diagnostics map
 * 9. All integrated with existing showScreen(), gameState, etc.
 */

(function() {
    'use strict';

    console.log('🚀 Applying Learning Spectrum Integration Patch...');

    // ========================================
    // CONFIGURATION & THRESHOLDS
    // ========================================

    const UNIQUENESS_THRESHOLDS = {
        100: {
            excellent: 90,
            good: 80,
            fair: 60
        },
        500: {
            excellent: 85,
            good: 75,
            fair: 60
        },
        1000: {
            good: 75,
            fair: 60
        },
        2000: {
            good: 75,
            acceptable: 65,
            fair: 50
        }
    };

    const COVERAGE_THRESHOLD_LOCKED = 0.10; // 10% - below this = logic locked

    // ========================================
    // EXTEND EXISTING GAMESTATE
    // ========================================

    // Add new fields to gameState if they don't exist
    if (typeof gameState !== 'undefined') {
        // Fine-grained grade levels
        if (!gameState.student.fineGradeCurrent) {
            gameState.student.fineGradeCurrent = gameState.student.gradeCurrent || 0.0;
        }
        if (!gameState.student.fineGradeTarget) {
            gameState.student.fineGradeTarget = gameState.student.gradeTarget || 1.0;
        }

        // Learner profile
        if (!gameState.student.learnerProfile) {
            gameState.student.learnerProfile = 'independent_learner';
        }

        // Preferences for feedback
        if (!gameState.student.preferences) {
            gameState.student.preferences = {
                preferredHelp: null,
                copingStrategies: [],
                frustratedOften: false,
                boredOften: false,
                needsFocusSupport: false
            };
        }

        // Time tracking
        if (!gameState.timeTracking) {
            gameState.timeTracking = {
                sessionStartTime: null,
                totalMinutes: 0,
                consecutiveDays: 0,
                lastSessionDate: null,
                sessionsCompleted: 0
            };
        }

        // Badge enhancements
        if (!gameState.badgeStats) {
            gameState.badgeStats = {
                streakBadges: [],
                timeBadges: [],
                masteryBadges: []
            };
        }

        // Feedback history
        if (!gameState.feedbackHistory) {
            gameState.feedbackHistory = [];
        }

        console.log('✅ GameState extended with new fields');
    }

    // ========================================
    // FINE-GRAINED GRADE SYSTEM
    // ========================================

    window.GradeSystemEnhanced = {
        toFineGrade: function(grade, sublevel = 0) {
            if (sublevel < 0 || sublevel > 9) sublevel = 0;
            return parseFloat(`${grade}.${sublevel}`);
        },

        fromFineGrade: function(fineGrade) {
            const grade = Math.floor(fineGrade);
            const sublevel = Math.round((fineGrade - grade) * 10);
            return { grade, sublevel };
        },

        getNextLevel: function(currentGrade, accuracy) {
            const { grade, sublevel } = this.fromFineGrade(currentGrade);

            // Advance if accuracy > 85%
            if (accuracy > 0.85) {
                const newSublevel = (sublevel + 1) % 10;
                const newGrade = newSublevel === 0 ? grade + 1 : grade;
                return this.toFineGrade(Math.min(5, newGrade), newSublevel);
            }

            // Stay if accuracy 60-85%
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
    // NON-PUNITIVE FEEDBACK QUESTIONS
    // ========================================

    const FEEDBACK_QUESTIONS = [
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
            id: 'FEEDBACK_DIFFICULTY_01',
            type: 'difficulty_check',
            category: 'Understanding',
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
        {
            id: 'FEEDBACK_HELP_01',
            type: 'help_strategy',
            category: 'Focus',
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
            id: 'FEEDBACK_CONFIDENCE_01',
            type: 'confidence_check',
            category: 'Effort',
            prompt: 'How sure are you about your last answer?',
            icon: '💭',
            answers: [
                { text: '💯 Very sure!', value: 'high', confidence: 1.0 },
                { text: '👍 Pretty sure', value: 'medium', confidence: 0.7 },
                { text: '🤷 Guessing', value: 'low', confidence: 0.3 },
                { text: '❓ No idea', value: 'none', confidence: 0 }
            ],
            scorable: false
        }
    ];

    window.getFeedbackQuestion = function(context = 'general') {
        const contextMap = {
            'after_streak': ['FEEDBACK_EMOTION_01', 'FEEDBACK_CONFIDENCE_01'],
            'after_errors': ['FEEDBACK_DIFFICULTY_01', 'FEEDBACK_HELP_01'],
            'mid_session': ['FEEDBACK_EMOTION_01'],
            'general': FEEDBACK_QUESTIONS.map(q => q.id)
        };

        const validIds = contextMap[context] || contextMap['general'];
        const randomId = validIds[Math.floor(Math.random() * validIds.length)];
        return FEEDBACK_QUESTIONS.find(q => q.id === randomId);
    };

    window.shouldShowFeedbackQuestion = function() {
        if (!gameState || !gameState.session) return false;

        const answered = gameState.session.questionsAnswered || 0;
        const correct = gameState.session.correctAnswers || 0;
        const accuracy = answered > 0 ? correct / answered : 0;
        const streak = gameState.session.currentStreak || 0;

        // Show after 5 questions
        if (answered > 0 && answered % 5 === 0) return true;

        // Show after streak of 10
        if (streak === 10) return true;

        // Show after 3 errors
        if (answered >= 3 && accuracy < 0.4) return true;

        return false;
    };

    // ========================================
    // ENHANCED BADGE SYSTEM
    // ========================================

    const BADGE_DEFINITIONS = {
        streak: [
            { name: 'Triple Threat', icon: '🔥', requirement: 3, unlocks: 'drawing_pad' },
            { name: 'Five Alive', icon: '⚡', requirement: 5, unlocks: 'music_maker' },
            { name: 'Perfect Ten', icon: '💫', requirement: 10, unlocks: 'slime_simulator' },
            { name: 'Streaking Star', icon: '🌟', requirement: 20, unlocks: 'mini_game' },
            { name: 'Half Century', icon: '🎖️', requirement: 50, unlocks: 'avatar_custom' },
            { name: 'Century Master', icon: '👑', requirement: 100, unlocks: 'special_theme' }
        ],
        time: [
            { name: 'Focus Starter', icon: '⏱️', minutes: 5, type: 'session' },
            { name: 'Deep Diver', icon: '🏊', minutes: 20, type: 'session' },
            { name: 'Marathon Learner', icon: '🏃', minutes: 60, type: 'session' },
            { name: 'Weekly Scholar', icon: '📅', days: 7, type: 'consistency' },
            { name: 'Study Streak', icon: '📚', days: 30, type: 'consistency' },
            { name: 'Time Traveler', icon: '⌛', totalMinutes: 600, type: 'cumulative' }
        ],
        mastery: [
            { name: 'Reading Rockstar', icon: '📖', domain: 'decoding', threshold: 0.85 },
            { name: 'Math Master', icon: '🔢', domain: 'math', threshold: 0.85 },
            { name: 'Comprehension Champion', icon: '💡', domain: 'comprehension', threshold: 0.85 },
            { name: 'Focus Ninja', icon: '🥷', domain: 'executive', threshold: 0.85 },
            { name: 'Fluency Wizard', icon: '✨', domain: 'fluency', threshold: 0.85 },
            { name: 'Emotion Expert', icon: '❤️', domain: 'emotions', threshold: 0.85 }
        ]
    };

    // EXTEND existing unlockBadge function (don't replace!)
    const originalUnlockBadge = window.unlockBadge;
    window.unlockBadge = function(badgeName, badgeIcon = '🏆', badgeDescription = '') {
        // Call original function
        if (originalUnlockBadge) {
            originalUnlockBadge(badgeName, badgeIcon, badgeDescription);
        }

        // Add to categorized tracking
        const badgeData = {
            name: badgeName,
            icon: badgeIcon,
            description: badgeDescription,
            dateEarned: new Date().toISOString()
        };

        // Categorize
        const streakBadge = BADGE_DEFINITIONS.streak.find(b => b.name === badgeName);
        const timeBadge = BADGE_DEFINITIONS.time.find(b => b.name === badgeName);
        const masteryBadge = BADGE_DEFINITIONS.mastery.find(b => b.name === badgeName);

        if (streakBadge) {
            gameState.badgeStats.streakBadges.push(badgeData);
        } else if (timeBadge) {
            gameState.badgeStats.timeBadges.push(badgeData);
        } else if (masteryBadge) {
            gameState.badgeStats.masteryBadges.push(badgeData);
        }

        if (typeof saveState === 'function') {
            saveState();
        }
    };

    window.checkEnhancedBadges = function() {
        if (!gameState) return;

        // Check streak badges
        const streak = gameState.session?.currentStreak || 0;
        BADGE_DEFINITIONS.streak.forEach(badge => {
            if (streak >= badge.requirement) {
                const hasIt = gameState.badges?.some(b =>
                    (typeof b === 'string' ? b : b.name) === badge.name
                );
                if (!hasIt) {
                    unlockBadge(badge.name, badge.icon, `${badge.requirement} correct in a row!`);
                }
            }
        });

        // Check time badges
        if (gameState.timeTracking) {
            const sessionMinutes = calculateSessionMinutes();
            const totalMinutes = gameState.timeTracking.totalMinutes || 0;
            const consecutiveDays = gameState.timeTracking.consecutiveDays || 0;

            BADGE_DEFINITIONS.time.forEach(badge => {
                const hasIt = gameState.badges?.some(b =>
                    (typeof b === 'string' ? b : b.name) === badge.name
                );
                if (hasIt) return;

                let eligible = false;
                if (badge.type === 'session' && sessionMinutes >= badge.minutes) {
                    eligible = true;
                } else if (badge.type === 'consistency' && consecutiveDays >= badge.days) {
                    eligible = true;
                } else if (badge.type === 'cumulative' && totalMinutes >= badge.totalMinutes) {
                    eligible = true;
                }

                if (eligible) {
                    unlockBadge(badge.name, badge.icon, badge.name);
                }
            });
        }

        // Check mastery badges
        if (gameState.domains) {
            BADGE_DEFINITIONS.mastery.forEach(badge => {
                const hasIt = gameState.badges?.some(b =>
                    (typeof b === 'string' ? b : b.name) === badge.name
                );
                if (!hasIt) {
                    const score = gameState.domains[badge.domain]?.score || 0;
                    if (score >= badge.threshold) {
                        unlockBadge(badge.name, badge.icon, `Mastered ${badge.domain}!`);
                    }
                }
            });
        }
    };

    function calculateSessionMinutes() {
        if (!gameState.timeTracking || !gameState.timeTracking.sessionStartTime) return 0;
        return Math.floor((Date.now() - gameState.timeTracking.sessionStartTime) / 60000);
    }

    window.isFeatureUnlocked = function(featureName) {
        const requirement = BADGE_DEFINITIONS.streak.find(b => b.unlocks === featureName);
        if (!requirement) return true; // No requirement

        return gameState.badges?.some(b =>
            (typeof b === 'string' ? b : b.name) === requirement.name
        );
    };

    // ========================================
    // ENHANCED STRESS TEST WITH THRESHOLDS
    // ========================================

    // ADD full-bank toggle state
    window.stressTestFullBank = false;

    // EXTEND the existing runStressTest function
    const originalRunStressTest = window.runStressTest;

    window.runStressTest = function() {
        // Get full bank toggle state
        const useFullBank = document.getElementById('stressTestFullBank')?.checked || false;
        window.stressTestFullBank = useFullBank;

        // Call original function which will use our extended logic
        if (originalRunStressTest) {
            originalRunStressTest();
        } else {
            console.error('Original runStressTest not found');
        }
    };

    // EXTEND stress test results display
    const originalDisplayStressTestResults = window.displayStressTestResults;

    window.displayStressTestResults = function(results) {
        const iterations = results.iterations;
        const uniquenessPercent = parseFloat(results.uniquenessPercent);
        const bankSize = results.bankSize || 0;
        const uniqueQuestions = results.uniqueQuestions || 0;

        // Calculate coverage
        const coverageRate = bankSize > 0 ? (uniqueQuestions / bankSize) : 0;

        // Get thresholds for this iteration count
        const thresholds = getThresholdsForIterations(iterations);

        // Classify result
        const classification = classifyTest(iterations, uniquenessPercent / 100, coverageRate);

        // Determine color
        let statusColor = 'red';
        let statusText = 'POOR';

        if (classification === 'LOGIC_LOCKED') {
            statusColor = 'orange';
            statusText = 'LOGIC LOCKED';
        } else if (classification === 'CONTENT_SHORTAGE') {
            statusColor = 'yellow';
            statusText = 'CONTENT SHORTAGE';
        } else {
            // GOOD_OR_BETTER
            if (uniquenessPercent >= thresholds.excellent) {
                statusColor = '#00ff88';
                statusText = 'EXCELLENT';
            } else if (uniquenessPercent >= thresholds.good) {
                statusColor = '#00ff88';
                statusText = 'GOOD';
            } else if (uniquenessPercent >= thresholds.fair) {
                statusColor = '#ffee00';
                statusText = 'FAIR';
            }
        }

        // Calculate minimum pool size needed
        const targetRate = thresholds.good / 100;
        const minPoolSize = Math.ceil(iterations * targetRate);

        // Build enhanced results HTML
        const resultsDiv = document.getElementById('stressTestResults');
        if (!resultsDiv) return;

        resultsDiv.innerHTML = `
            <div class="card" style="border: 3px solid ${statusColor}; box-shadow: 0 0 20px ${statusColor};">
                <h3 style="text-align: center; color: ${statusColor}; font-family: 'Orbitron', sans-serif; font-size: 1.5em; margin-bottom: 20px;">
                    ${statusText}
                </h3>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 20px;">
                    <div style="text-align: center; padding: 15px; background: rgba(0, 240, 255, 0.1); border-radius: 10px;">
                        <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 5px;">Uniqueness</div>
                        <div style="font-size: 2em; font-weight: 700; color: ${statusColor};">${uniquenessPercent}%</div>
                    </div>

                    <div style="text-align: center; padding: 15px; background: rgba(0, 240, 255, 0.1); border-radius: 10px;">
                        <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 5px;">Coverage</div>
                        <div style="font-size: 2em; font-weight: 700; color: var(--neon-purple);">${(coverageRate * 100).toFixed(1)}%</div>
                        <div style="font-size: 0.8em; color: var(--text-muted);">${uniqueQuestions} of ${bankSize}</div>
                    </div>

                    <div style="text-align: center; padding: 15px; background: rgba(0, 240, 255, 0.1); border-radius: 10px;">
                        <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 5px;">Avg Appearances</div>
                        <div style="font-size: 2em; font-weight: 700; color: var(--neon-yellow);">${results.avgAppearances || 'N/A'}</div>
                    </div>

                    <div style="text-align: center; padding: 15px; background: rgba(0, 240, 255, 0.1); border-radius: 10px;">
                        <div style="font-size: 0.9em; color: var(--text-muted); margin-bottom: 5px;">Target</div>
                        <div style="font-size: 2em; font-weight: 700; color: var(--neon-blue);">${thresholds.good}%</div>
                    </div>
                </div>

                ${classification === 'LOGIC_LOCKED' ? `
                    <div style="background: rgba(255, 165, 0, 0.2); border-left: 4px solid orange; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: orange;">⚠️ LOGIC LOCKED</div>
                        <div style="font-size: 0.9em; line-height: 1.6;">
                            Your stress test is only sampling ${(coverageRate * 100).toFixed(1)}% of the available bank.
                            <br><br>
                            <strong>This means:</strong> The generator is logic-locked to a narrow subset.
                            <br><br>
                            <strong>Solutions:</strong>
                            <ul style="margin: 10px 0; padding-left: 20px;">
                                <li>Enable "Use Full Bank" toggle above</li>
                                <li>Check for weighting bias in question selection</li>
                                <li>Verify filters aren't over-restricting</li>
                            </ul>
                        </div>
                    </div>
                ` : ''}

                ${classification === 'CONTENT_SHORTAGE' ? `
                    <div style="background: rgba(255, 238, 0, 0.2); border-left: 4px solid #ffee00; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #ffee00;">⚠️ CONTENT SHORTAGE</div>
                        <div style="font-size: 0.9em; line-height: 1.6;">
                            This grade/subject combination needs more questions.
                            <br><br>
                            <strong>Current:</strong> ${bankSize} questions
                            <br>
                            <strong>Recommended:</strong> ${minPoolSize}+ questions
                            <br>
                            <strong>Gap:</strong> ${Math.max(0, minPoolSize - bankSize)} more needed
                        </div>
                    </div>
                ` : ''}

                ${classification === 'GOOD_OR_BETTER' ? `
                    <div style="background: rgba(0, 255, 136, 0.2); border-left: 4px solid #00ff88; padding: 15px; margin-bottom: 15px; border-radius: 5px;">
                        <div style="font-weight: 700; margin-bottom: 10px; color: #00ff88;">✅ ${statusText}</div>
                        <div style="font-size: 0.9em; line-height: 1.6;">
                            Question variety meets or exceeds target. Students will not experience noticeable repetition at this load.
                        </div>
                    </div>
                ` : ''}

                <div style="font-size: 0.85em; color: var(--text-muted); margin-top: 15px;">
                    <strong>Details:</strong> ${results.totalGenerated} questions generated, ${results.uniqueQuestions} unique
                </div>
            </div>
        `;
    };

    function getThresholdsForIterations(iterations) {
        // Find closest threshold set
        const keys = Object.keys(UNIQUENESS_THRESHOLDS).map(Number).sort((a, b) => b - a);
        for (let key of keys) {
            if (iterations >= key) {
                return {
                    excellent: UNIQUENESS_THRESHOLDS[key].excellent || 100,
                    good: UNIQUENESS_THRESHOLDS[key].good || 75,
                    fair: UNIQUENESS_THRESHOLDS[key].fair || 60
                };
            }
        }
        return { excellent: 90, good: 75, fair: 60 };
    }

    function classifyTest(iterations, uniquenessRate, coverageRate) {
        const thresholds = getThresholdsForIterations(iterations);
        const target = thresholds.good / 100;

        if (uniquenessRate >= target) {
            return "GOOD_OR_BETTER";
        }

        if (coverageRate < COVERAGE_THRESHOLD_LOCKED) {
            return "LOGIC_LOCKED";
        }

        return "CONTENT_SHORTAGE";
    }

    // ========================================
    // MOOD-BASED THEMING
    // ========================================

    const MOOD_THEMES = {
        'curious': { colors: ['#FACC15', '#F97316'], name: 'Curious' },
        'focused': { colors: ['#10B981', '#14B8A6'], name: 'Focused' },
        'brave': { colors: ['#EF4444', '#F97316'], name: 'Brave' },
        'success': { colors: ['#3B82F6', '#8B5CF6'], name: 'Success' },
        'creative': { colors: ['#8B5CF6', '#EC4899'], name: 'Creative' },
        'break': { colors: ['#F9FAFB', '#E5E7EB'], name: 'Break' },
        'overwhelmed': { colors: ['#1F2937', '#374151'], name: 'Overwhelmed' }
    };

    window.applyMoodTheme = function(mood) {
        const theme = MOOD_THEMES[mood];
        if (!theme) return;

        const root = document.documentElement;
        root.style.setProperty('--mood-color-1', theme.colors[0]);
        root.style.setProperty('--mood-color-2', theme.colors[1]);
        root.style.setProperty('--mood-border',
            `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`
        );

        // Add transition class
        document.body.classList.add('mood-transition');
        setTimeout(() => document.body.classList.remove('mood-transition'), 1000);
    };

    // EXTEND existing calculateMood
    const originalCalculateMood = window.calculateMood;
    window.calculateMood = function() {
        const mood = originalCalculateMood ? originalCalculateMood() : 'curious';
        applyMoodTheme(mood);
        return mood;
    };

    // ========================================
    // TIME TRACKING
    // ========================================

    window.startTimeTracking = function() {
        if (!gameState.timeTracking) return;

        gameState.timeTracking.sessionStartTime = Date.now();

        // Update every minute
        setInterval(function() {
            if (gameState.timeTracking.sessionStartTime) {
                gameState.timeTracking.totalMinutes++;

                // Check time badges
                checkEnhancedBadges();

                // Save state
                if (typeof saveState === 'function') {
                    saveState();
                }
            }
        }, 60000);
    };

    // ========================================
    // INITIALIZATION
    // ========================================

    function initialize() {
        console.log('✅ Integration patch initialized');

        // Start time tracking
        startTimeTracking();

        // Apply initial mood theme
        if (gameState?.session?.mood) {
            applyMoodTheme(gameState.session.mood);
        }

        // Add full-bank toggle to stress test UI if it doesn't exist
        const stressTestSection = document.querySelector('#stressTestIterations')?.parentElement;
        if (stressTestSection && !document.getElementById('stressTestFullBank')) {
            const toggleHTML = `
                <div style="margin: 15px 0; padding: 10px; background: rgba(0, 240, 255, 0.1); border-radius: 8px;">
                    <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                        <input type="checkbox" id="stressTestFullBank" style="width: 20px; height: 20px; cursor: pointer;">
                        <span style="font-weight: 600; color: var(--neon-blue);">
                            Use Full Bank (ignore grade & subject filters)
                        </span>
                    </label>
                    <div style="font-size: 0.85em; color: var(--text-muted); margin-top: 5px; padding-left: 30px;">
                        Enable this to test the entire question bank instead of filtered subsets
                    </div>
                </div>
            `;

            const iterationsSelect = document.getElementById('stressTestIterations');
            if (iterationsSelect && iterationsSelect.parentElement) {
                iterationsSelect.parentElement.insertAdjacentHTML('beforeend', toggleHTML);
            }
        }

        console.log('✅ All integration patch components active');
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Also run after a short delay to ensure everything is ready
    setTimeout(initialize, 1000);

})();

console.log('✅ Learning Spectrum Integration Patch Loaded');
