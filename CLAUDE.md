# CLAUDE.md - LaBuBu's Balance Lab Development Guide

## Project Overview

**LaBuBu's Balance Lab** is a web-based learning platform for elementary students (e.g., Hugh Gregg Elementary, NY) designed with ADHD-friendly UX principles. The platform centers around two characters:

- **LaBuBu**: The child learner avatar whose color changes (green, red, blue) to reflect the student's focus, effort, or success
- **Hugh Gregg Gator**: The teacher/mentor mascot who provides structured guidance and encouragement throughout every lesson

### Key Objectives

1. **ADHD-Friendly Design**: No timers, minimal clutter, interactive tasks, self-paced learning
2. **Universal Access**: Built-in 504 accommodations, cross-home sync, accessibility features
3. **Engaging Gamification**: Badges, levels, clear progress visualization
4. **Mentor-Based Learning**: Gator guides every step; LaBuBu provides visual feedback
5. **Data-Driven Insights**: Progress tracking for students, teachers, and parents with Gator-narrated reports

## Repository Status

**Current State**: Empty repository (greenfield project)

This CLAUDE.md serves as the foundational reference for all AI assistants and developers working on this codebase.

---

## Architecture Vision

### Tech Stack Recommendations

*Note: Stack not yet decided. Consider these options:*

#### Frontend
- **React** or **Next.js** for component-based UI
- **TypeScript** for type safety
- **Tailwind CSS** for accessible, consistent styling
- **Framer Motion** for character animations
- **Recharts** or **Chart.js** for progress visualizations (hexagon/radar charts)
- **React Aria** or **Radix UI** for accessible components

#### Backend
- **Node.js + Express** or **Next.js API routes**
- **PostgreSQL** for student data, progress tracking
- **Prisma** or **TypeORM** for database management
- **Redis** for session management and caching
- **AWS S3** or **Cloudinary** for asset storage (character animations, audio)

#### Real-time Features
- **WebSockets** or **Server-Sent Events** for live progress updates
- **Service Workers** for offline mode and caching

#### Authentication & Security
- **OAuth 2.0** integration with school systems
- **FERPA-compliant** data handling
- **Row-level security** for multi-tenant student/teacher data

#### Deployment
- **Vercel** or **AWS** for hosting
- **Docker** for containerization
- **GitHub Actions** for CI/CD

---

## Core Design Principles

### 1. ADHD-Friendly UX (Critical)

**DO:**
- ✅ Use ample whitespace and clean layouts
- ✅ Limit on-screen elements (one task at a time)
- ✅ Provide clear, predictable navigation
- ✅ Allow self-pacing (no forced timers)
- ✅ Offer auto-save for all work
- ✅ Use simple, consistent iconography with labels
- ✅ Provide optional breaks and gentle reminders
- ✅ Break complex tasks into small, sequential steps

**DON'T:**
- ❌ Add blinking ads, pop-ups, or distracting animations
- ❌ Use cluttered interfaces with too many choices
- ❌ Implement countdown timers or time pressure
- ❌ Hide critical controls (pause, hint, exit)
- ❌ Use small fonts or low-contrast text
- ❌ Force students through content without breaks

