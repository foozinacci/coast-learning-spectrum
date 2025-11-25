# BRAND.md - Learning Spectrum Brand Guidelines

## 1. Brand Core

### Name
**Learning Spectrum**

### Short Name in UI
**Spectrum** (for buttons, labels, space-constrained areas)

### Tagline
**"Every color of how they learn."**

Alternative taglines (can rotate):
- "See the whole child. Grow the whole child."
- "From where they are to where they can go."

### One-Sentence Elevator Pitch
Learning Spectrum is a K–5 learning companion that tracks reading, math, focus, and effort across homes and school, using color, characters, and clear charts to show where a child is now and how they're growing toward their goals.

### Mission Statement
Learning Spectrum exists to give families and schools a shared, honest view of a child's learning journey — academic, emotional, and behavioral — and to turn that understanding into small, doable steps forward, every day.

### Vision
A world where every student — especially neurodivergent kids on 504 plans — is seen as more than "behind" or "ahead," and where their spectrum of strengths, struggles, bravery, and progress is visible and valued.

---

## 2. Brand Pillars

These are the **"non-negotiables"** you can quote to devs/teachers:

### 1. Spectrum, Not a Single Score
- We don't reduce kids to one number
- Show multiple axes: reading, math, focus, bravery, home/school use, etc.
- Visualize progress across a spectrum, not a single metric

### 2. Stability First
- Data should never lie or randomly vanish
- Export/Import/Resume/Reset are sacred
- Every update has diagnostics and a bug tracker section
- **If something conflicts with stability, stability wins**

### 3. Gator-Guided, Student-Centered
- The Gator is the calm teacher/mentor
- LaBuBu is the student avatar — many LaBuBus, many kids, many colors
- Gator narrates; students experience

### 4. 504-Aware by Design
- Breaks, pacing, visual simplicity, and mood states are **built-in, not bolted on**
- ADHD isn't a side-case; **it's the core user**
- **If something conflicts with a 504 accommodation, the 504 wins. Always.**

### 5. Shared Language Between Home and School
- The **same charts and words** appear at home and in SST meetings
- Learning Spectrum is something parents and teachers can **point to together**
- Exports are designed for SST meetings, not just "reports"

---

## 3. Tone & Voice

### For Kids (In-App, Gator + LaBuBu)

**Characteristics:**
- Simple, literal, kind
- Lots of "we" and "let's"
- Short sentences
- Celebrate effort, not genius

**Examples:**

| Context | What to Say |
|---------|------------|
| Lesson intro | "Today we're learning about long vowels! This is going to be fun!" |
| Correct answer | "Nice try — let's look at that one again together." |
| Struggle | "You were so brave to try that hard question." |
| Break time | "If you're feeling wiggly, it's okay to tap 'Break' and come back." |
| Milestone | "You moved a little closer to your goal today. I'm proud of you." |

**AVOID:**
- ❌ "That's wrong."
- ❌ "Try harder."
- ❌ "You should know this."
- ❌ Sarcasm or disappointment
- ❌ Comparisons to other students

### For Adults (Teachers, SST, Parents)

**Characteristics:**
- Calm, respectful, neutral
- Data + story: "Here's what we see, here's what it likely means."
- Avoid blame, shame, or loaded words

**Examples:**

| Context | What to Say |
|---------|------------|
| Dashboard summary | "Learning Spectrum shows that she does best with concrete examples before abstract problems." |
| Progress report | "Her reading skills are currently around early 2nd-grade level, and she's steadily closing the gap toward mid-3rd-grade targets." |
| Accommodation note | "This chart suggests she needs more frequent breaks during math problem-solving." |
| SST meeting | "LaBuBu improved 15% this month – that's real growth!" |

**AVOID:**
- ❌ "Lazy"
- ❌ "Unmotivated"
- ❌ "Should be doing better"
- ❌ Any deficit-based language

---

## 4. Visual Identity

### 4.1 Core UI Colors (The "Calm Room")

Keep these soft and not overwhelming. These are for **backgrounds, cards, buttons** — the foundation of the UI.

