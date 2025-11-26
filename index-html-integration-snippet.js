/**
 * index.html Integration Code Snippet
 *
 * Add this code to index.html to enable comprehensive question bank integration
 * with practice exercises.
 *
 * STEP 1: Add script tags before closing </body> tag
 * STEP 2: Add the JavaScript function below to your <script> section
 * STEP 3: Update exercise button rendering to use the new function
 */

// ============================================================
// STEP 2: ADD THIS FUNCTION TO YOUR JAVASCRIPT CODE
// ============================================================

/**
 * Start exercise practice using comprehensive question bank
 * Add this function near the other exercise/practice functions
 * (around line 4900 where startFocusedPractice() is defined)
 */
function startExerciseWithComprehensiveBank(exerciseType) {
    console.log(`[Exercise] Starting ${exerciseType} with comprehensive question bank`);

    // Get current student levels from three-grade system
    const { gradeCurrent, gradeTarget } = gameState.student;

    // Create enhanced integration instance
    const qbi = new window.EnhancedQuestionBankIntegration();

    // Get session plan (warmup → core → challenge)
    const sessionPlan = qbi.getPracticeSessionPlan({
        exerciseType: exerciseType,
        gradeCurrent: gradeCurrent,
        gradeTarget: gradeTarget,
        totalQuestions: 12  // Adjust as needed
    });

    // Flatten questions in order: warmup → core → challenge
    const allQuestions = [
        ...sessionPlan.warmup,
        ...sessionPlan.core,
        ...sessionPlan.challenge
    ];

    console.log(`[Exercise] Generated ${allQuestions.length} questions:`, {
        warmup: sessionPlan.warmup.length,
        core: sessionPlan.core.length,
        challenge: sessionPlan.challenge.length
    });

    // Check if we got questions
    if (allQuestions.length === 0) {
        console.warn(`[Exercise] No questions found for ${exerciseType}`);
        updateGatorMessage(
            `I don't have ${exerciseType} questions ready yet. Let's try a different exercise or practice area!`
        );
        return;
    }

    // Set up tailored mode
    if (!gameState.session.tailoredMode) {
        gameState.session.tailoredMode = {
            active: true,
            domain: null,
            questionPool: [],
            exerciseType: null
        };
    }

    // Configure tailored mode with exercise questions
    gameState.session.tailoredMode.active = true;
    gameState.session.tailoredMode.questionPool = allQuestions;
    gameState.session.tailoredMode.exerciseType = exerciseType;

    // Determine domain for this exercise
    const exerciseMap = window.exerciseTypeMap ? window.exerciseTypeMap[exerciseType] : null;
    if (exerciseMap && exerciseMap.domains && exerciseMap.domains.length > 0) {
        gameState.session.tailoredMode.domain = exerciseMap.domains[0];
    }

    // Close modal if open
    if (typeof closeDomainTips === 'function') {
        closeDomainTips();
    }

    // Show Gator encouragement message
    const domainTitle = exerciseMap ?
        (exerciseMap.domains[0] === 'decoding' ? 'Reading Skills' :
         exerciseMap.domains[0] === 'comprehension' ? 'Understanding' :
         exerciseMap.domains[0] === 'fluency' ? 'Fluency' :
         exerciseMap.domains[0] === 'math' ? 'Math' :
         exerciseMap.domains[0] === 'executive' ? 'Focus' : 'Effort') :
        exerciseType;

    showGatorMessage(
        `Let's work on ${exerciseType}! I've picked ${allQuestions.length} questions just right for where you are now (level ${gradeCurrent.toFixed(1)}). Ready to practice?`
    );

    // Start practice session after brief delay
    setTimeout(() => {
        showScreen('practiceScreen');

        // Use existing tailored question loading
        if (typeof loadNextTailoredQuestion === 'function') {
            loadNextTailoredQuestion();
        } else if (typeof loadNextQuestion === 'function') {
            loadNextQuestion();
        }
    }, 2500);
}

// ============================================================
// STEP 3: UPDATE EXERCISE BUTTON RENDERING
// ============================================================

/**
 * Find the code that renders exercise buttons in the modal
 * (Search for "modalExercisesList" or "exercises-grid")
 *
 * REPLACE the onclick handler with:
 * onclick="startExerciseWithComprehensiveBank('${ex.label}')"
 *
 * Example BEFORE:
 * ---------------------------------------------------------------------------
 * exercisesList.innerHTML = exercises.map(ex => `
 *     <button class="exercise-btn">
 *         <span class="exercise-icon">${ex.icon}</span>
 *         <span class="exercise-label">${ex.label}</span>
 *     </button>
 * `).join('');
 *
 * Example AFTER:
 * ---------------------------------------------------------------------------
 * exercisesList.innerHTML = exercises.map(ex => `
 *     <button class="exercise-btn" onclick="startExerciseWithComprehensiveBank('${ex.label}')">
 *         <span class="exercise-icon">${ex.icon}</span>
 *         <span class="exercise-label">${ex.label}</span>
 *     </button>
 * `).join('');
 */

