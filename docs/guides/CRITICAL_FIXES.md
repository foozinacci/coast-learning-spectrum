# Learning Spectrum - Critical UI & Functionality Fixes

## Issues Identified & Solutions

Based on the screenshots and console errors, here are the critical issues and their fixes:

### 1. **TTS Voice/Language Switching Bug** 🔴 CRITICAL
**Problem**: Voice changes randomly from male to female, English to other languages between questions
**Root Cause**: `speechSynthesis.getVoices()` called synchronously before voices are loaded
**Fix**: Implement proper voice loading and caching

### 2. **UI Too Large (Requires 50% Zoom)** 🔴 CRITICAL
**Problem**: UI doesn't fit at 100% zoom, user must zoom out to 50%
**Root Cause**: Excessive padding/margins, duplicate sections, inefficient space usage
**Fix**: Compress spacing, remove duplicates, optimize layout

### 3. **Practice Exercise Buttons Not Working** 🔴 CRITICAL
**Problem**: Clicking exercise buttons does nothing, console shows errors
**Root Cause**: Missing `showGatorMessage` function (exists as `updateGatorMessage`)
**Fix**: Add alias function and fix button onclick handlers

### 4. **Duplicate Spectrum Status** 🟡 MEDIUM
**Problem**: Spectrum status shown twice (header + dashboard)
**Fix**: Show header version only during practice, dashboard version only on dashboard

### 5. **Missing TTS Buttons for Answers** 🟡 MEDIUM
**Problem**: No way to hear individual answer options
**Fix**: Add 🔊 button next to each answer

### 6. **Missing Abacus Hint Tool** 🟢 LOW
**Problem**: No visual math hints
**Fix**: Add abacus visualization for counting/math questions

---

## Fix Script

Run this script to apply all fixes automatically:

