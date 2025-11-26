/**
 * Learning Spectrum - Master Question Loader
 * Loads all K-5 questions for the diagnostic system
 */

// Import all grade-level question sets
const gradeKQuestions = require('./grade-K-questions.js');
const grade1Questions = require('./grade-1-questions.js');
const grade2Questions = require('./grade-2-questions.js');
const grade3Questions = require('./grade-3-questions.js');
const grade4Questions = require('./grade-4-questions.js');
const grade5Questions = require('./grade-5-questions.js');

/**
 * All questions organized by grade
 */
const allQuestions = {
  K: gradeKQuestions,
  1: grade1Questions,
  2: grade2Questions,
  3: grade3Questions,
  4: grade4Questions,
  5: grade5Questions
};

/**
 * Get questions for a specific grade
 * @param {number|string} grade - Grade level (0-5 or 'K'-'5')
 * @returns {Object} Question set for that grade
 */
function getQuestionsForGrade(grade) {
  const key = grade === 0 || grade === 'K' || grade === 'k' ? 'K' : String(grade);
  return allQuestions[key] || null;
}

/**
 * Get questions for a specific grade and category
 * @param {number|string} grade - Grade level
 * @param {string} category - 'reading', 'understanding', 'fluency', 'math', 'focus', 'effort'
 * @returns {Array} Questions for that grade and category
 */
function getQuestionsByCategory(grade, category) {
  const gradeQuestions = getQuestionsForGrade(grade);
  if (!gradeQuestions) return [];
  return gradeQuestions[category] || [];
}

/**
 * Get questions filtered by difficulty band
 * @param {number|string} grade - Grade level
 * @param {number} minDifficulty - Minimum difficulty
 * @param {number} maxDifficulty - Maximum difficulty
 * @returns {Array} Filtered questions
 */
function getQuestionsByDifficulty(grade, minDifficulty, maxDifficulty) {
  const gradeQuestions = getQuestionsForGrade(grade);
  if (!gradeQuestions) return [];

  const allQs = [];
  Object.values(gradeQuestions).forEach(categoryQs => {
    allQs.push(...categoryQs);
  });

  return allQs.filter(q =>
    q.difficultyBand >= minDifficulty && q.difficultyBand <= maxDifficulty
  );
}

/**
 * Get preference questions (no wrong answers) for customization
 * @param {number|string} grade - Grade level
 * @returns {Array} Preference questions
 */
function getPreferenceQuestions(grade) {
  const gradeQuestions = getQuestionsForGrade(grade);
  if (!gradeQuestions) return [];

  const allQs = [];
  Object.values(gradeQuestions).forEach(categoryQs => {
    allQs.push(...categoryQs);
  });

  return allQs.filter(q => q.isPreferenceQuestion === true);
}

/**
 * Get questions by domain for targeted practice
 * @param {number|string} grade - Grade level
 * @param {string} domain - Domain to filter by
 * @returns {Array} Questions tagged with that domain
 */
function getQuestionsByDomain(grade, domain) {
  const gradeQuestions = getQuestionsForGrade(grade);
  if (!gradeQuestions) return [];

  const allQs = [];
  Object.values(gradeQuestions).forEach(categoryQs => {
    allQs.push(...categoryQs);
  });

  return allQs.filter(q => q.domains && q.domains.includes(domain));
}

/**
 * Get total question count statistics
 * @returns {Object} Statistics about question bank
 */
function getStatistics() {
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

  Object.entries(allQuestions).forEach(([grade, gradeQs]) => {
    let gradeTotal = 0;
    Object.entries(gradeQs).forEach(([category, questions]) => {
      const count = questions.length;
      gradeTotal += count;
      stats.byCategory[category] += count;
    });
    stats.byGrade[grade] = gradeTotal;
    stats.totalQuestions += gradeTotal;
  });

  return stats;
}

// Exports
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    allQuestions,
    getQuestionsForGrade,
    getQuestionsByCategory,
    getQuestionsByDifficulty,
    getPreferenceQuestions,
    getQuestionsByDomain,
    getStatistics
  };
}
