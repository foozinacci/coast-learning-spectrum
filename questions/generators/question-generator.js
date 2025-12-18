/**
 * Learning Spectrum - Question Generator
 * Programmatically generates comprehensive question banks
 * Total output: 3,600 questions per grade × 6 grades = 21,600 questions
 */

// ============================================================
// QUESTION TEMPLATES AND GENERATORS
// ============================================================

class QuestionGenerator {
  constructor(grade, diagnosticCategory) {
    this.grade = grade;
    this.diagnosticCategory = diagnosticCategory;
    this.questionCounter = 0;
  }

  // Generate unique ID
  generateId(category, skill, index) {
    const categoryCode = category.substring(0, 4).toUpperCase();
    return `Q_${categoryCode}_G${this.grade}_${skill.replace(/\s+/g, '_').toUpperCase()}_${String(index).padStart(3, '0')}`;
  }

  // Base question template
  createQuestion(config) {
    this.questionCounter++;
    return {
      id: this.generateId(this.diagnosticCategory, config.subskill, this.questionCounter),
      grade: this.grade,
      diagnosticCategory: this.diagnosticCategory,
      subskill: config.subskill,
      nysCodes: config.nysCodes || [],
      type: config.type,
      prompt: config.prompt,
      ttsPrompt: config.ttsPrompt,
      answers: config.answers,
      ttsAnswers: config.ttsAnswers || config.answers,
      correctAnswer: config.correctAnswer,
      domains: config.domains,
      difficultyBand: config.difficultyBand,
      captainUnderpantsStyle: config.captainUnderpantsStyle || false,
      isPreferenceQuestion: config.isPreferenceQuestion || false
    };
  }
}

// ============================================================
// GRADE K - READING GENERATORS (600 questions)
// ============================================================

class GradeKReadingGenerator extends QuestionGenerator {
  constructor() {
    super(0, 'Reading');
  }

  // Letter Recognition - Uppercase (26 letters × 2 variations = 52)
  generateLetterRecognitionUppercase() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const questions = [];

    letters.forEach((letter, index) => {
      const confusers = this.getConfusers(letter, true);

      // Variation 1: "Which letter is 'X'?"
      questions.push(this.createQuestion({
        subskill: 'Letter recognition (uppercase)',
        nysCodes: ['RF.K.1.d'],
        type: 'multiple_choice',
        prompt: `Which letter is '${letter}'?`,
        ttsPrompt: `Which letter is ${letter}?`,
        answers: [letter, ...confusers.slice(0, 3)],
        correctAnswer: letter,
        domains: ['decoding'],
        difficultyBand: 0.5 + (index / 52)
      }));

      // Variation 2: "Find 'X'."
      questions.push(this.createQuestion({
        subskill: 'Letter recognition (uppercase)',
        nysCodes: ['RF.K.1.d'],
        type: 'multiple_choice',
        prompt: `Find '${letter}'.`,
        ttsPrompt: `Find ${letter}.`,
        answers: [letter, ...confusers.slice(1, 4)],
        correctAnswer: letter,
        domains: ['decoding'],
        difficultyBand: 0.5 + (index / 52)
      }));
    });

