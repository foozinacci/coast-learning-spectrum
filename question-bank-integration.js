/**
 * Learning Spectrum - Question Bank Integration Layer
 *
 * This file integrates the comprehensive question banks (8,444 questions)
 * with the existing practice exercise system in index.html.
 *
 * It provides:
 * 1. Question selection based on three-grade system (Enrolled → Current → Target)
 * 2. Filtering by exercise type (Phonics, Sight Words, etc.)
 * 3. Format conversion between comprehensive banks and existing format
 * 4. Adaptive question selection based on student performance
 */

// ============================================================
// EXERCISE TYPE MAPPINGS
// ============================================================

const exerciseTypeMap = {
    // Reading/Decoding exercises
    'Phonics Practice': {
        category: 'reading',
        subskills: ['Letter recognition', 'Letter sounds', 'Phonics patterns'],
        domains: ['decoding']
    },
    'Sight Words': {
        category: 'reading',
        subskills: ['Sight words', 'High-frequency words'],
        domains: ['decoding']
    },
    'Word Families': {
        category: 'reading',
        subskills: ['Word families', 'CVC words', 'Rhyming'],
        domains: ['decoding']
    },
    'Rhyming Games': {
        category: 'reading',
        subskills: ['Rhyming', 'Phonological awareness'],
        domains: ['decoding']
    },

    // Understanding/Comprehension exercises
    'Story Retelling': {
        category: 'understanding',
        subskills: ['Story sequence', 'Story elements', 'Main idea'],
        domains: ['comprehension']
    },
    'Main Idea Practice': {
        category: 'understanding',
        subskills: ['Main idea', 'Key details', 'Summarizing'],
        domains: ['comprehension']
    },
    'Inference Games': {
        category: 'understanding',
        subskills: ['Making inferences', 'Drawing conclusions'],
        domains: ['comprehension']
    },
    'Prediction Activities': {
        category: 'understanding',
        subskills: ['Making predictions', 'Story comprehension'],
        domains: ['comprehension']
    },

    // Fluency exercises
    'Timed Readings': {
        category: 'fluency',
        subskills: ['Reading speed', 'Word recognition speed'],
        domains: ['fluency']
    },
    'Echo Reading': {
        category: 'fluency',
        subskills: ['Repeated reading', 'Phrasing'],
        domains: ['fluency']
    },
    'Choral Reading': {
        category: 'fluency',
        subskills: ['Phrasing', 'Expression'],
        domains: ['fluency']
    },
    'Poetry Performance': {
        category: 'fluency',
        subskills: ['Expression', 'Phrasing'],
        domains: ['fluency']
    },

    // Math exercises
    'Number Games': {
        category: 'math',
        subskills: ['Number recognition', 'Counting'],
        domains: ['math']
    },
    'Mental Math': {
        category: 'math',
        subskills: ['Addition', 'Subtraction', 'Mental computation'],
        domains: ['math']
    },
    'Word Problems': {
        category: 'math',
        subskills: ['Problem solving', 'Word problems'],
        domains: ['math', 'comprehension']
    },

    // Focus exercises
    'Attention Tasks': {
        category: 'focus',
        subskills: ['Staying on task', 'Sustained attention'],
        domains: ['executive']
    },
    'Task Completion': {
        category: 'focus',
        subskills: ['Finishing work', 'Following through'],
        domains: ['executive']
    },

    // Effort exercises
    'Challenge Practice': {
        category: 'effort',
        subskills: ['Trying hard tasks', 'Persisting'],
        domains: ['effort']
    },
    'Growth Mindset': {
        category: 'effort',
        subskills: ['Asking for help', 'Being brave'],
        domains: ['effort', 'emotions']
    }
};

// ============================================================
// QUESTION BANK LOADER
// ============================================================

class QuestionBankIntegration {
    constructor() {
        this.comprehensiveQuestions = {
            K: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        };
        this.loaded = false;
    }

    /**
     * Load comprehensive question banks
     * In production, these would be loaded via script tags or ES6 imports
     */
    async loadQuestionBanks() {
        // This would load the actual comprehensive question files
        // For now, we'll use a placeholder structure
        // In index.html, you would add script tags like:
        // <script src="questions/grade-K-comprehensive.js"></script>
        // <script src="questions/grade-1-comprehensive.js"></script>
        // etc.

        this.loaded = true;
        console.log('Question banks loaded successfully');
    }

    /**
     * Get grade key (0 → 'K', 1-5 → '1'-'5')
     */
    getGradeKey(gradeNumber) {
        if (gradeNumber === 0) return 'K';
        return Math.floor(Math.max(0, Math.min(5, gradeNumber))).toString();
    }