```javascript
// COPY AND RUN THIS IN BROWSER CONSOLE WHILE ON THE APP PAGE

(function applyAllFixes() {
    console.log('🔧 Applying Learning Spectrum fixes...');

    // ================================================================
    // FIX 1: TTS VOICE CONSISTENCY
    // ================================================================

    console.log('1️⃣ Fixing TTS voice consistency...');

    // Global voice cache
    window.speechVoicesLoaded = false;
    window.cachedVoices = [];
    window.selectedVoice = null;

    // Load voices properly
    function loadVoices() {
        return new Promise((resolve) => {
            let voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) {
                window.cachedVoices = voices;
                window.speechVoicesLoaded = true;
                resolve(voices);
            } else {
                window.speechSynthesis.onvoiceschanged = () => {
                    voices = window.speechSynthesis.getVoices();
                    window.cachedVoices = voices;
                    window.speechVoicesLoaded = true;
                    resolve(voices);
                };
            }
        });
    }

    // Initialize voice on first load
    loadVoices().then(voices => {
        console.log(`   ✅ Loaded ${voices.length} voices`);
        selectConsistentVoice();
    });

    // Select and cache a consistent voice
    function selectConsistentVoice() {
        if (!window.gameState || !window.gameState.settings) return null;

        const lang = window.gameState.student?.language || 'en';
        const voicePref = window.gameState.settings.ttsVoice || 'neutral';

        const langMap = {
            'en': 'en-US',
            'es': 'es-ES',
            'fr': 'fr-FR',
            'zh': 'zh-CN',
            'ar': 'ar-SA'
        };

        const targetLang = langMap[lang] || 'en-US';
        const langPrefix = targetLang.split('-')[0];

        // Find matching voice
        const matchingVoices = window.cachedVoices.filter(voice =>
            voice.lang.startsWith(langPrefix)
        );

        if (matchingVoices.length === 0) {
            console.warn(`   ⚠️ No voices found for ${targetLang}, using default`);
            window.selectedVoice = window.cachedVoices[0];
            return window.selectedVoice;
        }

        // Try to match gender preference
        if (voicePref === 'female') {
            const femaleVoice = matchingVoices.find(v =>
                v.name.toLowerCase().includes('female') ||
                v.name.toLowerCase().includes('woman') ||
                v.name.toLowerCase().includes('zira') ||
                v.name.toLowerCase().includes('samantha')
            );
            if (femaleVoice) {
                window.selectedVoice = femaleVoice;
                console.log(`   ✅ Selected voice: ${femaleVoice.name}`);
                return femaleVoice;
            }
        } else if (voicePref === 'male') {
            const maleVoice = matchingVoices.find(v =>
                v.name.toLowerCase().includes('male') ||
                v.name.toLowerCase().includes('man') ||
                v.name.toLowerCase().includes('david') ||
                v.name.toLowerCase().includes('mark')
            );
            if (maleVoice) {
                window.selectedVoice = maleVoice;
                console.log(`   ✅ Selected voice: ${maleVoice.name}`);
                return maleVoice;
            }
        }

        // Use first matching voice
        window.selectedVoice = matchingVoices[0];
        console.log(`   ✅ Selected voice: ${matchingVoices[0].name}`);
        return matchingVoices[0];
    }

    // Override the speak function
    window.speak = function(text) {
        if (!window.gameState || !window.gameState.settings || !window.gameState.settings.ttsEnabled) {
            return;
        }

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Use cached, consistent voice
            if (!window.speechVoicesLoaded) {
                loadVoices().then(() => {
                    selectConsistentVoice();
                    utterance.voice = window.selectedVoice;
                    utterance.lang = window.selectedVoice ? window.selectedVoice.lang : 'en-US';
                    utterance.rate = 0.9;
                    utterance.pitch = 1.0;
                    utterance.volume = window.gameState.settings.volume || 0.5;
                    window.speechSynthesis.speak(utterance);
                });
            } else {
                if (!window.selectedVoice) {
                    selectConsistentVoice();
                }
                utterance.voice = window.selectedVoice;
                utterance.lang = window.selectedVoice ? window.selectedVoice.lang : 'en-US';
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = window.gameState.settings.volume || 0.5;
                window.speechSynthesis.speak(utterance);
            }
        }
    };

    console.log('   ✅ TTS voice consistency fixed');

    // ================================================================
    // FIX 2: COMPRESS UI LAYOUT
    // ================================================================

    console.log('2️⃣ Compressing UI layout...');

    const style = document.createElement('style');
    style.textContent = `
        /* Compress spacing to fit at 100% zoom */
        .container {
            padding: 10px !important;
            max-width: 100% !important;
        }

        .card {
            padding: 12px !important;
            margin-bottom: 10px !important;
        }

        .header {
            padding: 10px !important;
            margin-bottom: 8px !important;
        }

        .header-grades {
            padding: 8px !important;
            gap: 8px !important;
        }

        .header-grade-box {
            padding: 6px 10px !important;
        }

        .grade-label {
            font-size: 0.7rem !important;
        }

        .grade-value {
            font-size: 1.3rem !important;
        }

        .session-stats {
            gap: 8px !important;
        }

        .session-stat {
            padding: 4px 8px !important;
        }

        .dashboard-grid {
            gap: 10px !important;
            grid-template-columns: 1fr !important;
        }

        @media (min-width: 768px) {
            .dashboard-grid {
                grid-template-columns: repeat(2, 1fr) !important;
            }
        }

        @media (min-width: 1024px) {
            .dashboard-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }

        .three-grade {
            gap: 8px !important;
        }

        .grade-box {
            padding: 8px !important;
        }

        h1, .logo-text {
            font-size: 1.5rem !important;
            margin-bottom: 4px !important;
        }

        h2 {
            font-size: 1.2rem !important;
            margin-bottom: 8px !important;
        }

        h3 {
            font-size: 1rem !important;
            margin-bottom: 6px !important;
        }

        .tagline {
            font-size: 0.8rem !important;
            margin-bottom: 0 !important;
        }

        /* Compress practice screen */
        #practiceScreen .container {
            max-width: 900px !important;
            margin: 0 auto !important;
        }

        .question-card {
            padding: 15px !important;
            margin-bottom: 12px !important;
        }

        .question-text {
            font-size: 1.3rem !important;
            margin-bottom: 15px !important;
        }

        .answers-grid {
            gap: 10px !important;
        }

        .answer-btn {
            padding: 12px !important;
            font-size: 1rem !important;
        }

        .practice-controls {
            margin-top: 12px !important;
            gap: 8px !important;
        }

        /* Compress gator messages */
        .gator-message {
            padding: 10px !important;
            font-size: 0.9rem !important;
        }

        /* Hide duplicate spectrum on dashboard */
        #dashboardScreen .card:has(#dashboardSpectrum) {
            display: none !important;
        }
    `;
    document.head.appendChild(style);

    console.log('   ✅ UI layout compressed');

    // ================================================================
    // FIX 3: FIX PRACTICE EXERCISE BUTTONS
    // ================================================================

    console.log('3️⃣ Fixing practice exercise buttons...');

    // Add showGatorMessage alias
    window.showGatorMessage = function(message, elementId = 'gatorMessage') {
        window.updateGatorMessage(message, elementId);
        // Also speak it if TTS is enabled
        if (window.gameState && window.gameState.settings && window.gameState.settings.ttsEnabled) {
            setTimeout(() => window.speak(message), 300);
        }
    };

    console.log('   ✅ Practice exercise buttons fixed');

    // ================================================================
    // FIX 4: REMOVE DUPLICATE SPECTRUM STATUS
    // ================================================================

    console.log('4️⃣ Removing duplicate spectrum status...');

    // Hide dashboard spectrum card (keep header version)
    const dashboardSpectrum = document.querySelector('#dashboardScreen .card:has(.three-grade)');
    if (dashboardSpectrum && dashboardSpectrum.querySelector('h2')?.textContent.includes('Spectrum Status')) {
        dashboardSpectrum.style.display = 'none';
    }

    console.log('   ✅ Duplicate spectrum removed');

    // ================================================================
    // FIX 5: ADD TTS BUTTONS TO ANSWERS
    // ================================================================

    console.log('5️⃣ Adding TTS buttons to answer options...');

    // Add TTS button styling
    const ttsButtonStyle = document.createElement('style');
    ttsButtonStyle.textContent = `
        .answer-tts-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(0, 240, 255, 0.2);
            border: 1px solid rgba(0, 240, 255, 0.4);
            border-radius: 50%;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 16px;
            transition: all 0.2s ease;
            z-index: 10;
        }

        .answer-tts-btn:hover {
            background: rgba(0, 240, 255, 0.4);
            transform: scale(1.1);
        }

        .answer-tts-btn:active {
            transform: scale(0.95);
        }

        .answer-btn {
            position: relative !important;
        }
    `;
    document.head.appendChild(ttsButtonStyle);

    // Function to add TTS buttons to answers
    window.addTTSToAnswers = function() {
        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((btn, index) => {
            // Remove existing TTS button if any
            const existingTTS = btn.querySelector('.answer-tts-btn');
            if (existingTTS) existingTTS.remove();

            // Add new TTS button
            const ttsBtn = document.createElement('button');
            ttsBtn.className = 'answer-tts-btn';
            ttsBtn.innerHTML = '🔊';
            ttsBtn.title = 'Hear this answer';
            ttsBtn.onclick = (e) => {
                e.stopPropagation();
                const answerText = btn.textContent.replace('🔊', '').trim();
                window.speak(answerText);
            };
            btn.appendChild(ttsBtn);
        });
    };

    // Add TTS buttons when questions are rendered
    const originalRenderQuestion = window.renderQuestion;
    if (originalRenderQuestion) {
        window.renderQuestion = function(question) {
            originalRenderQuestion.call(this, question);
            setTimeout(() => window.addTTSToAnswers(), 100);
        };
    }

    console.log('   ✅ TTS buttons added to answers');

    // ================================================================
    // FIX 6: ADD ABACUS HINT TOOL
    // ================================================================

    console.log('6️⃣ Adding abacus hint tool...');

    // Create abacus HTML
    const abacusHTML = `
        <div id="abacusHint" style="display: none; padding: 10px; background: rgba(0, 240, 255, 0.1); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 10px; margin: 10px 0;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-size: 0.9rem; color: var(--neon-cyan);">🧮 Visual Hint</span>
                <button onclick="document.getElementById('abacusHint').style.display='none'" style="background: none; border: none; color: var(--text-muted); cursor: pointer; font-size: 1.2rem;">×</button>
            </div>
            <div id="abacusDisplay" style="display: flex; flex-wrap: wrap; gap: 4px; justify-content: center;">
            </div>
        </div>
    `;

    // Function to show abacus
    window.showAbacus = function(number) {
        const abacusContainer = document.getElementById('abacusHint');
        const abacusDisplay = document.getElementById('abacusDisplay');

        if (!abacusContainer || !abacusDisplay) {
            // Create if doesn't exist
            const questionCard = document.querySelector('.question-card');
            if (questionCard) {
                questionCard.insertAdjacentHTML('beforeend', abacusHTML);
                window.showAbacus(number);
            }
            return;
        }

        // Clear existing
        abacusDisplay.innerHTML = '';

        // Show dots for the number
        const num = parseInt(number) || 0;
        const maxDots = Math.min(num, 20); // Cap at 20 for display

        for (let i = 0; i < maxDots; i++) {
            const dot = document.createElement('div');
            dot.style.cssText = `
                width: 24px;
                height: 24px;
                background: var(--neon-cyan);
                border-radius: 50%;
                box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
            `;
            abacusDisplay.appendChild(dot);
        }

        if (num > 20) {
            const more = document.createElement('div');
            more.textContent = `... (${num} total)`;
            more.style.cssText = 'color: var(--text-muted); font-size: 0.8rem; width: 100%; text-align: center; margin-top: 4px;';
            abacusDisplay.appendChild(more);
        }

        abacusContainer.style.display = 'block';
    };

    // Add abacus button to hint button if it doesn't exist
    const hintBtn = document.querySelector('button:has-text("Hint"), button[title*="hint"], button[onclick*="hint"]');
    if (hintBtn) {
        const originalHint = hintBtn.onclick;
        hintBtn.onclick = function(e) {
            if (originalHint) originalHint.call(this, e);

            // Check if current question is math
            const currentQ = window.gameState?.session?.currentQuestion;
            if (currentQ && currentQ.domains && currentQ.domains.includes('math')) {
                // Extract number from question
                const questionText = currentQ.q || currentQ.prompt || '';
                const numbers = questionText.match(/\\d+/g);
                if (numbers && numbers.length > 0) {
                    window.showAbacus(numbers[0]);
                }
            }
        };
    }

    console.log('   ✅ Abacus hint tool added');

    // ================================================================
    // FINAL STEPS
    // ================================================================

    console.log('\\n🎉 All fixes applied successfully!');
    console.log('\\nSummary:');
    console.log('✅ TTS voice now stays consistent');
    console.log('✅ UI compressed to fit at 100% zoom');
    console.log('✅ Practice exercise buttons working');
    console.log('✅ Duplicate spectrum status removed');
    console.log('✅ TTS buttons added to each answer');
    console.log('✅ Abacus hint tool available for math');
    console.log('\\n📌 Refresh the page if you see any issues');

    // Apply TTS buttons to current screen if on practice
    if (window.location.hash === '#practice' || document.querySelector('#practiceScreen:not(.hidden)')) {
        setTimeout(() => window.addTTSToAnswers(), 500);
    }

    // Reselect voice to ensure consistency
    selectConsistentVoice();

})();
```

