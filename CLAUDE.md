# CLAUDE.md - Learning Spectrum Development Guide

## Project Overview

**Learning Spectrum** is a K–5 learning companion that tracks reading, math, focus, and effort across home and school, using color, characters, and clear charts to show where a child is now and how they're growing toward their goals.

### Tagline
*"Every color of how they learn."*

### Mission
Learning Spectrum exists to give families and schools a **shared, honest view** of a child's learning journey — academic, emotional, and behavioral — and to turn that understanding into small, doable steps forward, every day.

### Vision
A world where every student — especially neurodivergent kids on 504 plans — is seen as more than "behind" or "ahead," and where their **spectrum of strengths, struggles, bravery, and progress** is visible and valued.

### Core Characters

- **LaBuBu**: The student avatars (plural). Every student is represented as a LaBuBu whose colors reflect their learning state across the spectrum.
- **Hugh Gregg Gator**: The teacher/mentor guide (singular). A calm, reassuring presence who narrates progress and offers support.

---

## Repository Status

**Current State**: Greenfield project (repository initialized with foundational documentation)

This CLAUDE.md serves as the foundational reference for all AI assistants and developers working on this codebase. It is based on real-world needs of families with children on 504 plans, particularly those at Hugh Gregg Elementary, NY.

---

## Brand Pillars (Non-Negotiable)

These are the core principles you must quote to guide all development decisions:

### 1. Spectrum, Not a Single Score
- We **don't reduce kids to one number**
- Show **multiple axes**: reading, math, focus, bravery, home/school use, etc.
- Visualize progress across a spectrum, not a single metric

### 2. Stability First
- **Data should never lie or randomly vanish**
- **Export/Import/Resume/Reset are sacred** — never skip these features
- Every update has diagnostics and a bug tracker section
- If something conflicts with stability, **stability wins**

### 3. Gator-Guided, Student-Centered
- **Gator** is the calm teacher/mentor
- **LaBuBu** is the student avatar — many LaBuBus, many kids, many colors
- Gator narrates; students experience

### 4. 504-Aware by Design
- Breaks, pacing, visual simplicity, and mood states are **built-in, not bolted on**
- **ADHD isn't a side-case; it's the core user**
- If something conflicts with a 504 accommodation, **the 504 wins. Always.**

### 5. Shared Language Between Home and School
- The **same charts and words** appear at home and in SST meetings
- Learning Spectrum is something parents and teachers can **point to together**
- Exports are designed for SST meetings, not just "reports"

---

## Architecture Vision

### The Three-Grade System (Critical)

Every student's progress is mapped across **three grades**:

```
┌──────────────┬──────────────┬──────────────┐
│   ENROLLED   │   CURRENT    │    TARGET    │
├──────────────┼──────────────┼──────────────┤
│ Grade they're│ Grade level  │ Grade level  │
│   attending  │   they're at │   we're      │
│              │   right now  │   aiming for │
└──────────────┴──────────────┴──────────────┘

Example: Wednesday is ENROLLED in Grade 2,
         CURRENT level is early Grade 1,
         TARGET is mid-Grade 2 by end of year
```

**CRITICAL RULES:**
- If these three grades are not clear in any chart, **design needs revision**
- Every chart, every dashboard, every export must show this progression
- This is the "shared language" between parents, teachers, and SST teams

### Tech Stack Recommendations

*Note: Stack not yet decided. Consider these options:*

#### Frontend
- **Next.js 14+** with App Router (React Server Components)
- **TypeScript** (strict mode) for type safety
- **Tailwind CSS** for the "calm room" UI design
- **Recharts** for spectrum/radar charts (accessible, customizable)
- **Framer Motion** (sparingly) for subtle character animations
- **React Aria** or **Radix UI** for accessible, unstyled components

#### Backend
- **Next.js API routes** (collocated with frontend)
- **PostgreSQL** for student data, progress tracking (FERPA-compliant hosting)
- **Prisma** for database management (strong type safety + migrations)
- **Redis** for session management and caching

#### AI/ML Features
- **OCR for Screenshot Import**: Tesseract.js or Google Cloud Vision API
- **LLM for Data Extraction**: Claude API or GPT-4 to parse school reports
- **Pattern Matching**: Extract grade levels, skills, scores from varied report formats

#### Real-time & Offline
- **Service Workers** for offline mode (sacred feature)
- **IndexedDB** for local storage when offline
- **Sync engine** to reconcile home/school data

