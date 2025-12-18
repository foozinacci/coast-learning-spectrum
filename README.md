# 🌈 Learning Spectrum

**Every color of how they learn.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-in--development-yellow.svg)

---

## 🎯 Mission

Learning Spectrum exists to give families and schools a **shared, honest view** of a child's learning journey — academic, emotional, and behavioral — and to turn that understanding into small, doable steps forward, every day.

## 🌟 Vision

A world where every student — especially neurodivergent kids on 504 plans — is seen as more than "behind" or "ahead," and where their **spectrum of strengths, struggles, bravery, and progress** is visible and valued.

---

## What is Learning Spectrum?

Learning Spectrum is a K–5 learning companion that tracks reading, math, focus, and effort across home and school. Instead of reducing a child to a single number or grade, it shows their progress as a **spectrum**, with three clear reference points:

```
┌──────────────┬──────────────┬──────────────┐
│   ENROLLED   │   CURRENT    │    TARGET    │
├──────────────┼──────────────┼──────────────┤
│ Grade they're│ Grade level  │ Grade level  │
│   attending  │   they're at │   we're      │
│              │   right now  │   aiming for │
└──────────────┴──────────────┴──────────────┘
```

This three-grade system becomes a **shared language** between parents, teachers, and SST teams.

---

## 🎭 Meet the Characters

### LaBuBu (Students)
Every student is represented as a **LaBuBu** — a friendly avatar whose **color changes** to reflect their learning state:
- 🔴 **Red**: Brave (trying something hard)
- 🟠 **Orange**: Retry (learning from mistakes)
- 🟡 **Yellow**: Curious (exploring)
- 🟢 **Green**: Focused (in the groove)
- 🔵 **Blue**: Calm success (steady mastery)
- 🟣 **Violet**: Creative (integrated tasks)
- ⚪ **White**: Break (taking a pause)
- ⚫ **Charcoal**: Overwhelmed (needs support)

### Hugh Gregg Gator (Teacher)
The **Gator** is a calm, encouraging teacher who guides every experience:
- Explains charts in plain language
- Celebrates effort, not just correctness
- Appears in dashboards, reports, and SST meetings
- Never scolds or compares students

*"Let's look at this together — you're doing great!"* 🐊

---

## ✨ Core Features

### 📊 Three-Grade Dashboard
Every dashboard shows **Enrolled → Current → Target** for each skill:
- **Hexagon/Radar Charts**: Multi-axis progress across reading, math, focus, bravery
- **Gator Narration**: Plain-language summaries ("You're 60% to your target in reading!")
- **Real-Time Updates**: Charts reflect work done at home and school

### 📸 Screenshot Import
**NEW**: Upload a screenshot of your child's school report, and Learning Spectrum will:
1. Extract text (OCR)
2. Parse data (AI-powered)
3. Show a preview for you to confirm
4. Merge into your child's spectrum

*"As easy as screenshotting a school report to import stats from school."*

### 💾 Stability First (Sacred Features)
These features are **non-negotiable**:
- **Export Profile**: JSON (re-import) + PDF (SST meetings) with Gator commentary
- **Import Profile**: Upload previous exports, merge or replace
- **Resume**: Pick up exactly where you left off (even on different devices)
- **Reset Session**: Start fresh today, keep historical progress

### 🏠 Home & School Bridge
- **Cross-Device Sync**: Work done at home appears at school, and vice versa
- **Consistent Experience**: Same charts, same Gator, same data everywhere
- **Offline Mode**: Keep working offline; data syncs when you're back online

### 🧩 504-Aware by Design
- **No Timers**: Self-paced learning, no countdown clocks
- **Break Button**: Always visible, always available
- **Auto-Save**: Progress saved every 30 seconds
- **Clear Navigation**: One task at a time, minimal clutter
- **Adjustable**: Text size, color themes, audio hints

### 📄 SST Reports
Generate progress reports designed for **Student Support Team meetings**:
- Gator-narrated charts (plain language, no jargon)
- Three-grade system clearly visible
- Export as PDF or CSV
- Honest, growth-oriented language

---

## 🎨 Design Philosophy

### The "Calm Room"
Learning Spectrum's UI feels like a **quiet, organized classroom**:
- **Core Colors**: Deep Navy, Slate Gray, Light Gray, White, Accent Teal
- **Ample Whitespace**: No clutter, no overwhelming visuals
- **Spectrum Colors**: Used for data, not full backgrounds

### Spectrum-Based, Not Game-Based
- **No leaderboards** or comparisons
- **No streaks** or pressure mechanics
- **Focus on individual growth**, not ranking
- **Gator is supportive**, not a "fun mascot"

### ADHD-Friendly
- No blinking ads or pop-ups
- No forced timers or deadlines
- Break anytime, resume anytime
- Simple, predictable layout

---

## 💡 Brand Pillars

1. **Spectrum, Not a Single Score**: Multiple axes, not one number
2. **Stability First**: Data never lies or vanishes. Export/Import/Resume/Reset are sacred.
3. **Gator-Guided, Student-Centered**: Gator narrates; students experience
4. **504-Aware by Design**: ADHD isn't a side-case; it's the core user
5. **Shared Language**: Same charts at home, school, and SST meetings

---

## 🚀 Getting Started

### For Parents
1. **Create an account** (or use your school login)
2. **Set up your child's profile** (grade enrolled, accommodations)
3. **Upload a screenshot** of their latest school report (optional)
4. **Start a session** and watch LaBuBu's colors reflect their work
5. **Export progress** to share with teachers or SST teams

### For Teachers
1. **Access your school portal**
2. **View all students' spectrums** in one dashboard
3. **See home/school activity** side-by-side
4. **Generate SST reports** with Gator narration
5. **Tag 504 accommodations** for automatic support