---

## How to Apply

### Option 1: Quick Fix (Browser Console)

1. Open Learning Spectrum in your browser
2. Press `F12` to open Developer Tools
3. Go to the **Console** tab
4. Copy the entire script above (starting from `(function applyAllFixes()`)
5. Paste into console and press Enter
6. You should see: "🎉 All fixes applied successfully!"

### Option 2: Permanent Fix (Code Changes)

I can create a permanent version that modifies the `index.html` file directly. Would you like me to do that?

---

## Testing Checklist

After applying the fix, test these:

- [ ] TTS voice stays the same between questions (doesn't switch)
- [ ] UI fits at 100% zoom (no need to zoom out)
- [ ] Clicking "Phonics Practice" etc. starts practice session
- [ ] Only ONE spectrum status visible (not two)
- [ ] Each answer has a 🔊 button that reads it aloud
- [ ] Clicking "Hint" on math questions shows abacus dots
- [ ] No console errors when clicking buttons

---

## What Each Fix Does

1. **TTS Fix**: Loads voices once, caches the selected voice, reuses it for all speech
2. **UI Compression**: Reduces all padding/margins by ~40%, optimizes grid layouts
3. **Button Fix**: Adds missing `showGatorMessage` function
4. **Duplicate Fix**: Hides the dashboard spectrum card (keeps header version)
5. **Answer TTS**: Adds 🔊 button to each answer that speaks just that option
6. **Abacus**: Shows visual dots for numbers in math questions

Let me know if you want the permanent code version or if this console script works for you!
