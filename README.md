# Needful Mage 🧙‍♂️

**A native iOS spell-crafting game.** Help a wizard who keeps getting stuck by combining magical runes to create the right spells—Fireball, Chain Lightning, and more.

## What It Does

The wizard is in trouble (again). You craft spells by combining element runes (Fire, Ice, Lightning, Arcane, Heal) and modifiers (Amplify, Chain, Bounce, Pierce). Mix them in the crafting circle, cast the spell, and help the wizard through 8 quests. Wrong spell? No game-over—just a funny message and try again.

## How to Run

1. **Open** `NeedfulMage/NeedfulMage.xcodeproj` in Xcode 15.4+
2. **Select** an iOS 17+ simulator or device
3. **Run** with `Cmd+R`

That's it. The app launches, and you can start crafting spells immediately.

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

- **8-quest campaign** with progressive unlocking
- **5 elements** (Fire, Ice, Lightning, Arcane, Heal)
- **4 modifiers** (Amplify, Chain, Bounce, Pierce)
- **15+ spells**: Fireball, Frostbolt, Chain Lightning, Steam Blast, Thunderstorm, Chaos Orb, etc.
- **Touch-first** portrait iPhone interface
- **No timers, no IAP, no game-overs**—cozy wizard apprentice gameplay

## Author

**Evan Parrott** ([@evan-thedev](https://github.com/evan-thedev))  
**License**: MIT  
**Contact**: coppercoffin@gmail.com

---

For architecture details, contribution guidelines, and troubleshooting, see [DEVELOPMENT.md](DEVELOPMENT.md).
