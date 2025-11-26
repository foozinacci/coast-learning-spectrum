# Learning Spectrum - Question Bank

## Overview

This directory contains comprehensive K-5 question sets aligned with NYS Next Generation ELA & Math Standards.

## Structure

```
questions/
├── grade-K-questions.js   # Kindergarten (96 questions)
├── grade-1-questions.js   # Grade 1 (96 questions)
├── grade-2-questions.js   # Grade 2 (96 questions)
├── grade-3-questions.js   # Grade 3 (96 questions)
├── grade-4-questions.js   # Grade 4 (96 questions)
├── grade-5-questions.js   # Grade 5 (96 questions)
└── all-questions.js       # Master loader
```

## Question Distribution Per Grade

Each grade contains **16 questions per category** (96 total):

| Category | Questions | Types |
|----------|-----------|-------|
| Reading (Decoding) | 16 | MC, Matching, Fill-blank, Silly |
| Understanding (Comprehension) | 16 | MC, Matching, Fill-blank, Silly |
| Fluency | 16 | MC, Matching, Expression |
| Math | 16 | MC, Matching, Fill-blank, Word Problems |
| Focus (Executive Skills) | 16 | MC, Matching, Sequencing, Games |
| Effort (Emotions/Growth) | 16 | MC, Preference (3-4 per grade) |

## Difficulty Bands

| Grade | Range | Description |
|-------|-------|-------------|
| K | 0.5 - 1.0 | Foundational skills |
| 1 | 1.0 - 1.5 | Early elementary |
| 2 | 1.5 - 2.0 | Developing fluency |
| 3 | 2.0 - 2.5 | Building mastery |
| 4 | 2.5 - 3.0 | Advanced elementary |
| 5 | 3.0 - 3.5 | Pre-middle school |

## Usage

```javascript
// Load all questions
const allQuestions = require('./questions/all-questions.js');

// Get questions for specific grade
const grade2 = allQuestions.grade2;

// Get specific category
const mathQuestions = grade2.math;

// Filter by difficulty
const easy = mathQuestions.filter(q => q.difficultyBand < 1.7);
```

## Question Format

All questions follow this schema:

```javascript
{
  id: "Q_[CATEGORY]_G[#]_[SUBSKILL]_[###]",
  grade: Number,
  diagnosticCategory: String,
  subskill: String,
  nysCodes: Array<String>,
  type: "multiple_choice" | "matching" | "fill_blank" | "sentence_build" | "preference",
  prompt: String,
  ttsPrompt: String,
  answers: Array | Object,  // Array for MC, Object with pairs for matching
  ttsAnswers: Array,
  correctAnswer: String (or null for preference),
  domains: Array<String>,
  difficultyBand: Number,
  captainUnderpantsStyle: Boolean,
  isPreferenceQuestion: Boolean
}
```

## NYS Standards Coverage

See [CONTENT_SPEC.md](../CONTENT_SPEC.md) for complete standards mapping.

## Adding Questions

1. Follow the established schema
2. Ensure TTS-ready prompts
3. Use appropriate difficulty bands
4. Map to NYS standards
5. Tag with correct domains for radar integration
6. Keep prompts short and ADHD-friendly
7. Include preference questions (no wrong answers) for customization

## Quality Guidelines

- **ADHD-Friendly**: Short prompts, one concept at a time
- **504-Aware**: Breaks, pacing, visual simplicity built in
- **TTS-Ready**: Natural spoken language
- **Engaging**: Captain Underpants style questions (school-safe)
- **Growth Mindset**: Neutral feedback language
- **Diverse**: Mix of question types within each category