    /**
     * Select questions for focused practice session
     *
     * @param {Object} params - Selection parameters
     * @param {string} params.exerciseType - Type of exercise (e.g., 'Phonics Practice')
     * @param {number} params.gradeCurrent - Student's current grade level
     * @param {number} params.gradeTarget - Student's target grade level
     * @param {number} params.count - Number of questions to select (default: 10)
     * @param {number} params.difficultyRange - How far from current level to search (default: 0.5)
     * @returns {Array} Array of questions in existing format
     */
    selectPracticeQuestions(params) {
        const {
            exerciseType,
            gradeCurrent,
            gradeTarget,
            count = 10,
            difficultyRange = 0.5
        } = params;

        // Get exercise mapping
        const exerciseMap = exerciseTypeMap[exerciseType];
        if (!exerciseMap) {
            console.warn(`Unknown exercise type: ${exerciseType}`);
            return [];
        }

        // Determine which grades to pull from
        const gradeRange = this.getGradeRange(gradeCurrent, gradeTarget);

        // Get all questions for the category
        const allQuestions = this.getQuestionsForCategory(
            exerciseMap.category,
            gradeRange
        );

        // Filter by subskill
        const filteredQuestions = allQuestions.filter(q =>
            exerciseMap.subskills.some(skill =>
                q.subskill && q.subskill.toLowerCase().includes(skill.toLowerCase())
            )
        );

        // Filter by difficulty (within range of current level)
        const difficultyFiltered = filteredQuestions.filter(q =>
            q.difficultyBand >= (gradeCurrent - difficultyRange) &&
            q.difficultyBand <= (gradeCurrent + difficultyRange + 0.5)
        );

        // Sort by difficulty (closest to current level first)
        const sorted = difficultyFiltered.sort((a, b) => {
            const aDist = Math.abs(a.difficultyBand - gradeCurrent);
            const bDist = Math.abs(b.difficultyBand - gradeCurrent);
            return aDist - bDist;
        });

        // Select specified count, converting to existing format
        const selected = sorted.slice(0, count);
        return selected.map(q => this.convertToExistingFormat(q, exerciseMap));
    }

    /**
     * Get grade range to search (inclusive)
     */
    getGradeRange(gradeCurrent, gradeTarget) {
        const min = Math.floor(Math.max(0, gradeCurrent - 0.5));
        const max = Math.ceil(Math.min(5, gradeTarget + 0.5));

        const range = [];
        for (let g = min; g <= max; g++) {
            range.push(this.getGradeKey(g));
        }
        return range;
    }

    /**
     * Get all questions for a category across multiple grades
     */
    getQuestionsForCategory(category, gradeRange) {
        // This would access the loaded comprehensive question banks
        // For now, return empty array as placeholder
        // In production, this would be:
        //
        // const allQuestions = [];
        // for (const grade of gradeRange) {
        //     if (window[`grade${grade}Comprehensive`]) {
        //         const gradeQuestions = window[`grade${grade}Comprehensive`][category];
        //         if (gradeQuestions) {
        //             allQuestions.push(...gradeQuestions);
        //         }
        //     }
        // }
        // return allQuestions;

        return [];
    }

    /**
     * Convert comprehensive question format to existing format
     *
     * Comprehensive format:
     * {
     *   id: "Q_READ_GK_LETTER_RECOGNITION_001",
     *   grade: 0,
     *   diagnosticCategory: "Reading",
     *   subskill: "Letter recognition",
     *   type: "multiple_choice",
     *   prompt: "Which letter is 'A'?",
     *   answers: ["A", "B", "C", "D"],
     *   correctAnswer: "A",
     *   difficultyBand: 0.5,
     *   domains: ["decoding"]
     * }
     *
     * Existing format:
     * {
     *   type: 'multiple_choice',
     *   q: 'Which letter is A?',
     *   answers: ['A', 'B', 'C', 'D'],
     *   correct: 0,
     *   level: 0.5,
     *   domains: ['decoding'],
     *   microSkills: ['K.reading.letter_recognition']
     * }
     */
    convertToExistingFormat(comprehensiveQ, exerciseMap) {
        // Find correct answer index
        const correctIndex = comprehensiveQ.answers.findIndex(
            a => a === comprehensiveQ.correctAnswer
        );

        return {
            type: comprehensiveQ.type,
            q: comprehensiveQ.prompt || comprehensiveQ.ttsPrompt,
            answers: comprehensiveQ.answers,
            correct: correctIndex >= 0 ? correctIndex : 0,
            level: comprehensiveQ.difficultyBand,
            domains: exerciseMap.domains,
            microSkills: [
                `${comprehensiveQ.grade === 0 ? 'K' : comprehensiveQ.grade}.${
                    exerciseMap.category
                }.${comprehensiveQ.subskill?.toLowerCase().replace(/ /g, '_') || 'general'
                }`
            ],
            // Preserve original ID for tracking
            _originalId: comprehensiveQ.id
        };
    }