#### Authentication & Security
- **OAuth 2.0** for school SSO (Clever, ClassLink, Google Classroom)
- **Row-level security** (multi-tenant student/teacher/parent data)
- **FERPA-compliant** data handling (encryption at rest and in transit)

#### Deployment
- **Vercel** (Next.js optimized, edge functions)
- **Docker** for self-hosted school deployments (some districts require on-prem)
- **GitHub Actions** for CI/CD
- **Sentry** for error tracking (no PII in logs)

---

## Core Design Principles

### 1. The "Calm Room" UI Palette

The UI should feel like a **quiet, organized classroom** — not a game.

**Core UI Colors** (for backgrounds, cards, buttons):

| Color | Hex | Usage |
|-------|-----|-------|
| Deep Navy | `#111827` | Headers, navigation anchors |
| Slate Gray | `#4B5563` | Secondary text, icons |
| Light Gray | `#E5E7EB` | Card backgrounds |
| White | `#FFFFFF` | Main content background |
| Accent Teal | `#14B8A6` | Links, primary confirm buttons |

**These are the "calm room" of the app. The rainbow lives inside this room.**

### 2. The Spectrum/Mood Colors

These are layered **ON TOP** of the calm UI, not everywhere:

| Color | Hex | Meaning | Usage |
|-------|-----|---------|-------|
| 🔴 Red | `#EF4444` | Brave / Trying something hard | LaBuBu mood, chart accent |
| 🟠 Orange | `#F97316` | Retry / Learning from mistakes | Retry indicators |
| 🟡 Yellow | `#FACC15` | Curious / Exploring | Exploration state |
| 🟢 Green | `#10B981` | Focus / In the groove | Success, focus state |
| 🔵 Blue | `#3B82F6` | Success / Calm mastery | Steady progress |
| 🟣 Violet | `#8B5CF6` | Creative / Combined tasks | Integrated lessons |
| ⚪ White | `#F9FAFB` | Reset / Break | Break time, paused |
| ⚫ Charcoal | `#1F2937` | Quiet / Overwhelmed | Signal for teacher intervention |
| 💗 Pink | `#EC4899` | Encouragement / Extra support | Gator's extra support |
| 🟡✨ Gold | `#EAB308` | Mastery / Milestone | Achievements, badges |

**Usage Rules:**
- Appear as **LaBuBu's body color**
- **Small chart accents** (not full backgrounds)
- **Progress badges** and **thin borders/glows**
- **Never full-screen blinding backgrounds** — always on the calm gray/white base

### 3. Typography

**Primary Font**: Nunito or Poppins (clean, friendly sans-serif)
- **Headers**: Semi-bold (600)
- **Body**: Regular (400)
- **Avoid**: Italics, script fonts, decorative fonts

**Accessibility**:
- Minimum 16px body text
- 1.5 line height for paragraphs
- WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)

### 4. Logo & Branding

**Text Lockup**:
```
Learning Spectrum
(Nunito Semi-Bold, ~24pt)
```

**Symbol**: A simple arc of 3–5 colored segments (rainbow) above or behind the text. Optionally a subtle outline of LaBuBu's head silhouette or small Gator head at the side.

**Usage**:
- **Full text** "Learning Spectrum" on reports, dashboards, SST docs
- **Favicon**: Little rainbow arc or hex with an "S" inside
- **Keep it flat and simple** — think "school report header" more than game logo

---

## Character System

### LaBuBu (Students)

**Role**: Every student is represented as a LaBuBu.

**Visual Design**:
- Friendly, child-like avatar
- **Color changes** to reflect learning state (spectrum colors above)
- Skin/hair/clothing can be configurable (future)
- Mood shown through **glow, background, or clothing color**

**States & Colors**:

| State | Color | When It Appears |
|-------|-------|-----------------|
| Brave | 🔴 Red | Attempting hard problems, pushing boundaries |
| Retry | 🟠 Orange | Trying again after mistakes |
| Curious | 🟡 Yellow | Exploring new concepts |
| Focused | 🟢 Green | In the flow, succeeding consistently |
| Calm Success | 🔵 Blue | Steady mastery, calm confidence |
| Creative | 🟣 Violet | Working on integrated/multi-step tasks |
| Break | ⚪ White | Taking a break, paused |
| Overwhelmed | ⚫ Charcoal | Needs immediate support (triggers teacher alert) |

