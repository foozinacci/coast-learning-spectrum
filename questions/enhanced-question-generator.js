/**
 * Enhanced Question Generator for Learning Spectrum
 * Generates balanced questions across 6 domains with 75%+ uniqueness
 *
 * Domains:
 * 1. Reading (Decoding)
 * 2. Math
 * 3. Understanding (Comprehension)
 * 4. Focus/Planning (Executive)
 * 5. Fluency
 * 6. Effort/Emotions
 */

const EnhancedQuestionGenerator = {
    // Domain distribution targets (should sum to 100%)
    domainDistribution: {
        'decoding': 20,      // Reading skills
        'math': 20,          // Math operations
        'comprehension': 20, // Understanding
        'executive': 15,     // Focus/Planning
        'fluency': 15,       // Reading fluency
        'emotions': 10       // Effort/Emotions
    },

    /**
     * Generate a balanced question set for a specific grade level
     * @param {number} fineGrade - Fine-grained grade (e.g., 2.3)
     * @param {number} count - Number of questions to generate
     * @param {object} existingQuestions - Existing question banks
     * @returns {array} - Array of questions
     */
    generateBalancedSet: function(fineGrade, count, existingQuestions) {
        const { grade, sublevel } = this.parseFineGrade(fineGrade);
        const questions = [];

        // Calculate target count per domain
        const domainTargets = {};
        Object.keys(this.domainDistribution).forEach(domain => {
            domainTargets[domain] = Math.round((this.domainDistribution[domain] / 100) * count);
        });

        // Adjust for rounding errors
        const totalAllocated = Object.values(domainTargets).reduce((a, b) => a + b, 0);
        if (totalAllocated < count) {
            domainTargets['decoding'] += (count - totalAllocated);
        }

        // Generate questions for each domain
        Object.keys(domainTargets).forEach(domain => {
            const domainCount = domainTargets[domain];
            const domainQuestions = this.generateDomainQuestions(
                domain,
                grade,
                sublevel,
                domainCount,
                existingQuestions
            );
            questions.push(...domainQuestions);
        });

        // Shuffle questions using Fisher-Yates
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }

        return questions;
    },

    /**
     * Generate questions for a specific domain
     * @param {string} domain - Domain name
     * @param {number} grade - Grade level (0-5)
     * @param {number} sublevel - Sub-level (0-9)
     * @param {number} count - Number of questions
     * @param {object} existingQuestions - Existing question banks
     * @returns {array} - Questions for this domain
     */
    generateDomainQuestions: function(domain, grade, sublevel, count, existingQuestions) {
        const questions = [];

        // Use existing questions first if available
        const bankKey = `grade${grade === 0 ? 'K' : grade}Comprehensive`;
        const bank = existingQuestions[bankKey];

        if (bank) {
            // Filter questions by domain
            let domainQuestions = [];

            // Reading domain from bank
            if (domain === 'decoding' && bank.reading) {
                domainQuestions = bank.reading.filter(q => q.domains?.includes('decoding'));
            }
            // Math domain
            else if (domain === 'math' && bank.math) {
                domainQuestions = bank.math.filter(q => q.domains?.includes('math'));
            }
            // Comprehension
            else if (domain === 'comprehension' && bank.reading) {
                domainQuestions = bank.reading.filter(q =>
                    q.domains?.includes('comprehension') || q.subskill?.includes('comprehension')
                );
            }
            // Executive/Focus questions
            else if (domain === 'executive' && bank.executive) {
                domainQuestions = bank.executive;
            }
            // Fluency
            else if (domain === 'fluency' && bank.reading) {
                domainQuestions = bank.reading.filter(q => q.domains?.includes('fluency'));
            }
            // Emotions
            else if (domain === 'emotions' && bank.emotions) {
                domainQuestions = bank.emotions;
            }

            // Randomly select from available questions
            if (domainQuestions.length > 0) {
                for (let i = 0; i < count && i < domainQuestions.length; i++) {
                    const idx = Math.floor(Math.random() * domainQuestions.length);
                    questions.push(domainQuestions[idx]);
                }
            }
        }

        // Generate synthetic questions if we don't have enough
        while (questions.length < count) {
            const syntheticQ = this.generateSyntheticQuestion(domain, grade, sublevel);
            questions.push(syntheticQ);
        }

        return questions;
    },

    /**
     * Generate a synthetic question when bank is insufficient
     * @param {string} domain - Domain name
     * @param {number} grade - Grade level
     * @param {number} sublevel - Sub-level
     * @returns {object} - Generated question
     */
    generateSyntheticQuestion: function(domain, grade, sublevel) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);
        const id = `SYNTHETIC_${domain.toUpperCase()}_G${grade}_${sublevel}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Domain-specific generators
        if (domain === 'decoding') {
            return this.generateReadingQuestion(grade, sublevel, id);
        } else if (domain === 'math') {
            return this.generateMathQuestion(grade, sublevel, id);
        } else if (domain === 'comprehension') {
            return this.generateComprehensionQuestion(grade, sublevel, id);
        } else if (domain === 'executive') {
            return this.generateExecutiveQuestion(grade, sublevel, id);
        } else if (domain === 'fluency') {
            return this.generateFluencyQuestion(grade, sublevel, id);
        } else if (domain === 'emotions') {
            return this.generateEmotionQuestion(grade, sublevel, id);
        }

        // Fallback
        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: domain,
            type: 'multiple_choice',
            prompt: 'Practice question',
            answers: ['A', 'B', 'C', 'D'],
            correctAnswer: 'A',
            domains: [domain],
            difficultyBand: fineGrade
        };
    },

    /**
     * Generate a reading/decoding question
     */
    generateReadingQuestion: function(grade, sublevel, id) {
        const templates = [
            // Letter recognition (K-1)
            {
                minGrade: 0, maxGrade: 1.5,
                generate: () => {
                    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
                    const target = letters[Math.floor(Math.random() * letters.length)];
                    const distractors = letters.filter(l => l !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
                    return {
                        prompt: `Which letter is '${target}'?`,
                        answers: [target, ...distractors].sort(() => 0.5 - Math.random()),
                        correctAnswer: target,
                        subskill: 'Letter recognition'
                    };
                }
            },
            // Short vowel words (K-2)
            {
                minGrade: 0.5, maxGrade: 2.5,
                generate: () => {
                    const words = ['cat', 'dog', 'sun', 'hat', 'bed', 'pig', 'bus', 'log', 'net', 'sit'];
                    const target = words[Math.floor(Math.random() * words.length)];
                    const distractors = words.filter(w => w !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
                    return {
                        prompt: `Which word has a short vowel: "${target}"?`,
                        answers: [target, ...distractors].sort(() => 0.5 - Math.random()),
                        correctAnswer: target,
                        subskill: 'Short vowels'
                    };
                }
            },
            // Sight words (1-3)
            {
                minGrade: 1.0, maxGrade: 3.5,
                generate: () => {
                    const words = ['the', 'and', 'said', 'have', 'they', 'where', 'what', 'there', 'some', 'when'];
                    const target = words[Math.floor(Math.random() * words.length)];
                    const distractors = words.filter(w => w !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
                    return {
                        prompt: `Read this sight word: "${target}"`,
                        answers: [target, ...distractors].sort(() => 0.5 - Math.random()),
                        correctAnswer: target,
                        subskill: 'Sight words'
                    };
                }
            },
            // Long vowels (2-4)
            {
                minGrade: 2.0, maxGrade: 4.5,
                generate: () => {
                    const words = ['cake', 'make', 'bike', 'like', 'home', 'rope', 'cute', 'tube', 'tree', 'see'];
                    const target = words[Math.floor(Math.random() * words.length)];
                    const distractors = words.filter(w => w !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
                    return {
                        prompt: `Which word has a long vowel: "${target}"?`,
                        answers: [target, ...distractors].sort(() => 0.5 - Math.random()),
                        correctAnswer: target,
                        subskill: 'Long vowels'
                    };
                }
            }
        ];

        const fineGrade = parseFloat(`${grade}.${sublevel}`);
        const validTemplates = templates.filter(t => fineGrade >= t.minGrade && fineGrade <= t.maxGrade);
        const template = validTemplates.length > 0
            ? validTemplates[Math.floor(Math.random() * validTemplates.length)]
            : templates[templates.length - 1];

        const generated = template.generate();

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Reading',
            subskill: generated.subskill,
            type: 'multiple_choice',
            prompt: generated.prompt,
            answers: generated.answers,
            correctAnswer: generated.correctAnswer,
            domains: ['decoding'],
            difficultyBand: fineGrade,
            synthetic: true
        };
    },

    /**
     * Generate a math question
     */
    generateMathQuestion: function(grade, sublevel, id) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);
        let prompt, answers, correctAnswer, subskill;

        if (fineGrade < 1.0) {
            // Kindergarten: Counting and basic addition
            const num1 = Math.floor(Math.random() * 5) + 1;
            const num2 = Math.floor(Math.random() * 3) + 1;
            const sum = num1 + num2;
            prompt = `What is ${num1} + ${num2}?`;
            correctAnswer = sum.toString();
            answers = [sum, sum + 1, sum - 1, sum + 2].sort(() => 0.5 - Math.random()).map(String);
            subskill = 'Addition within 10';
        } else if (fineGrade < 2.0) {
            // Grade 1: Addition/subtraction within 20
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const isAdd = Math.random() > 0.5;
            if (isAdd) {
                const sum = num1 + num2;
                prompt = `${num1} + ${num2} = ?`;
                correctAnswer = sum.toString();
                answers = [sum, sum + 1, sum - 1, sum + 3].sort(() => 0.5 - Math.random()).map(String);
                subskill = 'Addition within 20';
            } else {
                const larger = Math.max(num1, num2);
                const smaller = Math.min(num1, num2);
                const diff = larger - smaller;
                prompt = `${larger} - ${smaller} = ?`;
                correctAnswer = diff.toString();
                answers = [diff, diff + 1, diff - 1, diff + 2].filter(n => n >= 0).sort(() => 0.5 - Math.random()).map(String);
                subskill = 'Subtraction within 20';
            }
        } else if (fineGrade < 3.0) {
            // Grade 2: Addition/subtraction within 100
            const num1 = Math.floor(Math.random() * 50) + 10;
            const num2 = Math.floor(Math.random() * 40) + 5;
            const isAdd = Math.random() > 0.5;
            if (isAdd) {
                const sum = num1 + num2;
                prompt = `${num1} + ${num2} = ?`;
                correctAnswer = sum.toString();
                answers = [sum, sum + 5, sum - 5, sum + 10].sort(() => 0.5 - Math.random()).map(String);
                subskill = 'Addition within 100';
            } else {
                const diff = num1 - num2;
                prompt = `${num1} - ${num2} = ?`;
                correctAnswer = diff.toString();
                answers = [diff, diff + 5, diff - 5, diff + 10].filter(n => n >= 0).sort(() => 0.5 - Math.random()).map(String);
                subskill = 'Subtraction within 100';
            }
        } else if (fineGrade < 4.0) {
            // Grade 3: Multiplication
            const num1 = Math.floor(Math.random() * 10) + 1;
            const num2 = Math.floor(Math.random() * 10) + 1;
            const product = num1 * num2;
            prompt = `${num1} × ${num2} = ?`;
            correctAnswer = product.toString();
            answers = [product, product + num1, product - num1, product + num2].sort(() => 0.5 - Math.random()).map(String);
            subskill = 'Multiplication within 100';
        } else {
            // Grade 4-5: Division or fractions
            const num1 = Math.floor(Math.random() * 8) + 2;
            const num2 = Math.floor(Math.random() * 6) + 2;
            const product = num1 * num2;
            prompt = `${product} ÷ ${num1} = ?`;
            correctAnswer = num2.toString();
            answers = [num2, num2 + 1, num2 - 1, num2 + 2].sort(() => 0.5 - Math.random()).map(String);
            subskill = 'Division';
        }

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Math',
            subskill: subskill,
            type: 'multiple_choice',
            prompt: prompt,
            answers: answers,
            correctAnswer: correctAnswer,
            domains: ['math'],
            difficultyBand: fineGrade,
            synthetic: true
        };
    },

    /**
     * Generate a comprehension question
     */
    generateComprehensionQuestion: function(grade, sublevel, id) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);

        const stories = [
            {
                text: "The cat sat on the mat. The cat was happy.",
                question: "Where did the cat sit?",
                answers: ["on the mat", "on the chair", "on the bed", "on the floor"],
                correctAnswer: "on the mat",
                minGrade: 0, maxGrade: 2
            },
            {
                text: "Sam went to the park. He played on the swings. He had fun!",
                question: "What did Sam do at the park?",
                answers: ["played on the swings", "read a book", "ate lunch", "took a nap"],
                correctAnswer: "played on the swings",
                minGrade: 1, maxGrade: 3
            },
            {
                text: "The dog ran fast to catch the ball. He brought it back to his owner.",
                question: "What did the dog catch?",
                answers: ["the ball", "a stick", "a frisbee", "a bone"],
                correctAnswer: "the ball",
                minGrade: 1.5, maxGrade: 3.5
            },
            {
                text: "Maya loved to read books. Every night before bed, she would read for 30 minutes. Her favorite books were about space.",
                question: "When did Maya read?",
                answers: ["before bed", "in the morning", "after school", "during lunch"],
                correctAnswer: "before bed",
                minGrade: 2, maxGrade: 4
            },
            {
                text: "The scientists discovered a new planet. It was very far away from Earth. They used a powerful telescope to see it.",
                question: "How did the scientists see the new planet?",
                answers: ["with a telescope", "with their eyes", "with binoculars", "with a camera"],
                correctAnswer: "with a telescope",
                minGrade: 3, maxGrade: 5
            }
        ];

        const validStories = stories.filter(s => fineGrade >= s.minGrade && fineGrade <= s.maxGrade);
        const story = validStories.length > 0
            ? validStories[Math.floor(Math.random() * validStories.length)]
            : stories[stories.length - 1];

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Reading',
            subskill: 'Reading comprehension',
            type: 'multiple_choice',
            passage: story.text,
            prompt: story.question,
            answers: story.answers,
            correctAnswer: story.correctAnswer,
            domains: ['comprehension'],
            difficultyBand: fineGrade,
            synthetic: true
        };
    },

    /**
     * Generate an executive function/focus question
     */
    generateExecutiveQuestion: function(grade, sublevel, id) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);

        const tasks = [
            {
                prompt: "You need to: 1) Get your backpack, 2) Put on your shoes, 3) Go outside. What do you do first?",
                answers: ["Get your backpack", "Put on your shoes", "Go outside", "Eat breakfast"],
                correctAnswer: "Get your backpack",
                subskill: "Sequencing"
            },
            {
                prompt: "If you finish your math work early, what should you do?",
                answers: ["Read a book quietly", "Talk loudly", "Run around", "Sleep"],
                correctAnswer: "Read a book quietly",
                subskill: "Planning"
            },
            {
                prompt: "You have homework in reading and math. Which should you do first?",
                answers: ["Either one is fine", "Neither", "Watch TV first", "Play games first"],
                correctAnswer: "Either one is fine",
                subskill: "Task prioritization"
            },
            {
                prompt: "How can you remember to bring your library book back to school?",
                answers: ["Put it in your backpack now", "Just try to remember", "Don't worry about it", "Ask someone else"],
                correctAnswer: "Put it in your backpack now",
                subskill: "Memory strategies"
            }
        ];

        const task = tasks[Math.floor(Math.random() * tasks.length)];

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Executive Function',
            subskill: task.subskill,
            type: 'multiple_choice',
            prompt: task.prompt,
            answers: task.answers,
            correctAnswer: task.correctAnswer,
            domains: ['executive'],
            difficultyBand: fineGrade,
            synthetic: true
        };
    },

    /**
     * Generate a fluency question
     */
    generateFluencyQuestion: function(grade, sublevel, id) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);

        const sentences = [
            { text: "The cat sat.", words: 3, grade: 0.5 },
            { text: "I see a big dog.", words: 5, grade: 1.0 },
            { text: "The boy ran to the park.", words: 6, grade: 1.5 },
            { text: "My sister likes to read books about animals.", words: 8, grade: 2.0 },
            { text: "Yesterday, we went to the museum and saw dinosaur fossils.", words: 10, grade: 3.0 },
            { text: "The astronaut carefully examined the mysterious rock samples from Mars.", words: 10, grade: 4.0 }
        ];

        const validSentences = sentences.filter(s => Math.abs(s.grade - fineGrade) < 1.5);
        const sentence = validSentences.length > 0
            ? validSentences[Math.floor(Math.random() * validSentences.length)]
            : sentences[Math.floor(sentences.length / 2)];

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Reading',
            subskill: 'Reading fluency',
            type: 'read_aloud',
            prompt: `Read this sentence: "${sentence.text}"`,
            passage: sentence.text,
            expectedWords: sentence.words,
            domains: ['fluency'],
            difficultyBand: fineGrade,
            synthetic: true,
            // Note: In actual implementation, would need timer and voice recording
            answers: ['Read aloud', 'Skip'],
            correctAnswer: 'Read aloud'
        };
    },

    /**
     * Generate an emotion/effort question
     */
    generateEmotionQuestion: function(grade, sublevel, id) {
        const fineGrade = parseFloat(`${grade}.${sublevel}`);

        const scenarios = [
            {
                prompt: "You tried really hard on a problem but got it wrong. How do you feel?",
                answers: [
                    "💪 Proud I tried!",
                    "😢 Sad",
                    "😠 Angry",
                    "😐 Nothing"
                ],
                correctAnswer: "💪 Proud I tried!",
                feedback: "Trying hard is what matters most! Mistakes help us learn."
            },
            {
                prompt: "Your friend is having trouble with their work. What can you do?",
                answers: [
                    "❤️ Offer to help",
                    "😏 Laugh at them",
                    "😶 Ignore them",
                    "😤 Get annoyed"
                ],
                correctAnswer: "❤️ Offer to help",
                feedback: "Helping friends is kind and shows empathy!"
            },
            {
                prompt: "You finished all your work early. What's a good choice?",
                answers: [
                    "📚 Help others or read",
                    "💬 Talk loudly",
                    "😴 Sleep",
                    "🏃 Run around"
                ],
                correctAnswer: "📚 Help others or read",
                feedback: "Great job being productive and considerate!"
            }
        ];

        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        return {
            id: id,
            grade: fineGrade,
            diagnosticCategory: 'Social-Emotional',
            subskill: 'Emotional awareness',
            type: 'multiple_choice',
            prompt: scenario.prompt,
            answers: scenario.answers,
            correctAnswer: scenario.correctAnswer,
            feedback: scenario.feedback,
            domains: ['emotions'],
            difficultyBand: fineGrade,
            synthetic: true,
            isPreferenceQuestion: false // These count toward scoring but teach SEL
        };
    },

    /**
     * Parse fine grade into components
     */
    parseFineGrade: function(fineGrade) {
        const grade = Math.floor(fineGrade);
        const sublevel = Math.round((fineGrade - grade) * 10);
        return { grade, sublevel };
    },

    /**
     * Get statistics on generated question set
     * @param {array} questions - Array of questions
     * @returns {object} - Statistics
     */
    getSetStatistics: function(questions) {
        const domainCounts = {};
        const uniqueIds = new Set();

        questions.forEach(q => {
            // Count domains
            (q.domains || []).forEach(domain => {
                domainCounts[domain] = (domainCounts[domain] || 0) + 1;
            });

            // Track unique IDs
            uniqueIds.add(q.id);
        });

        return {
            total: questions.length,
            unique: uniqueIds.size,
            uniquePercent: Math.round((uniqueIds.size / questions.length) * 100),
            domainCounts: domainCounts,
            synthetic: questions.filter(q => q.synthetic).length,
            fromBank: questions.filter(q => !q.synthetic).length
        };
    }
};

// Export for use in main app
if (typeof window !== 'undefined') {
    window.EnhancedQuestionGenerator = EnhancedQuestionGenerator;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EnhancedQuestionGenerator;
}