| Color Name | Hex Code | Usage |
|------------|----------|--------|
| **Deep Navy** | `#111827` | Anchors the app, for headers/nav |
| **Slate Gray** | `#4B5563` | Secondary text/icons |
| **Light Gray** | `#E5E7EB` | Card backgrounds |
| **White** | `#FFFFFF` | Main content background |
| **Accent Teal** | `#14B8A6` | Links, primary confirm button |

**These are the "calm room" of the app. The rainbow lives inside this room.**

### 4.2 Spectrum / Mood Colors

These are layered **ON TOP** of the calm UI, not everywhere. Use for **LaBuBu, charts, badges, thin borders/glows** — never full-screen blinding backgrounds.

| Color | Hex Code | Meaning | When It Appears |
|-------|----------|---------|-----------------|
| 🔴 **Red** | `#EF4444` | Brave / Trying something hard | Attempting hard problems, pushing boundaries |
| 🟠 **Orange** | `#F97316` | Retry / Learning from mistakes | Trying again after mistakes |
| 🟡 **Yellow** | `#FACC15` | Curious / Exploring | Exploring new concepts |
| 🟢 **Green** | `#10B981` | Focus / In the groove | In the flow, succeeding consistently |
| 🔵 **Blue** | `#3B82F6` | Success / Calm mastery | Steady mastery, calm confidence |
| 🟣 **Violet** | `#8B5CF6` | Creative / Combined tasks | Working on integrated/multi-step tasks |
| ⚪ **White** | `#F9FAFB` | Reset / Break | Taking a break, paused |
| ⚫ **Charcoal** | `#1F2937` | Quiet / Overwhelmed | Needs immediate support (triggers teacher alert) |
| 💗 **Pink** | `#EC4899` | Encouragement / Extra support | Gator's extra support moments |
| 🟡✨ **Gold** | `#EAB308` | Mastery / Milestone | Achievements, badges earned |

**Usage Rules:**
- Appear as **LaBuBu's body color** (glow, background, or clothing)
- **Small chart accents** (data points, thin borders)
- **Progress badges** and **thin glows around UI elements**
- **NEVER full-screen backgrounds** — always on the calm gray/white base

### 4.3 Typography

**Primary Font:** Nunito or Poppins (clean, friendly sans-serif)

- **Headers:** Semi-bold (600)
- **Body:** Regular (400)
- **AVOID:** Italics and script fonts; keep it crisp and readable

**Accessibility Requirements:**
- Minimum **16px** body text
- **1.5** line height for paragraphs
- WCAG AA contrast ratios:
  - **4.5:1** for normal text
  - **3:1** for large text

### 4.4 Logo Concept

**Text Lockup:**
```
Learning Spectrum
```
(in Nunito or Poppins, medium weight, ~24pt)

**Symbol:**
- A simple arc of **3–5 colored segments** (rainbow) above or behind the text
- Optionally a subtle outline of LaBuBu's head silhouette or a small Gator head at the side
- Keep it **flat and simple** — think "school report header" more than game logo

**Usage:**
- Use the **full text** "Learning Spectrum" on reports, dashboards, and SST docs
- **Favicon / tiny icon:** A little rainbow arc or hex with an "S" inside

---

## 5. Character Brand Roles

### LaBuBu (Students)

**Role:** Every student is represented as a LaBuBu.

**Visual Design:**
- Friendly, child-like avatar
- Skin/hair/clothing can be configurable later
- Mood colors shown through **glow, background, or clothing color** (not the skin itself)

**In Branding Documents:**
> "LaBuBu avatars represent each learner's journey across the spectrum."

**Usage Rules:**
- LaBuBu = **students** (plural)
- Each student has their own LaBuBu
- The color system (red/orange/yellow/green/blue/violet/white/charcoal) reflects their **learning state**, not their identity

### Hugh Gregg Gator (Teacher)

**Role:** The Hugh Gregg Gator is always the teacher/mentor.