    return questions;
  }

  // Letter Recognition - Lowercase (26 × 2 = 52)
  generateLetterRecognitionLowercase() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const questions = [];

    letters.forEach((letter, index) => {
      const confusers = this.getConfusers(letter, false);

      questions.push(this.createQuestion({
        subskill: 'Letter recognition (lowercase)',
        nysCodes: ['RF.K.1.d'],
        type: 'multiple_choice',
        prompt: `Which letter is '${letter}'?`,
        ttsPrompt: `Which letter is lowercase ${letter.toUpperCase()}?`,
        answers: [letter, ...confusers.slice(0, 3)],
        correctAnswer: letter,
        domains: ['decoding'],
        difficultyBand: 0.6 + (index / 52)
      }));

      questions.push(this.createQuestion({
        subskill: 'Letter recognition (lowercase)',
        nysCodes: ['RF.K.1.d'],
        type: 'multiple_choice',
        prompt: `Find '${letter}'.`,
        ttsPrompt: `Find lowercase ${letter.toUpperCase()}.`,
        answers: [letter, ...confusers.slice(1, 4)],
        correctAnswer: letter,
        domains: ['decoding'],
        difficultyBand: 0.6 + (index / 52)
      }));
    });

    return questions;
  }

  // Helper: Get confusing letters
  getConfusers(letter, uppercase = true) {
    const confuserMap = uppercase ? {
      'A': ['E', 'H', 'O', 'V'],
      'B': ['D', 'P', 'R', 'E'],
      'C': ['O', 'G', 'Q', 'D'],
      'D': ['B', 'O', 'P', 'Q'],
      'E': ['F', 'L', 'T', 'A'],
      'F': ['E', 'T', 'P', 'L'],
      'G': ['C', 'O', 'Q', 'D'],
      'H': ['N', 'M', 'A', 'K'],
      'I': ['L', 'T', 'J', 'Y'],
      'J': ['I', 'L', 'U', 'Y'],
      'K': ['X', 'R', 'H', 'N'],
      'L': ['I', 'T', 'F', 'E'],
      'M': ['N', 'W', 'H', 'A'],
      'N': ['M', 'H', 'Z', 'W'],
      'O': ['Q', 'C', 'D', 'G'],
      'P': ['R', 'B', 'D', 'F'],
      'Q': ['O', 'G', 'C', 'D'],
      'R': ['P', 'B', 'K', 'F'],
      'S': ['Z', 'C', 'G', 'E'],
      'T': ['L', 'I', 'F', 'E'],
      'U': ['V', 'Y', 'J', 'W'],
      'V': ['U', 'W', 'Y', 'X'],
      'W': ['M', 'V', 'N', 'U'],
      'X': ['K', 'Y', 'Z', 'V'],
      'Y': ['V', 'X', 'U', 'T'],
      'Z': ['S', 'N', 'X', 'Y']
    } : {
      'a': ['o', 'e', 'd', 'c'],
      'b': ['d', 'p', 'q', 'h'],
      'c': ['o', 'e', 'a', 's'],
      'd': ['b', 'p', 'q', 'a'],
      'e': ['c', 'a', 'o', 's'],
      'f': ['t', 'l', 'i', 'j'],
      'g': ['q', 'p', 'y', 'j'],
      'h': ['n', 'b', 'k', 'm'],
      'i': ['l', 'j', 't', '!'],
      'j': ['i', 'l', 'g', 'y'],
      'k': ['h', 'x', 'r', 'l'],
      'l': ['i', 'j', 't', '1'],
      'm': ['n', 'w', 'h', 'u'],
      'n': ['m', 'h', 'u', 'r'],
      'o': ['a', 'e', 'c', 'q'],
      'p': ['q', 'b', 'd', 'g'],
      'q': ['p', 'g', 'd', 'b'],
      'r': ['n', 'h', 'v', 'i'],
      's': ['z', 'c', 'e', 'a'],
      't': ['l', 'i', 'f', 'j'],
      'u': ['v', 'n', 'w', 'y'],
      'v': ['u', 'w', 'y', 'x'],
      'w': ['v', 'm', 'n', 'u'],
      'x': ['k', 'v', 'z', 'y'],
      'y': ['v', 'g', 'j', 'u'],
      'z': ['s', 'x', 'n', '2']
    };

    return confuserMap[letter] || ['A', 'B', 'C', 'D'];
  }

  // Letter Sounds (150 questions = 26 letters × ~6 variations)
  generateLetterSounds() {
    const letterSounds = [
      { letter: 'A', sound: '/a/', word: 'apple', confusers: ['/e/', '/i/', '/o/'] },
      { letter: 'B', sound: '/b/', word: 'ball', confusers: ['/d/', '/p/', '/t/'] },
      { letter: 'C', sound: '/k/', word: 'cat', confusers: ['/s/', '/t/', '/g/'] },
      { letter: 'D', sound: '/d/', word: 'dog', confusers: ['/b/', '/t/', '/g/'] },
      { letter: 'E', sound: '/e/', word: 'egg', confusers: ['/a/', '/i/', '/o/'] },
      { letter: 'F', sound: '/f/', word: 'fish', confusers: ['/v/', '/p/', '/h/'] },
      { letter: 'G', sound: '/g/', word: 'go', confusers: ['/j/', '/k/', '/d/'] },
      { letter: 'H', sound: '/h/', word: 'hat', confusers: ['/f/', '/k/', '/w/'] },
      { letter: 'I', sound: '/i/', word: 'igloo', confusers: ['/e/', '/a/', '/o/'] },
      { letter: 'J', sound: '/j/', word: 'jump', confusers: ['/g/', '/y/', '/ch/'] },
      { letter: 'K', sound: '/k/', word: 'kite', confusers: ['/c/', '/g/', '/x/'] },
      { letter: 'L', sound: '/l/', word: 'lion', confusers: ['/r/', '/w/', '/y/'] },
      { letter: 'M', sound: '/m/', word: 'map', confusers: ['/n/', '/b/', '/p/'] },
      { letter: 'N', sound: '/n/', word: 'nest', confusers: ['/m/', '/ng/', '/r/'] },
      { letter: 'O', sound: '/o/', word: 'octopus', confusers: ['/a/', '/u/', '/aw/'] },
      { letter: 'P', sound: '/p/', word: 'pig', confusers: ['/b/', '/d/', '/t/'] },
      { letter: 'Q', sound: '/kw/', word: 'queen', confusers: ['/k/', '/w/', '/g/'] },
      { letter: 'R', sound: '/r/', word: 'run', confusers: ['/l/', '/w/', '/n/'] },
      { letter: 'S', sound: '/s/', word: 'sun', confusers: ['/z/', '/c/', '/sh/'] },
      { letter: 'T', sound: '/t/', word: 'top', confusers: ['/d/', '/p/', '/k/'] },
      { letter: 'U', sound: '/u/', word: 'umbrella', confusers: ['/o/', '/a/', '/oo/'] },
      { letter: 'V', sound: '/v/', word: 'van', confusers: ['/f/', '/b/', '/w/'] },
      { letter: 'W', sound: '/w/', word: 'water', confusers: ['/v/', '/u/', '/y/'] },
      { letter: 'X', sound: '/ks/', word: 'fox', confusers: ['/s/', '/k/', '/z/'] },
      { letter: 'Y', sound: '/y/', word: 'yes', confusers: ['/w/', '/j/', '/i/'] },
      { letter: 'Z', sound: '/z/', word: 'zoo', confusers: ['/s/', '/x/', '/v/'] }
    ];

    const questions = [];

    letterSounds.forEach((item, index) => {
      const difficulty = 0.6 + (index / 40);

      // Type 1: "What sound does X make?"
      questions.push(this.createQuestion({
        subskill: 'Letter sounds',
        nysCodes: ['RF.K.3.a'],
        type: 'multiple_choice',
        prompt: `What sound does '${item.letter}' make?`,
        ttsPrompt: `What sound does ${item.letter} make?`,
        answers: [item.sound, ...item.confusers],
        ttsAnswers: [item.sound.replace(/\//g, ''), ...item.confusers.map(s => s.replace(/\//g, ''))],
        correctAnswer: item.sound,
        domains: ['decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: "What sound starts 'word'?"
      questions.push(this.createQuestion({
        subskill: 'Letter sounds',
        nysCodes: ['RF.K.3.a'],
        type: 'multiple_choice',
        prompt: `What is the first sound in '${item.word}'?`,
        ttsPrompt: `What is the first sound in ${item.word}?`,
        answers: [item.sound, ...item.confusers],
        ttsAnswers: [item.sound.replace(/\//g, ''), ...item.confusers.map(s => s.replace(/\//g, ''))],
        correctAnswer: item.sound,
        domains: ['decoding'],
        difficultyBand: difficulty + 0.1
      }));

      // Type 3: "Which letter makes the /x/ sound?"
      questions.push(this.createQuestion({
        subskill: 'Letter sounds',
        nysCodes: ['RF.K.3.a'],
        type: 'multiple_choice',
        prompt: `Which letter makes the ${item.sound} sound?`,
        ttsPrompt: `Which letter makes the ${item.sound.replace(/\//g, '')} sound?`,
        answers: [item.letter, ...this.getConfusers(item.letter, true).slice(0, 3)],
        correctAnswer: item.letter,
        domains: ['decoding'],
        difficultyBand: difficulty + 0.2
      }));

      // Type 4: "Hear the sound /x/. Which word starts with this?"
      const wordChoices = [item.word, 'dog', 'cat', 'sun'].filter((w, i, arr) => arr.indexOf(w) === i && w !== item.word).slice(0, 3);
      wordChoices.unshift(item.word);

      questions.push(this.createQuestion({
        subskill: 'Letter sounds',
        nysCodes: ['RF.K.3.a'],
        type: 'multiple_choice',
        prompt: `Which word starts with ${item.sound}?`,
        ttsPrompt: `Which word starts with the ${item.sound.replace(/\//g, '')} sound?`,
        answers: wordChoices,
        correctAnswer: item.word,
        domains: ['decoding'],
        difficultyBand: difficulty + 0.15
      }));

      // Type 5: Matching (every 3rd letter)
      if (index % 3 === 0) {
        const matchPairs = letterSounds.slice(index, index + 3).map(ls => ({
          left: ls.letter,
          right: ls.sound
        }));

        questions.push(this.createQuestion({
          subskill: 'Letter sounds',
          nysCodes: ['RF.K.3.a'],
          type: 'matching',
          prompt: 'Match letters to sounds.',
          ttsPrompt: 'Match letters to their sounds.',
          pairs: matchPairs,
          answers: null,
          correctAnswer: null,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }
    });

    return questions.slice(0, 150);
  }

  // CVC Words (200 questions)
  generateCVCWords() {
    const cvcWords = [
      // -at family
      'cat', 'bat', 'hat', 'mat', 'rat', 'sat', 'pat', 'fat', 'vat',
      // -an family
      'can', 'man', 'pan', 'ran', 'tan', 'van', 'fan', 'ban',
      // -ap family
      'cap', 'map', 'tap', 'nap', 'gap', 'lap', 'rap', 'sap',
      // -ad family
      'dad', 'mad', 'sad', 'bad', 'had', 'pad',
      // -ag family
      'bag', 'tag', 'rag', 'wag', 'sag', 'lag',
      // -am family
      'ham', 'jam', 'ram', 'dam', 'yam',
      // -et family
      'bet', 'get', 'jet', 'let', 'met', 'net', 'pet', 'set', 'wet', 'vet',
      // -en family
      'den', 'hen', 'men', 'pen', 'ten',
      // -ed family
      'bed', 'red', 'led', 'fed', 'wed',
      // -eg family
      'beg', 'leg', 'peg',
      // -ell family
      'bell', 'tell', 'well', 'sell', 'fell',
      // -it family
      'bit', 'fit', 'hit', 'kit', 'lit', 'pit', 'sit', 'wit',
      // -in family
      'bin', 'din', 'fin', 'pin', 'sin', 'tin', 'win',
      // -ig family
      'big', 'dig', 'fig', 'pig', 'wig', 'jig',
      // -id family
      'bid', 'did', 'hid', 'kid', 'lid', 'rid',
      // -ip family
      'dip', 'hip', 'lip', 'nip', 'rip', 'sip', 'tip', 'zip',
      // -ot family
      'cot', 'dot', 'got', 'hot', 'jot', 'lot', 'not', 'pot', 'rot', 'tot',
      // -op family
      'cop', 'hop', 'mop', 'pop', 'top',
      // -og family
      'dog', 'fog', 'hog', 'jog', 'log',
      // -ob family
      'cob', 'job', 'mob', 'rob', 'sob',
      // -ug family
      'bug', 'dug', 'hug', 'jug', 'mug', 'pug', 'rug', 'tug',
      // -un family
      'bun', 'fun', 'gun', 'nun', 'run', 'sun',
      // -ut family
      'but', 'cut', 'hut', 'jut', 'nut', 'rut',
      // -ub family
      'cub', 'hub', 'rub', 'sub', 'tub'
    ];

    const questions = [];

    cvcWords.forEach((word, index) => {
      const family = word.slice(1);
      const familyWords = cvcWords.filter(w => w.endsWith(family) && w !== word).slice(0, 3);
      const confusers = familyWords.length >= 3 ? familyWords : ['cat', 'dog', 'sun'].filter(w => w !== word).slice(0, 3);

      const difficulty = 0.7 + (index / 400);

      // Type 1: "Which word says 'cat'?"
      questions.push(this.createQuestion({
        subskill: 'CVC words',
        nysCodes: ['RF.K.3.b'],
        type: 'multiple_choice',
        prompt: `Which word says '${word}'?`,
        ttsPrompt: `Which word says ${word}?`,
        answers: [word, ...confusers],
        correctAnswer: word,
        domains: ['decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: "Sound out: c-a-t"
      if (index % 2 === 0) {
        questions.push(this.createQuestion({
          subskill: 'CVC words',
          nysCodes: ['RF.K.3.b'],
          type: 'multiple_choice',
          prompt: `Blend the sounds: ${word.split('').join('-')}`,
          ttsPrompt: `Blend these sounds: ${word.split('').join(', ')}`,
          answers: [word, ...confusers],
          correctAnswer: word,
          domains: ['decoding'],
          difficultyBand: difficulty + 0.1
        }));
      }
    });

    return questions.slice(0, 200);
  }

  // Sight Words (100 questions)
  generateSightWords() {
    const sightWords = [
      // Dolch Pre-Primer
      'a', 'and', 'away', 'big', 'blue', 'can', 'come', 'down', 'find', 'for',
      'funny', 'go', 'help', 'here', 'I', 'in', 'is', 'it', 'jump', 'little',
      'look', 'make', 'me', 'my', 'not', 'one', 'play', 'red', 'run', 'said',
      'see', 'the', 'three', 'to', 'two', 'up', 'we', 'where', 'yellow', 'you',
      // Dolch Primer (select)
      'all', 'am', 'are', 'at', 'ate', 'be', 'black', 'brown', 'but', 'came',
      'did', 'do', 'eat', 'four', 'get', 'good', 'have', 'he', 'into', 'like',
      'must', 'new', 'no', 'now', 'on', 'our', 'out', 'please', 'pretty', 'ran',
      'ride', 'saw', 'say', 'she', 'so', 'soon', 'that', 'there', 'they', 'this',
      'too', 'under', 'want', 'was', 'well', 'went', 'what', 'white', 'who', 'will',
      'with', 'yes'
    ];

    const questions = [];

    sightWords.forEach((word, index) => {
      const confusers = sightWords.filter(w => w !== word && Math.abs(w.length - word.length) <= 1).slice(0, 3);
      const difficulty = 0.6 + (index / 150);

      // Type 1: "Find the word 'the'"
      questions.push(this.createQuestion({
        subskill: 'Sight words',
        nysCodes: ['RF.K.3.c'],
        type: 'multiple_choice',
        prompt: `Find the word '${word}'.`,
        ttsPrompt: `Find the word ${word.toUpperCase()}.`,
        answers: [word, ...confusers],
        correctAnswer: word,
        domains: ['decoding', 'fluency'],
        difficultyBand: difficulty
      }));

      // Type 2: Matching (every 5th word)
      if (index % 5 === 0 && index + 2 < sightWords.length) {
        const matchPairs = sightWords.slice(index, index + 3).map(w => ({
          left: w,
          right: w
        }));

        questions.push(this.createQuestion({
          subskill: 'Sight words',
          nysCodes: ['RF.K.3.c'],
          type: 'matching',
          prompt: 'Match the sight words.',
          ttsPrompt: 'Match the sight words.',
          pairs: matchPairs,
          answers: null,
          correctAnswer: null,
          domains: ['decoding', 'fluency'],
          difficultyBand: difficulty
        }));
      }
    });

    return questions.slice(0, 100);
  }

  // Rhyming (46 questions)
  generateRhyming() {
    const rhymePairs = [
      { word: 'cat', rhymes: ['hat', 'bat', 'rat'], nonRhymes: ['dog', 'sun', 'bed'] },
      { word: 'dog', rhymes: ['log', 'fog', 'hog'], nonRhymes: ['cat', 'run', 'pig'] },
      { word: 'sun', rhymes: ['run', 'fun', 'bun'], nonRhymes: ['cat', 'dog', 'bed'] },
      { word: 'pig', rhymes: ['big', 'dig', 'wig'], nonRhymes: ['dog', 'cat', 'sun'] },
      { word: 'bed', rhymes: ['red', 'led', 'fed'], nonRhymes: ['cat', 'dog', 'sun'] },
      { word: 'hop', rhymes: ['top', 'mop', 'pop'], nonRhymes: ['cat', 'dog', 'run'] },
      { word: 'pen', rhymes: ['hen', 'ten', 'men'], nonRhymes: ['cat', 'dog', 'sun'] },
      { word: 'cup', rhymes: ['pup', 'up'], nonRhymes: ['dog', 'cat', 'sun'] },
      { word: 'bug', rhymes: ['hug', 'mug', 'rug'], nonRhymes: ['cat', 'dog', 'sun'] },
      { word: 'hat', rhymes: ['cat', 'bat', 'mat'], nonRhymes: ['dog', 'sun', 'pig'] },
      { word: 'bat', rhymes: ['cat', 'hat', 'rat'], nonRhymes: ['dog', 'sun', 'bed'] },
      { word: 'fan', rhymes: ['can', 'man', 'pan'], nonRhymes: ['dog', 'cat', 'sun'] },
      { word: 'sit', rhymes: ['hit', 'bit', 'fit'], nonRhymes: ['dog', 'cat', 'run'] },
      { word: 'fox', rhymes: ['box', 'ox'], nonRhymes: ['dog', 'cat', 'sun'] },
      { word: 'sock', rhymes: ['rock', 'clock'], nonRhymes: ['dog', 'cat', 'sun'] }
    ];

    const questions = [];

    rhymePairs.forEach((item, index) => {
      const difficulty = 0.7 + (index / 30);

      // Type 1: "Which word rhymes with X?"
      questions.push(this.createQuestion({
        subskill: 'Rhyming',
        nysCodes: ['RF.K.2.a'],
        type: 'multiple_choice',
        prompt: `Which word rhymes with '${item.word}'?`,
        ttsPrompt: `Which word rhymes with ${item.word}?`,
        answers: [item.rhymes[0], ...item.nonRhymes.slice(0, 3)],
        correctAnswer: item.rhymes[0],
        domains: ['decoding'],
        difficultyBand: difficulty
      }));

      // Type 2: "Do X and Y rhyme?"
      questions.push(this.createQuestion({
        subskill: 'Rhyming',
        nysCodes: ['RF.K.2.a'],
        type: 'multiple_choice',
        prompt: `Do '${item.word}' and '${item.rhymes[1] || item.rhymes[0]}' rhyme?`,
        ttsPrompt: `Do ${item.word} and ${item.rhymes[1] || item.rhymes[0]} rhyme?`,
        answers: ['Yes', 'No'],
        correctAnswer: 'Yes',
        domains: ['decoding'],
        difficultyBand: difficulty + 0.1
      }));

      // Type 3: Matching (every 5th)
      if (index % 5 === 0) {
        const matchPairs = [
          { left: item.word, right: item.rhymes[0] },
          { left: rhymePairs[Math.min(index + 1, rhymePairs.length - 1)].word, right: rhymePairs[Math.min(index + 1, rhymePairs.length - 1)].rhymes[0] }
        ];

        questions.push(this.createQuestion({
          subskill: 'Rhyming',
          nysCodes: ['RF.K.2.a'],
          type: 'matching',
          prompt: 'Match rhyming words.',
          ttsPrompt: 'Match the rhyming words.',
          pairs: matchPairs,
          answers: null,
          correctAnswer: null,
          domains: ['decoding'],
          difficultyBand: difficulty
        }));
      }
    });

    return questions.slice(0, 46);
  }

  // Generate all reading questions
  generateAll() {
    return [
      ...this.generateLetterRecognitionUppercase(),
      ...this.generateLetterRecognitionLowercase(),
      ...this.generateLetterSounds(),
      ...this.generateCVCWords(),
      ...this.generateSightWords(),
      ...this.generateRhyming()
    ];
  }
}

// ============================================================
// EXPORT COMPREHENSIVE QUESTION BANK FOR GRADE K
// ============================================================

function generateGradeKComprehensive() {
  const readingGen = new GradeKReadingGenerator();
  const readingQuestions = readingGen.generateAll();

  console.log(`Generated ${readingQuestions.length} Grade K Reading questions`);

  // TODO: Add generators for other categories:
  // - Understanding (600)
  // - Fluency (600)
  // - Math (600)
  // - Focus (600)
  // - Effort (600)

  return {
    reading: readingQuestions,
    understanding: [], // Placeholder
    fluency: [], // Placeholder
    math: [], // Placeholder
    focus: [], // Placeholder
    effort: [] // Placeholder
  };
}

// Run generator
const gradeKComprehensive = generateGradeKComprehensive();

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QuestionGenerator,
    GradeKReadingGenerator,
    generateGradeKComprehensive,
    gradeKComprehensive
  };
}