### For Developers

```bash
# Clone the repository
git clone https://github.com/foozinacci/coast-learning-spectrum.git
cd coast-learning-spectrum

# Run local development server
npm start
# Or with Python
npm run serve:python

# Open http://localhost:3000
```

See [CLAUDE.md](./CLAUDE.md) for comprehensive development guidelines and [docs/](./docs/) for additional guides.

---

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)**: Comprehensive guide for AI assistants and developers
- **[BRAND.md](./BRAND.md)**: Complete brand guidelines (voice, tone, colors)
- **[docs/](./docs/)**: All guides, question bank docs, and technical references

---

## 🧪 Current Status & Roadmap

### Completed (MVP)
- [x] Three-grade dashboard (Enrolled → Current → Target)
- [x] LaBuBu mood system with spectrum colors
- [x] Gator narration throughout
- [x] Export/import/resume/reset (sacred features)
- [x] Badge and achievement system
- [x] Comprehensive question banks (K-2 complete, 3-5 partial)
- [x] Diagnostics panel
- [x] Responsive design
- [x] Deployed to Vercel

### In Progress
- [ ] Expand question coverage for Grades 3-5
- [ ] Refine "calm room" UI theme

### Future
- [ ] Screenshot import (OCR + LLM parsing)
- [ ] Home/school sync engine
- [ ] Offline mode with service workers
- [ ] SST report generator (PDF + CSV)
- [ ] Parent/teacher portal separation
- [ ] School system integration (Clever, ClassLink)

---

## 🔬 Research Foundation

Learning Spectrum is built on evidence-based practices:

- **ADHD-Friendly Design**: Self-paced, no timers, clear navigation ([Monster Math](https://monstermath.app), [FocusBear](https://focusbear.io))
- **Spectrum-Based Assessment**: Multiple intelligences, not single scores
- **Character-Based Learning**: Gator provides supportive mentorship ([RAW Studio](https://raw.studio))
- **Color Psychology**: Thoughtful use of color for feedback ([Psychology Today](https://www.psychologytoday.com))
- **Universal Design for Learning**: Multiple means of representation and engagement ([CAST UDL](http://udlguidelines.cast.org/))

---

## 🤝 Contributing

We welcome contributions that align with our mission of **stability-first, 504-aware, spectrum-based learning**.

### Before Contributing
1. Read [CLAUDE.md](./CLAUDE.md) for development guidelines
2. Understand the **three-grade system** (Enrolled → Current → Target)
3. Internalize the **Brand Pillars** (especially Stability First)

### Development Workflow
1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes (follow calm room UI + spectrum colors)
3. Test thoroughly (especially export/import/resume)
4. Commit using conventional commits: `feat: add screenshot import`
5. Push and create a pull request

### Pull Request Checklist
- [ ] **Stability**: Export/Import/Resume/Reset work correctly
- [ ] **Three-Grade System**: Charts show Enrolled → Current → Target
- [ ] **Gator Voice**: Supportive, never punitive
- [ ] **Calm Room UI**: Spectrum colors only for data
- [ ] **ADHD-Friendly**: No timers, breaks available
- [ ] **504-Aware**: Accommodations respected
- [ ] **Accessibility**: Keyboard nav, ARIA labels, WCAG AA contrast
- [ ] **Tests**: Unit + integration + e2e passing
- [ ] **Documentation**: Updated if needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

**Important**: This software handles student data. When deploying, you MUST comply with FERPA, COPPA, and relevant data privacy laws. See [LICENSE](./LICENSE) for full educational use notice.

---

## 🙏 Acknowledgments

- **Hugh Gregg Elementary School, NY**: Educational partner and pilot school
- **Families with children on 504 plans**: The inspiration and testing ground for this work
- **ADHD & Neurodivergent Community**: For teaching us about real needs, not assumptions
- **Open Source Community**: Tools and frameworks that make this possible

---

## 📞 Contact

- **GitHub Issues**: For bugs, features, and questions
- **Email**: _(TBD)_
- **Website**: _(TBD)_

---

## 💬 One-Line Summary (For Teachers)

*"Learning Spectrum gives us a shared picture of where a student is right now and how they're moving toward the grade-level expectations we've set together."*

---

**Built with ❤️ for real families, real needs.**

*Stability, clarity, and honesty are not optional.* 🐊🌈

---

## 🎓 Real-World Use Case

> *"I should be able to screenshot a school report like [this one](./docs/examples/progress-report.png) and import my daughter's stats directly into Learning Spectrum. Then, when we meet with the SST team, we all point to the same charts — her enrolled grade (2nd), her current level (early 1st in reading), and our target (mid-2nd by June). Gator explains what the numbers mean in plain English, and everyone — teachers, specialists, us — speaks the same language."*
>
> — Parent, Hugh Gregg Elementary

---

## 🔍 What Makes Learning Spectrum Different?

| Traditional Ed-Tech | Learning Spectrum |
|---------------------|-------------------|
| Single score ("below grade level") | **Three grades**: Enrolled → Current → Target |
| Gamification (streaks, leaderboards) | **Supportive**: Gator narrates, no pressure |
| One-size-fits-all | **504-aware by design**: ADHD is the core user |
| Data trapped in platform | **Export anytime**: JSON, PDF, CSV — you own it |
| Generic reports | **SST-ready**: Plain language, Gator commentary |
| Home OR school | **Bridge**: Same data, same charts everywhere |
| "Fun" mascot | **Calm teacher**: Gator is a mentor, not a toy |

---

**Learning Spectrum: See the whole child. Grow the whole child.** 🌈