**Code Example**:
```typescript
type LaBuBuMood =
  | 'brave'       // 🔴 Red
  | 'retry'       // 🟠 Orange
  | 'curious'     // 🟡 Yellow
  | 'focused'     // 🟢 Green
  | 'success'     // 🔵 Blue
  | 'creative'    // 🟣 Violet
  | 'break'       // ⚪ White
  | 'overwhelmed' // ⚫ Charcoal
  ;

const getMoodColor = (mood: LaBuBuMood): string => {
  const colors = {
    brave: '#EF4444',
    retry: '#F97316',
    curious: '#FACC15',
    focused: '#10B981',
    success: '#3B82F6',
    creative: '#8B5CF6',
    break: '#F9FAFB',
    overwhelmed: '#1F2937',
  };
  return colors[mood];
};
```

### Hugh Gregg Gator (Teacher)

**Role**: The calm, guiding teacher in Learning Spectrum. Always singular (one Gator for all students).

**Tone & Voice**:
- **Warm & Friendly**: Like a favorite teacher
- **Encouraging**: Growth mindset, celebrates effort
- **Patient**: Never frustrated or disappointed
- **Clear**: Simple, literal language (grade-appropriate)
- **Positive**: Celebrates small wins

**Where Gator Appears**:
- Dashboard (explaining charts)
- SST reports (speech bubbles with plain-language summaries)
- Transitions between sessions
- Break reminders
- Encouragement during struggles

**Gator's Voice Examples**:

| Context | What Gator Says |
|---------|----------------|
| Dashboard intro | "Hey LaBuBu, ready to check your Learning Spectrum today?" |
| Correct answer | "You worked so hard on that — that's real bravery." |
| Incorrect answer | "Good try! Let's look at that one again together." |
| Break reminder | "If you're feeling tired or wiggly, it's okay to tap 'Break' and come back." |
| Progress to adult | "Today, Wednesday completed a short math session at home. Her skills are moving from late 1st-grade level toward early 2nd-grade targets." |
| SST report | "She shows strongest growth in decoding nonsense words; we can now lean more into comprehension." |

**What Gator NEVER Says**:
- ❌ "That's wrong."
- ❌ "Try harder."
- ❌ "You should know this."
- ❌ Sarcasm or disappointment
- ❌ Comparisons to other students

---

## Core Features

### 1. The Three-Grade Dashboard (Critical)

Every dashboard must show:

```
┌─────────────────────────────────────────────────┐
│  Learning Spectrum Dashboard                    │
│  [Gator icon] "See where your spectrum is today"│
├─────────────────────────────────────────────────┤
│                                                 │
│   [Spectrum Chart: Hexagon/Radar]              │
│                                                 │
│   Axes:                                         │
│   - Reading (Enrolled 2 → Current 1.2 → Target 2.5)│
│   - Math (Enrolled 2 → Current 1.8 → Target 2.0)  │
│   - Focus                                       │
│   - Bravery (retry rate)                        │
│   - Home/School use                             │
│                                                 │
│   [Gator speech bubble]:                        │
│   "You're 60% to your target in reading.       │
│    Let's keep going — you're doing great!"     │
│                                                 │
├─────────────────────────────────────────────────┤
│  Buttons:                                       │
│  [Start New Session] [Resume] [View Progress]  │
│  [Export Profile] [Import Profile]             │
└─────────────────────────────────────────────────┘
```

**Chart Requirements**:
- Must always show **Enrolled, Current, Target** grades for each skill
- Use **spectrum colors** for data points (not full backgrounds)
- Include **Gator's plain-language commentary** next to every chart
- ARIA labels for accessibility
- Exportable to PDF (for SST meetings)

### 2. Screenshot Import (Critical New Feature)

**User Story**: "As a parent, I should be able to screenshot a school progress report and import my child's stats into Learning Spectrum."

**Requirements**:
1. **Upload Interface**: Simple drag-drop or file picker
2. **OCR Processing**: Extract text from image (Tesseract.js or Cloud Vision)
3. **LLM Parsing**: Use Claude or GPT-4 to identify:
   - Student name
   - Grade enrolled
   - Subject areas (Reading, Math, etc.)
   - Current performance levels
   - Specific skills (e.g., "short vowels," "addition to 20")
4. **Manual Review**: Show extracted data for parent/teacher to confirm
5. **Merge Strategy**: Append new data, don't overwrite existing progress
6. **Diagnostics**: Show confidence scores, flag any uncertain extractions

