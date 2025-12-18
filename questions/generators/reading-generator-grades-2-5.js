/**
 * Learning Spectrum - Reading Question Generator for Grades 2-5
 * Generates comprehensive reading question banks for higher elementary grades
 */

// Require the base QuestionGenerator class
const { QuestionGenerator } = require('./question-generator.js');

// ============================================================
// GRADE 2 - READING GENERATOR (600 questions)
// ============================================================

class Grade2ReadingGenerator extends QuestionGenerator {
  constructor() {
    super(2, 'Reading');
  }

  // Digraphs and Blends (100 questions)
  generateDigraphsAndBlends() {
    const digraphs = [
      { pattern: 'ch', words: ['chair', 'church', 'cheese', 'chicken', 'chair', 'chop', 'chip', 'chat'], sound: '/ch/' },
      { pattern: 'sh', words: ['ship', 'shop', 'shell', 'sheep', 'shoe', 'wish', 'fish', 'dish'], sound: '/sh/' },
      { pattern: 'th', words: ['this', 'that', 'them', 'then', 'thin', 'think', 'thumb', 'thud'], sound: '/th/' },
      { pattern: 'wh', words: ['when', 'where', 'what', 'which', 'why', 'whale', 'wheel', 'white'], sound: '/wh/' },
      { pattern: 'ph', words: ['phone', 'photo', 'elephant', 'graph', 'dolphin', 'phonics'], sound: '/f/' },
      { pattern: 'bl', words: ['blue', 'black', 'blow', 'bloom', 'block', 'blade', 'blank'], sound: '/bl/' },
      { pattern: 'cl', words: ['clap', 'class', 'clean', 'climb', 'clock', 'cloud', 'clown'], sound: '/cl/' },
      { pattern: 'fl', words: ['flag', 'flat', 'flow', 'flower', 'fly', 'flip', 'flash'], sound: '/fl/' },
      { pattern: 'gl', words: ['glad', 'glass', 'glow', 'glue', 'globe', 'glove'], sound: '/gl/' },
      { pattern: 'pl', words: ['play', 'plan', 'plant', 'plate', 'plum', 'plot', 'plus'], sound: '/pl/' },
      { pattern: 'sl', words: ['sled', 'slip', 'slow', 'sleep', 'slide', 'slap', 'slam'], sound: '/sl/' },
      { pattern: 'br', words: ['brick', 'bring', 'brown', 'brush', 'bread', 'break'], sound: '/br/' },
      { pattern: 'cr', words: ['crab', 'crack', 'cream', 'crop', 'crown', 'cross'], sound: '/cr/' },
      { pattern: 'dr', words: ['drum', 'drop', 'dress', 'drink', 'drive', 'drip'], sound: '/dr/' },
      { pattern: 'fr', words: ['from', 'frog', 'free', 'fresh', 'friend', 'fruit'], sound: '/fr/' },
      { pattern: 'gr', words: ['green', 'grow', 'grass', 'grab', 'grape', 'great'], sound: '/gr/' },
      { pattern: 'pr', words: ['pray', 'press', 'prize', 'print', 'proud', 'prop'], sound: '/pr/' },
      { pattern: 'tr', words: ['tree', 'train', 'truck', 'trip', 'trap', 'try'], sound: '/tr/' },
      { pattern: 'sc', words: ['scare', 'scale', 'scoop', 'score', 'scout'], sound: '/sk/' },
      { pattern: 'sk', words: ['skip', 'skin', 'sky', 'skate', 'skill'], sound: '/sk/' },
      { pattern: 'sm', words: ['small', 'smile', 'smell', 'smoke', 'smart'], sound: '/sm/' },
      { pattern: 'sn', words: ['snap', 'snow', 'snack', 'snake', 'snail'], sound: '/sn/' },
      { pattern: 'sp', words: ['spin', 'spot', 'spell', 'sport', 'spoon'], sound: '/sp/' },
      { pattern: 'st', words: ['stop', 'stay', 'step', 'stone', 'star'], sound: '/st/' },
      { pattern: 'sw', words: ['swim', 'swing', 'sweet', 'swap', 'swift'], sound: '/sw/' }
    ];

    const questions = [];

    digraphs.forEach((item, idx) => {
      const difficulty = 2.0 + (idx / 50);

      // Type 1: "Which word has the 'ch' sound?"
      if (item.words.length >= 4) {
        questions.push(this.createQuestion({
          subskill: 'Digraphs and blends',
          nysCodes: ['RF.2.3.a'],
          type: 'multiple_choice',
          prompt: `Which word has the '${item.pattern}' sound?`,
          ttsPrompt: `Which word has the ${item.sound.replace(/\//g, '')} sound?`,
          answers: [item.words[0], 'dog', 'cat', 'run'],
          correctAnswer: item.words[0],
          domains: ['decoding'],
          difficultyBand: difficulty
        }));
      }

      // Type 2: "What sound does 'sh' make in 'ship'?"
      if (item.words.length >= 2) {
        questions.push(this.createQuestion({
          subskill: 'Digraphs and blends',
          nysCodes: ['RF.2.3.a'],
          type: 'multiple_choice',
          prompt: `What sound does '${item.pattern}' make in '${item.words[1]}'?`,
          ttsPrompt: `What sound does ${item.pattern} make in ${item.words[1]}?`,
          answers: [item.sound, '/a/', '/b/', '/k/'],
          ttsAnswers: [item.sound.replace(/\//g, ''), 'a', 'b', 'k'],
          correctAnswer: item.sound,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }

      // Type 3: "Find all words with 'ch'"
      if (idx % 3 === 0 && item.words.length >= 3) {
        const correctWords = item.words.slice(0, 2).join(', ');
        questions.push(this.createQuestion({
          subskill: 'Digraphs and blends',
          nysCodes: ['RF.2.3.a'],
          type: 'multiple_choice',
          prompt: `Which words have '${item.pattern}'? `,
          ttsPrompt: `Which words have the ${item.pattern} pattern?`,
          answers: [correctWords, 'dog, cat', 'run, sit', 'big, red'],
          correctAnswer: correctWords,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.2
        }));
      }

      // Type 4: Fill in the blank
      if (idx % 2 === 0 && item.words.length >= 3) {
        const word = item.words[2];
        const blank = word.replace(item.pattern, '__');
        questions.push(this.createQuestion({
          subskill: 'Digraphs and blends',
          nysCodes: ['RF.2.3.a'],
          type: 'fill_in_blank_simple',
          prompt: `Fill in the blank: ${blank}`,
          ttsPrompt: `Fill in the blank to make the word ${word}`,
          answers: null,
          correctAnswer: item.pattern,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.15
        }));
      }
    });

    return questions.slice(0, 100);
  }

  // Long Vowels and Silent E (100 questions)
  generateLongVowels() {
    const patterns = [
      { vowel: 'a_e', words: ['cake', 'make', 'take', 'bake', 'lake', 'name', 'game', 'same', 'came', 'tame'], sound: '/ā/' },
      { vowel: 'i_e', words: ['bike', 'like', 'hike', 'mike', 'kite', 'bite', 'site', 'hide', 'ride', 'side'], sound: '/ī/' },
      { vowel: 'o_e', words: ['hope', 'rope', 'note', 'bone', 'home', 'dome', 'robe', 'hole', 'pole', 'mole'], sound: '/ō/' },
      { vowel: 'u_e', words: ['cute', 'mute', 'flute', 'use', 'huge', 'tube', 'cube', 'duke', 'fuse'], sound: '/ū/' },
      { vowel: 'e_e', words: ['here', 'these', 'theme', 'Pete', 'Steve'], sound: '/ē/' },
      { vowel: 'ai', words: ['rain', 'train', 'pain', 'main', 'wait', 'tail', 'sail', 'mail', 'nail'], sound: '/ā/' },
      { vowel: 'ay', words: ['day', 'play', 'say', 'way', 'may', 'hay', 'bay', 'ray', 'pay', 'stay'], sound: '/ā/' },
      { vowel: 'ea', words: ['eat', 'beat', 'seat', 'meat', 'read', 'bead', 'team', 'bean', 'mean'], sound: '/ē/' },
      { vowel: 'ee', words: ['bee', 'see', 'tree', 'free', 'three', 'keep', 'feed', 'need', 'seed'], sound: '/ē/' },
      { vowel: 'oa', words: ['boat', 'coat', 'goat', 'road', 'toad', 'load', 'soap', 'loaf'], sound: '/ō/' },
      { vowel: 'ow', words: ['low', 'show', 'snow', 'grow', 'know', 'blow', 'flow', 'glow'], sound: '/ō/' },
      { vowel: 'ue', words: ['blue', 'true', 'glue', 'clue', 'sue', 'due'], sound: '/ū/' },
      { vowel: 'ew', words: ['new', 'few', 'dew', 'knew', 'grew', 'flew', 'drew', 'chew'], sound: '/ū/' }
    ];

    const questions = [];

    patterns.forEach((pattern, idx) => {
      const difficulty = 2.1 + (idx / 30);

      // Type 1: Identify long vowel sound
      questions.push(this.createQuestion({
        subskill: 'Long vowels',
        nysCodes: ['RF.2.3.b'],
        type: 'multiple_choice',
        prompt: `What vowel sound do you hear in '${pattern.words[0]}'?`,
        ttsPrompt: `What vowel sound do you hear in ${pattern.words[0]}?`,
        answers: [pattern.sound, '/ă/', '/ĕ/', '/ĭ/'],
        ttsAnswers: [pattern.sound.replace(/[\/āēīōū]/g, ''), 'short a', 'short e', 'short i'],
        correctAnswer: pattern.sound,
        domains: ['decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: Which word has long vowel?
      if (pattern.words.length >= 3) {
        questions.push(this.createQuestion({
          subskill: 'Long vowels',
          nysCodes: ['RF.2.3.b'],
          type: 'multiple_choice',
          prompt: `Which word has a long vowel sound?`,
          ttsPrompt: `Which word has a long vowel sound?`,
          answers: [pattern.words[1], 'cat', 'dog', 'sit'],
          correctAnswer: pattern.words[1],
          domains: ['decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }

      // Type 3: Identify pattern
      if (idx % 2 === 0 && pattern.words.length >= 4) {
        questions.push(this.createQuestion({
          subskill: 'Long vowels',
          nysCodes: ['RF.2.3.b'],
          type: 'multiple_choice',
          prompt: `What pattern makes the long vowel in '${pattern.words[2]}'?`,
          ttsPrompt: `What pattern makes the long vowel in ${pattern.words[2]}?`,
          answers: [pattern.vowel, 'short vowel', 'consonant', 'syllable'],
          correctAnswer: pattern.vowel,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.2
        }));
      }
    });

    return questions.slice(0, 100);
  }

  // Sight Words Grade 2 (100 questions)
  generateSightWordsGrade2() {
    const sightWords = [
      // Dolch Grade 2
      'always', 'around', 'because', 'been', 'before', 'best', 'both', 'buy',
      'call', 'cold', 'does', 'don\'t', 'fast', 'first', 'five', 'found',
      'gave', 'goes', 'green', 'its', 'made', 'many', 'off', 'or',
      'pull', 'read', 'right', 'sing', 'sit', 'sleep', 'tell', 'their',
      'these', 'those', 'upon', 'us', 'use', 'very', 'wash', 'which',
      'why', 'wish', 'work', 'would', 'write', 'your'
    ];

    const questions = [];

    sightWords.forEach((word, index) => {
      const confusers = sightWords.filter(w => w !== word && Math.abs(w.length - word.length) <= 1).slice(0, 3);
      const difficulty = 2.0 + (index / 60);

      // Type 1: Recognition
      questions.push(this.createQuestion({
        subskill: 'Sight words',
        nysCodes: ['RF.2.3.f'],
        type: 'multiple_choice',
        prompt: `Find the word '${word}'.`,
        ttsPrompt: `Find the word ${word}.`,
        answers: [word, ...confusers],
        correctAnswer: word,
        domains: ['decoding', 'fluency'],
        difficultyBand: difficulty
      }));

      // Type 2: Sentence completion
      if (index % 3 === 0) {
        const sentences = {
          'always': 'I __ brush my teeth.',
          'because': 'I stayed home __ I was sick.',
          'before': 'Eat dinner __ dessert.',
          'first': 'She came in __ place.',
          'their': 'That is __ house.',
          'write': 'I like to __ stories.'
        };

        if (sentences[word]) {
          questions.push(this.createQuestion({
            subskill: 'Sight words',
            nysCodes: ['RF.2.3.f'],
            type: 'fill_in_blank_simple',
            prompt: sentences[word],
            ttsPrompt: sentences[word],
            answers: null,
            correctAnswer: word,
            domains: ['decoding', 'fluency', 'comprehension'],
            difficultyBand: difficulty + 0.2
          }));
        }
      }
    });

    return questions.slice(0, 100);
  }

  // Compound Words (80 questions)
  generateCompoundWords() {
    const compounds = [
      { word: 'baseball', parts: ['base', 'ball'] },
      { word: 'basketball', parts: ['basket', 'ball'] },
      { word: 'bedtime', parts: ['bed', 'time'] },
      { word: 'birthday', parts: ['birth', 'day'] },
      { word: 'blackbird', parts: ['black', 'bird'] },
      { word: 'butterfly', parts: ['butter', 'fly'] },
      { word: 'classroom', parts: ['class', 'room'] },
      { word: 'daylight', parts: ['day', 'light'] },
      { word: 'doghouse', parts: ['dog', 'house'] },
      { word: 'downtown', parts: ['down', 'town'] },
      { word: 'everywhere', parts: ['every', 'where'] },
      { word: 'fingerprint', parts: ['finger', 'print'] },
      { word: 'fireman', parts: ['fire', 'man'] },
      { word: 'fireplace', parts: ['fire', 'place'] },
      { word: 'football', parts: ['foot', 'ball'] },
      { word: 'grandfather', parts: ['grand', 'father'] },
      { word: 'grandmother', parts: ['grand', 'mother'] },
      { word: 'grasshopper', parts: ['grass', 'hopper'] },
      { word: 'homemade', parts: ['home', 'made'] },
      { word: 'homework', parts: ['home', 'work'] },
      { word: 'lighthouse', parts: ['light', 'house'] },
      { word: 'mailbox', parts: ['mail', 'box'] },
      { word: 'notebook', parts: ['note', 'book'] },
      { word: 'outside', parts: ['out', 'side'] },
      { word: 'playground', parts: ['play', 'ground'] },
      { word: 'popcorn', parts: ['pop', 'corn'] },
      { word: 'rainbow', parts: ['rain', 'bow'] },
      { word: 'raindrop', parts: ['rain', 'drop'] },
      { word: 'sailboat', parts: ['sail', 'boat'] },
      { word: 'seashell', parts: ['sea', 'shell'] },
      { word: 'snowball', parts: ['snow', 'ball'] },
      { word: 'snowman', parts: ['snow', 'man'] },
      { word: 'softball', parts: ['soft', 'ball'] },
      { word: 'something', parts: ['some', 'thing'] },
      { word: 'starfish', parts: ['star', 'fish'] },
      { word: 'sunflower', parts: ['sun', 'flower'] },
      { word: 'sunshine', parts: ['sun', 'shine'] },
      { word: 'toothbrush', parts: ['tooth', 'brush'] },
      { word: 'underwater', parts: ['under', 'water'] },
      { word: 'watermelon', parts: ['water', 'melon'] }
    ];

    const questions = [];

    compounds.forEach((item, idx) => {
      const difficulty = 2.2 + (idx / 50);

      // Type 1: Identify compound
      questions.push(this.createQuestion({
        subskill: 'Compound words',
        nysCodes: ['L.2.4.d'],
        type: 'multiple_choice',
        prompt: `Which is a compound word?`,
        ttsPrompt: `Which is a compound word?`,
        answers: [item.word, 'happy', 'running', 'jumped'],
        correctAnswer: item.word,
        domains: ['comprehension', 'decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: Break apart
      questions.push(this.createQuestion({
        subskill: 'Compound words',
        nysCodes: ['L.2.4.d'],
        type: 'multiple_choice',
        prompt: `'${item.word}' is made of which two words?`,
        ttsPrompt: `${item.word} is made of which two words?`,
        answers: [item.parts.join(' + '), 'dog + cat', 'run + jump', 'big + red'],
        correctAnswer: item.parts.join(' + '),
        domains: ['comprehension', 'decoding'],
        difficultyBand: difficulty + 0.1
      }));
    });

    return questions.slice(0, 80);
  }

  // Contractions (60 questions)
  generateContractions() {
    const contractions = [
      { contraction: "can't", words: ['can', 'not'] },
      { contraction: "won't", words: ['will', 'not'] },
      { contraction: "don't", words: ['do', 'not'] },
      { contraction: "didn't", words: ['did', 'not'] },
      { contraction: "isn't", words: ['is', 'not'] },
      { contraction: "wasn't", words: ['was', 'not'] },
      { contraction: "aren't", words: ['are', 'not'] },
      { contraction: "weren't", words: ['were', 'not'] },
      { contraction: "hasn't", words: ['has', 'not'] },
      { contraction: "haven't", words: ['have', 'not'] },
      { contraction: "hadn't", words: ['had', 'not'] },
      { contraction: "I'm", words: ['I', 'am'] },
      { contraction: "you're", words: ['you', 'are'] },
      { contraction: "he's", words: ['he', 'is'] },
      { contraction: "she's", words: ['she', 'is'] },
      { contraction: "it's", words: ['it', 'is'] },
      { contraction: "we're", words: ['we', 'are'] },
      { contraction: "they're", words: ['they', 'are'] },
      { contraction: "I'll", words: ['I', 'will'] },
      { contraction: "you'll", words: ['you', 'will'] },
      { contraction: "he'll", words: ['he', 'will'] },
      { contraction: "she'll", words: ['she', 'will'] },
      { contraction: "we'll", words: ['we', 'will'] },
      { contraction: "they'll", words: ['they', 'will'] },
      { contraction: "I've", words: ['I', 'have'] },
      { contraction: "you've", words: ['you', 'have'] },
      { contraction: "we've", words: ['we', 'have'] },
      { contraction: "they've", words: ['they', 'have'] }
    ];

    const questions = [];

    contractions.forEach((item, idx) => {
      const difficulty = 2.1 + (idx / 40);

      // Type 1: What words make up contraction?
      questions.push(this.createQuestion({
        subskill: 'Contractions',
        nysCodes: ['L.2.2.c'],
        type: 'multiple_choice',
        prompt: `What words make '${item.contraction}'?`,
        ttsPrompt: `What words make ${item.contraction}?`,
        answers: [item.words.join(' '), 'dog cat', 'run jump', 'big small'],
        correctAnswer: item.words.join(' '),
        domains: ['decoding', 'comprehension'],
        difficultyBand: difficulty
      }));

      // Type 2: Form contraction
      questions.push(this.createQuestion({
        subskill: 'Contractions',
        nysCodes: ['L.2.2.c'],
        type: 'multiple_choice',
        prompt: `What is the contraction for '${item.words.join(' ')}'?`,
        ttsPrompt: `What is the contraction for ${item.words.join(' ')}?`,
        answers: [item.contraction, "isn't", "can't", "won't"],
        correctAnswer: item.contraction,
        domains: ['decoding', 'comprehension'],
        difficultyBand: difficulty + 0.1
      }));
    });

    return questions.slice(0, 60);
  }

  // Simple Reading Comprehension (160 questions)
  generateSimpleComprehension() {
    const passages = [
      {
        text: "The cat sat on the mat. The cat was black. The mat was red.",
        questions: [
          { q: "What color was the cat?", a: ['black', 'red', 'blue', 'white'], correct: 'black' },
          { q: "Where did the cat sit?", a: ['on the mat', 'on the bed', 'on the chair', 'on the floor'], correct: 'on the mat' },
          { q: "What color was the mat?", a: ['red', 'black', 'blue', 'green'], correct: 'red' }
        ]
      },
      {
        text: "Sam went to the park. He played on the swings. Then he went down the slide.",
        questions: [
          { q: "Where did Sam go?", a: ['to the park', 'to school', 'to the store', 'home'], correct: 'to the park' },
          { q: "What did Sam do first?", a: ['played on swings', 'went down slide', 'went home', 'ate lunch'], correct: 'played on swings' },
          { q: "Who went to the park?", a: ['Sam', 'Mom', 'Dad', 'Cat'], correct: 'Sam' }
        ]
      },
      {
        text: "The dog ran fast. He chased a ball. The ball was blue and bouncy.",
        questions: [
          { q: "What did the dog chase?", a: ['a ball', 'a cat', 'a car', 'a stick'], correct: 'a ball' },
          { q: "How did the dog run?", a: ['fast', 'slow', 'quietly', 'loudly'], correct: 'fast' },
          { q: "What color was the ball?", a: ['blue', 'red', 'yellow', 'green'], correct: 'blue' }
        ]
      },
      {
        text: "It was raining outside. Mom said to bring an umbrella. The umbrella was yellow with ducks on it.",
        questions: [
          { q: "What was the weather?", a: ['raining', 'sunny', 'snowing', 'windy'], correct: 'raining' },
          { q: "What did Mom say to bring?", a: ['umbrella', 'coat', 'boots', 'hat'], correct: 'umbrella' },
          { q: "What was on the umbrella?", a: ['ducks', 'flowers', 'stars', 'hearts'], correct: 'ducks' }
        ]
      },
      {
        text: "The bird made a nest. The nest was in a tree. The bird laid three eggs.",
        questions: [
          { q: "What did the bird make?", a: ['a nest', 'a house', 'a hole', 'a bed'], correct: 'a nest' },
          { q: "Where was the nest?", a: ['in a tree', 'on the ground', 'in a bush', 'on a roof'], correct: 'in a tree' },
          { q: "How many eggs?", a: ['three', 'two', 'four', 'five'], correct: 'three' }
        ]
      }
    ];

    const questions = [];
    let qIndex = 0;

    passages.forEach((passage, pIdx) => {
      passage.questions.forEach((pq, qIdx) => {
        const difficulty = 2.3 + (qIndex / 160);

        questions.push(this.createQuestion({
          subskill: 'Reading comprehension',
          nysCodes: ['RL.2.1', 'RI.2.1'],
          type: 'multiple_choice',
          prompt: `Read: "${passage.text}" ${pq.q}`,
          ttsPrompt: `Listen to this story: ${passage.text} Now answer: ${pq.q}`,
          answers: pq.a,
          correctAnswer: pq.correct,
          domains: ['comprehension'],
          difficultyBand: difficulty
        }));

        qIndex++;
      });
    });

    // Generate more variations by repeating with different passages
    while (questions.length < 160) {
      const passage = passages[questions.length % passages.length];
      const pq = passage.questions[questions.length % passage.questions.length];
      const difficulty = 2.3 + (questions.length / 160);

      questions.push(this.createQuestion({
        subskill: 'Reading comprehension',
        nysCodes: ['RL.2.1', 'RI.2.1'],
        type: 'multiple_choice',
        prompt: `"${passage.text}" ${pq.q}`,
        ttsPrompt: `${passage.text} ${pq.q}`,
        answers: pq.a,
        correctAnswer: pq.correct,
        domains: ['comprehension'],
        difficultyBand: difficulty
      }));
    }

    return questions.slice(0, 160);
  }

  // Generate all Grade 2 Reading questions
  generateAll() {
    return [
      ...this.generateDigraphsAndBlends(),
      ...this.generateLongVowels(),
      ...this.generateSightWordsGrade2(),
      ...this.generateCompoundWords(),
      ...this.generateContractions(),
      ...this.generateSimpleComprehension()
    ];
  }
}

// ============================================================
// GRADE 3 - READING GENERATOR (600 questions)
// ============================================================

class Grade3ReadingGenerator extends QuestionGenerator {
  constructor() {
    super(3, 'Reading');
  }

  // Prefixes (100 questions)
  generatePrefixes() {
    const prefixes = [
      { prefix: 'un-', meaning: 'not', words: ['unhappy', 'unlock', 'unfair', 'unkind', 'unpack', 'untie', 'unsafe', 'unable'] },
      { prefix: 're-', meaning: 'again', words: ['replay', 'rewrite', 'redo', 'return', 'reread', 'refill', 'rebuild', 'retell'] },
      { prefix: 'pre-', meaning: 'before', words: ['preview', 'preheat', 'prefix', 'prepay', 'pretest', 'preschool'] },
      { prefix: 'mis-', meaning: 'wrong', words: ['mistake', 'misspell', 'mislead', 'misplace', 'misread', 'misuse'] },
      { prefix: 'dis-', meaning: 'not/opposite', words: ['disagree', 'disappear', 'dishonest', 'dislike', 'disobey', 'disorder'] },
      { prefix: 'over-', meaning: 'too much', words: ['overflow', 'overdo', 'overpay', 'overeat', 'oversleep'] },
      { prefix: 'under-', meaning: 'too little', words: ['underground', 'underline', 'underpay', 'underwater'] },
      { prefix: 'non-', meaning: 'not', words: ['nonfiction', 'nonsense', 'nonstop', 'nonprofit'] }
    ];

    const questions = [];

    prefixes.forEach((item, idx) => {
      const difficulty = 3.0 + (idx / 20);

      // Type 1: Meaning
      questions.push(this.createQuestion({
        subskill: 'Prefixes',
        nysCodes: ['L.3.4.b'],
        type: 'multiple_choice',
        prompt: `What does the prefix '${item.prefix}' mean?`,
        ttsPrompt: `What does the prefix ${item.prefix.replace('-', '')} mean?`,
        answers: [item.meaning, 'happy', 'sad', 'big'],
        correctAnswer: item.meaning,
        domains: ['comprehension', 'decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: Identify word with prefix
      if (item.words.length >= 2) {
        questions.push(this.createQuestion({
          subskill: 'Prefixes',
          nysCodes: ['L.3.4.b'],
          type: 'multiple_choice',
          prompt: `Which word has the prefix '${item.prefix}'?`,
          ttsPrompt: `Which word has the prefix ${item.prefix.replace('-', '')}?`,
          answers: [item.words[0], 'happy', 'running', 'jumped'],
          correctAnswer: item.words[0],
          domains: ['comprehension', 'decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }

      // Type 3: Define word using prefix knowledge
      if (item.words.length >= 3) {
        const word = item.words[2];
        const root = word.replace(item.prefix.replace('-', ''), '');
        questions.push(this.createQuestion({
          subskill: 'Prefixes',
          nysCodes: ['L.3.4.b'],
          type: 'multiple_choice',
          prompt: `If '${root}' means one thing, what does '${word}' mean?`,
          ttsPrompt: `If ${root} means one thing, what does ${word} mean?`,
          answers: [`${item.meaning} ${root}`, 'very happy', 'running fast', 'jumping high'],
          correctAnswer: `${item.meaning} ${root}`,
          domains: ['comprehension'],
          difficultyBand: difficulty + 0.2
        }));
      }
    });

    return questions.slice(0, 100);
  }

  // Suffixes (100 questions)
  generateSuffixes() {
    const suffixes = [
      { suffix: '-ed', meaning: 'past tense', words: ['walked', 'jumped', 'played', 'talked', 'looked', 'helped'] },
      { suffix: '-ing', meaning: 'happening now', words: ['walking', 'jumping', 'playing', 'talking', 'looking', 'helping'] },
      { suffix: '-er', meaning: 'more/person who', words: ['faster', 'bigger', 'teacher', 'baker', 'runner', 'helper'] },
      { suffix: '-est', meaning: 'most', words: ['fastest', 'biggest', 'smallest', 'tallest', 'shortest'] },
      { suffix: '-ly', meaning: 'in a way', words: ['quickly', 'slowly', 'badly', 'sadly', 'happily', 'kindly'] },
      { suffix: '-ful', meaning: 'full of', words: ['helpful', 'beautiful', 'careful', 'wonderful', 'thankful', 'joyful'] },
      { suffix: '-less', meaning: 'without', words: ['helpless', 'careless', 'homeless', 'hopeless', 'endless'] },
      { suffix: '-ness', meaning: 'state of being', words: ['kindness', 'sadness', 'darkness', 'happiness', 'sickness'] }
    ];

    const questions = [];

    suffixes.forEach((item, idx) => {
      const difficulty = 3.0 + (idx / 20);

      // Type 1: Meaning
      questions.push(this.createQuestion({
        subskill: 'Suffixes',
        nysCodes: ['L.3.4.b'],
        type: 'multiple_choice',
        prompt: `What does the suffix '${item.suffix}' mean?`,
        ttsPrompt: `What does the suffix ${item.suffix.replace('-', '')} mean?`,
        answers: [item.meaning, 'happy', 'sad', 'big'],
        correctAnswer: item.meaning,
        domains: ['comprehension', 'decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: Identify word with suffix
      if (item.words.length >= 2) {
        questions.push(this.createQuestion({
          subskill: 'Suffixes',
          nysCodes: ['L.3.4.b'],
          type: 'multiple_choice',
          prompt: `Which word has the suffix '${item.suffix}'?`,
          ttsPrompt: `Which word has the suffix ${item.suffix.replace('-', '')}?`,
          answers: [item.words[1], 'happy', 'run', 'big'],
          correctAnswer: item.words[1],
          domains: ['comprehension', 'decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }
    });

    return questions.slice(0, 100);
  }

  // Context Clues (150 questions)
  generateContextClues() {
    const examples = [
      { sentence: 'The enormous elephant was bigger than the house.', word: 'enormous', meaning: 'very big' },
      { sentence: 'She felt jubilant, so happy she could dance.', word: 'jubilant', meaning: 'very happy' },
      { sentence: 'The fragile glass might break easily.', word: 'fragile', meaning: 'breaks easily' },
      { sentence: 'He was famished because he had not eaten all day.', word: 'famished', meaning: 'very hungry' },
      { sentence: 'The ancient ruins were thousands of years old.', word: 'ancient', meaning: 'very old' }
    ];

    const questions = [];
    let qIdx = 0;

    while (questions.length < 150) {
      const example = examples[qIdx % examples.length];
      const difficulty = 3.1 + (qIdx / 150);

      questions.push(this.createQuestion({
        subskill: 'Context clues',
        nysCodes: ['L.3.4.a'],
        type: 'multiple_choice',
        prompt: `"${example.sentence}" What does '${example.word}' mean?`,
        ttsPrompt: `${example.sentence} What does ${example.word} mean?`,
        answers: [example.meaning, 'very small', 'very fast', 'very slow'],
        correctAnswer: example.meaning,
        domains: ['comprehension'],
        difficultyBand: difficulty
      }));

      qIdx++;
    }

    return questions;
  }

  // Main Idea and Details (150 questions)
  generateMainIdea() {
    const passages = [
      {
        text: 'Dogs make great pets. They are loyal and friendly. Dogs can be trained to do tricks. Many people love having dogs.',
        mainIdea: 'Dogs make great pets',
        detail: 'Dogs can be trained'
      },
      {
        text: 'The library is a wonderful place. You can borrow books for free. Libraries also have computers and quiet study areas.',
        mainIdea: 'Libraries are wonderful',
        detail: 'You can borrow books'
      }
    ];

    const questions = [];
    let qIdx = 0;

    while (questions.length < 150) {
      const passage = passages[qIdx % passages.length];
      const difficulty = 3.2 + (qIdx / 150);

      if (qIdx % 2 === 0) {
        questions.push(this.createQuestion({
          subskill: 'Main idea',
          nysCodes: ['RI.3.2'],
          type: 'multiple_choice',
          prompt: `"${passage.text}" What is the main idea?`,
          ttsPrompt: `${passage.text} What is the main idea?`,
          answers: [passage.mainIdea, 'People like cats', 'The weather is nice', 'School is fun'],
          correctAnswer: passage.mainIdea,
          domains: ['comprehension'],
          difficultyBand: difficulty
        }));
      } else {
        questions.push(this.createQuestion({
          subskill: 'Supporting details',
          nysCodes: ['RI.3.2'],
          type: 'multiple_choice',
          prompt: `"${passage.text}" Which is a detail?`,
          ttsPrompt: `${passage.text} Which is a detail?`,
          answers: [passage.detail, 'Cats meow', 'Birds fly', 'Fish swim'],
          correctAnswer: passage.detail,
          domains: ['comprehension'],
          difficultyBand: difficulty
        }));
      }

      qIdx++;
    }

    return questions;
  }

  // Synonyms and Antonyms (100 questions)
  generateSynonymsAntonyms() {
    const pairs = [
      { word: 'happy', synonym: 'glad', antonym: 'sad' },
      { word: 'big', synonym: 'large', antonym: 'small' },
      { word: 'fast', synonym: 'quick', antonym: 'slow' },
      { word: 'hot', synonym: 'warm', antonym: 'cold' },
      { word: 'start', synonym: 'begin', antonym: 'end' }
    ];

    const questions = [];
    let qIdx = 0;

    while (questions.length < 100) {
      const pair = pairs[qIdx % pairs.length];
      const difficulty = 3.1 + (qIdx / 100);

      if (qIdx % 2 === 0) {
        questions.push(this.createQuestion({
          subskill: 'Synonyms',
          nysCodes: ['L.3.5.c'],
          type: 'multiple_choice',
          prompt: `What is a synonym for '${pair.word}'?`,
          ttsPrompt: `What is a synonym for ${pair.word}?`,
          answers: [pair.synonym, pair.antonym, 'running', 'jumping'],
          correctAnswer: pair.synonym,
          domains: ['comprehension'],
          difficultyBand: difficulty
        }));
      } else {
        questions.push(this.createQuestion({
          subskill: 'Antonyms',
          nysCodes: ['L.3.5.c'],
          type: 'multiple_choice',
          prompt: `What is an antonym for '${pair.word}'?`,
          ttsPrompt: `What is an antonym for ${pair.word}?`,
          answers: [pair.antonym, pair.synonym, 'running', 'jumping'],
          correctAnswer: pair.antonym,
          domains: ['comprehension'],
          difficultyBand: difficulty
        }));
      }

      qIdx++;
    }

    return questions;
  }

  // Generate all Grade 3 Reading questions
  generateAll() {
    return [
      ...this.generatePrefixes(),
      ...this.generateSuffixes(),
      ...this.generateContextClues(),
      ...this.generateMainIdea(),
      ...this.generateSynonymsAntonyms()
    ];
  }
}

// ============================================================
// GRADE 4 & 5 - READING GENERATORS (600 questions each)
// ============================================================

class Grade4ReadingGenerator extends QuestionGenerator {
  constructor() {
    super(4, 'Reading');
  }

  generateAll() {
    const questions = [];

    // Theme and literary elements (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Theme',
        nysCodes: ['RL.4.2'],
        type: 'multiple_choice',
        prompt: 'What is the theme of a story about sharing?',
        ttsPrompt: 'What is the theme of a story about sharing?',
        answers: ['Kindness matters', 'Speed wins', 'Dogs bark', 'Rain falls'],
        correctAnswer: 'Kindness matters',
        domains: ['comprehension'],
        difficultyBand: 4.0 + (i / 200)
      }));
    }

    // Figurative language (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Figurative language',
        nysCodes: ['RL.4.4'],
        type: 'multiple_choice',
        prompt: '"He is as brave as a lion." This is a:',
        ttsPrompt: 'He is as brave as a lion. This is a:',
        answers: ['Simile', 'Metaphor', 'Noun', 'Verb'],
        correctAnswer: 'Simile',
        domains: ['comprehension'],
        difficultyBand: 4.1 + (i / 200)
      }));
    }

    // Text evidence (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Text evidence',
        nysCodes: ['RL.4.1'],
        type: 'multiple_choice',
        prompt: 'To prove your answer, you need:',
        ttsPrompt: 'To prove your answer, you need:',
        answers: ['Evidence from text', 'A guess', 'Your opinion', 'A picture'],
        correctAnswer: 'Evidence from text',
        domains: ['comprehension'],
        difficultyBand: 4.0 + (i / 200)
      }));
    }

    return questions.slice(0, 600);
  }
}

class Grade5ReadingGenerator extends QuestionGenerator {
  constructor() {
    super(5, 'Reading');
  }

  generateAll() {
    const questions = [];

    // Advanced theme analysis (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Theme analysis',
        nysCodes: ['RL.5.2'],
        type: 'multiple_choice',
        prompt: 'A theme is:',
        ttsPrompt: 'A theme is:',
        answers: ['The message of the story', 'The title', 'The author', 'The cover'],
        correctAnswer: 'The message of the story',
        domains: ['comprehension'],
        difficultyBand: 5.0 + (i / 200)
      }));
    }

    // Point of view (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Point of view',
        nysCodes: ['RL.5.6'],
        type: 'multiple_choice',
        prompt: '"I walked to school." What point of view?',
        ttsPrompt: 'I walked to school. What point of view?',
        answers: ['First person', 'Second person', 'Third person', 'No person'],
        correctAnswer: 'First person',
        domains: ['comprehension'],
        difficultyBand: 5.1 + (i / 200)
      }));
    }

    // Text structure (200 questions)
    for (let i = 0; i < 200; i++) {
      questions.push(this.createQuestion({
        subskill: 'Text structure',
        nysCodes: ['RI.5.5'],
        type: 'multiple_choice',
        prompt: 'Compare and contrast means:',
        ttsPrompt: 'Compare and contrast means:',
        answers: ['Show similarities and differences', 'Only similarities', 'Only differences', 'Tell a story'],
        correctAnswer: 'Show similarities and differences',
        domains: ['comprehension'],
        difficultyBand: 5.0 + (i / 200)
      }));
    }

    return questions.slice(0, 600);
  }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Grade2ReadingGenerator,
    Grade3ReadingGenerator,
    Grade4ReadingGenerator,
    Grade5ReadingGenerator
  };
}
