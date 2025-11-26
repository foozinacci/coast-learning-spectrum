/**
 * Learning Spectrum - Comprehensive Question Bank Loader
 *
 * This script loads all comprehensive question banks and makes them
 * available globally for the QuestionBankIntegration system.
 *
 * Usage in index.html:
 * <script src="questions/grade-K-comprehensive.js"></script>
 * <script src="questions/grade-1-comprehensive.js"></script>
 * <script src="questions/grade-2-comprehensive.js"></script>
 * <script src="questions/grade-3-comprehensive.js"></script>
 * <script src="questions/grade-4-comprehensive.js"></script>
 * <script src="questions/grade-5-comprehensive.js"></script>
 * <script src="load-question-banks.js"></script>
 */

(function() {
    'use strict';

    // ============================================================
    // COMPREHENSIVE QUESTION BANK REGISTRY
    // ============================================================

    const ComprehensiveQuestionRegistry = {
        banks: {
            K: null,
            1: null,
            2: null,
            3: null,
            4: null,
            5: null
        },

        /**
         * Register a comprehensive question bank
         */
        register(grade, questionBank) {
            const gradeKey = grade === 0 ? 'K' : grade.toString();
            this.banks[gradeKey] = questionBank;
            console.log(`[QuestionRegistry] Loaded Grade ${gradeKey} question bank`);
            this.logBankStats(gradeKey, questionBank);
        },

        /**
         * Log statistics about loaded bank
         */
        logBankStats(gradeKey, bank) {
            const stats = {
                grade: gradeKey,
                categories: {}
            };

            for (const category in bank) {
                if (Array.isArray(bank[category])) {
                    stats.categories[category] = bank[category].length;
                }
            }

            const total = Object.values(stats.categories).reduce((sum, count) => sum + count, 0);
            stats.total = total;

            console.log(`[QuestionRegistry] Grade ${gradeKey} Stats:`, stats);
        },

        /**
         * Get questions for specific grade and category
         */
        getQuestions(grade, category) {
            const gradeKey = grade === 0 ? 'K' : grade.toString();
            const bank = this.banks[gradeKey];

            if (!bank) {
                console.warn(`[QuestionRegistry] No question bank found for grade ${gradeKey}`);
                return [];
            }

            const categoryLower = category.toLowerCase();
            const questions = bank[categoryLower];

            if (!questions) {
                console.warn(`[QuestionRegistry] No ${category} questions found for grade ${gradeKey}`);
                return [];
            }

            return questions;
        },

        /**
         * Get all questions across a range of grades
         */
        getQuestionsInRange(categoryName, gradeRange) {
            const allQuestions = [];

            for (const grade of gradeRange) {
                const gradeNum = grade === 'K' ? 0 : parseInt(grade);
                const questions = this.getQuestions(gradeNum, categoryName);
                allQuestions.push(...questions);
            }

            return allQuestions;
        },

        /**
         * Search questions by criteria
         */
        searchQuestions(criteria) {
            const {
                category,
                subskill,
                gradeRange = ['K', '1', '2', '3', '4', '5'],
                difficultyMin = 0,
                difficultyMax = 5,
                limit = 100
            } = criteria;

            // Get all questions in range
            let questions = this.getQuestionsInRange(category, gradeRange);

            // Filter by subskill
            if (subskill) {
                const subskillLower = subskill.toLowerCase();
                questions = questions.filter(q =>
                    q.subskill && q.subskill.toLowerCase().includes(subskillLower)
                );
            }

            // Filter by difficulty
            questions = questions.filter(q =>
                q.difficultyBand >= difficultyMin && q.difficultyBand <= difficultyMax
            );

            // Limit results
            return questions.slice(0, limit);
        },

        /**
         * Get statistics about all loaded banks
         */
        getOverallStats() {
            const stats = {
                totalQuestions: 0,
                byGrade: {},
                byCategory: {
                    reading: 0,
                    understanding: 0,
                    fluency: 0,
                    math: 0,
                    focus: 0,
                    effort: 0
                }
            };

            for (const [grade, bank] of Object.entries(this.banks)) {
                if (!bank) continue;

                stats.byGrade[grade] = 0;

                for (const category in bank) {
                    if (Array.isArray(bank[category])) {
                        const count = bank[category].length;
                        stats.byGrade[grade] += count;
                        stats.totalQuestions += count;

                        if (stats.byCategory[category] !== undefined) {
                            stats.byCategory[category] += count;
                        }
                    }
                }
            }

            return stats;
        }
    };

    // ============================================================
    // AUTO-LOAD COMPREHENSIVE BANKS
    // ============================================================

    /**
     * Automatically detect and load comprehensive question banks
     * from the global scope
     */
    function autoLoadBanks() {
        const bankNames = [
            { name: 'gradeKComprehensive', grade: 0 },
            { name: 'grade1Comprehensive', grade: 1 },
            { name: 'grade2Comprehensive', grade: 2 },
            { name: 'grade3Comprehensive', grade: 3 },
            { name: 'grade4Comprehensive', grade: 4 },
            { name: 'grade5Comprehensive', grade: 5 }
        ];

        let loadedCount = 0;

        for (const { name, grade } of bankNames) {
            if (typeof window !== 'undefined' && window[name]) {
                ComprehensiveQuestionRegistry.register(grade, window[name]);
                loadedCount++;
            }
        }

        console.log(`[QuestionRegistry] Auto-loaded ${loadedCount} comprehensive question banks`);

        if (loadedCount > 0) {
            const stats = ComprehensiveQuestionRegistry.getOverallStats();
            console.log('[QuestionRegistry] Overall Statistics:', stats);
        }

        return loadedCount;
    }

    // ============================================================
    // ENHANCED QUESTION BANK INTEGRATION
    // ============================================================

    /**
     * Enhanced version of QuestionBankIntegration that uses the registry
     */
    class EnhancedQuestionBankIntegration {
        constructor() {
            this.registry = ComprehensiveQuestionRegistry;
        }

        /**
         * Get questions for a category across grade range
         */
        getQuestionsForCategory(category, gradeRange) {
            return this.registry.getQuestionsInRange(category, gradeRange);
        }

        /**
         * Select practice questions with comprehensive bank support
         */
        selectPracticeQuestions(params) {
            const {
                exerciseType,
                gradeCurrent,
                gradeTarget,
                count = 10,
                difficultyRange = 0.5
            } = params;

            // Get exercise mapping (from question-bank-integration.js)
            const exerciseMap = window.exerciseTypeMap?.[exerciseType];
            if (!exerciseMap) {
                console.warn(`Unknown exercise type: ${exerciseType}`);
                return [];
            }

            // Determine grade range
            const gradeRange = this.getGradeRange(gradeCurrent, gradeTarget);

            // Search for matching questions
            const questions = this.registry.searchQuestions({
                category: exerciseMap.category,
                subskill: exerciseMap.subskills[0], // Use first subskill as primary filter
                gradeRange: gradeRange,
                difficultyMin: gradeCurrent - difficultyRange,
                difficultyMax: gradeCurrent + difficultyRange + 0.5,
                limit: count * 3 // Get more than needed for better selection
            });

            // Filter by all subskills
            const filtered = questions.filter(q =>
                exerciseMap.subskills.some(skill =>
                    q.subskill && q.subskill.toLowerCase().includes(skill.toLowerCase())
                )
            );

            // Sort by distance from current level
            const sorted = filtered.sort((a, b) => {
                const aDist = Math.abs(a.difficultyBand - gradeCurrent);
                const bDist = Math.abs(b.difficultyBand - gradeCurrent);
                return aDist - bDist;
            });

            // Convert to existing format
            const selected = sorted.slice(0, count);
            return selected.map(q => this.convertToExistingFormat(q, exerciseMap));
        }

        /**
         * Get grade range helper
         */
        getGradeRange(gradeCurrent, gradeTarget) {
            const min = Math.floor(Math.max(0, gradeCurrent - 0.5));
            const max = Math.ceil(Math.min(5, gradeTarget + 0.5));

            const range = [];
            for (let g = min; g <= max; g++) {
                range.push(g === 0 ? 'K' : g.toString());
            }
            return range;
        }

        /**
         * Convert comprehensive format to existing format
         */
        convertToExistingFormat(comprehensiveQ, exerciseMap) {
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
                    }.${comprehensiveQ.subskill?.toLowerCase().replace(/ /g, '_') || 'general'}`
                ],
                _originalId: comprehensiveQ.id
            };
        }

        /**
         * Get practice session plan
         */
        getPracticeSessionPlan(params) {
            const {
                exerciseType,
                gradeCurrent,
                gradeTarget,
                totalQuestions = 15
            } = params;

            const warmupCount = Math.ceil(totalQuestions * 0.2);
            const coreCount = Math.ceil(totalQuestions * 0.6);
            const challengeCount = totalQuestions - warmupCount - coreCount;

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
    // INITIALIZE ON LOAD
    // ============================================================

    if (typeof window !== 'undefined') {
        // Auto-load banks when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                setTimeout(autoLoadBanks, 100);
            });
        } else {
            setTimeout(autoLoadBanks, 100);
        }

        // Make available globally
        window.ComprehensiveQuestionRegistry = ComprehensiveQuestionRegistry;
        window.EnhancedQuestionBankIntegration = EnhancedQuestionBankIntegration;

        // Override the basic QuestionBankIntegration if available
        if (window.QuestionBankIntegration) {
            window.QuestionBankIntegration = EnhancedQuestionBankIntegration;
        }

        console.log('[QuestionRegistry] Question bank loader initialized');
    }

    // For Node.js/module environments
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            ComprehensiveQuestionRegistry,
            EnhancedQuestionBankIntegration,
            autoLoadBanks
        };
    }
})();