**Example Flow**:
```
1. Parent uploads screenshot of report card
2. System extracts: "Wednesday, Grade 2, Reading: 1.2, Math: 1.8"
3. Show preview: "We found these stats — look good?"
4. Parent confirms or edits
5. Data merges into Learning Spectrum
6. Gator says: "Got it! I've updated Wednesday's spectrum."
```

**Technical Notes**:
- Handle **varied report formats** (NY State, IEP, 504, progress monitoring)
- Support **handwritten notes** (teachers often annotate reports)
- Privacy: **Never upload to third-party services without consent**
- Offline mode: Queue uploads, process when online

### 3. Export/Import/Resume/Reset (Sacred Features)

These features are **non-negotiable**. They ensure **stability first**.

#### Export Profile
- **Format**: JSON (for re-import) + PDF (for SST)
- **Contents**: All student data, progress history, three-grade mappings
- **Gator Narration**: PDF includes Gator speech bubbles explaining charts
- **Privacy**: Encrypted, password-protected option

#### Import Profile
- **Upload JSON** from previous export
- **Merge or Replace**: Ask user which strategy
- **Validation**: Check for data integrity, flag conflicts
- **Diagnostics**: Show what was imported, what was skipped

#### Resume
- **Always available**: Student can pick up exactly where they left off
- **State persistence**: Current lesson, question, mood color, session timer
- **Cross-device**: Resume on different device (home → school)

#### Reset Session (Keep Progress)
- **Soft reset**: Clear current session, keep historical data
- **Use case**: "Start fresh today, but don't lose last week's progress"
- **Confirmation**: "This will start a new session. Your progress will be saved. Continue?"

### 4. Modes (Spectrum Views)

Learning Spectrum has multiple "modes" (views) for different skill areas:

| Mode | Focus | Chart Axes |
|------|-------|------------|
| **Reading Spectrum** | Literacy tasks | Phonics, decoding, comprehension, fluency |
| **Math Spectrum** | Numeracy tasks | Counting, operations, word problems, geometry |
| **Combined Spectrum** | Integrated tasks | Reading + math + directions |
| **Focus & Bravery** | Attention, retries | Time-on-task, retry rate, break frequency |
| **Home & School Bridge** | Usage across locations | Sessions at home vs. school, consistency |

### 5. Diagnostics & Stability Panel

**CRITICAL**: Every session has a diagnostics panel (not visible to kids by default, but accessible to adults).

**What It Shows**:
- [ ] Session ID (for debugging)
- [ ] Data integrity checks (no null values, valid grade ranges)
- [ ] Export/import logs
- [ ] Bug tracker (user can report issues directly)
- [ ] Network status (online/offline)
- [ ] Sync status (home/school data reconciled?)

**Why This Matters**:
- Builds **trust** with parents/teachers
- Makes debugging **transparent**
- Reinforces **stability first** principle

---

## Learning Flow

### Session Structure

```
┌─────────────────────────────────────┐
│ 1. DASHBOARD                        │
│    - View spectrum chart            │
│    - Gator greeting                 │
│    - Choose mode or resume          │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 2. PRACTICE (LaBuBu-Centered)      │
│    - Interactive problems           │
│    - LaBuBu mood changes in real    │
│      time                           │
│    - No timers, self-paced          │
│    - Break button always visible    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 3. FEEDBACK (Gator Guidance)       │
│    - Gator explains what happened   │
│    - "You were brave to try that!"  │
│    - Show progress toward target    │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 4. UPDATE SPECTRUM                  │
│    - Chart updates with new data    │
│    - Gator narrates: "You moved     │
│      5% closer to your target!"     │
│    - Option to continue or finish   │
└─────────────────────────────────────┘
```

**Key Differences from Typical Ed-Tech**:
- No "levels" or "streaks" (gamification minimized)
- No leaderboards or comparisons
- Focus on **individual spectrum**, not ranking
- Gator is **supportive**, not "fun mascot"

---

## Data Model (Proposed)

### Core Entities