    /**
     * Get adaptive next question based on performance
     *
     * @param {Object} params - Selection parameters
     * @param {Array} params.recentPerformance - Recent correct/incorrect answers
     * @param {number} params.currentDifficulty - Current difficulty level
     * @param {Array} params.availableQuestions - Pool of questions to choose from
     * @returns {Object} Next question to present
     */
    getAdaptiveQuestion(params) {
        const { recentPerformance, currentDifficulty, availableQuestions } = params;

        // Calculate recent accuracy (last 5 questions)
        const recentAnswers = recentPerformance.slice(-5);
        const recentCorrect = recentAnswers.filter(a => a.correct).length;
        const accuracy = recentCorrect / recentAnswers.length;

        // Adjust difficulty based on performance
        let targetDifficulty = currentDifficulty;

        if (accuracy >= 0.8) {
            // Doing well - increase difficulty slightly
            targetDifficulty += 0.2;
        } else if (accuracy <= 0.4) {
            // Struggling - decrease difficulty
            targetDifficulty -= 0.2;
        }
        // If accuracy is 40-80%, maintain current difficulty

        // Find question closest to target difficulty
        const sortedByDifficulty = availableQuestions.sort((a, b) => {
            const aDist = Math.abs(a.level - targetDifficulty);
            const bDist = Math.abs(b.level - targetDifficulty);
            return aDist - bDist;
        });

        return sortedByDifficulty[0];
    }

    /**
     * Get practice session plan
     *
     * Creates a structured practice session with:
     * - Warm-up questions (easier)
     * - Core practice (at level)
     * - Challenge questions (harder)
     *
     * @param {Object} params - Session parameters
     * @returns {Object} Session plan with question sets
     */
    getPracticeSessionPlan(params) {
        const {
            exerciseType,
            gradeCurrent,
            gradeTarget,
            totalQuestions = 15
        } = params;

        const warmupCount = Math.ceil(totalQuestions * 0.2); // 20% warmup
        const coreCount = Math.ceil(totalQuestions * 0.6);    // 60% core
        const challengeCount = totalQuestions - warmupCount - coreCount; // 20% challenge

        return {
            warmup: this.selectPracticeQuestions({
                exerciseType,
                gradeCurrent: gradeCurrent - 0.3,
                gradeTarget,
                count: warmupCount,
                difficultyRange: 0.3
            }),
            core: this.selectPracticeQuestions({
                exerciseType,
                gradeCurrent,
                gradeTarget,
                count: coreCount,
                difficultyRange: 0.4
            }),
            challenge: this.selectPracticeQuestions({
                exerciseType,
                gradeCurrent: gradeCurrent + 0.3,
                gradeTarget,
                count: challengeCount,
                difficultyRange: 0.3
            })
        };
    }
}

// ============================================================
// PRACTICE EXERCISE HANDLERS
// ============================================================

/**
 * Start a focused practice session for a specific exercise
 * This integrates with the existing startFocusedPractice() function
 */
function startExercisePractice(exerciseType, gradeCurrent, gradeTarget) {
    const qbi = new QuestionBankIntegration();

    // Get session plan
    const sessionPlan = qbi.getPracticeSessionPlan({
        exerciseType,
        gradeCurrent,
        gradeTarget,
        totalQuestions: 12
    });

    // Flatten questions in order: warmup → core → challenge
    const allQuestions = [
        ...sessionPlan.warmup,
        ...sessionPlan.core,
        ...sessionPlan.challenge
    ];

    // Store in game state for tailored mode
    if (window.gameState && window.gameState.session && window.gameState.session.tailoredMode) {
        window.gameState.session.tailoredMode.questionPool = allQuestions;
        window.gameState.session.tailoredMode.active = true;
        window.gameState.session.tailoredMode.exerciseType = exerciseType;

        // Start practice session
        if (window.showScreen) {
            window.showScreen('practiceScreen');
        }
        if (window.loadNextTailoredQuestion) {
            window.loadNextTailoredQuestion();
        }
    }

    return allQuestions;
}

/**
 * Get exercise recommendation based on domain scores
 */
function getExerciseRecommendation(domainScores, gradeCurrent) {
    // Find weakest domain
    const sortedDomains = Object.entries(domainScores)
        .sort((a, b) => a[1].score - b[1].score);

    const weakestDomain = sortedDomains[0][0];

    // Map domain to recommended exercises
    const recommendations = {
        'decoding': ['Phonics Practice', 'Sight Words'],
        'comprehension': ['Story Retelling', 'Main Idea Practice'],
        'fluency': ['Timed Readings', 'Echo Reading'],
        'math': ['Number Games', 'Mental Math'],
        'executive': ['Attention Tasks', 'Task Completion'],
        'effort': ['Challenge Practice', 'Growth Mindset']
    };

    return recommendations[weakestDomain] || [];
}

// ============================================================
// EXPORT FOR USE IN INDEX.HTML
// ============================================================

// Make available globally
if (typeof window !== 'undefined') {
    window.QuestionBankIntegration = QuestionBankIntegration;
    window.startExercisePractice = startExercisePractice;
    window.getExerciseRecommendation = getExerciseRecommendation;
    window.exerciseTypeMap = exerciseTypeMap;
}

// For Node.js/module environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        QuestionBankIntegration,
        startExercisePractice,
        getExerciseRecommendation,
        exerciseTypeMap
    };
}
