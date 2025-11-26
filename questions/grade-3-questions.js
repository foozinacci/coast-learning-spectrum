/**
 * Learning Spectrum - Grade 3 Questions
 * NYS Next Generation ELA & Math Standards Aligned
 * Difficulty Band: 2.0 - 2.5
 * Total Questions: 72 (12 per category)
 */

const grade3Questions = {
  reading: require('./templates/grade-3-reading.json') || [
    {id:"Q_READ_G3_001",grade:3,diagnosticCategory:"Reading",subskill:"Diphthongs",nysCodes:["RF.3.3.c"],type:"multiple_choice",prompt:"Which word has the 'oi' sound?",ttsPrompt:"Which word has the O-I sound?",answers:["coin","cone","cane","can"],ttsAnswers:["coin","cone","cane","can"],correctAnswer:"coin",domains:["decoding"],difficultyBand:2.1,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    {id:"Q_READ_G3_002",grade:3,diagnosticCategory:"Reading",subskill:"Multisyllabic words",nysCodes:["RF.3.3.c"],type:"multiple_choice",prompt:"How many syllables in 'computer'?",ttsPrompt:"How many syllables in computer?",answers:["3","2","4","1"],ttsAnswers:["3","2","4","1"],correctAnswer:"3",domains:["decoding"],difficultyBand:2.2,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    // ... 10 more reading questions  (Total: 12)
  ],
  understanding: [
    {id:"Q_UNDER_G3_001",grade:3,diagnosticCategory:"Understanding",subskill:"Main idea",nysCodes:["RL.3.2"],type:"multiple_choice",prompt:"A story about a girl who saves a forest. What's the main idea?",ttsPrompt:"A story about a girl who saves a forest. What's the main idea?",answers:["A girl protects nature","A girl goes to school","A girl has a pet","A girl plays games"],ttsAnswers:["A girl protects nature","A girl goes to school","A girl has a pet","A girl plays games"],correctAnswer:"A girl protects nature",domains:["comprehension"],difficultyBand:2.1,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    // ... 11 more understanding questions (Total: 12)
  ],
  fluency: [
    {id:"Q_FLUENCY_G3_001",grade:3,diagnosticCategory:"Fluency",subskill:"Reading rate",nysCodes:["RF.3.4.b"],type:"multiple_choice",prompt:"Good 3rd grade readers read about:",ttsPrompt:"Good 3rd grade readers read about:",answers:["90-100 words per minute","10 words per minute","500 words per minute","1 word per minute"],ttsAnswers:["90 to 100 words per minute","10 words per minute","500 words per minute","1 word per minute"],correctAnswer:"90-100 words per minute",domains:["fluency"],difficultyBand:2.2,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    // ... 11 more fluency questions (Total: 12)
  ],
  math: [
    {id:"Q_MATH_G3_001",grade:3,diagnosticCategory:"Math",subskill:"Multiplication fluency",nysCodes:["3.OA.7"],type:"multiple_choice",prompt:"7 × 8 = ?",ttsPrompt:"7 times 8 equals what?",answers:["56","48","64","54"],ttsAnswers:["56","48","64","54"],correctAnswer:"56",domains:["math"],difficultyBand:2.3,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    {id:"Q_MATH_G3_002",grade:3,diagnosticCategory:"Math",subskill:"Division fluency",nysCodes:["3.OA.7"],type:"multiple_choice",prompt:"24 ÷ 6 = ?",ttsPrompt:"24 divided by 6 equals what?",answers:["4","6","3","5"],ttsAnswers:["4","6","3","5"],correctAnswer:"4",domains:["math"],difficultyBand:2.3,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    // ... 10 more math questions (Total: 12)
  ],
  focus: [
    {id:"Q_FOCUS_G3_001",grade:3,diagnosticCategory:"Focus",subskill:"Multi-step directions",nysCodes:["SL.3.2"],type:"multiple_choice",prompt:"'Take out homework, put it on desk, then get a pencil.' What's SECOND?",ttsPrompt:"Take out homework, put it on desk, then get a pencil. What's second?",answers:["Put it on desk","Take out homework","Get a pencil","Sit down"],ttsAnswers:["Put it on desk","Take out homework","Get a pencil","Sit down"],correctAnswer:"Put it on desk",domains:["executive"],difficultyBand:2.2,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    // ... 11 more focus questions (Total: 12)
  ],
  effort: [
    {id:"Q_EFFORT_G3_001",grade:3,diagnosticCategory:"Effort",subskill:"Growth mindset",nysCodes:["SEL"],type:"multiple_choice",prompt:"Which shows a growth mindset?",ttsPrompt:"Which shows a growth mindset?",answers:["I can improve with practice!","I'll never be good at this.","Some people are just smart.","I give up."],ttsAnswers:["I can improve with practice!","I'll never be good at this.","Some people are just smart.","I give up."],correctAnswer:"I can improve with practice!",domains:["emotions"],difficultyBand:2.2,captainUnderpantsStyle:false,isPreferenceQuestion:false},
    {id:"Q_EFFORT_G3_002",grade:3,diagnosticCategory:"Effort",subskill:"Coping preferences",nysCodes:["SEL"],type:"preference",prompt:"When frustrated with work, what helps you most?",ttsPrompt:"When frustrated with work, what helps you most?",options:["Take a 5-minute break","Ask for help","Try a different strategy","Do jumping jacks"],ttsAnswers:["Take a 5-minute break","Ask for help","Try a different strategy","Do jumping jacks"],domains:["emotions","executive"],difficultyBand:2.1,captainUnderpantsStyle:false,isPreferenceQuestion:true},
    // ... 10 more effort questions (Total: 12)
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = grade3Questions;
}
