# Learning Spectrum Documentation

## Quick Start

- **[Main README](../README.md)** - Project overview and getting started
- **[CLAUDE.md](../CLAUDE.md)** - Development guidelines and architecture
- **[BRAND.md](../BRAND.md)** - Brand guidelines, voice, and colors

## Guides

| Guide | Purpose |
|-------|---------|
| [DEPLOY.md](guides/DEPLOY.md) | Vercel deployment instructions |
| [COMPREHENSIVE-INTEGRATION.md](guides/COMPREHENSIVE-INTEGRATION.md) | How all modules work together |
| [COMPACT-UI-GUIDE.md](guides/COMPACT-UI-GUIDE.md) | Compact UI CSS usage |
| [CONTENT_SPEC.md](guides/CONTENT_SPEC.md) | Content and question specifications |
| [CACHE-CLEAR-INSTRUCTIONS.md](guides/CACHE-CLEAR-INSTRUCTIONS.md) | Browser cache troubleshooting |

## Question Bank

| Document | Purpose |
|----------|---------|
| [README.md](questions/README.md) | Questions directory overview |
| [IMPLEMENTATION_STATUS.md](questions/IMPLEMENTATION_STATUS.md) | Question completion status by grade |
| [COMPREHENSIVE_QUESTION_BANK_SUMMARY.md](questions/COMPREHENSIVE_QUESTION_BANK_SUMMARY.md) | Detailed question bank specs |

## Technical References

| Guide | Purpose |
|-------|---------|
| [ENHANCEMENTS-SUMMARY.md](guides/ENHANCEMENTS-SUMMARY.md) | Recent feature additions |
| [CRITICAL_FIXES.md](guides/CRITICAL_FIXES.md) | Bug fixes applied |
| [STRESS_TEST_FIX_SUMMARY.md](guides/STRESS_TEST_FIX_SUMMARY.md) | Question repetition fixes |
| [INTEGRATION-GUIDE.md](guides/INTEGRATION-GUIDE.md) | Legacy integration approach |
| [PRACTICE_EXERCISE_INTEGRATION_GUIDE.md](guides/PRACTICE_EXERCISE_INTEGRATION_GUIDE.md) | Practice exercise details |

## File Structure

```
coast-learning-spectrum/
├── index.html                    # Main application (all-in-one SPA)
├── ui-enhancements.css           # Visual theme styles
├── ui-compact-overhaul.css       # Space optimization styles
├── enhancements-module.js        # Badge system, mood theming
├── load-question-banks.js        # Question loading utilities
├── integration-patch-comprehensive.js  # Feature patches
├── questions/
│   ├── grade-*-comprehensive.js  # Question banks by grade (K-5)
│   ├── enhanced-question-generator.js  # Runtime question utilities
│   └── generators/               # Dev tools for generating questions
├── docs/
│   ├── guides/                   # Integration and deployment guides
│   └── questions/                # Question bank documentation
├── CLAUDE.md                     # AI assistant guidelines
├── BRAND.md                      # Brand standards
└── README.md                     # Project overview
```

## Current Status

**Version**: 2.0.0
**State**: MVP complete, deployed to Vercel
**Question Coverage**: K-2 complete (100%), Grades 3-5 partial (8%)

### What's Working
- Three-grade system (Enrolled → Current → Target)
- Spectrum radar charts
- LaBuBu mood system
- Badge/achievement system
- Export/Import (JSON + PDF)
- localStorage persistence
- Text-to-Speech
- Responsive UI
- Diagnostics panel

### Known Limitations
- Screenshot import (OCR) not yet implemented
- Offline mode (Service Workers) not yet implemented
- No parent/teacher portal separation
- UI theme is "cyberpunk" style (vs. spec "calm room")