```typescript
// Student (LaBuBu)
interface Student {
  id: string;
  name: string;
  gradeEnrolled: number;  // e.g., 2 (for Grade 2)
  schoolId: string;

  // Customization
  avatarConfig: {
    skinTone?: string;
    hairColor?: string;
    clothing?: string;
  };

  // 504/IEP
  accommodations: string[];  // e.g., ["extended time", "frequent breaks"]
}

// Progress Entry
interface ProgressEntry {
  id: string;
  studentId: string;
  subject: 'reading' | 'math' | 'combined';
  skill: string;  // e.g., "short vowels", "addition to 20"

  // Three-grade system
  gradeEnrolled: number;
  gradeCurrent: number;   // Current performance level (can be decimal: 1.2, 2.5)
  gradeTarget: number;    // Target by end of period

  // Metrics
  accuracy: number;       // 0-1
  timeOnTask: number;     // seconds (no pressure, just for tracking)
  hintsUsed: number;
  retryCount: number;

  // Context
  location: 'home' | 'school';
  sessionId: string;
  timestamp: Date;

  // Mood/state
  moodAtStart: LaBuBuMood;
  moodAtEnd: LaBuBuMood;
}

// Session
interface Session {
  id: string;
  studentId: string;
  mode: 'reading' | 'math' | 'combined' | 'focus';

  startTime: Date;
  endTime?: Date;

  // Resumability
  currentQuestion?: number;
  state: 'active' | 'paused' | 'completed';

  // Diagnostics
  diagnostics: {
    dataIntegrityChecks: boolean;
    syncStatus: 'synced' | 'pending' | 'conflict';
    errorLog: string[];
  };
}

// Imported Report (from screenshot)
interface ImportedReport {
  id: string;
  studentId: string;
  uploadDate: Date;

  // OCR/LLM extraction
  rawText: string;
  extractedData: {
    gradeEnrolled?: number;
    skills: Array<{
      subject: string;
      skill: string;
      level: number;
      confidence: number;  // 0-1 (how sure the AI is)
    }>;
  };

  // Manual review
  reviewed: boolean;
  confirmedBy?: string;  // parent/teacher ID
}
```

---

## Codebase Structure (Planned)

```
coast-learning-spectrum/
├── .github/
│   └── workflows/              # CI/CD
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (student)/          # Student-facing routes
│   │   │   ├── dashboard/
│   │   │   ├── reading/
│   │   │   ├── math/
│   │   │   └── combined/
│   │   ├── (teacher)/          # Teacher portal
│   │   ├── (parent)/           # Parent dashboard
│   │   └── api/                # API routes
│   │       ├── import/         # Screenshot import endpoint
│   │       ├── export/         # Profile export
│   │       ├── sync/           # Home/school sync
│   │       └── ocr/            # OCR processing
│   ├── components/
│   │   ├── characters/
│   │   │   ├── LaBuBu.tsx      # Student avatar with mood colors
│   │   │   ├── GatorMentor.tsx # Teacher guide
│   │   │   └── animations/
│   │   ├── charts/
│   │   │   ├── SpectrumChart.tsx  # Three-grade hexagon chart
│   │   │   ├── GatorNarration.tsx # Speech bubbles
│   │   │   └── ProgressBar.tsx
│   │   ├── import/
│   │   │   ├── ScreenshotUpload.tsx
│   │   │   ├── OCRPreview.tsx
│   │   │   └── ManualReview.tsx
│   │   ├── session/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Practice.tsx
│   │   │   ├── Feedback.tsx
│   │   │   └── Resume.tsx
│   │   ├── diagnostics/
│   │   │   ├── StabilityPanel.tsx
│   │   │   ├── DataIntegrity.tsx
│   │   │   └── BugReporter.tsx
│   │   └── ui/                 # Accessible UI primitives
│   ├── lib/
│   │   ├── db/                 # Prisma client, schema
│   │   ├── ocr/                # Tesseract or Cloud Vision
│   │   ├── llm/                # Claude/GPT-4 for parsing
│   │   ├── sync/               # Home/school data reconciliation
│   │   ├── export/             # Profile export (JSON, PDF)
│   │   ├── three-grade/        # Logic for Enrolled→Current→Target
│   │   └── mood/               # LaBuBu mood calculation
│   ├── hooks/
│   │   ├── useSession.ts
│   │   ├── useResume.ts
│   │   ├── useExport.ts
│   │   └── useImport.ts
│   ├── types/
│   │   ├── student.ts
│   │   ├── progress.ts
│   │   ├── session.ts
│   │   └── spectrum.ts
│   └── styles/
│       ├── globals.css         # Calm room palette
│       └── spectrum.css        # Mood/spectrum colors
├── public/
│   ├── assets/
│   │   ├── labubu/             # Student avatar sprites
│   │   ├── gator/              # Gator animations
│   │   ├── audio/              # Minimal sound (optional)
│   │   └── badges/             # Milestone icons (minimal)
├── prisma/
│   ├── schema.prisma           # Database schema
│   └── migrations/
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── accessibility/          # Keyboard nav, screen reader tests
├── docs/
│   ├── architecture/           # ADRs (Architecture Decision Records)
│   ├── three-grade-system.md  # Deep dive on Enrolled→Current→Target
│   ├── screenshot-import.md   # OCR/LLM implementation guide
│   └── sst-reports.md          # SST meeting export formats
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js          # Calm room + spectrum colors
├── README.md
├── CLAUDE.md                   # This file
└── BRAND.md                    # Full brand guidelines
```

