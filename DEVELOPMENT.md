# Development Guide

## Quick Start for Developers

### Prerequisites
- macOS with Xcode 15.4+
- Swift 5.9+ (included with Xcode)
- iOS 17.0+ Simulator

### Project Structure

```
needful-mage/
├── SpellCraft/           # Swift Package - Core spell logic
│   ├── Sources/
│   │   └── SpellCraft/   # Spell crafting engine
│   └── Tests/            # Unit tests (21 tests)
│
└── NeedfulMage/          # iOS App
    ├── NeedfulMageApp.swift
    ├── Views/            # SwiftUI screens
    ├── Models/           # Game state management
    └── Assets.xcassets   # App resources
```

## Testing

### Run Swift Package Tests (Linux/macOS)
```bash
cd SpellCraft
swift test
```

All 21 tests should pass. These cover:
- Basic spell recipes (Fireball, Frostbolt, etc.)
- Modified spells (Chain Lightning, Inferno)
- Combination spells (Steam Blast, Plasma Bolt)
- Complex spells (Thunderstorm, Cataclysm)
- Recipe normalization

### Run Tests in Xcode
1. Open `NeedfulMage.xcodeproj`
2. Press `Cmd+U` or Product → Test
3. View results in Test Navigator

## Adding New Spells

### 1. Define the Recipe in SpellCrafter.swift

Add a new case to the appropriate method:
- `craftBasicSpell()` - Single element
- `craftModifiedSpell()` - Element + modifier
- `craftCombinationSpell()` - Two elements
- `craftComplexSpell()` - Multiple elements/modifiers

Example:
```swift
if element == .fire && modSet.contains(.pierce) {
    return .success(Spell(
        name: "Fire Lance",
        emoji: "🔥➡️",
        effect: "A piercing beam of flame",
        recipe: SpellRecipe(elements: [.fire], modifiers: [.pierce]),
        power: 18
    ))
}
```

### 2. Add Tests in SpellCrafterTests.swift

```swift
func testFireLance() {
    let recipe = SpellRecipe(elements: [.fire], modifiers: [.pierce])
    let result = crafter.craft(recipe)
    
    XCTAssertTrue(result.isSuccess)
    XCTAssertEqual(result.spell?.name, "Fire Lance")
}
```

### 3. (Optional) Add to Wizard Requests

Edit `WizardRequest.swift` to create quests that require the new spell.

## Adding New Elements or Modifiers

### 1. Update the Enum

In `Element.swift` or `Modifier.swift`:
```swift
public enum Element: String, CaseIterable, Codable, Sendable {
    case fire
    case ice
    // ... existing ...
    case shadow  // New element
    
    public var emoji: String {
        switch self {
        // ... existing ...
        case .shadow: return "🌑"
        }
    }
}
```

### 2. Add Spell Recipes

Create spells that use the new element in `SpellCrafter.swift`

### 3. Update Unlock Progression

Add the new element to quest rewards in `WizardRequest.campaign`

## Game Balance Guidelines

- **Basic spells**: 8-15 power
- **Modified spells**: 14-25 power
- **Combination spells**: 15-22 power
- **Complex spells**: 25-35 power

Keep progression smooth - players should feel rewarded for discovering combinations.

## UI Customization

### Colors
Main theme colors are in `ContentView.swift`:
- Background: Purple/Blue gradient
- Accent: Purple for magical effects
- Dark mode only for cozy wizard tower feel

### Layout
All views use SwiftUI with:
- `@Observable` macro for state management
- Portrait orientation
- Safe area aware layouts
- Touch-friendly button sizes (70x70pt minimum)

## Code Style

- **SwiftUI**: Use `some View` for view bodies
- **State**: Prefer `@Observable` over `@State` for models
- **Naming**: Clear, descriptive names (no abbreviations)
- **Comments**: Only for non-obvious logic, not narration

## Architecture

### MVVM Pattern
- **Models**: `GameState`, `WizardRequest` (Observable)
- **Views**: `ContentView`, `SpellCraftingView` (SwiftUI)
- **Logic**: `SpellCrafter` (Pure Swift, testable)

### Data Flow
1. User taps rune → `GameState.toggleElement()`
2. User crafts → `GameState.craftSpell()` calls `SpellCrafter.craft()`
3. Result updates UI via SwiftUI bindings
4. User casts → `GameState.castSpell()` checks against request
5. Success → Unlock new runes, advance quest

## Debugging Tips

### Spell Not Working?
- Check `SpellCrafter.craft()` - does your recipe match any pattern?
- Add debug `print()` statements in craft methods
- Recipe elements are auto-sorted, so order doesn't matter

### UI Not Updating?
- Ensure `GameState` uses `@Observable` macro
- Views use `@Bindable` for mutable access
- Check `showingResult` flag for alerts

### Test Failures?
- Run `swift test --verbose` for detailed output
- Check recipe normalization (elements are sorted)
- Verify spell names match exactly

## Performance Notes

- All spell crafting is instant (no async needed)
- SwiftUI handles all UI updates automatically
- No heavy computations - safe to run on any device
- Asset catalog uses vector/template images where possible

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass (`swift test`)
5. Update documentation if needed
6. Submit a pull request

## Common Issues

**Xcode can't find SpellCraft package**
→ File → Packages → Resolve Package Versions

**Code signing error**
→ Project Settings → Signing & Capabilities → Select your team

**Simulator crashes**
→ Device → Erase All Content and Settings → Retry

**Tests fail on Linux**
→ Ensure Swift 5.9+ installed: `swift --version`

## Resources

- [Swift Documentation](https://swift.org/documentation/)
- [SwiftUI Tutorials](https://developer.apple.com/tutorials/swiftui)
- [Testing in Swift](https://developer.apple.com/documentation/xctest)

---

Questions? Open an issue or contact coppercoffin@gmail.com