**Visual Design:**
- Bright but not harsh green tones
- Friendly eyes, animated gestures
- Design mirrors proven mascot principles (children form emotional bonds with mascot guides)

**In Branding:**
> "The Gator is the calm, guiding teacher in Learning Spectrum, narrating progress and offering reassurance."

**Usage Rules:**
- **If a human teacher is also present**, the Gator is their digital helper, not a replacement
- In SST reports, the **Gator appears in the margin** with speech bubbles that translate charts into plain-language phrases
- Gator's tone is **reassuring and positive** (inspired by Duolingo's mascot, who uses friendly persistence)

**When Gator appears:**
- Dashboard (explaining charts)
- SST reports (speech bubbles with plain-language summaries)
- Transitions between sessions
- Break reminders
- Encouragement during struggles

**Example Gator Lines:**
- Dashboard: "Hey LaBuBu, ready to check your Learning Spectrum today?"
- Progress: "Today, Wednesday completed a short math session at home. Her skills are moving from late 1st-grade level toward early 2nd-grade targets."
- SST Report: "She shows strongest growth in decoding nonsense words; we can now lean more into comprehension."

---

## 6. Product Naming (Inside Learning Spectrum)

### Home / Dashboard
- **Title:** Learning Spectrum Dashboard
- **Subtitle:** "See where your spectrum is today."

### Modes

| Mode Name | Focus |
|-----------|-------|
| **Reading Spectrum** | All literacy tasks |
| **Math Spectrum** | All numeracy tasks |
| **Combined Spectrum** | Reading + math + directions |
| **Focus & Bravery** | Attention, retries, breaks |
| **Home & School Bridge** | Usage across locations |

### Other Panels

| Panel Name | Purpose |
|------------|---------|
| **Focus & Bravery** | Attention, retries, breaks tracked |
| **Home & School Bridge** | Usage across locations, consistency |
| **Diagnostics & Stability** | For devs/teachers, not kids |

### Buttons & Labels

Use these exact phrases:

- "Start a new session"
- "Resume where we left off"
- "Export profile"
- "Import profile"
- "Reset session (keep progress)"
- "View Spectrum Charts"

---

## 7. SST / Report Copy

Use these exact phrases in SST documentation and exports.

### 7.1 Report Header

```
┌─────────────────────────────────────────────────┐
│  Learning Spectrum Progress Report              │
│                                                 │
│  Student: Wednesday [Last Name]                 │
│  School: Hugh Gregg Elementary, NY              │
│  Date: [Date]                                   │
│  Prepared by: Learning Spectrum (Gator Guide)   │
└─────────────────────────────────────────────────┘
```

### 7.2 Short Description for SST Packet

**What is Learning Spectrum?**

Learning Spectrum is a web-based tool used at home and at school to track Wednesday's learning across reading, math, focus, and effort. It doesn't label her as "behind" or "ahead" with a single number — instead, it shows her progress as a **spectrum**, with separate views for what grade she's in, the level she's working at, and the level we're all aiming for.

The Hugh Gregg Gator acts as a teacher guide in the app, and Wednesday is represented as "LaBuBu," a student avatar whose colors change with her focus, effort, and success. This visual system helps her understand her own learning and helps the adults around her see where she shines, where she struggles, and where she's growing.

### 7.3 One-Line Summary (For Teachers to Say Out Loud)

> "Learning Spectrum gives us a shared picture of where she is right now and how she's moving toward the grade-level expectations we've set together."

---

## 8. In-App Microcopy (Core Phrases)

### Gator to Student

| Context | Phrase |
|---------|--------|
| Dashboard greeting | "Hey LaBuBu, ready to check your Learning Spectrum today?" |
| After hard work | "You worked so hard on that — that's real bravery." |
| Need to retry | "Let's take a breath and try the next one." |
| Break reminder | "If you're feeling tired or wiggly, it's okay to tap 'Break' and come back." |

### Gator to Parent/Teacher (On Dashboard)