---

## Development Workflows

### Git Branching Strategy

- **Main Branch**: `main` (protected, production-ready)
- **Development Branch**: `develop` (integration)
- **Feature Branches**: `feature/description` or `claude/session-id`
- **Hotfix Branches**: `hotfix/issue`

### Commit Conventions

Use **Conventional Commits**:

```
feat: add screenshot import with OCR
fix: correct three-grade mapping in spectrum chart
docs: update CLAUDE.md with stability-first principles
style: apply calm room palette to dashboard
refactor: extract Gator narration into reusable component
test: add unit tests for LaBuBu mood calculation
chore: update dependencies
```

### Testing Strategy

1. **Unit Tests**: Three-grade logic, mood calculations, OCR parsing
2. **Integration Tests**: Import/export, home/school sync
3. **E2E Tests**: Full session flow (dashboard → practice → export)
4. **Accessibility Tests**: Automated (axe) + manual keyboard/screen reader
5. **Stability Tests**: Data integrity checks, offline mode, resume functionality

---

## Key Conventions for AI Assistants

### When Working on This Codebase

#### 1. Stability First (Critical)
- **NEVER** skip export/import/resume/reset functionality
- **ALWAYS** include diagnostics and data integrity checks
- **ALWAYS** test offline mode and sync
- **IF** something conflicts with stability, **choose stability**

#### 2. Three-Grade System (Critical)
- **EVERY** chart must show Enrolled → Current → Target
- **NEVER** show a single grade or percentage without context
- **ALWAYS** use Gator to narrate what the grades mean in plain language

#### 3. Character Consistency
- **LaBuBu** = students (plural), mood colors reflect learning state
- **Gator** = teacher (singular), calm and supportive
- **NEVER** make Gator punitive or sarcastic
- **ALWAYS** celebrate effort over correctness

#### 4. Calm Room UI
- **Core UI** = Deep Navy, Slate Gray, Light Gray, White, Accent Teal
- **Spectrum colors** = layered on top, not full backgrounds
- **NEVER** use rainbow colors for navigation or buttons
- **ALWAYS** use spectrum colors for data, badges, LaBuBu mood

#### 5. ADHD-Friendly Design
- **NO** timers or countdown clocks (time-on-task tracking is passive, not pressuring)
- **NO** cluttered interfaces
- **YES** to breaks, pause, resume
- **YES** to auto-save every 30 seconds
- **YES** to one task at a time

#### 6. 504-Aware
- **IF** something conflicts with a 504 accommodation, **the 504 wins. Always.**
- **ALWAYS** provide break buttons, pause options
- **NEVER** penalize slow work
- **ALWAYS** celebrate persistence

#### 7. Data Privacy & Security
- **NEVER** log PII to console or error trackers
- **ALWAYS** encrypt student data at rest
- **ALWAYS** use role-based access control
- **FOLLOW** FERPA guidelines
- **PROVIDE** data export for parents/teachers (they own the data)

#### 8. SST/Parent Communication
- **EVERY** export includes Gator narration
- **EVERY** chart has plain-language explanation
- **AVOID** jargon, edu-speak, acronyms (unless defined)
- **USE** "we" and "let's" (collaborative tone)

### Common Tasks & Patterns

#### Implementing the Three-Grade Chart

