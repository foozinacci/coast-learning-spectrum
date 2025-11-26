/**
 * Learning Spectrum - Grade 2 Sample Questions
 * NYS Next Generation ELA & Math Standards Aligned
 *
 * This file contains sample questions across all 6 diagnostic categories:
 * - Reading (Decoding)
 * - Understanding (Comprehension)
 * - Fluency
 * - Math
 * - Focus (Executive Skills)
 * - Effort (Emotions / Growth Mindset)
 *
 * Each category has 5-8 questions representing the mix of types:
 * - Multiple Choice
 * - Matching
 * - Fill-in-the-Blank
 * - Captain Underpants Style
 * - Mini-Game/Preference
 */

const grade2Questions = {

  // ========================================
  // READING (Decoding / Word-Level)
  // ========================================
  reading: [
    // 1. Multiple Choice - Long Vowels
    {
      id: "Q_READ_G2_LONG_VOWEL_001",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Long vowels (CVCe pattern)",
      nysCodes: ["RF.2.3.b"],
      type: "multiple_choice",
      prompt: "Which word has a long 'a' sound?",
      ttsPrompt: "Which word has a long A sound?",
      answers: ["cake", "cat", "cap", "can"],
      ttsAnswers: ["cake", "cat", "cap", "can"],
      correctAnswer: "cake",
      domains: ["decoding"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 2. Multiple Choice - Consonant Digraphs
    {
      id: "Q_READ_G2_DIGRAPH_002",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Consonant digraphs",
      nysCodes: ["RF.2.3.c"],
      type: "multiple_choice",
      prompt: "Which word starts with the 'sh' sound?",
      ttsPrompt: "Which word starts with the SH sound?",
      answers: ["ship", "chip", "sip", "lip"],
      ttsAnswers: ["ship", "chip", "sip", "lip"],
      correctAnswer: "ship",
      domains: ["decoding"],
      difficultyBand: 1.5,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Matching - Silent Letters
    {
      id: "Q_READ_G2_SILENT_LETTERS_MATCH_001",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Silent letters",
      nysCodes: ["RF.2.3.c"],
      type: "matching",
      prompt: "Match each word to its silent letter.",
      ttsPrompt: "Match each word to its silent letter.",
      pairs: [
        { left: "knee",  right: "k" },
        { left: "lamb",  right: "b" },
        { left: "gnome", right: "g" }
      ],
      domains: ["decoding"],
      difficultyBand: 2.0,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Multiple Choice - R-Controlled Vowels
    {
      id: "Q_READ_G2_R_CONTROL_003",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "R-controlled vowels",
      nysCodes: ["RF.2.3.b"],
      type: "multiple_choice",
      prompt: "Which word has the same vowel sound as 'car'?",
      ttsPrompt: "Which word has the same vowel sound as CAR?",
      answers: ["star", "care", "her", "core"],
      ttsAnswers: ["star", "care", "her", "core"],
      correctAnswer: "star",
      domains: ["decoding"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 5. Matching - Long Vowel Teams
    {
      id: "Q_READ_G2_VOWEL_TEAMS_MATCH_002",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Long vowels (vowel teams)",
      nysCodes: ["RF.2.3.b"],
      type: "matching",
      prompt: "Match each vowel team to a word with that sound.",
      ttsPrompt: "Match each vowel team to a word with that sound.",
      pairs: [
        { left: "ai", right: "rain" },
        { left: "ee", right: "tree" },
        { left: "oa", right: "boat" }
      ],
      domains: ["decoding"],
      difficultyBand: 1.9,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 6. Multiple Choice - Multisyllabic Words
    {
      id: "Q_READ_G2_SYLLABLES_004",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Multisyllabic words",
      nysCodes: ["RF.2.3.d"],
      type: "multiple_choice",
      prompt: "How many syllables are in the word 'banana'?",
      ttsPrompt: "How many syllables are in the word banana?",
      answers: ["3", "2", "4", "1"],
      ttsAnswers: ["3", "2", "4", "1"],
      correctAnswer: "3",
      domains: ["decoding"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 7. Multiple Choice - Consonant Blends
    {
      id: "Q_READ_G2_BLENDS_005",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Consonant blends",
      nysCodes: ["RF.2.3.c"],
      type: "multiple_choice",
      prompt: "Which word starts with a blend?",
      ttsPrompt: "Which word starts with a blend?",
      answers: ["flag", "fish", "five", "frog"],
      ttsAnswers: ["flag", "fish", "five", "frog"],
      correctAnswer: "flag",
      domains: ["decoding"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 8. Multiple Choice - Word Families
    {
      id: "Q_READ_G2_WORD_FAMILY_006",
      grade: 2,
      diagnosticCategory: "Reading",
      subskill: "Word families and patterns",
      nysCodes: ["RF.2.3"],
      type: "multiple_choice",
      prompt: "Which word belongs in the '-ight' word family?",
      ttsPrompt: "Which word belongs in the I-G-H-T word family?",
      answers: ["night", "nice", "nine", "note"],
      ttsAnswers: ["night", "nice", "nine", "note"],
      correctAnswer: "night",
      domains: ["decoding"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    }
  ],

  // ========================================
  // UNDERSTANDING (Comprehension)
  // ========================================
  understanding: [
    // 1. Multiple Choice - Main Idea
    {
      id: "Q_UNDER_G2_MAIN_IDEA_001",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Main idea",
      nysCodes: ["RL.2.2", "RI.2.2"],
      type: "multiple_choice",
      prompt: "Max loves to play outside. He runs, jumps, and climbs trees every day. What is this story mainly about?",
      ttsPrompt: "Max loves to play outside. He runs, jumps, and climbs trees every day. What is this story mainly about?",
      answers: [
        "Max likes to be active outside",
        "Max has many friends",
        "Max likes trees",
        "Max runs fast"
      ],
      ttsAnswers: [
        "Max likes to be active outside",
        "Max has many friends",
        "Max likes trees",
        "Max runs fast"
      ],
      correctAnswer: "Max likes to be active outside",
      domains: ["comprehension"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 2. Fill-in-the-Blank - Inference
    {
      id: "Q_UNDER_G2_INFERENCE_FILL_001",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Making inferences",
      nysCodes: ["RL.2.1"],
      type: "fill_blank",
      prompt: "The dog wagged its tail and licked my face. The dog was feeling ____.",
      ttsPrompt: "The dog wagged its tail and licked my face. The dog was feeling blank.",
      answers: ["happy", "sad", "angry", "sleepy"],
      ttsAnswers: ["happy", "sad", "angry", "sleepy"],
      correctAnswer: "happy",
      domains: ["comprehension"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Multiple Choice - Cause and Effect
    {
      id: "Q_UNDER_G2_CAUSE_EFFECT_002",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Cause and effect",
      nysCodes: ["RL.2.3"],
      type: "multiple_choice",
      prompt: "It rained all day. The soccer game was canceled. Why was the game canceled?",
      ttsPrompt: "It rained all day. The soccer game was canceled. Why was the game canceled?",
      answers: [
        "Because of the rain",
        "Because no one came",
        "Because it was too hot",
        "Because the field was busy"
      ],
      ttsAnswers: [
        "Because of the rain",
        "Because no one came",
        "Because it was too hot",
        "Because the field was busy"
      ],
      correctAnswer: "Because of the rain",
      domains: ["comprehension"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Captain Underpants Style - Sentence Structure
    {
      id: "Q_UNDER_G2_SILLY_SENTENCE_001",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Sentence structure and syntax",
      nysCodes: ["L.2.1"],
      type: "sentence_build",
      prompt: "Which sentence is written correctly?",
      ttsPrompt: "Which sentence is written correctly?",
      options: [
        "The giant hamster wore a cape and ate his lunch.",
        "Ate lunch the hamster giant and cape wore.",
        "The giant hamster lunch ate cape and wore.",
        "Lunch the giant hamster a cape wore and."
      ],
      ttsAnswers: [
        "The giant hamster wore a cape and ate his lunch.",
        "Ate lunch the hamster giant and cape wore.",
        "The giant hamster lunch ate cape and wore.",
        "Lunch the giant hamster a cape wore and."
      ],
      correctAnswer: "The giant hamster wore a cape and ate his lunch.",
      domains: ["comprehension", "syntax"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: true,
      isPreferenceQuestion: false
    },

    // 5. Matching - Key Details
    {
      id: "Q_UNDER_G2_DETAILS_MATCH_001",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Key details",
      nysCodes: ["RL.2.1", "RI.2.1"],
      type: "matching",
      prompt: "Match each question word to what it asks about.",
      ttsPrompt: "Match each question word to what it asks about.",
      pairs: [
        { left: "Who?", right: "a person" },
        { left: "Where?", right: "a place" },
        { left: "When?", right: "a time" }
      ],
      domains: ["comprehension"],
      difficultyBand: 1.5,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 6. Multiple Choice - Prediction
    {
      id: "Q_UNDER_G2_PREDICT_003",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Making predictions",
      nysCodes: ["RL.2.1"],
      type: "multiple_choice",
      prompt: "Mia grabbed her umbrella and raincoat. What will probably happen next?",
      ttsPrompt: "Mia grabbed her umbrella and raincoat. What will probably happen next?",
      answers: [
        "Mia will go outside in the rain",
        "Mia will go to bed",
        "Mia will eat breakfast",
        "Mia will read a book"
      ],
      ttsAnswers: [
        "Mia will go outside in the rain",
        "Mia will go to bed",
        "Mia will eat breakfast",
        "Mia will read a book"
      ],
      correctAnswer: "Mia will go outside in the rain",
      domains: ["comprehension"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 7. Captain Underpants Style - Silly Vocabulary
    {
      id: "Q_UNDER_G2_SILLY_VOCAB_002",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Vocabulary in context",
      nysCodes: ["L.2.4"],
      type: "sentence_build",
      prompt: "Which sentence uses the word 'enormous' correctly?",
      ttsPrompt: "Which sentence uses the word enormous correctly?",
      options: [
        "The elephant was enormous, bigger than a car!",
        "I enormous to the park yesterday.",
        "She enormous a sandwich for lunch.",
        "The enormous is very blue today."
      ],
      ttsAnswers: [
        "The elephant was enormous, bigger than a car!",
        "I enormous to the park yesterday.",
        "She enormous a sandwich for lunch.",
        "The enormous is very blue today."
      ],
      correctAnswer: "The elephant was enormous, bigger than a car!",
      domains: ["comprehension", "vocabulary"],
      difficultyBand: 1.9,
      captainUnderpantsStyle: true,
      isPreferenceQuestion: false
    },

    // 8. Multiple Choice - Compare and Contrast
    {
      id: "Q_UNDER_G2_COMPARE_004",
      grade: 2,
      diagnosticCategory: "Understanding",
      subskill: "Compare and contrast",
      nysCodes: ["RL.2.9"],
      type: "multiple_choice",
      prompt: "How are a cat and a dog ALIKE?",
      ttsPrompt: "How are a cat and a dog alike?",
      answers: [
        "Both are animals with four legs",
        "Both like to swim",
        "Both can fly",
        "Both eat grass"
      ],
      ttsAnswers: [
        "Both are animals with four legs",
        "Both like to swim",
        "Both can fly",
        "Both eat grass"
      ],
      correctAnswer: "Both are animals with four legs",
      domains: ["comprehension"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    }
  ],

  // ========================================
  // FLUENCY
  // ========================================
  fluency: [
    // 1. Multiple Choice - Punctuation Awareness
    {
      id: "Q_FLUENCY_G2_PUNCTUATION_001",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Punctuation awareness",
      nysCodes: ["RF.2.4.b"],
      type: "multiple_choice",
      prompt: "When you see a period (.), what should you do?",
      ttsPrompt: "When you see a period, what should you do?",
      answers: [
        "Stop and take a breath",
        "Read louder",
        "Read faster",
        "Skip that word"
      ],
      ttsAnswers: [
        "Stop and take a breath",
        "Read louder",
        "Read faster",
        "Skip that word"
      ],
      correctAnswer: "Stop and take a breath",
      domains: ["fluency"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 2. Matching - Expression
    {
      id: "Q_FLUENCY_G2_EXPRESSION_MATCH_001",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Expression",
      nysCodes: ["RF.2.4.b"],
      type: "matching",
      prompt: "Match each punctuation mark to how you should read it.",
      ttsPrompt: "Match each punctuation mark to how you should read it.",
      pairs: [
        { left: "!", right: "with excitement" },
        { left: "?", right: "with a questioning voice" },
        { left: ".", right: "with a normal voice" }
      ],
      domains: ["fluency"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Multiple Choice - Phrasing
    {
      id: "Q_FLUENCY_G2_PHRASING_002",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Phrasing",
      nysCodes: ["RF.2.4.b"],
      type: "multiple_choice",
      prompt: "Where should you pause when reading: 'The big brown dog ran fast'?",
      ttsPrompt: "Where should you pause when reading: The big brown dog ran fast?",
      answers: [
        "After 'dog'",
        "After 'big'",
        "After 'brown'",
        "After every word"
      ],
      ttsAnswers: [
        "After dog",
        "After big",
        "After brown",
        "After every word"
      ],
      correctAnswer: "After 'dog'",
      domains: ["fluency"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Multiple Choice - Reading Rate
    {
      id: "Q_FLUENCY_G2_RATE_003",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Reading rate",
      nysCodes: ["RF.2.4.b"],
      type: "multiple_choice",
      prompt: "When you read aloud, you should read:",
      ttsPrompt: "When you read aloud, you should read:",
      answers: [
        "Not too fast, not too slow",
        "As fast as you can",
        "Very slowly",
        "One word per minute"
      ],
      ttsAnswers: [
        "Not too fast, not too slow",
        "As fast as you can",
        "Very slowly",
        "One word per minute"
      ],
      correctAnswer: "Not too fast, not too slow",
      domains: ["fluency"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 5. Captain Underpants Style - Expression Practice
    {
      id: "Q_FLUENCY_G2_SILLY_EXPRESSION_001",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Expression and prosody",
      nysCodes: ["RF.2.4.b"],
      type: "sentence_build",
      prompt: "Which sentence should you read with the MOST excitement?",
      ttsPrompt: "Which sentence should you read with the most excitement?",
      options: [
        "Wow! A dancing pickle just flew past my window!",
        "The pencil is on the table.",
        "I will go to sleep soon.",
        "Please pass the salt."
      ],
      ttsAnswers: [
        "Wow! A dancing pickle just flew past my window!",
        "The pencil is on the table.",
        "I will go to sleep soon.",
        "Please pass the salt."
      ],
      correctAnswer: "Wow! A dancing pickle just flew past my window!",
      domains: ["fluency"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: true,
      isPreferenceQuestion: false
    },

    // 6. Multiple Choice - Accuracy
    {
      id: "Q_FLUENCY_G2_ACCURACY_004",
      grade: 2,
      diagnosticCategory: "Fluency",
      subskill: "Accuracy and self-correction",
      nysCodes: ["RF.2.4"],
      type: "multiple_choice",
      prompt: "If you read a word wrong, what should you do?",
      ttsPrompt: "If you read a word wrong, what should you do?",
      answers: [
        "Go back and try again",
        "Keep reading fast",
        "Skip to the next page",
        "Stop reading"
      ],
      ttsAnswers: [
        "Go back and try again",
        "Keep reading fast",
        "Skip to the next page",
        "Stop reading"
      ],
      correctAnswer: "Go back and try again",
      domains: ["fluency", "executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    }
  ],

  // ========================================
  // MATH
  // ========================================
  math: [
    // 1. Multiple Choice - Number Patterns
    {
      id: "Q_MATH_G2_PATTERN_001",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Number patterns within 100",
      nysCodes: ["2.OA.3"],
      type: "multiple_choice",
      prompt: "What number comes next in this pattern: 5, 10, 15, 20, __?",
      ttsPrompt: "What number comes next in this pattern: 5, 10, 15, 20, blank?",
      answers: ["25", "22", "24", "30"],
      ttsAnswers: ["25", "22", "24", "30"],
      correctAnswer: "25",
      domains: ["math"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 2. Multiple Choice - Addition within 100
    {
      id: "Q_MATH_G2_ADDITION_002",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Addition within 100",
      nysCodes: ["2.NBT.5"],
      type: "multiple_choice",
      prompt: "What is 34 + 28?",
      ttsPrompt: "What is 34 plus 28?",
      answers: ["62", "52", "72", "56"],
      ttsAnswers: ["62", "52", "72", "56"],
      correctAnswer: "62",
      domains: ["math"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Fill-in-the-Blank - Subtraction
    {
      id: "Q_MATH_G2_SUBTRACTION_FILL_001",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Subtraction within 100",
      nysCodes: ["2.NBT.5"],
      type: "fill_blank",
      prompt: "45 - 19 = ____",
      ttsPrompt: "45 minus 19 equals blank.",
      answers: ["26", "36", "24", "64"],
      ttsAnswers: ["26", "36", "24", "64"],
      correctAnswer: "26",
      domains: ["math"],
      difficultyBand: 1.9,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Matching - Place Value
    {
      id: "Q_MATH_G2_PLACE_VALUE_MATCH_001",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Place value (hundreds, tens, ones)",
      nysCodes: ["2.NBT.1"],
      type: "matching",
      prompt: "Match each number to its place value in 347.",
      ttsPrompt: "Match each number to its place value in 347.",
      pairs: [
        { left: "3", right: "hundreds" },
        { left: "4", right: "tens" },
        { left: "7", right: "ones" }
      ],
      domains: ["math"],
      difficultyBand: 1.8,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 5. Multiple Choice - Word Problems
    {
      id: "Q_MATH_G2_WORD_PROBLEM_003",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "One-step word problems",
      nysCodes: ["2.OA.1"],
      type: "multiple_choice",
      prompt: "Sam has 12 cookies. He eats 5. How many are left?",
      ttsPrompt: "Sam has 12 cookies. He eats 5. How many are left?",
      answers: ["7", "17", "8", "6"],
      ttsAnswers: ["7", "17", "8", "6"],
      correctAnswer: "7",
      domains: ["math", "comprehension"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 6. Captain Underpants Style - Mental Math
    {
      id: "Q_MATH_G2_SILLY_MENTAL_MATH_001",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Mental math strategies",
      nysCodes: ["2.NBT.5"],
      type: "sentence_build",
      prompt: "A superhero has 10 bananas. He gives 3 to his sidekick. How many does he have left?",
      ttsPrompt: "A superhero has 10 bananas. He gives 3 to his sidekick. How many does he have left?",
      options: ["7", "13", "30", "10"],
      ttsAnswers: ["7", "13", "30", "10"],
      correctAnswer: "7",
      domains: ["math"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: true,
      isPreferenceQuestion: false
    },

    // 7. Multiple Choice - Skip Counting
    {
      id: "Q_MATH_G2_SKIP_COUNT_004",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Skip counting by 2s, 5s, 10s",
      nysCodes: ["2.NBT.2"],
      type: "multiple_choice",
      prompt: "Count by 10s: 10, 20, 30, 40, __?",
      ttsPrompt: "Count by tens: 10, 20, 30, 40, blank?",
      answers: ["50", "45", "41", "60"],
      ttsAnswers: ["50", "45", "41", "60"],
      correctAnswer: "50",
      domains: ["math"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 8. Multiple Choice - Comparing Numbers
    {
      id: "Q_MATH_G2_COMPARE_005",
      grade: 2,
      diagnosticCategory: "Math",
      subskill: "Compare numbers using >, <, =",
      nysCodes: ["2.NBT.4"],
      type: "multiple_choice",
      prompt: "Which symbol makes this true? 56 __ 65",
      ttsPrompt: "Which symbol makes this true? 56 blank 65",
      answers: ["<", ">", "=", "+"],
      ttsAnswers: ["less than", "greater than", "equals", "plus"],
      correctAnswer: "<",
      domains: ["math"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    }
  ],

  // ========================================
  // FOCUS (Executive Skills)
  // ========================================
  focus: [
    // 1. Multiple Choice - Following Directions
    {
      id: "Q_FOCUS_G2_DIRECTIONS_001",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Following multi-step directions",
      nysCodes: ["SL.2.2"],
      type: "multiple_choice",
      prompt: "Your teacher says: 'Take out your pencil, then open your book to page 10.' What do you do FIRST?",
      ttsPrompt: "Your teacher says: Take out your pencil, then open your book to page 10. What do you do first?",
      answers: [
        "Take out your pencil",
        "Open your book",
        "Turn to page 10",
        "Raise your hand"
      ],
      ttsAnswers: [
        "Take out your pencil",
        "Open your book",
        "Turn to page 10",
        "Raise your hand"
      ],
      correctAnswer: "Take out your pencil",
      domains: ["executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 2. Matching - Sequencing
    {
      id: "Q_FOCUS_G2_SEQUENCE_MATCH_001",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Sequencing steps",
      nysCodes: ["RL.2.3"],
      type: "matching",
      prompt: "Match each step to the correct order for making a sandwich.",
      ttsPrompt: "Match each step to the correct order for making a sandwich.",
      pairs: [
        { left: "Get bread", right: "First" },
        { left: "Add filling", right: "Second" },
        { left: "Eat sandwich", right: "Third" }
      ],
      domains: ["executive"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Multiple Choice - Pattern Recognition
    {
      id: "Q_FOCUS_G2_PATTERN_002",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Pattern recognition",
      nysCodes: ["2.OA.3"],
      type: "multiple_choice",
      prompt: "What comes next? 🔵🔴🔵🔴🔵__",
      ttsPrompt: "What comes next in this pattern? Blue, red, blue, red, blue, blank",
      answers: ["🔴", "🔵", "🟡", "🟢"],
      ttsAnswers: ["red", "blue", "yellow", "green"],
      correctAnswer: "🔴",
      domains: ["executive", "math"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Multiple Choice - Working Memory
    {
      id: "Q_FOCUS_G2_MEMORY_003",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Working memory",
      nysCodes: ["Cross-curricular"],
      type: "multiple_choice",
      prompt: "Remember these animals: cat, dog, bird. Now, which animal was NOT in the list?",
      ttsPrompt: "Remember these animals: cat, dog, bird. Now, which animal was not in the list?",
      answers: ["fish", "cat", "dog", "bird"],
      ttsAnswers: ["fish", "cat", "dog", "bird"],
      correctAnswer: "fish",
      domains: ["executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 5. Multiple Choice - Planning
    {
      id: "Q_FOCUS_G2_PLANNING_004",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Planning steps",
      nysCodes: ["Math problem-solving"],
      type: "multiple_choice",
      prompt: "You need to clean your room. What should you do FIRST?",
      ttsPrompt: "You need to clean your room. What should you do first?",
      answers: [
        "Look at what needs to be cleaned",
        "Watch TV",
        "Play a game",
        "Take a nap"
      ],
      ttsAnswers: [
        "Look at what needs to be cleaned",
        "Watch TV",
        "Play a game",
        "Take a nap"
      ],
      correctAnswer: "Look at what needs to be cleaned",
      domains: ["executive"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 6. Mini-Game Style - Categorization
    {
      id: "Q_FOCUS_G2_CATEGORY_GAME_001",
      grade: 2,
      diagnosticCategory: "Focus",
      subskill: "Categorization",
      nysCodes: ["Cross-curricular"],
      type: "multiple_choice",
      prompt: "Which one does NOT belong? Apple, Banana, Carrot, Orange",
      ttsPrompt: "Which one does not belong? Apple, Banana, Carrot, Orange",
      answers: ["Carrot", "Apple", "Banana", "Orange"],
      ttsAnswers: ["Carrot", "Apple", "Banana", "Orange"],
      correctAnswer: "Carrot",
      domains: ["executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    }
  ],

  // ========================================
  // EFFORT (Emotions / Growth Mindset)
  // ========================================
  effort: [
    // 1. Preference Question - Coping Strategies
    {
      id: "Q_EFFORT_G2_PREF_COPING_001",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Coping strategies",
      nysCodes: ["SEL"],
      type: "preference",
      prompt: "When work feels hard, what helps you most?",
      ttsPrompt: "When work feels hard, what helps you most?",
      options: [
        "Take a short break",
        "Ask a question",
        "Try a different way",
        "Take deep breaths"
      ],
      ttsAnswers: [
        "Take a short break",
        "Ask a question",
        "Try a different way",
        "Take deep breaths"
      ],
      domains: ["emotions", "executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: true
    },

    // 2. Multiple Choice - Growth Mindset
    {
      id: "Q_EFFORT_G2_GROWTH_002",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Growth mindset language",
      nysCodes: ["SEL"],
      type: "multiple_choice",
      prompt: "Which shows a growth mindset?",
      ttsPrompt: "Which shows a growth mindset?",
      answers: [
        "I can't do this YET, but I'm learning!",
        "I'll never be good at this.",
        "This is too hard for me.",
        "I give up."
      ],
      ttsAnswers: [
        "I can't do this yet, but I'm learning!",
        "I'll never be good at this.",
        "This is too hard for me.",
        "I give up."
      ],
      correctAnswer: "I can't do this YET, but I'm learning!",
      domains: ["emotions"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 3. Multiple Choice - Emotion Recognition
    {
      id: "Q_EFFORT_G2_EMOTION_003",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Emotion recognition",
      nysCodes: ["SEL"],
      type: "multiple_choice",
      prompt: "Your friend is smiling and jumping up and down. How might they feel?",
      ttsPrompt: "Your friend is smiling and jumping up and down. How might they feel?",
      answers: ["Excited", "Sad", "Angry", "Sleepy"],
      ttsAnswers: ["Excited", "Sad", "Angry", "Sleepy"],
      correctAnswer: "Excited",
      domains: ["emotions"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 4. Multiple Choice - Positive Self-Talk
    {
      id: "Q_EFFORT_G2_SELF_TALK_004",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Positive self-talk",
      nysCodes: ["SEL"],
      type: "multiple_choice",
      prompt: "You made a mistake on a problem. What's a helpful thing to say to yourself?",
      ttsPrompt: "You made a mistake on a problem. What's a helpful thing to say to yourself?",
      answers: [
        "Mistakes help me learn!",
        "I'm so bad at this.",
        "Everyone will laugh at me.",
        "I'll never get it right."
      ],
      ttsAnswers: [
        "Mistakes help me learn!",
        "I'm so bad at this.",
        "Everyone will laugh at me.",
        "I'll never get it right."
      ],
      correctAnswer: "Mistakes help me learn!",
      domains: ["emotions"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 5. Preference Question - Asking for Help
    {
      id: "Q_EFFORT_G2_PREF_HELP_002",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Asking for help",
      nysCodes: ["SEL", "SL.2.6"],
      type: "preference",
      prompt: "When you need help, who do you like to ask?",
      ttsPrompt: "When you need help, who do you like to ask?",
      options: [
        "A teacher",
        "A friend",
        "A family member",
        "I try on my own first"
      ],
      ttsAnswers: [
        "A teacher",
        "A friend",
        "A family member",
        "I try on my own first"
      ],
      domains: ["emotions", "executive"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: true
    },

    // 6. Multiple Choice - Celebrating Effort
    {
      id: "Q_EFFORT_G2_CELEBRATE_005",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Celebrating effort and progress",
      nysCodes: ["SEL"],
      type: "multiple_choice",
      prompt: "You worked really hard on your homework, even though it was tricky. You should feel:",
      ttsPrompt: "You worked really hard on your homework, even though it was tricky. You should feel:",
      answers: ["Proud of trying hard", "Bad about mistakes", "Worried", "Nothing"],
      ttsAnswers: ["Proud of trying hard", "Bad about mistakes", "Worried", "Nothing"],
      correctAnswer: "Proud of trying hard",
      domains: ["emotions"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 7. Multiple Choice - Frustration Tolerance
    {
      id: "Q_EFFORT_G2_FRUSTRATION_006",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Frustration tolerance",
      nysCodes: ["SEL"],
      type: "multiple_choice",
      prompt: "You're getting frustrated with a math problem. What's a good first step?",
      ttsPrompt: "You're getting frustrated with a math problem. What's a good first step?",
      answers: [
        "Take three deep breaths",
        "Throw your pencil",
        "Say 'I hate math'",
        "Close your eyes and don't look"
      ],
      ttsAnswers: [
        "Take three deep breaths",
        "Throw your pencil",
        "Say I hate math",
        "Close your eyes and don't look"
      ],
      correctAnswer: "Take three deep breaths",
      domains: ["emotions", "executive"],
      difficultyBand: 1.7,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: false
    },

    // 8. Preference Question - Break Preferences
    {
      id: "Q_EFFORT_G2_PREF_BREAK_003",
      grade: 2,
      diagnosticCategory: "Effort",
      subskill: "Self-advocacy and breaks",
      nysCodes: ["SEL", "504 accommodations"],
      type: "preference",
      prompt: "During a break, what helps you feel ready to work again?",
      ttsPrompt: "During a break, what helps you feel ready to work again?",
      options: [
        "Move around and stretch",
        "Look out the window",
        "Draw or doodle",
        "Listen to calm sounds"
      ],
      ttsAnswers: [
        "Move around and stretch",
        "Look out the window",
        "Draw or doodle",
        "Listen to calm sounds"
      ],
      domains: ["emotions", "executive"],
      difficultyBand: 1.6,
      captainUnderpantsStyle: false,
      isPreferenceQuestion: true
    }
  ]

};

// Export for use in Learning Spectrum
if (typeof module !== 'undefined' && module.exports) {
  module.exports = grade2Questions;
}