| Context | Phrase |
|---------|--------|
| Session summary | "Today, Wednesday completed a short math session at home. Her skills are moving from late 1st-grade level toward early 2nd-grade targets." |
| Insight | "We saw more focus during shorter sessions. It may help to keep practice under 10 minutes at a time." |
| Strength | "She shows strongest growth in decoding nonsense words; we can now lean more into comprehension." |

---

## 9. Brand Guidelines – Quick Rules for Everyone

Paste this into a README or design doc:

1. **Always use the full product name** "Learning Spectrum" in formal contexts
2. **Rainbow colors belong to the spectrum data and LaBuBu**, not the whole UI. The interface should remain calm and clean.
3. **The Gator never scolds.** All Gator text must be supportive, factual, and growth-oriented.
4. **Charts must always map to three grades: Enrolled, Current, Target.** If those are not clear, design needs revision.
5. **Every mode must support Export/Import/Resume/New/Reset.** Stability features are core, not extra.
6. **No timers, no high-pressure countdowns.** Effort and persistence are valued over speed.
7. **All adult-facing language should be neutral and collaborative.** No "lazy," "unmotivated," etc.
8. **Kids can always see a small version of where they're going next.** The target is never hidden or mysterious.
9. **Learning Spectrum is not a replacement for teachers, parents, or therapists.** It is a shared lens and a practice space.
10. **If something conflicts with a 504 accommodation, the 504 wins. Always.**

---

## 10. Design System Components

### Buttons

| Button Type | Color | Usage |
|-------------|-------|-------|
| **Primary** | Accent Teal (`#14B8A6`) | Main actions (Start Session, Export, etc.) |
| **Secondary** | Slate Gray (`#4B5563`) | Cancel, Back, etc. |
| **Danger** | Red (from spectrum) | Delete, Reset (with confirmation) |

**Button Text:**
- Use **active voice**: "Start Session" not "Session Start"
- Keep **short**: "Export" not "Export Your Profile Data"

### Cards

- **Background:** Light Gray (`#E5E7EB`)
- **Border:** None or very subtle (1px Slate Gray)
- **Padding:** Generous (16-24px)
- **Shadow:** Minimal (soft drop shadow)

### Charts

- **Base:** Calm room colors for axes, labels
- **Data:** Spectrum colors for data points
- **Gator Narration:** Always appears next to charts
- **ARIA Labels:** Required for accessibility

### LaBuBu Avatar

- **Size:** Small (32px), Medium (64px), Large (128px)
- **Mood Indicator:** Glow, background color, or clothing tint
- **Animation:** Subtle (breathing, blinking) — not distracting

### Gator Avatar

- **Size:** Medium (64px), Large (128px) for speech bubbles
- **Position:** Usually left or top of content
- **Speech Bubble:** White background, Slate Gray border, tail pointing to Gator

---

## 11. Accessibility Guidelines

### Color Contrast

- **WCAG AA minimum:**
  - 4.5:1 for normal text
  - 3:1 for large text (18pt+ or 14pt+ bold)
- **Test with:** Contrast checker tools (WebAIM, etc.)

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- **Tab order** should be logical (top to bottom, left to right)
- **Focus indicators** must be visible (Accent Teal outline)

### Screen Readers

- All images have **alt text**
- Charts have **ARIA labels** and descriptions
- Gator's speech bubbles are marked as **role="complementary"**

### ADHD-Friendly

- No auto-playing videos or animations
- No blinking or flashing content
- Break button always visible
- Auto-save every 30 seconds

---

## 12. Content Style Guide

### Writing for Kids

**DO:**
- ✅ Short sentences (5-10 words)
- ✅ Active voice ("You did it!" not "It was done by you")
- ✅ Simple words (avoid jargon)
- ✅ Celebrate effort ("You tried so hard!")

**DON'T:**
- ❌ Long paragraphs
- ❌ Passive voice
- ❌ Negative framing ("Don't get it wrong")
- ❌ Comparisons ("You're behind your classmates")

### Writing for Adults