```typescript
interface ThreeGradeData {
  subject: string;
  gradeEnrolled: number;
  gradeCurrent: number;
  gradeTarget: number;
}

const SpectrumChart: React.FC<{ data: ThreeGradeData[] }> = ({ data }) => {
  return (
    <div className="spectrum-chart">
      <RadarChart
        data={data}
        aria-label="Learning spectrum across subjects"
        aria-describedby="spectrum-description"
      >
        {/* Chart implementation */}
      </RadarChart>

      <div id="spectrum-description" className="sr-only">
        {data.map(d =>
          `${d.subject}: Enrolled in Grade ${d.gradeEnrolled},
           currently at Grade ${d.gradeCurrent},
           targeting Grade ${d.gradeTarget}.`
        ).join(' ')}
      </div>

      <GatorNarration>
        {generateNarration(data)}
      </GatorNarration>
    </div>
  );
};

const generateNarration = (data: ThreeGradeData[]): string => {
  const reading = data.find(d => d.subject === 'reading');
  if (!reading) return "Let's look at your progress.";

  const progress = (reading.gradeCurrent - reading.gradeEnrolled) /
                   (reading.gradeTarget - reading.gradeEnrolled);
  const percent = Math.round(progress * 100);

  return `You're ${percent}% to your target in reading. Let's keep going!`;
};
```

#### Screenshot Import Flow

```typescript
const handleScreenshotUpload = async (file: File) => {
  // 1. OCR
  const ocrText = await extractTextFromImage(file);

  // 2. LLM parsing
  const extracted = await parseWithLLM(ocrText, {
    expectedFields: ['studentName', 'gradeEnrolled', 'skills'],
  });

  // 3. Manual review
  const confirmed = await showPreviewModal(extracted);

  // 4. Merge data
  if (confirmed) {
    await mergeProgressData(studentId, extracted);
    showGatorMessage("Got it! I've updated your spectrum.");
  }
};
```

#### Export Profile (Sacred Feature)

```typescript
const exportProfile = async (studentId: string) => {
  // 1. Gather all data
  const student = await db.student.findUnique({ where: { id: studentId } });
  const progress = await db.progressEntry.findMany({ where: { studentId } });
  const sessions = await db.session.findMany({ where: { studentId } });

  // 2. Generate JSON
  const json = {
    version: '1.0.0',
    exportDate: new Date().toISOString(),
    student,
    progress,
    sessions,
    diagnostics: {
      dataIntegrity: true,
      totalEntries: progress.length,
    },
  };

  // 3. Download
  downloadJSON(json, `learning-spectrum-${student.name}.json`);

  // 4. Generate PDF (for SST)
  const pdf = await generateSSTPDF(student, progress);
  downloadPDF(pdf, `sst-report-${student.name}.pdf`);
};
```

---

## Content Guidelines

### Gator's Voice (For Kids)

**Tone**: Simple, literal, kind. Lots of "we" and "let's". Short sentences. Celebrate effort, not genius.

| Context | What Gator Says |
|---------|----------------|
| Dashboard greeting | "Hey LaBuBu, ready to check your Learning Spectrum today?" |
| Correct answer | "Nice work! That took real focus." |
| Incorrect answer | "Good try — let's look at that one again together." |
| Brave attempt | "You were so brave to try that hard question." |
| Break reminder | "If you're feeling wiggly, tap 'Break' anytime." |
| Progress milestone | "You moved a little closer to your goal today. I'm proud of you." |

### Gator's Voice (For Adults)

**Tone**: Calm, respectful, neutral. Data + story. No blame or loaded words.

| Context | What Gator Says |
|---------|----------------|
| Dashboard summary | "Today, Wednesday completed a short math session at home. Her skills are moving from late 1st-grade level toward early 2nd-grade targets." |
| Insight | "She does best with concrete examples before abstract problems." |
| Progress report | "Her reading skills are currently around early 2nd-grade level, and she's steadily closing the gap toward mid-3rd-grade targets." |
| Accommodation note | "This chart suggests she needs more frequent breaks during math problem-solving." |

---

## SST Report Format

### Report Header (Use This Exact Format)

```
┌─────────────────────────────────────────────────┐
│  Learning Spectrum Progress Report              │
│                                                 │
│  Student: [Name]                                │
│  School: Hugh Gregg Elementary, NY              │
│  Date: [Date]                                   │
│  Prepared by: Learning Spectrum (Gator Guide)   │
└─────────────────────────────────────────────────┘
```

### Short Description for SST Packet

**What is Learning Spectrum?**

Learning Spectrum is a web-based tool used at home and at school to track [Student]'s learning across reading, math, focus, and effort. It doesn't label them as "behind" or "ahead" with a single number — instead, it shows progress as a **spectrum**, with separate views for what grade they're in, the level they're working at, and the level we're all aiming for.

