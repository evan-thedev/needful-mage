# Changelog

All notable changes to Needful Mage will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - 2026-08-25

### Initial Release 🎉

A complete, playable iOS spell-crafting game where players help a stuck wizard by combining magical elements to create spells.

#### Added

**Core Game**
- 8-quest campaign with progressive difficulty
- Cozy wizard apprentice gameplay with funny dialogue
- Touch-first SwiftUI interface optimized for portrait iPhone
- Progressive unlocking system for elements and modifiers
- Victory screen with mastered spells list
- No game-overs - unlimited retry on failed spell attempts

**Spell System**
- 5 magical elements: Fire, Ice, Lightning, Arcane, Heal
- 4 spell modifiers: Amplify, Chain, Bounce, Pierce
- 15+ unique spell combinations:
  - Basic: Fireball, Frostbolt, Spark, Ward, Mend
  - Modified: Chain Lightning, Inferno, Blizzard, Greater Ward, Mass Heal
  - Combinations: Steam Blast, Plasma Bolt, Frozen Barrier, Regenerating Ward, Storm Shield
  - Complex: Thunderstorm, Cataclysm, Chaos Orb
  - Bouncing variants for experimental spells

**Technical Implementation**
- Swift 5.9+ with SwiftUI
- iOS 17.0+ minimum deployment
- MVVM architecture with `@Observable` models
- SpellCraft Swift Package for testable spell logic
- 21 comprehensive unit tests (100% pass rate)
- Complete Xcode project structure
- Linux-compatible Swift Package (tests run via `swift test`)

**Wizard Quests**
1. Light the brazier (Fire)
2. Freeze the slime (Ice)
3. Charge the crystal (Lightning)
4. Shield from sparks (Arcane)
5. Heal the familiar (Heal)
6. Chain lightning the imps (Chain modifier)
7. Stabilize the potion (Fire + Ice)
8. Save the tower (Most powerful spell)

**Documentation**
- Comprehensive README with gameplay and setup instructions
- DEVELOPMENT.md with architecture and contribution guidelines
- MIT LICENSE
- Code examples and troubleshooting tips
- Complete project structure documentation

**User Experience**
- Beautiful purple/blue gradient wizard tower theme
- Touch-friendly rune buttons (70x70pt)
- Visual spell crafting circle with emoji feedback
- Clear success/failure messages
- Progress tracking (quest counter)
- Spell mastery collection

**Testing**
- Basic spell recipe tests (5 elements)
- Modified spell tests (element + modifier)
- Combination spell tests (multi-element)
- Complex spell tests (multi-modifier)
- Recipe normalization verification
- Error handling for invalid recipes

#### Technical Details

**Project Structure**
```
SpellCraft/           - Swift Package (core logic)
  Sources/            - Spell crafting engine
  Tests/              - Unit tests
NeedfulMage/          - iOS App
  Views/              - SwiftUI interface
  Models/             - Game state management
  Assets.xcassets     - App resources
```

**Dependencies**
- None! 100% native Swift and SwiftUI

**Build Requirements**
- macOS with Xcode 15.4+
- iOS 17.0+ Simulator or device

#### Author

- Evan Parrott ([@evan-thedev](https://github.com/evan-thedev))
- Contact: coppercoffin@gmail.com

#### License

MIT License - See LICENSE file for details

---

### Future Ideas (Not Implemented)

Potential enhancements for future versions:
- Sound effects for spell casting
- Particle effects with SpriteKit
- More elements (Shadow, Nature, etc.)
- Endless mode after campaign
- Spell collection gallery
- Achievement system
- Game Center integration
- iPad landscape support
- Accessibility improvements (VoiceOver)

[1.0.0]: https://github.com/evan-thedev/needful-mage/releases/tag/v1.0.0
