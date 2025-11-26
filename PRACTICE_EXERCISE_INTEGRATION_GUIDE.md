# Practice Exercise Integration Guide

## Overview

This guide explains how to integrate the comprehensive question bank (8,444 questions) with the practice exercise system in Learning Spectrum.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   USER CLICKS EXERCISE                          │
│          (e.g., "Phonics Practice" button)                      │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         startExercisePractice(exerciseType, current, target)    │
│         (from question-bank-integration.js)                     │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         EnhancedQuestionBankIntegration                         │
│         (from load-question-banks.js)                           │
│                                                                 │
│         1. Maps exercise type to category/subskills             │
│         2. Determines grade range (Current → Target)            │
│         3. Searches ComprehensiveQuestionRegistry               │
│         4. Filters by difficulty, subskill                      │
│         5. Converts to existing format                          │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         ComprehensiveQuestionRegistry                           │
│         (from load-question-banks.js)                           │
│                                                                 │
│         Stores all loaded comprehensive question banks:         │
│         - Grade K: 1,442 questions                              │
│         - Grade 1: 1,442 questions                              │
│         - Grade 2: 1,390 questions                              │
│         - Grade 3: 1,390 questions                              │
│         - Grade 4: 1,390 questions                              │
│         - Grade 5: 1,390 questions                              │
│         TOTAL: 8,444 questions                                  │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│         Returns question pool to index.html                     │
│         Starts focused practice session                         │
└─────────────────────────────────────────────────────────────────┘
```

## Files Created

1. **`question-bank-integration.js`**
   - Defines exercise type mappings
   - Provides QuestionBankIntegration class
   - Converts between comprehensive and existing formats
   - Creates practice session plans (warmup → core → challenge)

2. **`load-question-banks.js`**
   - Auto-loads all comprehensive question banks
   - Provides ComprehensiveQuestionRegistry for centralized access
   - Enhanced integration with search/filter capabilities
   - Logs statistics about loaded banks

3. **`PRACTICE_EXERCISE_INTEGRATION_GUIDE.md`** (this file)
   - Complete integration instructions
   - Code examples
   - Testing procedures

## Step-by-Step Integration

### Step 1: Add Script Tags to `index.html`

Add these script tags **before the closing `</body>` tag** but **after** the existing JavaScript code:

```html
    <!-- Existing code above... -->

    <!-- Load comprehensive question banks -->
    <script src="questions/grade-K-comprehensive.js"></script>
    <script src="questions/grade-1-comprehensive.js"></script>
    <script src="questions/grade-2-comprehensive.js"></script>
    <script src="questions/grade-3-comprehensive.js"></script>
    <script src="questions/grade-4-comprehensive.js"></script>
    <script src="questions/grade-5-comprehensive.js"></script>

    <!-- Load integration layer -->
    <script src="question-bank-integration.js"></script>
    <script src="load-question-banks.js"></script>

</body>
</html>
```

### Step 2: Update Exercise Buttons to Use Integration

Find the section where exercise buttons are rendered (in the modal or wherever practice exercises are shown). Update the onclick handlers:

**Current code** (example):
```javascript
// Render exercises in modal
const exercisesList = document.getElementById('modalExercisesList');
exercisesList.innerHTML = exercises.map(ex => `
    <button class="exercise-btn">
        <span class="exercise-icon">${ex.icon}</span>
        <span class="exercise-label">${ex.label}</span>
    </button>
`).join('');
```

**Updated code** (with integration):
```javascript
// Render exercises in modal with integration
const exercisesList = document.getElementById('modalExercisesList');
exercisesList.innerHTML = exercises.map(ex => `
    <button class="exercise-btn" onclick="startExerciseWithComprehensiveBank('${ex.label}')">
        <span class="exercise-icon">${ex.icon}</span>
        <span class="exercise-label">${ex.label}</span>
    </button>
`).join('');
```

### Step 3: Add Integration Function

Add this function to your JavaScript code in `index.html` (around where `startFocusedPractice()` is defined):

```javascript
/**
 * Start exercise practice using comprehensive question bank
 */