The Hugh Gregg Gator acts as a teacher guide in the app, and [Student] is represented as "LaBuBu," a student avatar whose colors change with their focus, effort, and success. This visual system helps them understand their own learning and helps the adults around them see where they shine, where they struggle, and where they're growing.

### One-Line Summary (For Teachers)

"Learning Spectrum gives us a shared picture of where they are right now and how they're moving toward the grade-level expectations we've set together."

---

## Brand Guidelines (Quick Rules)

Copy-paste this into any design doc:

1. **Always use** "Learning Spectrum" in formal contexts (not "LaBuBu's Balance Lab")
2. **Rainbow colors belong to the spectrum data and LaBuBu**, not the whole UI
3. **The Gator never scolds.** All Gator text must be supportive, factual, growth-oriented
4. **Charts must always map to three grades: Enrolled, Current, Target.** If unclear, redesign.
5. **Every mode must support Export/Import/Resume/Reset.** No exceptions.
6. **No timers, no countdowns.** Effort > speed.
7. **All adult-facing language = neutral & collaborative.** No "lazy," "unmotivated," etc.
8. **Kids always see where they're going next.** Target is never hidden.
9. **Learning Spectrum is not a replacement** for teachers/parents/therapists. It's a shared lens.
10. **If something conflicts with a 504, the 504 wins. Always.**

---

## Resources & References

### Research & Design
- **ADHD UX**: [Monster Math](https://monstermath.app), [FocusBear](https://focusbear.io)
- **Accessibility**: [WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- **UDL**: [CAST Guidelines](http://udlguidelines.cast.org/)

### Technical
- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Prisma**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Tailwind**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Tesseract.js**: [https://tesseract.projectnaptha.com/](https://tesseract.projectnaptha.com/)

### Compliance
- **FERPA**: [https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html](https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html)
- **COPPA**: [https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)
- **504 Plans**: [https://www2.ed.gov/about/offices/list/ocr/504faq.html](https://www2.ed.gov/about/offices/list/ocr/504faq.html)

---

## Getting Started (For AI Assistants)

### First-Time Setup

1. **Read** this CLAUDE.md + BRAND.md in full
2. **Understand** the Three-Grade System (Enrolled → Current → Target)
3. **Review** the Calm Room UI palette + Spectrum colors
4. **Study** Gator's voice (kids vs. adults)
5. **Internalize** Stability First principle

### Making Changes

1. **Plan** with TodoWrite for complex tasks
2. **Read** existing files before editing
3. **Follow** Stability First, ADHD-friendly, 504-aware principles
4. **Test** export/import/resume if touching data
5. **Include** Gator narration for any new charts
6. **Update** LaBuBu mood logic if changing feedback
7. **Commit** with conventional commit messages
8. **Document** architecture decisions in `/docs`

### Code Review Checklist

Before submitting PR:

- [ ] Stability: Export/Import/Resume/Reset work correctly
- [ ] Three-Grade System: Charts show Enrolled → Current → Target
- [ ] Gator Voice: Supportive, never punitive
- [ ] Calm Room UI: Spectrum colors only for data, not backgrounds
- [ ] ADHD-Friendly: No timers, one task at a time, breaks available
- [ ] 504-Aware: Accommodations respected
- [ ] Accessibility: Keyboard nav, ARIA labels, WCAG AA contrast
- [ ] Data Privacy: No PII in logs
- [ ] Tests: Unit + integration + e2e passing
- [ ] Documentation: CLAUDE.md or ADRs updated if needed

---

## Version History

- **v2.0** (2025-11-25): Complete rebrand to Learning Spectrum, stability-first architecture, three-grade system, screenshot import
- **v1.0** (2025-11-25): Initial "LaBuBu's Balance Lab" concept (deprecated)

---

## License & Credits

**Project**: Learning Spectrum
**Tagline**: "Every color of how they learn."
**Target Users**: K–5 students, particularly those with ADHD or 504 plans
**Educational Partner**: Hugh Gregg Elementary School, NY

**Character Credits**:
- LaBuBu avatars (student representations with spectrum mood colors)
- Hugh Gregg Gator (calm teacher/mentor guide)

**Built With**:
- ❤️ Real families, real needs
- 🧠 Stability-first engineering
- 🎨 Spectrum-based design
- ♿ 504-aware from day one

---

**Remember**: Every line of code impacts a child's learning journey and a parent's ability to understand and support them. Stability, clarity, and honesty are not optional. 🐊🌈
