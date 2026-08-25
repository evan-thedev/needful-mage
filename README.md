# Needful Mage 🧙‍♂️

**A spell-crafting game for iOS and web.** Help a wizard who keeps getting stuck by combining magical runes to create the right spells—Fireball, Chain Lightning, and more.

▶️ **[Play in your browser](https://evan-thedev.github.io/needful-mage/)** (works on phone, no install needed)

## What It Does

The wizard is in trouble (again). You craft spells by combining element runes (Fire, Ice, Lightning, Arcane, Heal) and modifiers (Amplify, Chain, Bounce, Pierce). Mix them in the crafting circle, cast the spell, and help the wizard through 14 quests across 3 chapters. Wrong spell? No game-over—just a funny message and try again.

## How to Play

### Web Version (Easiest)
Open **[https://evan-thedev.github.io/needful-mage/](https://evan-thedev.github.io/needful-mage/)** in any browser—Safari on iPhone, Chrome on desktop, whatever. Tap runes, craft spells, help the wizard. No install needed.

### Native iOS App
1. **Open** `NeedfulMage/NeedfulMage.xcodeproj` in Xcode 15.4+
2. **Select** an iOS 17+ simulator or device
3. **Run** with `Cmd+R`

## Tech Stack

- **Language**: Swift 5.9+
- **UI**: SwiftUI (iOS 17+)
- **Architecture**: MVVM with `@Observable` models
- **Testing**: 21 XCTest unit tests for spell recipes
  ```bash
  cd SpellCraft && swift test
  ```
- **Package**: `SpellCraft/` Swift Package for testable spell logic

## Project Structure

```
SpellCraft/              # Swift Package - spell crafting engine
  ├── Sources/           # 5 Swift files (Element, Modifier, Spell, etc.)
  └── Tests/             # 21 unit tests

NeedfulMage/             # iOS App
  ├── Views/             # SwiftUI screens (ContentView, SpellCraftingView)
  ├── Models/            # Game state (GameState, WizardRequest)
  └── NeedfulMageApp.swift
```

## Gameplay

- **14-quest campaign** (2 chapters) with progressive unlocking
- **5 elements** (Fire, Ice, Lightning, Arcane, Heal)
- **4 modifiers** (Amplify, Chain, Bounce, Pierce)
- **18+ spells**: Fireball, Chain Lightning, Thunderstorm, Cauterize, Hailstorm, Fire Lance, etc.
- **Spellbook**: Quick-cast mastered spells without re-picking runes
- **Cast effects**: Visual feedback for each spell type (fire blooms, ice crystals, lightning flashes)
- **Auto-save**: Progress saved to browser—pick up where you left off
- **Touch-first** portrait iPhone interface
- **No timers, no IAP, no game-overs**—cozy wizard apprentice gameplay

## Author

**Evan Parrott** ([@evan-thedev](https://github.com/evan-thedev))  
**License**: MIT  
**Contact**: coppercoffin@gmail.com

---

For architecture details, contribution guidelines, and troubleshooting, see [DEVELOPMENT.md](DEVELOPMENT.md).
