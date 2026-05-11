# Bi Graduates — Design System

A cute, modern, Korean-influenced pastel design system for **Thanh Vy ("Bi")**'s graduation from Banking University on **31.05**.

This system powers a single-page graduation greeting site that feels like a digital yearbook — emotional, adorable, premium, magical, memorable.

## Sources

No existing codebase or Figma was provided. The system is designed from scratch against the user's brief:
- Soft cute aesthetic, youthful & emotional
- Korean-style / pastel design
- Pastel pink + cream + baby blue + lavender
- Glassmorphism cards, soft glow, floating sparkles
- Mix EN + VN ("Vinglish")

> Attached `bibi/` codebase was empty — flagged with the user, who confirmed "design from scratch."

## Index

| File | What's in it |
| --- | --- |
| `colors_and_type.css` | All color + type CSS variables, semantic tokens, base styles |
| `fonts/` | Web-font references (Google Fonts — see CSS) |
| `assets/` | Stickers, sparkles, mascot SVG, placeholder illustrations |
| `preview/*.html` | Design system cards (colors, type, components, etc.) |
| `ui_kits/site/` | The finished graduation site + reusable JSX components |
| `SKILL.md` | Agent-Skill manifest for use in Claude Code |

## Content fundamentals

The voice is **Bi's voice talking to her best friends** — warm, a little dramatic, very Gen Z, lots of inside-jokes energy. It code-switches between English and Vietnamese mid-sentence ("Vinglish"). Lowercase by default; Title Case only on big display headings. Emojis used as punctuation, not decoration — 🎓✨💖 anchor emotional beats; sparkles & hearts as floating motifs (SVG, not emoji).

**Tone examples:**
- Display: "Bi Graduates 🎓✨"
- Subtitle: "31.05 — Banking University"
- Caption: "deadline survivors", "canteen memories", "group project warriors"
- Section opener: "the people who made it bearable 💌"
- VN mix: "we made it, các cậu 🥹", "thank you vì đã ở đây"
- Outgoing CTA: "Open Future →"

**Casing rules:**
- Display & big numbers → Title Case or stylized lowercase, never ALL CAPS
- Subheads → sentence case, sometimes lowercase for cuteness
- Buttons → Title Case ("Open Future", "Leave a Message")
- Captions on polaroids → all lowercase, no punctuation

**Pronouns:** "I" (Bi) speaking to "you" (the friends). Final message uses "us" and "we."

**What we never do:** Corporate-speak, exclamation overload, hashtag-style copy ("#blessed"), all-caps shouting.

## Visual foundations

### Color
A warm pastel quartet on a creamy paper background. Pink leads, lavender adds depth, blue adds calm, cream is the bed everything sits on. **Ink is deep aubergine** (`#4B2E5C`) — never pure black; black is too harsh against pastels.

Use color as soft floods, never as borders or accent stripes. Two pastels can layer with `mix-blend-multiply` for richer mid-tones.

### Type
- **Display / hero:** Pacifico (script) — for "Bi Graduates", section openers
- **Headline:** Quicksand 700 — for h2 / card titles
- **Body:** Quicksand 400–500 — paragraphs, captions, buttons
- **Handwritten:** Caveat — friend messages, polaroid captions, Bi's signature

All Google Fonts. No font files shipped; CSS `@import` is used.

### Backgrounds
- **Paper:** `#FFF8F3` cream, sometimes overlaid with a 6% noise texture for grain
- **Section beds:** Soft radial gradients of two pastels at low opacity — never harsh gradients
- **Floating motifs:** Static SVG sparkles, hearts, stars positioned absolutely with parallax-free drift animations
- No full-bleed photography (placeholders used since user opted out of photos)
- Stickers/washi tape as decorative accents on polaroids

### Animation
- **Easing:** `cubic-bezier(0.34, 1.56, 0.64, 1)` — a soft overshoot for friendly bounce
- **Float:** continuous `translateY` ±8px + slight rotate, 4–6s ease-in-out
- **Reveal:** fade-up 24px + 600ms, staggered 80ms per child
- **Hover:** lift 4px + grow shadow + +2° rotate on stickers/polaroids
- **Loading:** mascot bounces while text dot-loads, fades out at 1.2s
- **Never:** spring physics so aggressive it feels jelly. No infinite spins.

### Hover & press
- Hover: shadow grows (`0 10px 30px rgba(255 ...)`) + lift 4px + slight rotate for playful cards
- Press: scale 0.96 + shadow shrinks + 80ms transition
- Buttons get a soft inner highlight on press, not a darker fill

### Cards & glass
Two card flavors:
1. **Glass card:** `rgba(255,255,255,0.55)` + `backdrop-filter: blur(20px) saturate(180%)` + soft pastel border + glow shadow
2. **Solid pastel card:** Full pastel fill, no border, soft drop shadow

Both: `border-radius: 28px` (large) or `20px` (small). Never sharp corners.

### Shadows
- **Soft:** `0 4px 20px rgba(255, 182, 200, 0.25)`
- **Glow pink:** `0 8px 40px rgba(255, 182, 200, 0.5)`
- **Glow lavender:** `0 8px 40px rgba(212, 181, 255, 0.45)`
- **Lift:** `0 16px 48px rgba(75, 46, 92, 0.12)`

Shadows are always tinted, never gray.

### Borders
- 1px on glass: `rgba(255, 255, 255, 0.6)` inner highlight + `rgba(75, 46, 92, 0.08)` outer
- 2px dashed soft-ink for polaroid frames (very subtle)

### Corner radii
- `--r-sm: 12px` (chips, tags)
- `--r-md: 20px` (buttons, small cards)
- `--r-lg: 28px` (big cards, glass surfaces)
- `--r-xl: 40px` (hero blocks)
- `--r-full: 9999px` (pills, mascot)

### Spacing scale
4px base. `4, 8, 12, 16, 24, 32, 48, 64, 96` — exposed as `--s-1` through `--s-9`.

### Transparency & blur
Glass cards use `backdrop-filter: blur(20px) saturate(180%)`. Sparkle SVGs sit at 60–80% opacity. Photos (when present) would be 90% opacity over a 4% noise overlay to feel softer.

### Imagery vibe
Warm. Tea-stained whites, slightly faded pastels, never punchy saturation. Like a film camera roll from a sunny afternoon.

## Iconography

- **Custom hand-drawn SVG stickers** in `assets/stickers/` — these are the decorative motifs (sparkle, heart, star, ribbon, mascot face). Drawn as simple geometric SVGs to fit the cute pastel system.
- **Emoji** used sparingly in copy as emotional punctuation: 🎓 ✨ 💖 🥹 🌸 — not as UI controls.
- **UI icons** (music note, sun/moon, arrow) — minimal stroke SVGs, 1.5–2px stroke, rounded line caps, sized to 20–24px. Inlined in components.

No icon font. No CDN icon set — the curated sticker library IS the iconography. Substitution flag: none.

## Substitution flags

- Fonts (Pacifico, Quicksand, Caveat) loaded via Google Fonts CDN since no font files were provided. ✅ Intentional, not a substitution.
- Mascot illustration is a simple SVG drawing of a bear-like graduation cap character. If you have a specific mascot in mind, let me know!
- Photos are CSS-painted placeholders. Drag-and-drop image slots are exposed in the site so you can drop your own polaroids in later.
