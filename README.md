# Needful Mage 🧙‍♂️✨

A cozy iOS spell-crafting game where you help a perpetually-stuck wizard by combining magical elements to create powerful spells.

## What is this?

**Needful Mage** is a native iOS game built with Swift and SwiftUI. The wizard keeps getting into trouble and needs your help crafting the perfect spells to solve each problem. Mix fire, ice, lightning, arcane shields, and healing energy—plus powerful modifiers—to create everything from simple Fireballs to devastating Thunderstorms.

## How to Play

1. **The Wizard Asks for Help**: Each quest shows a desperate wizard message describing their current problem
2. **Craft a Spell**: Tap runes (elements and modifiers) to combine them in the crafting circle
3. **Mix & Cast**: Hit "Craft" to create your spell, then "Cast" to use it
4. **Success or Try Again**: If your spell solves the problem, the wizard is relieved and you unlock new runes. If not, you get a funny failure message and can try again
5. **Progress Through Campaign**: Complete 8 quests to become a Master Spellcrafter

### Spell Examples

- 🔥 **Fireball**: Pure fire damage
- ❄️ **Frostbolt**: Freeze and slow
- ⚡🔗 **Chain Lightning**: Lightning + Chain modifier
- 🔥💥 **Inferno**: Fire + Amplify modifier
- 💨 **Steam Blast**: Fire + Ice combination
- ⚡🔗💥 **Thunderstorm**: Lightning + Chain + Amplify

No game-overs, no timers, no IAP required. Just cozy spell crafting.

## Tech Stack

- **Language**: Swift 5.9+
- **UI Framework**: SwiftUI
- **Minimum iOS**: 17.0
- **Architecture**: MVVM with `@Observable` models
- **Testing**: XCTest for spell recipe logic
- **Package Structure**: 
  - `SpellCraft/` - Swift Package with testable spell logic
  - `NeedfulMage/` - iOS app with SwiftUI interface

## Project Structure

```
.
├── SpellCraft/                  # Swift Package (testable on Linux)
│   ├── Package.swift
│   ├── Sources/
│   │   └── SpellCraft/
│   │       ├── Element.swift
│   │       ├── Modifier.swift
│   │       ├── SpellRecipe.swift
│   │       ├── Spell.swift
│   │       └── SpellCrafter.swift
│   └── Tests/
│       └── SpellCraftTests/
│           └── SpellCrafterTests.swift
│
└── NeedfulMage/                 # iOS App
    ├── NeedfulMage.xcodeproj
    └── NeedfulMage/
        ├── NeedfulMageApp.swift
        ├── Views/
        │   ├── ContentView.swift
        │   └── SpellCraftingView.swift
        ├── Models/
        │   ├── GameState.swift
        │   └── WizardRequest.swift
        └── Assets.xcassets
```

## How to Build & Run

### Requirements

- macOS with Xcode 15.4 or later
- iOS 17.0+ device or simulator

### Steps

1. **Clone or download this repository**

2. **Open in Xcode**:
   ```bash
   open NeedfulMage/NeedfulMage.xcodeproj
   ```

3. **Select a target**:
   - In Xcode, select an iOS simulator or connected device from the target dropdown

4. **Build & Run**:
   - Press `Cmd+R` or click the Play button
   - The app will build and launch in the simulator/device

5. **Run Tests** (optional):
   - Press `Cmd+U` to run the spell recipe tests
   - Or from command line:
     ```bash
     cd SpellCraft && swift test
     ```

### Troubleshooting

- **Missing SpellCraft package**: Xcode should automatically resolve the local package. If not, go to File → Packages → Resolve Package Versions
- **Code signing issues**: Select "Automatically manage signing" in the project settings and choose your development team
- **Simulator doesn't launch**: Try resetting the simulator: Device → Erase All Content and Settings

## Game Design

### Core Loop

1. Wizard presents problem
2. Player selects elements/modifiers
3. Player crafts spell
4. Player casts spell
5. Success → unlock new runes + next quest
6. Failure → funny message + retry

### Progression

- Start with Fire element only
- Unlock Ice, Lightning, Arcane, and Heal through quests
- Unlock modifiers (Amplify, Chain, Bounce, Pierce) as you progress
- 8 quests total with increasing complexity

### Feel

Touch-first, portrait orientation, cozy wizard apprentice vibes. Not a dark souls combat sim—more like helping a clumsy but lovable wizard who keeps getting into mishaps.

## Development & Testing

The spell recipe logic is isolated in the `SpellCraft` Swift Package and can be tested independently:

```bash
cd SpellCraft
swift test
```

All 21 spell recipe tests pass, covering:
- Basic single-element spells (Fireball, Frostbolt, etc.)
- Modified spells (Chain Lightning, Inferno, etc.)
- Combination spells (Steam Blast, Plasma Bolt, etc.)
- Complex multi-modifier spells (Thunderstorm, Cataclysm)
- Recipe normalization and error handling

## Author & License

**Author**: Evan Parrott ([@evan-thedev](https://github.com/evan-thedev))  
**Contact**: coppercoffin@gmail.com  
**License**: MIT (see LICENSE file)

## Credits

- No third-party frameworks or dependencies
- All emoji are standard Unicode
- No stolen assets or copied commercial games
- Original game design and implementation

---

Made with ✨ by a wizard's apprentice (probably you after playing this)
