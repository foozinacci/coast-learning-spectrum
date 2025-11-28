/**
 * Learning Spectrum - Compact UI Patch
 * Restructures DOM to remove redundancy and apply compact layout
 * Safe to apply - creates new structure without breaking existing functionality
 */

(function() {
    'use strict';

    console.log('🎨 Applying Compact UI Patch...');

    // Wait for DOM to be ready
    function applyCompactUI() {
        try {
            // 1. Remove redundant Student ID Upload section
            removeRedundantSections();

            // 2. Create compact profile section
            createCompactProfile();

            // 3. Restructure dashboard with compact cards
            createCompactDashboard();

            // 4. Make badge collection compact
            makeBadgeCollectionCompact();

            // 5. Center all main sections
            centerAllSections();

            // 6. Optimize button layouts
            optimizeButtons();

            console.log('✅ Compact UI Patch applied successfully');

            // Save preference
            localStorage.setItem('learningSpectrum_compactUI', 'true');

        } catch (error) {
            console.error('❌ Error applying compact UI:', error);
        }
    }

    // ========================================
    // REMOVE REDUNDANCY
    // ========================================

    function removeRedundantSections() {
        // Find and hide redundant student ID upload section
        const redundantSections = document.querySelectorAll('.student-id-section, [class*="student-id"]');

        redundantSections.forEach(section => {
            // Only hide if it's not the main profile section
            if (!section.closest('.profile-section-compact') &&
                section.textContent.includes('Student ID Upload')) {
                section.style.display = 'none';
                console.log('✅ Hidden redundant section:', section.className);
            }
        });

        // Find any duplicate upload sections
        const uploadSections = document.querySelectorAll('[id*="upload"], [class*="upload"]');
        let uploadCount = 0;

        uploadSections.forEach(section => {
            if (section.textContent.toLowerCase().includes('upload photo') ||
                section.textContent.toLowerCase().includes('student id')) {
                uploadCount++;
                // Hide duplicates after the first one
                if (uploadCount > 1) {
                    section.style.display = 'none';
                    console.log('✅ Hidden duplicate upload section');
                }
            }
        });
    }

    // ========================================
    // COMPACT PROFILE
    // ========================================

    function createCompactProfile() {
        // Find existing profile section or student info
        const existingProfile = document.querySelector('.profile-edit-section, #profileSection, .student-info');

        if (!existingProfile) {
            console.log('⚠️ Profile section not found, will create from gameState');
            return;
        }

        // Check if compact version already exists
        if (document.querySelector('.profile-section-compact')) {
            console.log('✅ Compact profile already exists');
            return;
        }

        // Get student data
        const studentName = gameState?.student?.name || 'Wednesday';
        const birthday = gameState?.student?.birthday || '11/21/2021';
        const gradeEnrolled = gameState?.student?.gradeEnrolled || 2;
        const gradeCurrent = gameState?.student?.gradeCurrent || 1.5;
        const photo = gameState?.student?.photo || null;

        // Create compact profile HTML
        const compactProfile = document.createElement('div');
        compactProfile.className = 'profile-section-compact fade-in';
        compactProfile.innerHTML = `
            <div class="profile-header-compact">
                <div class="profile-avatar-compact" id="profileAvatarCompact">
                    ${photo ? `<img src="${photo}" alt="Profile">` : '<div class="profile-avatar-icon">👤</div>'}
                </div>
                <div class="profile-info-compact">
                    <div class="profile-name-large">${studentName}</div>
                    <div class="profile-detail-row">
                        <div class="profile-detail-item">
                            <span class="label">Birthday:</span>
                            <span>${birthday}</span>
                        </div>
                        <div class="profile-detail-item">
                            <span class="label">Enrolled:</span>
                            <span>Grade ${gradeEnrolled}</span>
                        </div>
                        <div class="profile-detail-item">
                            <span class="label">Current:</span>
                            <span>Grade ${gradeCurrent}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profile-actions-compact">
                <button class="btn btn-primary btn-compact" onclick="document.getElementById('profilePhotoInputCompact').click()">
                    <span>📷 Upload Photo</span>
                </button>
                <button class="btn btn-primary btn-compact" onclick="editProfileInfo()">
                    <span>✏️ Edit Info</span>
                </button>
                <button class="btn btn-primary btn-compact" onclick="exportProfileImage()">
                    <span>📤 Export Profile</span>
                </button>
            </div>
            <input type="file" id="profilePhotoInputCompact" accept="image/*" style="display: none;">
        `;

        // Replace or insert before existing profile
        if (existingProfile.parentNode) {
            existingProfile.parentNode.insertBefore(compactProfile, existingProfile);
            existingProfile.style.display = 'none'; // Hide old profile
        }

        // Set up photo upload handler
        const photoInput = document.getElementById('profilePhotoInputCompact');
        if (photoInput) {
            photoInput.addEventListener('change', handleCompactPhotoUpload);
        }

        console.log('✅ Created compact profile section');
    }

    function handleCompactPhotoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            const avatarContainer = document.getElementById('profileAvatarCompact');
            if (avatarContainer) {
                avatarContainer.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
            }

            // Update gameState
            if (typeof gameState !== 'undefined' && gameState.student) {
                gameState.student.photo = e.target.result;
                if (typeof saveState === 'function') {
                    saveState();
                }
            }

            console.log('✅ Profile photo updated');
        };

        reader.readAsDataURL(file);
    }

    // Make edit profile function available globally
    window.editProfileInfo = function() {
        const name = prompt('Enter student name:', gameState?.student?.name || '');
        if (name) {
            if (gameState && gameState.student) {
                gameState.student.name = name;
            }

            // Update display
            const nameDisplay = document.querySelector('.profile-name-large');
            if (nameDisplay) {
                nameDisplay.textContent = name;
            }

            if (typeof saveState === 'function') {
                saveState();
            }
        }
    };

    // ========================================
    // COMPACT DASHBOARD
    // ========================================

    function createCompactDashboard() {
        // Find dashboard screen
        const dashboardScreen = document.getElementById('dashboardScreen') ||
                               document.querySelector('[class*="dashboard"]');

        if (!dashboardScreen) {
            console.log('⚠️ Dashboard not found');
            return;
        }

        // Check if compact dashboard already exists
        if (dashboardScreen.querySelector('.dashboard-grid-compact')) {
            console.log('✅ Compact dashboard already exists');
            return;
        }

        // Get stats from gameState
        const stats = {
            streak: gameState?.session?.currentStreak || 0,
            maxStreak: gameState?.session?.maxStreak || 0,
            questionsAnswered: gameState?.session?.questionsAnswered || 0,
            correctAnswers: gameState?.session?.correctAnswers || 0,
            accuracy: gameState?.session?.questionsAnswered > 0
                ? Math.round((gameState.session.correctAnswers / gameState.session.questionsAnswered) * 100)
                : 0,
            badges: gameState?.badges?.length || 0
        };

        // Create compact dashboard grid
        const dashboardGrid = document.createElement('div');
        dashboardGrid.className = 'dashboard-grid-compact';
        dashboardGrid.innerHTML = `
            <div class="dashboard-card-compact">
                <div class="dashboard-card-icon">🔥</div>
                <div class="dashboard-card-title">Current Streak</div>
                <div class="dashboard-card-value">${stats.streak}</div>
                <div class="dashboard-card-label">in a row</div>
            </div>
            <div class="dashboard-card-compact">
                <div class="dashboard-card-icon">🏆</div>
                <div class="dashboard-card-title">Best Streak</div>
                <div class="dashboard-card-value">${stats.maxStreak}</div>
                <div class="dashboard-card-label">personal best</div>
            </div>
            <div class="dashboard-card-compact">
                <div class="dashboard-card-icon">📊</div>
                <div class="dashboard-card-title">Accuracy</div>
                <div class="dashboard-card-value">${stats.accuracy}%</div>
                <div class="dashboard-card-label">${stats.correctAnswers}/${stats.questionsAnswered} correct</div>
            </div>
            <div class="dashboard-card-compact">
                <div class="dashboard-card-icon">🎖️</div>
                <div class="dashboard-card-title">Badges</div>
                <div class="dashboard-card-value">${stats.badges}</div>
                <div class="dashboard-card-label">earned</div>
            </div>
        `;

        // Insert at top of dashboard
        const firstCard = dashboardScreen.querySelector('.card');
        if (firstCard) {
            firstCard.parentNode.insertBefore(dashboardGrid, firstCard);
        } else {
            dashboardScreen.insertBefore(dashboardGrid, dashboardScreen.firstChild);
        }

        console.log('✅ Created compact dashboard');
    }

    // ========================================
    // COMPACT BADGE COLLECTION
    // ========================================

    function makeBadgeCollectionCompact() {
        // Find badge collection section
        const badgeSection = document.querySelector('.badge-tracker') ||
                            document.querySelector('[class*="badge"]');

        if (!badgeSection) {
            console.log('⚠️ Badge section not found');
            return;
        }

        // Check if already compact
        if (badgeSection.querySelector('.badge-collection-compact')) {
            console.log('✅ Badge collection already compact');
            return;
        }

        // Get earned badges
        const earnedBadges = gameState?.badges || [];
        const recentBadges = earnedBadges.slice(-3); // Show only last 3

        // Create compact badge collection
        const compactBadges = document.createElement('div');
        compactBadges.className = 'badge-collection-compact';
        compactBadges.innerHTML = `
            <div class="badge-collection-header">
                <div class="badge-collection-title">🏆 Badge Collection</div>
                <div class="badge-collection-subtitle">
                    ${earnedBadges.length > 0
                        ? `You've earned ${earnedBadges.length} ${earnedBadges.length === 1 ? 'badge' : 'badges'}!`
                        : 'No badges earned yet. Keep learning to unlock badges!'}
                </div>
            </div>
            ${earnedBadges.length > 0 ? `
                <div class="badge-preview-grid">
                    ${recentBadges.map(badge => {
                        const badgeData = typeof badge === 'string' ? { name: badge, icon: '🏆' } : badge;
                        return `
                            <div class="badge-preview-item">
                                <div class="badge-preview-icon">${badgeData.icon || '🏆'}</div>
                                <div class="badge-preview-name">${badgeData.name || badge}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            ` : `
                <div style="text-align: center; padding: 20px; opacity: 0.6;">
                    <div style="font-size: 3em; margin-bottom: 10px;">🎖️</div>
                    <div>Keep practicing to earn your first badge!</div>
                </div>
            `}
            <button class="btn btn-primary badge-view-all-btn" onclick="showScreen('badges')">
                <span>View All Badges</span>
            </button>
        `;

        // Replace old badge section
        badgeSection.parentNode.insertBefore(compactBadges, badgeSection);
        badgeSection.style.display = 'none';

        console.log('✅ Made badge collection compact');
    }

    // ========================================
    // CENTER SECTIONS
    // ========================================

    function centerAllSections() {
        // Center main content areas
        const mainSections = document.querySelectorAll('.card, .screen, [class*="section"]');

        mainSections.forEach(section => {
            // Skip sections that are already centered or shouldn't be centered
            if (section.classList.contains('center-content') ||
                section.classList.contains('tab-navigation')) {
                return;
            }

            // Apply centering styles
            const children = section.children;
            let hasBlockContent = false;

            for (let child of children) {
                if (child.tagName === 'H1' || child.tagName === 'H2' || child.tagName === 'H3') {
                    child.style.textAlign = 'center';
                }

                if (child.classList.contains('card') ||
                    child.classList.contains('dashboard-grid-compact') ||
                    child.classList.contains('badge-collection-compact') ||
                    child.classList.contains('profile-section-compact')) {
                    hasBlockContent = true;
                }
            }

            // Center block-level content
            if (hasBlockContent) {
                section.style.display = 'flex';
                section.style.flexDirection = 'column';
                section.style.alignItems = 'center';
            }
        });

        console.log('✅ Centered all sections');
    }

    // ========================================
    // OPTIMIZE BUTTONS
    // ========================================

    function optimizeButtons() {
        // Find button groups and center them
        const buttonContainers = document.querySelectorAll('[class*="button"], [class*="action"], .module-buttons');

        buttonContainers.forEach(container => {
            // Check if it contains multiple buttons
            const buttons = container.querySelectorAll('.btn');

            if (buttons.length > 1) {
                container.classList.add('btn-group-center');
            }
        });

        // Make all standalone buttons compact
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach(btn => {
            if (!btn.classList.contains('btn-compact')) {
                // Keep existing classes but add compact modifier
                if (btn.textContent.length < 20) { // Short buttons get more compact
                    btn.style.padding = '8px 16px';
                    btn.style.fontSize = '0.9em';
                }
            }
        });

        console.log('✅ Optimized button layouts');
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    function getGameState() {
        if (typeof gameState !== 'undefined') {
            return gameState;
        }

        // Try to load from localStorage
        const saved = localStorage.getItem('learningSpectrumState');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Error parsing saved state:', e);
            }
        }

        return null;
    }

    // ========================================
    // TOGGLE COMPACT MODE
    // ========================================

    window.toggleCompactUI = function() {
        const isCompact = localStorage.getItem('learningSpectrum_compactUI') === 'true';

        if (isCompact) {
            // Disable compact mode
            localStorage.setItem('learningSpectrum_compactUI', 'false');
            location.reload();
        } else {
            // Enable compact mode
            localStorage.setItem('learningSpectrum_compactUI', 'true');
            applyCompactUI();
        }
    };

    // ========================================
    // INITIALIZE
    // ========================================

    // Check if compact mode is enabled
    const isCompactEnabled = localStorage.getItem('learningSpectrum_compactUI');

    if (isCompactEnabled === null || isCompactEnabled === 'true') {
        // Apply by default or if enabled
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', applyCompactUI);
        } else {
            applyCompactUI();
        }

        // Also try after a delay to catch dynamically loaded content
        setTimeout(applyCompactUI, 1000);
        setTimeout(applyCompactUI, 3000);
    }

    console.log('✅ Compact UI Patch loaded');

})();