**DO:**
- ✅ Data + story ("Here's what we see...")
- ✅ Neutral tone (no blame)
- ✅ Actionable insights ("Try shorter sessions")
- ✅ Plain language (avoid edu-speak)

**DON'T:**
- ❌ Jargon without explanation
- ❌ Deficit-based language ("lazy," "unmotivated")
- ❌ False positivity ("Everything is great!")
- ❌ Over-technical terms (unless defined)

---

## 13. Brand Assets (To Be Created)

### Logo Files
- [ ] SVG (vector, scalable)
- [ ] PNG (1x, 2x, 3x for web/mobile)
- [ ] Favicon (16x16, 32x32, ICO format)

### Character Assets
- [ ] LaBuBu sprites (all mood colors)
- [ ] Gator sprites (neutral, happy, thinking, celebrating)
- [ ] Animation frames (subtle movements)

### UI Components
- [ ] Button styles (primary, secondary, danger)
- [ ] Card templates
- [ ] Chart templates (hexagon, radar, line, bar)
- [ ] Speech bubble templates

### Sound (Optional, Minimal)
- [ ] Gentle success chime (low volume)
- [ ] Break reminder tone (calming)
- [ ] Gator voice clips (optional, for accessibility)

---

## 14. Usage Examples

### Example Dashboard Layout

```
┌─────────────────────────────────────────────────┐
│ [Gator icon] Learning Spectrum Dashboard        │
│ "See where your spectrum is today."             │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │    [Hexagon Chart: Spectrum]             │  │
│  │    - Reading (Enrolled 2 → Current 1.2   │  │
│  │               → Target 2.5)              │  │
│  │    - Math (Enrolled 2 → Current 1.8 →    │  │
│  │            Target 2.0)                   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  [Gator speech bubble]:                         │
│  "You're 60% to your target in reading.        │
│   Let's keep going — you're doing great!"      │
│                                                 │
│  [LaBuBu avatar: Green mood]                    │
│                                                 │
│  [Start New Session] [Resume] [Export Profile] │
└─────────────────────────────────────────────────┘
```

### Example SST Report Snippet

```
┌─────────────────────────────────────────────────┐
│ Learning Spectrum Progress Report               │
│ Student: Wednesday                              │
│ Period: Jan - Mar 2025                          │
├─────────────────────────────────────────────────┤
│                                                 │
│ Reading Progress:                               │
│ ┌─────────────┬─────────────┬─────────────┐    │
│ │ Enrolled: 2 │ Current: 1.2│ Target: 2.5 │    │
│ └─────────────┴─────────────┴─────────────┘    │
│                                                 │
│ [Gator]: "Wednesday's reading skills have grown │
│ from early 1st-grade level (1.2) in January to  │
│ late 1st-grade level (1.5) in March. She shows  │
│ strongest growth in decoding nonsense words.    │
│ Next step: lean more into comprehension."       │
└─────────────────────────────────────────────────┘
```

---

## 15. Brand Evolution (Future)

### Domain-Specific Gators (Planned)

- **Math Gator:** Specializes in arithmetic, geometry
- **Reading Gator:** Focuses on phonics, comprehension
- **Science Gator:** Guides experiments, inquiry learning

**Architecture Note:** Character assets and voice clips stored separately per domain. Backend is modular to support plug-in character variants while maintaining consistent mentor persona.

### LaBuBu Customization (Planned)

- Skin tone options
- Hair color/style
- Clothing themes
- Maintain core mood-color mechanic (red/orange/yellow/green/blue/violet/white/charcoal)

---

## 16. Contact & Questions

**For Brand Questions:**
- Create GitHub issue with `[brand]` tag
- Attach mockups or examples if applicable

**For Asset Requests:**
- Create GitHub issue with `[assets]` tag
- Specify format (SVG, PNG, etc.) and size

---

## Version History

- **v1.0** (2025-11-25): Initial brand guidelines for Learning Spectrum

---

**Remember:** Every design decision should serve the child's learning journey and the parent-teacher partnership. Clarity, honesty, and calm are not negotiable. 🐊🌈