// ============================================================
// OPTIONAL: ENHANCED TAILORED QUESTION LOADING
// ============================================================

/**
 * If you want to show progress and exercise-specific messages,
 * update the existing loadNextTailoredQuestion() function:
 *
 * Find loadNextTailoredQuestion() function (around line 4972)
 * and enhance the Gator message section like this:
 */

// ENHANCED VERSION (optional):
/*
function loadNextTailoredQuestion() {
    if (!gameState.session.tailoredMode || !gameState.session.tailoredMode.active) {
        loadNextQuestion();
        return;
    }

    const pool = gameState.session.tailoredMode.questionPool;
    if (!pool || pool.length === 0) {
        // Exercise complete!
        const exerciseType = gameState.session.tailoredMode.exerciseType || 'practice';
        updateGatorMessage(
            `Awesome work on ${exerciseType}! You completed all the questions. Want to try another exercise or keep practicing?`
        );
        gameState.session.tailoredMode.active = false;
        showScreen('dashboard');
        return;
    }

    // Get next question from pool
    const nextQuestion = pool.shift();

    // Update current question and render
    gameState.session.currentQuestion = nextQuestion;
    renderQuestion(nextQuestion);

    // Show progress with exercise context
    const completed = (gameState.session.tailoredMode.originalCount || 12) - pool.length;
    const total = gameState.session.tailoredMode.originalCount || 12;
    const exerciseType = gameState.session.tailoredMode.exerciseType || 'practice';

    updateGatorMessage(
        `${exerciseType} - Question ${completed} of ${total}. You're doing great!`,
        'gatorPracticeMessage'
    );
}
*/

// ============================================================
// DEBUGGING HELPERS
// ============================================================

/**
 * Add these helper functions for debugging/testing
 */

function testQuestionBankIntegration() {
    console.log('=== Testing Question Bank Integration ===');

    // Test 1: Check if question banks loaded
    if (window.ComprehensiveQuestionRegistry) {
        const stats = window.ComprehensiveQuestionRegistry.getOverallStats();
        console.log('✅ Question Registry loaded');
        console.log('   Total questions:', stats.totalQuestions);
        console.log('   By grade:', stats.byGrade);
        console.log('   By category:', stats.byCategory);
    } else {
        console.error('❌ ComprehensiveQuestionRegistry not found');
        console.log('   Make sure load-question-banks.js is loaded');
    }

    // Test 2: Check if integration classes available
    if (window.EnhancedQuestionBankIntegration) {
        console.log('✅ EnhancedQuestionBankIntegration available');
    } else {
        console.error('❌ EnhancedQuestionBankIntegration not found');
    }

    // Test 3: Check if exercise mappings loaded
    if (window.exerciseTypeMap) {
        const exerciseCount = Object.keys(window.exerciseTypeMap).length;
        console.log(`✅ Exercise type mappings loaded (${exerciseCount} types)`);
        console.log('   Available exercises:', Object.keys(window.exerciseTypeMap));
    } else {
        console.error('❌ exerciseTypeMap not found');
        console.log('   Make sure question-bank-integration.js is loaded');
    }

    // Test 4: Try selecting questions
    try {
        const qbi = new window.EnhancedQuestionBankIntegration();
        const testQuestions = qbi.selectPracticeQuestions({
            exerciseType: 'Phonics Practice',
            gradeCurrent: 1.5,
            gradeTarget: 2.5,
            count: 5
        });
        console.log(`✅ Question selection works (got ${testQuestions.length} questions)`);

        if (testQuestions.length > 0) {
            console.log('   Sample question:', testQuestions[0]);
        }
    } catch (error) {
        console.error('❌ Question selection failed:', error);
    }

    console.log('=== Test Complete ===');
}

function listAvailableExercises() {
    if (!window.exerciseTypeMap) {
        console.error('Exercise type map not loaded');
        return;
    }

    console.log('=== Available Practice Exercises ===');

    const byDomain = {};

    for (const [exerciseName, mapping] of Object.entries(window.exerciseTypeMap)) {
        const domain = mapping.domains[0];
        if (!byDomain[domain]) {
            byDomain[domain] = [];
        }
        byDomain[domain].push({
            name: exerciseName,
            category: mapping.category,
            subskills: mapping.subskills
        });
    }

    for (const [domain, exercises] of Object.entries(byDomain)) {
        console.log(`\n${domain.toUpperCase()}`);
        exercises.forEach(ex => {
            console.log(`  • ${ex.name}`);
            console.log(`    Category: ${ex.category}`);
            console.log(`    Subskills: ${ex.subskills.join(', ')}`);
        });
    }

    console.log('\n=== End of List ===');
}

// ============================================================
// USAGE IN CONSOLE
// ============================================================

/**
 * After adding all the code and loading index.html, test in browser console:
 *
 * // Test if everything loaded correctly
 * testQuestionBankIntegration()
 *
 * // See all available exercises
 * listAvailableExercises()
 *
 * // Test a specific exercise
 * startExerciseWithComprehensiveBank('Phonics Practice')
 */