function startExerciseWithComprehensiveBank(exerciseType) {
    // Get current student levels
    const { gradeCurrent, gradeTarget } = gameState.student;

    // Create integration instance
    const qbi = new EnhancedQuestionBankIntegration();

    // Get session plan (warmup → core → challenge)
    const sessionPlan = qbi.getPracticeSessionPlan({
        exerciseType: exerciseType,
        gradeCurrent: gradeCurrent,
        gradeTarget: gradeTarget,
        totalQuestions: 12
    });

    // Flatten questions in order
    const allQuestions = [
        ...sessionPlan.warmup,
        ...sessionPlan.core,
        ...sessionPlan.challenge
    ];

    // Check if we got questions
    if (allQuestions.length === 0) {
        updateGatorMessage(`I don't have ${exerciseType} questions ready yet. Let's try a different exercise!`);
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

    gameState.session.tailoredMode.active = true;
    gameState.session.tailoredMode.questionPool = allQuestions;
    gameState.session.tailoredMode.exerciseType = exerciseType;

    // Close modal
    closeDomainTips();

    // Show Gator message
    const exerciseMap = window.exerciseTypeMap[exerciseType];
    const domainTitle = exerciseMap ?
        (exerciseMap.domains[0] === 'decoding' ? 'Reading Skills' :
         exerciseMap.domains[0] === 'comprehension' ? 'Understanding' :
         exerciseMap.domains[0] === 'fluency' ? 'Fluency' :
         exerciseMap.domains[0] === 'math' ? 'Math' :
         exerciseMap.domains[0] === 'executive' ? 'Focus' : 'Effort') :
        exerciseType;

    showGatorMessage(`Let's work on ${exerciseType}! I've picked ${allQuestions.length} questions just right for your level. Ready?`);

    // Start practice session
    setTimeout(() => {
        showScreen('practiceScreen');
        loadNextTailoredQuestion();
    }, 2000);
}
```

### Step 4: Update `loadNextTailoredQuestion()` Function

Find the `loadNextTailoredQuestion()` function and ensure it supports the exercise type tracking:

```javascript
function loadNextTailoredQuestion() {
    if (!gameState.session.tailoredMode || !gameState.session.tailoredMode.active) {
        // Fall back to regular question loading
        loadNextQuestion();
        return;
    }

    const pool = gameState.session.tailoredMode.questionPool;
    if (!pool || pool.length === 0) {
        // No more tailored questions - end session or fall back
        updateGatorMessage('Great work on this exercise! Want to try another one or keep going?');
        gameState.session.tailoredMode.active = false;
        loadNextQuestion();
        return;
    }

    // Get next question from pool
    const nextQuestion = pool.shift(); // Remove from front of pool

    // Update current question and render
    gameState.session.currentQuestion = nextQuestion;
    renderQuestion(nextQuestion);

    // Show progress message
    const remaining = pool.length;
    const exerciseType = gameState.session.tailoredMode.exerciseType || 'practice';
    updateGatorMessage(
        `${exerciseType} - ${remaining} more questions to go! You're doing great!`,
        'gatorPracticeMessage'
    );
}
```

## Exercise Type Mappings

The integration supports the following exercise types out of the box:

### Reading/Decoding Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Phonics Practice** | Reading | Letter recognition, Letter sounds, Phonics patterns |
| **Sight Words** | Reading | Sight words, High-frequency words |
| **Word Families** | Reading | Word families, CVC words, Rhyming |
| **Rhyming Games** | Reading | Rhyming, Phonological awareness |

### Understanding/Comprehension Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Story Retelling** | Understanding | Story sequence, Story elements, Main idea |
| **Main Idea Practice** | Understanding | Main idea, Key details, Summarizing |
| **Inference Games** | Understanding | Making inferences, Drawing conclusions |
| **Prediction Activities** | Understanding | Making predictions, Story comprehension |

### Fluency Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Timed Readings** | Fluency | Reading speed, Word recognition speed |
| **Echo Reading** | Fluency | Repeated reading, Phrasing |
| **Choral Reading** | Fluency | Phrasing, Expression |
| **Poetry Performance** | Fluency | Expression, Phrasing |

### Math Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Number Games** | Math | Number recognition, Counting |
| **Mental Math** | Math | Addition, Subtraction, Mental computation |
| **Word Problems** | Math | Problem solving, Word problems |

### Focus Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Attention Tasks** | Focus | Staying on task, Sustained attention |
| **Task Completion** | Focus | Finishing work, Following through |

### Effort Exercises

| Exercise Type | Question Categories | Subskills |
|---------------|-------------------|-----------|
| **Challenge Practice** | Effort | Trying hard tasks, Persisting |
| **Growth Mindset** | Effort | Asking for help, Being brave |

## Three-Grade System Integration

The integration automatically uses the three-grade system:

```javascript
// Example: Student is enrolled in Grade 2, currently at 1.5 level, targeting 3.0

gradeCurrent = 1.5
gradeTarget = 3.0

// The system will:
// 1. Determine grade range: 1, 2, 3 (from floor(1.5 - 0.5) to ceil(3.0 + 0.5))
// 2. Pull questions from Grades 1, 2, and 3
// 3. Filter by difficulty: 1.0 to 2.5 (current ± range + buffer)
// 4. Create warmup/core/challenge progression:
//    - Warmup: 1.2 difficulty (slightly easier)
//    - Core: 1.5 difficulty (at level)
//    - Challenge: 1.8 difficulty (slightly harder)
```

## Testing the Integration

### Test 1: Verify Question Banks Loaded

Open the browser console after loading `index.html`. You should see:

```
[QuestionRegistry] Loaded Grade K question bank
[QuestionRegistry] Grade K Stats: { grade: 'K', categories: { reading: 52, understanding: 270, fluency: 330, math: 270, focus: 200, effort: 320 }, total: 1442 }
[QuestionRegistry] Loaded Grade 1 question bank
...
[QuestionRegistry] Auto-loaded 6 comprehensive question banks
[QuestionRegistry] Overall Statistics: { totalQuestions: 8444, byGrade: {...}, byCategory: {...} }
```

### Test 2: Test Exercise Button

1. Open the diagnostic radar modal (click on a domain)
2. Click on "Phonics Practice" button
3. You should see:
   - Gator message: "Let's work on Phonics Practice! I've picked 12 questions..."
   - Screen transitions to practice screen
   - Questions appear that match the exercise type

### Test 3: Verify Question Quality

During practice, check that:
- Questions are appropriate for the student's level
- Questions progress from easier (warmup) to harder (challenge)
- All questions relate to the exercise type (e.g., Phonics Practice shows letter/sound questions)

### Test 4: Check Console for Errors

Monitor the console for:
- No "unknown exercise type" warnings
- No "no questions found" errors
- Successful question selection logs

## Troubleshooting

### Problem: "Unknown exercise type" warning

**Cause**: The exercise type name doesn't match the mappings in `exerciseTypeMap`

**Solution**: Check spelling in the button label. It must exactly match one of:
- Phonics Practice
- Sight Words
- Word Families
- Rhyming Games
- etc. (see Exercise Type Mappings above)

### Problem: No questions returned (empty pool)

**Cause**: No questions match the criteria (grade range + subskill + difficulty)

**Solutions**:
1. Check that comprehensive question banks loaded (see Test 1)
2. Verify the question banks have questions for that category/subskill
3. Widen the difficulty range in `selectPracticeQuestions()`

### Problem: Questions too easy or too hard

**Cause**: Difficulty range or grade range calculation issue

**Solution**: Adjust parameters in `getPracticeSessionPlan()`:
```javascript
// Make it easier (more warmup, less challenge)
warmup: this.selectPracticeQuestions({
    exerciseType,
    gradeCurrent: gradeCurrent - 0.5,  // More below current level
    gradeTarget,
    count: Math.ceil(totalQuestions * 0.3),  // 30% warmup (was 20%)
    difficultyRange: 0.4  // Wider range
}),
```

### Problem: Script load order issues

**Cause**: Scripts loaded in wrong order

**Solution**: Ensure this exact order:
1. Comprehensive question banks (grade-K-comprehensive.js, etc.)
2. question-bank-integration.js
3. load-question-banks.js

## Advanced: Adding Custom Exercise Types

To add a new exercise type:

### 1. Add to `exerciseTypeMap` in `question-bank-integration.js`:

```javascript
const exerciseTypeMap = {
    // ... existing mappings ...

    'Custom Exercise Name': {
        category: 'reading',  // or understanding, fluency, math, focus, effort
        subskills: ['Specific Skill', 'Another Skill'],
        domains: ['decoding']  // or comprehension, fluency, math, executive, effort, emotions
    }
};
```

### 2. Add to `domainTipsData` in `index.html`:

```javascript
const domainTipsData = {
    decoding: {
        // ... existing data ...
        exercises: [
            // ... existing exercises ...
            { label: 'Custom Exercise Name', icon: '🎯' }
        ]
    }
};
```

### 3. Test the new exercise

Follow Test 2 and Test 3 procedures above.

## Performance Optimization

For large question banks (8,444+ questions):

### 1. Lazy Loading

Instead of loading all banks at once, load on-demand:

```javascript
// In load-question-banks.js, add:
async function loadBankOnDemand(grade) {
    const script = document.createElement('script');
    script.src = `questions/grade-${grade}-comprehensive.js`;
    script.async = true;
    document.body.appendChild(script);

    return new Promise((resolve) => {
        script.onload = () => {
            const gradeKey = grade === 0 ? 'K' : grade.toString();
            const bankName = `grade${gradeKey}Comprehensive`;
            if (window[bankName]) {
                ComprehensiveQuestionRegistry.register(grade, window[bankName]);
                resolve();
            }
        };
    });
}
```

### 2. Question Caching

Cache recent question pools to avoid re-computation:

```javascript
// Add to EnhancedQuestionBankIntegration class:
constructor() {
    this.registry = ComprehensiveQuestionRegistry;
    this.cache = new Map();
}

selectPracticeQuestions(params) {
    const cacheKey = JSON.stringify(params);
    if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
    }

    const result = /* ...existing logic... */;
    this.cache.set(cacheKey, result);
    return result;
}
```

## Next Steps

1. ✅ **Complete integration** - Follow Steps 1-4 above
2. ✅ **Test all exercise types** - Run Tests 1-4
3. **Expand question banks** - Add more questions to reach 21,600 target
4. **Add analytics** - Track which exercises students use most
5. **Create adaptive difficulty** - Adjust questions based on performance

## Questions?

Refer to:
- `CLAUDE.md` - Overall project architecture
- `BRAND.md` - Design principles
- `COMPREHENSIVE_QUESTION_BANK_SUMMARY.md` - Question bank details

---

**Last Updated**: November 26, 2025
**Version**: 1.0.0
**Status**: Ready for integration