**References:**
- [Monster Math ADHD Design](https://monstermath.app)
- [FocusBear ADHD UX Guidelines](https://focusbear.io)
- [WCAG ADHD Accessibility](https://www.w3.org/WAI/WCAG21/Understanding/)

### 2. Character-Driven Learning

#### LaBuBu (Learner Avatar)
- **Purpose**: Visual representation of student state
- **Color States**:
  - 🟢 **Green**: Focused, succeeding, confident
  - 🔴 **Red**: Struggling, needs help, taking a break
  - 🔵 **Blue**: Calm focus, steady work
- **Design**: Friendly, child-like, expressive
- **Animations**: React to correct/incorrect answers, celebrate wins
- **Psychology**: Uses color associations familiar to children (red = stop/error, green = go/success)

#### Hugh Gregg Gator (Mentor Avatar)
- **Purpose**: Consistent teacher presence across all experiences
- **Tone**: Warm, reassuring, positive, never punitive
- **Presence**: Appears in lessons, transitions, dashboards, reports
- **Voice**: Celebrates effort over perfection ("Let's try again!")
- **Design**: Bright green tones, friendly eyes, animated gestures
- **Functionality**:
  - Introduces each lesson
  - Provides hints and scaffolding
  - Celebrates achievements
  - Narrates progress in dashboards and reports
  - Offers encouragement during struggles

**References:**
- [Mascot UX Studies](https://raw.studio)
- [Child Color Psychology](https://www.psychologytoday.com)

### 3. Learning Loop Structure

Every lesson follows this pattern:

```
┌─────────────────────────────────────┐
│ 1. GUIDE (Gator Introduction)      │
│    - Gator explains the concept     │
│    - Interactive demo/story         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 2. PRACTICE (Student + LaBuBu)     │
│    - Interactive problems           │
│    - Drag-drop, tap, speak          │
│    - CRA progression (math)         │
│    - LaBuBu reacts to input         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 3. FEEDBACK (Gator + LaBuBu)       │
│    - Correct: Green LaBuBu + praise │
│    - Incorrect: Red/blue + retry    │
│    - Hints always available         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│ 4. TRANSITION (Gator Celebration)  │
│    - Positive reinforcement         │
│    - Badge/reward if earned         │
│    - Preview next goal              │
└─────────────────────────────────────┘
```

**Math-Specific**: Use **CRA Method** (Concrete → Representational → Abstract)
- **Concrete**: Drag virtual blocks/objects
- **Representational**: Count pictures/visual models
- **Abstract**: Solve equations/numbers

### 4. Progress Tracking & Visualization

#### Student Dashboard
- **Hexagon/Radar Charts**: Multi-axis skill tracking (phonics, comprehension, addition, etc.)
- **Gator Commentary**: "You're 70% to Grade 2 in Math – great focus!"
- **Clear Visual Design**: High contrast, minimal text, clear legends
- **Real-time Updates**: Charts update as students complete tasks

#### Metrics Tracked
- Accuracy per skill
- Time-on-task (without pressure)
- Hints used
- Completion rate
- Growth curves over time
- LaBuBu color distribution (time in green/red/blue)

#### Reports & Exports
- **PDF Reports**: Gator-narrated with charts and explanations
- **CSV Exports**: Raw data for special educators
- **SST Meeting Format**: Plain-language summaries for parents/teachers
- **Example**: "LaBuBu is progressing steadily! Last month: 15%, now: 45%!"

### 5. 504 Plan & Accessibility Features

**Required Accommodations:**

| Feature | Implementation |
|---------|---------------|
| **Self-Pacing** | No timers, unlimited time per task |
| **Auto-Save** | Progress saved every 30 seconds |
| **Text-to-Speech** | Read passages aloud, word definitions |
| **Adjustable Text** | Font size, dyslexic-friendly fonts |
| **Color Options** | Color-blind safe themes, high contrast |
| **Breaks** | Optional break reminders, pause anytime |
| **Clear Labels** | All icons + text, consistent language |
| **Task Checklists** | Visible progress (3 more problems to go) |
| **Differentiation** | Visual vs. abstract task formats |
| **Offline Mode** | Cache lessons, sync when online |

**FERPA Compliance**: All student data encrypted, role-based access control

---

## Codebase Structure (Planned)

```
coast-learning-spectrum/
├── .github/
│   └── workflows/           # CI/CD pipelines
├── src/
│   ├── app/                 # Next.js app directory (if Next.js)
│   │   ├── (student)/       # Student-facing routes
│   │   ├── (teacher)/       # Teacher portal
│   │   ├── (parent)/        # Parent dashboard
│   │   └── api/             # API routes
│   ├── components/
│   │   ├── characters/      # LaBuBu & Gator components
│   │   │   ├── LaBuBu.tsx
│   │   │   ├── GatorMentor.tsx
│   │   │   └── animations/
│   │   ├── lessons/         # Lesson components
│   │   │   ├── Guide.tsx
│   │   │   ├── Practice.tsx
│   │   │   ├── Feedback.tsx
│   │   │   └── Transition.tsx
│   │   ├── dashboard/       # Charts, progress widgets
│   │   ├── ui/              # Accessible UI components
│   │   └── accessibility/   # A11y helpers
│   ├── lib/
│   │   ├── db/              # Database client, Prisma schema
│   │   ├── auth/            # Authentication logic
│   │   ├── curriculum/      # Lesson content, skills taxonomy
│   │   ├── progress/        # Progress calculation engine
│   │   └── analytics/       # Metrics tracking
│   ├── hooks/               # React hooks
│   ├── types/               # TypeScript types
│   └── styles/              # Global styles, Tailwind config
├── public/
│   ├── assets/
│   │   ├── labubu/          # LaBuBu sprites/animations
│   │   ├── gator/           # Gator sprites/animations
│   │   ├── audio/           # Voice clips, sound effects
│   │   └── badges/          # Achievement icons
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── migrations/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   ├── architecture/        # Architecture decision records
│   ├── curriculum/          # Lesson plans, skill maps
│   └── accessibility/       # A11y testing reports
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── README.md
└── CLAUDE.md               # This file
```

---

## Development Workflows

### Git Branching Strategy

- **Main Branch**: `main` (protected, production-ready)
- **Development Branch**: `develop` (integration branch)
- **Feature Branches**: `feature/description` or `claude/session-id`
- **Hotfix Branches**: `hotfix/issue-description`

### Commit Conventions

Use **Conventional Commits**:

```
feat: add LaBuBu color state transitions
fix: correct Gator speech bubble positioning
docs: update CLAUDE.md with curriculum structure
style: improve dashboard chart accessibility
refactor: extract lesson loop into reusable hook
test: add unit tests for progress calculator
chore: update dependencies
```

### PR Requirements

- ✅ Descriptive title and summary
- ✅ Link to related issue/task
- ✅ Screenshots for UI changes (especially character animations)
- ✅ Accessibility checklist completed
- ✅ Tests passing (unit + integration)
- ✅ No console errors or warnings
- ✅ Responsive design verified (mobile + desktop)

### Testing Strategy

1. **Unit Tests**: Component logic, progress calculations
2. **Integration Tests**: Lesson flow, data persistence
3. **E2E Tests**: Full student journey (login → lesson → dashboard)
4. **Accessibility Tests**: Automated (axe) + manual keyboard navigation
5. **User Testing**: Real students (with parental consent + ethics approval)

---

## Key Conventions for AI Assistants

### When Working on This Codebase

#### 1. Character Consistency
- **Always** include Gator in new lesson screens
- **Never** create intimidating or punitive messaging
- **Always** celebrate effort over correctness
- **Use** positive language ("Let's try again!" not "Wrong")
- **Ensure** LaBuBu color changes reflect the design spec (green/red/blue)

#### 2. Accessibility First
- **Test** all new features with keyboard navigation
- **Verify** color contrast meets WCAG AA standards
- **Add** ARIA labels to all interactive elements
- **Provide** text alternatives for visual content
- **Ensure** forms have clear labels and error messages
- **Test** with screen readers when possible

#### 3. ADHD-Friendly Development
- **Avoid** adding timers or countdown features
- **Keep** interfaces simple (one primary action per screen)
- **Use** auto-save liberally
- **Provide** clear progress indicators
- **Allow** users to pause/resume anytime
- **Minimize** distractions (no auto-playing videos, pop-ups)

#### 4. Data Privacy & Security
- **Never** log sensitive student data to console
- **Always** use parameterized queries (prevent SQL injection)
- **Encrypt** all student PII
- **Implement** role-based access control
- **Follow** FERPA guidelines for educational data
- **Provide** data export options for parents/teachers

#### 5. Code Quality
- **Use TypeScript** with strict mode enabled
- **Write** descriptive comments for complex logic
- **Extract** reusable components (DRY principle)
- **Keep** components small and focused
- **Use** semantic HTML (header, nav, main, section)
- **Optimize** images and assets for performance
- **Test** on multiple devices and browsers

#### 6. Curriculum & Content
- **Align** with Common Core standards (or local curriculum)
- **Scaffold** difficulty progressively
- **Provide** multiple pathways (visual, auditory, kinesthetic)
- **Use** the CRA method for math content
- **Include** diverse representation in examples
- **Avoid** culturally biased content

### Common Tasks & Patterns

#### Adding a New Lesson Type

```typescript
// Example structure for a new lesson
interface Lesson {
  id: string;
  title: string;
  grade: number;
  subject: 'math' | 'reading' | 'integrated';
  skills: string[];  // e.g., ['addition', 'counting']

  guide: {
    gatorIntro: string;
    interactiveDemo: React.ComponentType;
  };

  practice: {
    problems: Problem[];
    format: 'multiple-choice' | 'drag-drop' | 'text-input' | 'voice';
  };

  feedback: {
    correct: GatorResponse;
    incorrect: GatorResponse;
    hints: string[];
  };

  transition: {
    celebration: string;
    badgeEarned?: Badge;
    nextLesson?: string;
  };
}
```

#### Creating a New Gator Response

```typescript
// Gator should always be encouraging
const gatorResponses = {
  correct: [
    "Excellent work, LaBuBu!",
    "You nailed it! Great focus!",
    "That's exactly right – wonderful thinking!"
  ],
  incorrect: [
    "Almost there! Let's look at this together.",
    "Good try! Want to see a hint?",
    "I can see you're thinking hard. Let me help!"
  ],
  encouragement: [
    "You're doing great – keep it up!",
    "I'm proud of your effort!",
    "Remember, every mistake helps us learn!"
  ]
};

// Pick random response for variety
const getGatorResponse = (type: keyof typeof gatorResponses) => {
  const responses = gatorResponses[type];
  return responses[Math.floor(Math.random() * responses.length)];
};
```

#### Updating LaBuBu's Color State

```typescript
// LaBuBu color logic
type LaBuBuMood = 'green' | 'red' | 'blue';

const updateLaBuBuMood = (
  recentAnswers: boolean[],
  currentStreak: number
): LaBuBuMood => {
  const recentCorrect = recentAnswers.filter(Boolean).length;
  const recentTotal = recentAnswers.length;
  const accuracy = recentCorrect / recentTotal;

  if (accuracy >= 0.7 || currentStreak >= 3) {
    return 'green';  // Doing well!
  } else if (accuracy < 0.3 && currentStreak === 0) {
    return 'red';    // Struggling, needs support
  } else {
    return 'blue';   // Steady progress
  }
};
```

#### Building Accessible Charts

```typescript
// Always include ARIA labels and descriptions
<RadarChart
  data={studentProgress}
  aria-label="Student skill progress chart"
  aria-describedby="chart-description"
>
  <text id="chart-description">
    This chart shows your progress across different skills.
    You are 70% complete in Math and 85% complete in Reading.
  </text>
  {/* Gator commentary next to chart */}
</RadarChart>

<GatorSpeechBubble>
  You're 70% to Grade 2 in Math – great focus!
</GatorSpeechBubble>
```

---

## Content Guidelines

### Gator's Voice & Tone

**Characteristics:**
- **Warm & Friendly**: Like a favorite teacher
- **Encouraging**: Focuses on growth mindset
- **Patient**: Never frustrated or disappointed
- **Clear**: Uses simple language (grade-appropriate)
- **Positive**: Celebrates small wins

**Examples:**

| Context | What Gator Says |
|---------|----------------|
| Lesson intro | "Today we're learning about long vowels! This is going to be fun!" |
| Correct answer | "Excellent work! You really understood that concept!" |
| Incorrect answer | "Good try! Let's think about this together. Want a hint?" |
| Struggle detected | "I see you're working hard. Remember, it's okay to take your time!" |
| Achievement | "WOW! You earned the Reading Star badge! I'm so proud of you!" |
| Break time | "Great focus today! Want to take a quick break?" |
| Progress report | "LaBuBu improved 15% this month – that's real growth!" |

**Avoid:**
- ❌ "That's wrong."
- ❌ "Try harder."
- ❌ "You should know this."
- ❌ Sarcasm or disappointment
- ❌ Comparisons to other students

### LaBuBu's Expressions

| State | Color | Animation | Context |
|-------|-------|-----------|---------|
| Success | Green | Jumping, smiling, thumbs up | Correct answers, achievements |
| Struggle | Red | Puzzled look, scratching head | Incorrect answers, confusion |
| Focused | Blue | Steady, thoughtful, reading | Deep concentration, calm work |
| Excited | Green | Dancing, sparkles | Earned badge, leveled up |
| Taking break | Blue | Yawning, stretching | Break time, paused lesson |

---

## Integration Points

### School Systems Integration

**SSO (Single Sign-On):**
- Clever
- ClassLink
- Google Classroom
- Microsoft School Data Sync

**LMS Integration:**
- Canvas
- Schoology
- Google Classroom
- Moodle

### Parent Communication

- Email notifications (assignment reminders, progress updates)
- SMS alerts (optional, for important milestones)
- Parent portal (web + mobile-responsive)
- Weekly Gator-narrated summary emails

### Data Export Formats

- **PDF**: Progress reports with charts + Gator commentary
- **CSV**: Raw data for educators (skill mastery, time-on-task, etc.)
- **JSON**: API access for school admin systems
- **IEP/504 Format**: Specialized reports for special education teams

---

## Performance & Optimization

### Critical Metrics

- **Page Load**: < 2 seconds on 3G connection
- **Time to Interactive**: < 3 seconds
- **Animation FPS**: 60fps (smooth character movement)
- **Asset Size**: Optimize images (WebP), lazy-load lessons
- **Offline Support**: Service worker caches core lessons

### Monitoring

- **Error Tracking**: Sentry or LogRocket
- **Analytics**: Privacy-respecting (no third-party tracking)
- **Performance**: Lighthouse CI in GitHub Actions
- **Uptime**: Status page for school administrators

---

## Future Expansion

### Domain-Specific Gators (Planned)

- **Math Gator**: Specializes in arithmetic, geometry
- **Reading Gator**: Focuses on phonics, comprehension
- **Science Gator**: Guides experiments, inquiry learning

**Architecture Note**: Character assets and voice clips stored separately per domain. Backend is modular to support plug-in character variants while maintaining consistent mentor persona.

### LaBuBu Customization (Planned)

- Skin tone options
- Hair color/style
- Clothing themes
- Maintain core mood-color mechanic (green/red/blue)

### Additional Features (Roadmap)

- [ ] Multiplayer lessons (collaborative problem-solving)
- [ ] Teacher-created custom lessons
- [ ] Voice input for answers (speech recognition)
- [ ] AR/VR mode for immersive learning
- [ ] Mobile app (iOS/Android)
- [ ] Print-at-home worksheets (Gator-guided)
- [ ] Parent coaching videos (Gator explains how to help at home)

---

## Resources & References

### Research & Design

- **ADHD UX Design**: [Monster Math](https://monstermath.app), [FocusBear](https://focusbear.io)
- **Accessibility Standards**: [WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
- **Child Psychology**: [Color Perception](https://www.psychologytoday.com)
- **Mascot UX**: [RAW Studio Studies](https://raw.studio)
- **Universal Design for Learning**: [CAST UDL Guidelines](http://udlguidelines.cast.org/)

### Technical Documentation

- **Next.js**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **React Aria**: [https://react-spectrum.adobe.com/react-aria/](https://react-spectrum.adobe.com/react-aria/)
- **Prisma**: [https://www.prisma.io/docs](https://www.prisma.io/docs)
- **Tailwind CSS**: [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

### Compliance & Privacy

- **FERPA**: [Family Educational Rights and Privacy Act](https://www2.ed.gov/policy/gen/guid/fpco/ferpa/index.html)
- **COPPA**: [Children's Online Privacy Protection Act](https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa)
- **504 Plans**: [Section 504 Overview](https://www2.ed.gov/about/offices/list/ocr/504faq.html)

---

## Questions for AI Assistants

When uncertain, ask the team:

1. **Character Behavior**: "Should Gator respond differently for kindergarten vs. 2nd grade?"
2. **Accessibility**: "Does this color contrast meet WCAG AA standards?"
3. **Curriculum**: "Is this math problem aligned with Common Core 1.OA.1?"
4. **Privacy**: "Does this feature need parental consent?"
5. **UX**: "Is this interaction too complex for ADHD-friendly design?"

---

## Getting Started (For AI Assistants)

### First-Time Setup (When Codebase Exists)

1. **Read** this CLAUDE.md in full
2. **Review** README.md for installation steps
3. **Check** architecture docs in `/docs/architecture`
4. **Understand** the character design (LaBuBu & Gator)
5. **Explore** `/src/components/characters` to see current implementation
6. **Run** the development server and test a lesson flow
7. **Review** accessibility checklist before making changes

### Making Changes

1. **Plan** with TodoWrite for complex tasks
2. **Read** existing files before editing
3. **Follow** ADHD-friendly and accessibility principles
4. **Test** changes with keyboard navigation
5. **Include** Gator's voice in new screens
6. **Update** LaBuBu's state appropriately
7. **Commit** with conventional commit messages
8. **Document** any architecture decisions

### Code Review Checklist

Before submitting PR, verify:

- [ ] Gator appears and provides encouragement
- [ ] LaBuBu color states work correctly
- [ ] No timers or time pressure added
- [ ] UI is simple and uncluttered
- [ ] All interactive elements have ARIA labels
- [ ] Color contrast meets WCAG AA
- [ ] Works with keyboard navigation
- [ ] Auto-save implemented (if applicable)
- [ ] No student PII in logs or console
- [ ] Responsive on mobile and desktop
- [ ] Tests passing
- [ ] No console errors

---

## Contact & Support

**For Questions:**
- Create GitHub issue with `[question]` tag
- Ping the team in development channel

**For Bugs:**
- Create GitHub issue with `[bug]` tag
- Include steps to reproduce
- Attach screenshots (especially for character/UI bugs)

**For Feature Requests:**
- Create GitHub issue with `[feature]` tag
- Explain educational value and user need
- Consider ADHD-friendly and accessibility implications

---

## Version History

- **v1.0** (2025-11-25): Initial CLAUDE.md created for greenfield project

---

## License & Credits

**Project**: LaBuBu's Balance Lab
**Target Users**: Elementary students (K-3), particularly those with ADHD or 504 plans
**Educational Partner**: Hugh Gregg Elementary School, NY

**Character Design Credits**:
- LaBuBu concept & mood-color system
- Hugh Gregg Gator mascot

**Built With**:
- ❤️ Passion for inclusive education
- 🧠 Research-backed learning science
- 🎨 Engaging character design
- ♿ Accessibility-first principles

---

**Remember**: Every line of code we write impacts a child's learning journey. Let's make it count! 🐊✨
