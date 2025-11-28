/**
 * Learning Spectrum - Integration Script
 * Integrates all enhancements with the existing index.html system
 *
 * This script should be loaded AFTER the main app JavaScript
 */

(function() {
    'use strict';

    console.log('🚀 Loading Learning Spectrum Enhancements Integration...');

    // Wait for main app and enhancements to load
    if (typeof window.LearningSpectrumEnhancements === 'undefined' ||
        typeof window.EnhancedQuestionGenerator === 'undefined') {
        console.error('❌ Enhancement modules not loaded. Please include enhancements-module.js and enhanced-question-generator.js');
        return;
    }

    const Enhancements = window.LearningSpectrumEnhancements;
    const QuestionGen = window.EnhancedQuestionGenerator;

    // ========================================
    // INITIALIZE ENHANCEMENTS
    // ========================================

    function initializeEnhancements() {
        // Ensure gameState exists (it should from main app)
        if (typeof gameState === 'undefined') {
            console.error('❌ gameState not found. Cannot initialize enhancements.');
            return false;
        }

        // Initialize enhancement system
        const success = Enhancements.initialize(gameState);

        if (!success) {
            console.error('❌ Enhancement initialization failed');
            return false;
        }

        // Initialize question uniqueness pools
        initializeQuestionPools();

        // Set up badge checking
        setupBadgeSystem();

        // Set up mood theming
        setupMoodTheming();

        // Initialize time tracking
        initializeTimeTracking();

        // Set up UI enhancements
        setupUIEnhancements();

        console.log('✅ All enhancements initialized successfully');
        return true;
    }

    // ========================================
    // QUESTION POOL INITIALIZATION
    // ========================================

    function initializeQuestionPools() {
        // Initialize pools for each grade level
        for (let grade = 0; grade <= 5; grade++) {
            for (let sublevel = 0; sublevel <= 9; sublevel++) {
                const fineGrade = parseFloat(`${grade}.${sublevel}`);
                const category = `grade_${grade}_${sublevel}`;

                // Generate initial balanced question set
                const existingQuestions = {
                    gradeKComprehensive: typeof gradeKComprehensive !== 'undefined' ? gradeKComprehensive : null,
                    grade1Comprehensive: typeof grade1Comprehensive !== 'undefined' ? grade1Comprehensive : null,
                    grade2Comprehensive: typeof grade2Comprehensive !== 'undefined' ? grade2Comprehensive : null,
                    grade3Comprehensive: typeof grade3Comprehensive !== 'undefined' ? grade3Comprehensive : null,
                    grade4Comprehensive: typeof grade4Comprehensive !== 'undefined' ? grade4Comprehensive : null,
                    grade5Comprehensive: typeof grade5Comprehensive !== 'undefined' ? grade5Comprehensive : null
                };

                const questionSet = QuestionGen.generateBalancedSet(fineGrade, 50, existingQuestions);

                // Initialize pool
                Enhancements.QuestionUniqueness.initializePool(category, questionSet);
            }
        }

        console.log('✅ Question pools initialized for all grade levels');
    }

    // ========================================
    // ENHANCED BADGE SYSTEM
    // ========================================

    function setupBadgeSystem() {
        // Override or extend the existing checkBadges function
        const originalCheckBadges = window.checkBadges || function() {};

        window.checkBadges = function() {
            // Run original badge checking
            originalCheckBadges();

            // Check enhanced badges
            checkEnhancedBadges();
        };

        // Add new badge checking function
        window.checkEnhancedBadges = checkEnhancedBadges;
    }

    function checkEnhancedBadges() {
        if (!gameState || !gameState.session) return;

        const newBadges = [];

        // Check streak badges
        const streakBadges = Enhancements.BadgeSystem.checkStreakBadges(
            gameState.session.currentStreak,
            gameState.badges
        );
        newBadges.push(...streakBadges);

        // Check time badges
        if (gameState.enhancements && gameState.enhancements.timeTracking) {
            const timeStats = {
                sessionMinutes: calculateSessionMinutes(),
                consecutiveDays: gameState.enhancements.timeTracking.consecutiveDays,
                totalMinutes: gameState.enhancements.timeTracking.totalMinutes
            };

            const timeBadges = Enhancements.BadgeSystem.checkTimeBadges(
                timeStats,
                gameState.badges
            );
            newBadges.push(...timeBadges);
        }

        // Check mastery badges
        const masteryBadges = Enhancements.BadgeSystem.checkMasteryBadges(
            gameState.domains,
            gameState.badges
        );
        newBadges.push(...masteryBadges);

        // Award new badges
        newBadges.forEach(badge => {
            awardBadge(badge);

            // Check if badge unlocks a feature
            if (badge.unlocks) {
                showFeatureUnlock(badge);
            }
        });
    }

    function awardBadge(badge) {
        // Add to gameState
        gameState.badges.push(badge);

        // Show notification
        if (typeof unlockBadge === 'function') {
            unlockBadge(badge.name, badge.icon, badge.description);
        } else {
            showBadgeNotification(badge);
        }

        // Save state
        if (typeof saveState === 'function') {
            saveState();
        }
    }

    function showBadgeNotification(badge) {
        const notification = document.createElement('div');
        notification.className = 'badge-notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, rgba(0, 240, 255, 0.95), rgba(139, 92, 246, 0.95));
            padding: 20px;
            border-radius: 15px;
            border: 2px solid var(--neon-blue);
            box-shadow: 0 0 30px rgba(0, 240, 255, 0.6);
            z-index: 10000;
            max-width: 300px;
        `;

        notification.innerHTML = `
            <div style="text-align: center; color: white;">
                <div style="font-size: 3em; margin-bottom: 10px;">${badge.icon}</div>
                <div style="font-family: 'Orbitron', sans-serif; font-size: 1.2em; font-weight: 700; margin-bottom: 5px;">
                    Badge Unlocked!
                </div>
                <div style="font-size: 1em; font-weight: 600; margin-bottom: 5px;">
                    ${badge.name}
                </div>
                <div style="font-size: 0.85em; opacity: 0.9;">
                    ${badge.description}
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 4000);
    }

    function showFeatureUnlock(badge) {
        const notification = document.createElement('div');
        notification.className = 'feature-unlock-notification';

        notification.innerHTML = `
            <div class="unlock-icon">🔓</div>
            <div class="unlock-title">Feature Unlocked!</div>
            <div class="unlock-description">
                You've unlocked: <strong>${badge.unlocks.replace(/_/g, ' ')}</strong>
            </div>
            <button onclick="this.parentElement.remove()" class="btn btn-primary">
                <span>Awesome!</span>
            </button>
        `;

        document.body.appendChild(notification);

        // Play unlock sound if available
        if (typeof playSound === 'function') {
            playSound('unlock');
        }

        // Auto-remove after 6 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 6000);
    }

    // ========================================
    // TIME TRACKING
    // ========================================

    function initializeTimeTracking() {
        // Start session timer
        if (gameState.enhancements) {
            gameState.enhancements.timeTracking.sessionStartTime = Date.now();

            // Update time tracking every minute
            setInterval(updateTimeTracking, 60000);
        }
    }

    function updateTimeTracking() {
        if (!gameState.enhancements || !gameState.enhancements.timeTracking) return;

        const tracking = gameState.enhancements.timeTracking;
        const now = Date.now();

        if (tracking.sessionStartTime) {
            const sessionMinutes = Math.floor((now - tracking.sessionStartTime) / 60000);

            // Update total minutes
            tracking.totalMinutes += 1;

            // Check for consecutive days
            const lastDate = tracking.lastSessionDate ? new Date(tracking.lastSessionDate) : null;
            const today = new Date();

            if (lastDate) {
                const daysDiff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

                if (daysDiff === 1) {
                    // Consecutive day
                    tracking.consecutiveDays += 1;
                } else if (daysDiff > 1) {
                    // Streak broken
                    tracking.consecutiveDays = 1;
                }
            } else {
                // First session
                tracking.consecutiveDays = 1;
            }

            tracking.lastSessionDate = today.toISOString();

            // Check time badges
            checkEnhancedBadges();

            // Save
            if (typeof saveState === 'function') {
                saveState();
            }
        }
    }

    function calculateSessionMinutes() {
        if (!gameState.enhancements || !gameState.enhancements.timeTracking) return 0;

        const tracking = gameState.enhancements.timeTracking;
        if (!tracking.sessionStartTime) return 0;

        return Math.floor((Date.now() - tracking.sessionStartTime) / 60000);
    }

    // ========================================
    // MOOD-BASED THEMING
    // ========================================

    function setupMoodTheming() {
        // Override or extend calculateMood function
        const originalCalculateMood = window.calculateMood || function() { return 'curious'; };

        window.calculateMood = function() {
            const mood = originalCalculateMood();

            // Apply mood theme
            Enhancements.MoodTheming.applyTheme(mood);

            return mood;
        };

        // Set initial theme
        if (gameState && gameState.session && gameState.session.mood) {
            Enhancements.MoodTheming.applyTheme(gameState.session.mood);
        }
    }

    // ========================================
    // FEEDBACK QUESTIONS INTEGRATION
    // ========================================

    function shouldShowFeedbackQuestion() {
        if (!gameState || !gameState.session) return false;

        const answered = gameState.session.questionsAnswered || 0;
        const correct = gameState.session.correctAnswers || 0;
        const accuracy = answered > 0 ? correct / answered : 0;
        const streak = gameState.session.currentStreak || 0;

        // Show feedback question after 5 questions
        if (answered > 0 && answered % 5 === 0) {
            return true;
        }

        // Show after streak of 10
        if (streak === 10) {
            return true;
        }

        // Show after 3 consecutive errors
        if (answered >= 3 && accuracy < 0.4) {
            return true;
        }

        return false;
    }

    function getFeedbackQuestion() {
        if (!gameState || !gameState.session) return null;

        const answered = gameState.session.questionsAnswered || 0;
        const correct = gameState.session.correctAnswers || 0;
        const accuracy = answered > 0 ? correct / answered : 0;
        const streak = gameState.session.currentStreak || 0;

        // Determine context
        let context = 'general';

        if (streak >= 5) {
            context = 'after_streak';
        } else if (accuracy < 0.5 && answered >= 3) {
            context = 'after_errors';
        } else if (answered > 10) {
            context = 'mid_session';
        }

        return Enhancements.FeedbackQuestions.getQuestion(context);
    }

    // Add to window for access from main app
    window.shouldShowFeedbackQuestion = shouldShowFeedbackQuestion;
    window.getFeedbackQuestion = getFeedbackQuestion;

    function processFeedbackResponse(question, answerIndex) {
        const answer = question.answers[answerIndex];
        const adaptations = Enhancements.FeedbackQuestions.processResponse(question, answer);

        // Store feedback history
        if (gameState.enhancements) {
            gameState.enhancements.feedbackHistory.push({
                questionId: question.id,
                answer: answer,
                adaptations: adaptations,
                timestamp: new Date().toISOString()
            });
        }

        // Apply adaptations
        if (adaptations.difficultyAdjustment !== 0) {
            adjustDifficulty(adaptations.difficultyAdjustment);
        }

        if (adaptations.needsBreak) {
            offerBreakOrSideQuest();
        }

        if (adaptations.mood) {
            if (gameState.session) {
                gameState.session.mood = adaptations.mood;
            }
            Enhancements.MoodTheming.applyTheme(adaptations.mood);
        }

        // Update learner profile
        updateLearnerProfile(adaptations);

        return adaptations;
    }

    window.processFeedbackResponse = processFeedbackResponse;

    function adjustDifficulty(adjustment) {
        if (!gameState.enhancements) return;

        const currentGrade = gameState.enhancements.fineGradeCurrent;
        const { grade, sublevel } = Enhancements.GradeSystem.fromFineGrade(currentGrade);

        let newSublevel = sublevel + adjustment;
        let newGrade = grade;

        if (newSublevel > 9) {
            newGrade = Math.min(5, grade + 1);
            newSublevel = 0;
        } else if (newSublevel < 0) {
            newGrade = Math.max(0, grade - 1);
            newSublevel = 9;
        }

        gameState.enhancements.fineGradeCurrent = Enhancements.GradeSystem.toFineGrade(newGrade, newSublevel);

        console.log(`📊 Difficulty adjusted to ${gameState.enhancements.fineGradeCurrent}`);
    }

    function offerBreakOrSideQuest() {
        const quest = Enhancements.SideQuests.getQuest('frustration');

        if (quest) {
            showSideQuest(quest);
        } else {
            // Fallback to simple break offer
            if (confirm('Would you like to take a short break?')) {
                // Pause session
                if (typeof pauseSession === 'function') {
                    pauseSession();
                }
            }
        }
    }

    function showSideQuest(quest) {
        const container = document.createElement('div');
        container.className = 'side-quest-container';
        container.innerHTML = `
            <div class="side-quest-title">${quest.title}</div>
            <div class="side-quest-description">${quest.description}</div>
            <div class="side-quest-content" id="sideQuestContent">
                ${renderSideQuestContent(quest)}
            </div>
            <button onclick="closeSideQuest()" class="btn btn-primary">
                <span>Continue Learning</span>
            </button>
        `;

        // Insert before practice area or at top of main screen
        const practiceArea = document.getElementById('practiceScreen') || document.querySelector('.container');
        if (practiceArea) {
            practiceArea.insertBefore(container, practiceArea.firstChild);
        }

        // Set up quest-specific behavior
        if (quest.content.type === 'guided_breathing') {
            startBreathingExercise(quest.content.cycles);
        }
    }

    window.closeSideQuest = function() {
        const quest = document.querySelector('.side-quest-container');
        if (quest) {
            quest.remove();
        }
    };

    function renderSideQuestContent(quest) {
        switch (quest.content.type) {
            case 'guided_breathing':
                return `
                    <div class="breathing-circle"></div>
                    <div class="breathing-instruction" id="breathingInstruction">Breathe in...</div>
                `;

            case 'mini_story':
                return `<div style="max-width: 500px; text-align: center;">
                    <p>Remember: Every expert was once a beginner. Every mistake is a step toward mastery!</p>
                    <p>You're doing great by trying. That's what learning is all about! 💪</p>
                </div>`;

            case 'bonus_question':
                return `<div>
                    <p>Ready for a challenge? Try this bonus puzzle!</p>
                </div>`;

            default:
                return `<p>${quest.description}</p>`;
        }
    }

    function startBreathingExercise(cycles) {
        let currentCycle = 0;
        const instruction = document.getElementById('breathingInstruction');

        const breatheCycle = setInterval(() => {
            const phase = (currentCycle % 2 === 0) ? 'in' : 'out';

            if (instruction) {
                instruction.textContent = phase === 'in' ? 'Breathe in...' : 'Breathe out...';
            }

            currentCycle++;

            if (currentCycle >= cycles * 2) {
                clearInterval(breatheCycle);
                if (instruction) {
                    instruction.textContent = 'Great job! Feeling better? 😊';
                }
            }
        }, 3000); // 3 seconds per phase
    }

    function updateLearnerProfile(adaptations) {
        if (!gameState.enhancements) return;

        // Collect behavior data
        const behaviorData = {
            averageConfidence: calculateAverageConfidence(),
            helpRequests: countHelpRequests(),
            averageTimePerQuestion: calculateAverageTime(),
            errorRate: calculateErrorRate(),
            hintsUsed: gameState.session?.hintsUsed || 0
        };

        // Determine profile
        const profile = Enhancements.LearnerProfiles.determineProfile(behaviorData);

        if (profile !== gameState.enhancements.learnerProfile) {
            gameState.enhancements.learnerProfile = profile;
            console.log(`👤 Learner profile updated to: ${profile}`);

            // Show notification
            const profileObj = Enhancements.LearnerProfiles.profiles[profile];
            if (profileObj) {
                showProfileUpdate(profileObj);
            }
        }
    }

    function calculateAverageConfidence() {
        if (!gameState.enhancements || !gameState.enhancements.feedbackHistory) return 0.5;

        const confidenceResponses = gameState.enhancements.feedbackHistory
            .filter(h => h.adaptations.confidence !== null)
            .map(h => h.adaptations.confidence);

        if (confidenceResponses.length === 0) return 0.5;

        return confidenceResponses.reduce((a, b) => a + b, 0) / confidenceResponses.length;
    }

    function countHelpRequests() {
        if (!gameState.enhancements || !gameState.enhancements.feedbackHistory) return 0;

        return gameState.enhancements.feedbackHistory
            .filter(h => h.adaptations.strategy === 'external_support')
            .length;
    }

    function calculateAverageTime() {
        // This would need timing data from actual question responses
        // For now, return default
        return 30;
    }

    function calculateErrorRate() {
        if (!gameState.session) return 0;

        const answered = gameState.session.questionsAnswered || 0;
        const correct = gameState.session.correctAnswers || 0;

        if (answered === 0) return 0;

        return 1 - (correct / answered);
    }

    function showProfileUpdate(profile) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.95), rgba(236, 72, 153, 0.95));
            padding: 20px;
            border-radius: 15px;
            border: 2px solid var(--neon-purple);
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.6);
            z-index: 10000;
            max-width: 300px;
            color: white;
            animation: slideInFromRight 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="text-align: center;">
                <div style="font-size: 2.5em; margin-bottom: 10px;">👤</div>
                <div style="font-family: 'Orbitron', sans-serif; font-size: 1.1em; font-weight: 700; margin-bottom: 5px;">
                    Learning Style Updated
                </div>
                <div style="font-size: 1em; font-weight: 600; margin-bottom: 10px;">
                    ${profile.name}
                </div>
                <div style="font-size: 0.85em; opacity: 0.9;">
                    The app will adapt to help you learn your way!
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 5000);
    }

    // ========================================
    // UI ENHANCEMENTS
    // ========================================

    function setupUIEnhancements() {
        // Create badge gallery UI
        createBadgeGalleryUI();

        // Create tab navigation
        createTabNavigation();

        // Enhance profile section
        enhanceProfileSection();

        // Add collapsible sections
        setupCollapsibleSections();
    }

    function createBadgeGalleryUI() {
        // This will be added to a tab or screen
        const badgeHTML = `
            <div class="badge-gallery-container fade-in">
                <div class="badge-gallery-header">
                    <h2>🏆 Badge Collection</h2>
                    <div class="badge-gallery-stats">
                        <div class="badge-stat">
                            <div class="badge-stat-value" id="earnedBadgeCount">0</div>
                            <div class="badge-stat-label">Earned</div>
                        </div>
                        <div class="badge-stat">
                            <div class="badge-stat-value" id="totalBadgeCount">0</div>
                            <div class="badge-stat-label">Total</div>
                        </div>
                        <div class="badge-stat">
                            <div class="badge-stat-value" id="badgeProgress">0%</div>
                            <div class="badge-stat-label">Progress</div>
                        </div>
                    </div>
                </div>

                <div class="badge-category">
                    <div class="badge-category-title">⚡ Streak Badges</div>
                    <div class="badge-grid-enhanced" id="streakBadgesGrid"></div>
                </div>

                <div class="badge-category">
                    <div class="badge-category-title">⏱️ Time Badges</div>
                    <div class="badge-grid-enhanced" id="timeBadgesGrid"></div>
                </div>

                <div class="badge-category">
                    <div class="badge-category-title">🎓 Mastery Badges</div>
                    <div class="badge-grid-enhanced" id="masteryBadgesGrid"></div>
                </div>
            </div>
        `;

        // Add to window for later insertion
        window.badgeGalleryHTML = badgeHTML;

        // Create update function
        window.updateBadgeGallery = updateBadgeGallery;
    }

    function updateBadgeGallery() {
        if (!gameState) return;

        const earned = gameState.badges || [];
        const allBadges = [
            ...Enhancements.BadgeSystem.streakBadges,
            ...Enhancements.BadgeSystem.timeBadges,
            ...Enhancements.BadgeSystem.masteryBadges
        ];

        // Update stats
        const earnedCount = document.getElementById('earnedBadgeCount');
        const totalCount = document.getElementById('totalBadgeCount');
        const progress = document.getElementById('badgeProgress');

        if (earnedCount) earnedCount.textContent = earned.length;
        if (totalCount) totalCount.textContent = allBadges.length;
        if (progress) {
            const percent = Math.round((earned.length / allBadges.length) * 100);
            progress.textContent = percent + '%';
        }

        // Render badge grids
        renderBadgeGrid('streakBadgesGrid', Enhancements.BadgeSystem.streakBadges, earned);
        renderBadgeGrid('timeBadgesGrid', Enhancements.BadgeSystem.timeBadges, earned);
        renderBadgeGrid('masteryBadgesGrid', Enhancements.BadgeSystem.masteryBadges, earned);
    }

    function renderBadgeGrid(containerId, badges, earnedBadges) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';

        badges.forEach(badge => {
            const isEarned = earnedBadges.some(b => (b.name || b) === badge.name);
            const earnedBadge = earnedBadges.find(b => (b.name || b) === badge.name);

            const card = document.createElement('div');
            card.className = `badge-card ${isEarned ? 'earned' : 'locked'}`;

            let requirementText = '';
            if (!isEarned) {
                if (badge.streak) {
                    requirementText = `<div class="badge-unlock-requirement">Get ${badge.streak} in a row</div>`;
                } else if (badge.minutes) {
                    requirementText = `<div class="badge-unlock-requirement">Study for ${badge.minutes} minutes</div>`;
                } else if (badge.days) {
                    requirementText = `<div class="badge-unlock-requirement">Study ${badge.days} days in a row</div>`;
                } else if (badge.totalMinutes) {
                    requirementText = `<div class="badge-unlock-requirement">Total: ${badge.totalMinutes} minutes</div>`;
                } else if (badge.threshold) {
                    requirementText = `<div class="badge-unlock-requirement">Reach ${Math.round(badge.threshold * 100)}% in ${badge.domain}</div>`;
                }
            }

            let unlocksText = '';
            if (badge.unlocks && isEarned) {
                unlocksText = `<div class="badge-unlocks-feature">🔓 ${badge.unlocks.replace(/_/g, ' ')}</div>`;
            }

            let dateText = '';
            if (isEarned && earnedBadge && earnedBadge.dateEarned) {
                const date = new Date(earnedBadge.dateEarned).toLocaleDateString();
                dateText = `<div class="badge-date-earned">Earned: ${date}</div>`;
            }

            card.innerHTML = `
                <div class="badge-icon-large">${badge.icon}</div>
                <div class="badge-name-display">${badge.name}</div>
                <div class="badge-description-display">${badge.description || ''}</div>
                ${requirementText}
                ${unlocksText}
                ${dateText}
            `;

            container.appendChild(card);
        });
    }

    function createTabNavigation() {
        // This should be inserted into the main UI
        const tabNavHTML = `
            <div class="tab-navigation">
                <button class="tab-btn active" data-tab="dashboard">🏠 Dashboard</button>
                <button class="tab-btn" data-tab="practice">📝 Practice</button>
                <button class="tab-btn" data-tab="badges">🏆 Badges</button>
                <button class="tab-btn" data-tab="progress">📊 Progress</button>
                <button class="tab-btn" data-tab="profile">👤 Profile</button>
            </div>
        `;

        window.tabNavigationHTML = tabNavHTML;

        // Tab switching function
        window.switchTab = function(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });

            // Show selected tab
            const selectedTab = document.getElementById(`${tabName}Tab`) ||
                                document.getElementById(`${tabName}Screen`);
            if (selectedTab) {
                selectedTab.classList.add('active', 'tab-content');
            }

            // Update tab buttons
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
            if (selectedBtn) {
                selectedBtn.classList.add('active');
            }

            // Special handling for badge tab
            if (tabName === 'badges') {
                updateBadgeGallery();
            }
        };

        // Add click handlers
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('tab-btn')) {
                const tab = e.target.getAttribute('data-tab');
                if (tab) {
                    switchTab(tab);
                }
            }
        });
    }

    function enhanceProfileSection() {
        const profileEnhancementHTML = `
            <div class="profile-edit-section fade-in">
                <h3 style="text-align: center; color: var(--neon-blue); font-family: 'Orbitron', sans-serif; margin-bottom: 20px;">
                    📝 Edit Profile
                </h3>

                <div class="profile-photo-upload">
                    <div class="profile-photo-preview" id="profilePhotoPreview">
                        <div class="profile-photo-placeholder">👤</div>
                    </div>
                    <input type="file" id="profilePhotoInput" accept="image/*" style="display: none;">
                    <button class="profile-upload-btn" onclick="document.getElementById('profilePhotoInput').click()">
                        📷 Upload Photo
                    </button>
                </div>

                <div class="profile-field">
                    <label for="profileName">Name</label>
                    <input type="text" id="profileName" placeholder="Student name">
                </div>

                <div class="profile-field">
                    <label for="profileBirthday">Birthday</label>
                    <input type="date" id="profileBirthday">
                </div>

                <div class="profile-field">
                    <label for="profileNickname">Nickname (Optional)</label>
                    <input type="text" id="profileNickname" placeholder="Preferred name">
                </div>

                <div class="profile-field">
                    <label for="profileFavoriteColor">Favorite Color</label>
                    <select id="profileFavoriteColor">
                        <option value="">Select a color</option>
                        <option value="blue">💙 Blue</option>
                        <option value="green">💚 Green</option>
                        <option value="purple">💜 Purple</option>
                        <option value="pink">💗 Pink</option>
                        <option value="red">❤️ Red</option>
                        <option value="yellow">💛 Yellow</option>
                    </select>
                </div>

                <div style="text-align: center; margin-top: 20px;">
                    <button class="btn btn-primary" onclick="saveProfileChanges()">
                        <span>💾 Save Changes</span>
                    </button>
                    <button class="export-profile-btn" onclick="exportProfileImage()" style="margin-left: 10px;">
                        <span>📸 Export Profile</span>
                    </button>
                </div>
            </div>
        `;

        window.profileEnhancementHTML = profileEnhancementHTML;

        // Profile photo handling
        window.handleProfilePhotoUpload = function(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const preview = document.getElementById('profilePhotoPreview');
                if (preview) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
                }

                // Store in gameState
                if (gameState.student) {
                    gameState.student.photo = e.target.result;
                    if (typeof saveState === 'function') {
                        saveState();
                    }
                }
            };

            reader.readAsDataURL(file);
        };

        document.addEventListener('change', function(e) {
            if (e.target.id === 'profilePhotoInput') {
                handleProfilePhotoUpload(e);
            }
        });

        // Save profile changes
        window.saveProfileChanges = function() {
            const name = document.getElementById('profileName')?.value;
            const birthday = document.getElementById('profileBirthday')?.value;
            const nickname = document.getElementById('profileNickname')?.value;
            const favoriteColor = document.getElementById('profileFavoriteColor')?.value;

            if (gameState.student) {
                if (name) gameState.student.name = name;
                if (birthday) gameState.student.birthday = birthday;
                if (nickname) gameState.student.nickname = nickname;
                if (favoriteColor) gameState.student.favoriteColor = favoriteColor;

                if (typeof saveState === 'function') {
                    saveState();
                }

                alert('✅ Profile saved successfully!');
            }
        };

        // Export profile image
        window.exportProfileImage = function() {
            // Would use html2canvas or similar library
            alert('📸 Profile export feature coming soon! This will create a shareable image of your progress.');
        };
    }

    function setupCollapsibleSections() {
        // Add click handler for collapsible sections
        document.addEventListener('click', function(e) {
            if (e.target.closest('.collapsible-header')) {
                const header = e.target.closest('.collapsible-header');
                const section = header.closest('.collapsible-section');

                if (section) {
                    section.classList.toggle('expanded');
                }
            }
        });
    }

    // ========================================
    // INITIALIZE ON LOAD
    // ========================================

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeEnhancements);
    } else {
        // DOM already loaded
        initializeEnhancements();
    }

    // Also try to initialize after a short delay to ensure main app is ready
    setTimeout(initializeEnhancements, 1000);

    console.log('✅ Integration script loaded');

})();
