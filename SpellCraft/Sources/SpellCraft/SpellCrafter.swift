public struct SpellCrafter: Sendable {
    public init() {}
    
    public func craft(_ recipe: SpellRecipe) -> SpellResult {
        if recipe.isEmpty {
            return .failure("You need to add some elements to craft a spell!")
        }
        
        let elementSet = Set(recipe.elements)
        let modifierSet = Set(recipe.modifiers)
        
        // Basic single-element spells
        if recipe.elements.count == 1 && recipe.modifiers.isEmpty {
            return craftBasicSpell(recipe.elements[0])
        }
        
        // Complex combinations (check before simple modified spells)
        if elementSet.count >= 2 && !recipe.modifiers.isEmpty {
            return craftComplexSpell(elements: elementSet, modifiers: modifierSet)
        }
        
        // Modified single-element spells with multiple modifiers
        if elementSet.count == 1 && recipe.modifiers.count > 1 {
            let result = craftComplexSpell(elements: elementSet, modifiers: modifierSet)
            if result.isSuccess {
                return result
            }
        }
        
        // Modified single-element spells
        if elementSet.count == 1 && !recipe.modifiers.isEmpty {
            return craftModifiedSpell(recipe.elements[0], modifiers: recipe.modifiers)
        }
        
        // Combination spells
        if elementSet.count == 2 && recipe.modifiers.isEmpty {
            return craftCombinationSpell(elements: elementSet)
        }
        
        // Triple element experimental spells
        if elementSet.count >= 3 {
            return craftExperimentalSpell(elements: elementSet)
        }
        
        return .failure("The runes fizzle and spark but refuse to form a proper spell.")
    }
    
    private func craftBasicSpell(_ element: Element) -> SpellResult {
        switch element {
        case .fire:
            return .success(Spell(
                name: "Fireball",
                emoji: "🔥",
                effect: "A blazing sphere of flame that burns its target",
                recipe: SpellRecipe(elements: [.fire]),
                power: 15
            ))
        case .ice:
            return .success(Spell(
                name: "Frostbolt",
                emoji: "❄️",
                effect: "A shard of ice that freezes and slows",
                recipe: SpellRecipe(elements: [.ice]),
                power: 12
            ))
        case .lightning:
            return .success(Spell(
                name: "Spark",
                emoji: "⚡",
                effect: "A quick jolt of electricity",
                recipe: SpellRecipe(elements: [.lightning]),
                power: 10
            ))
        case .arcane:
            return .success(Spell(
                name: "Ward",
                emoji: "🛡️",
                effect: "A shimmering barrier that deflects harm",
                recipe: SpellRecipe(elements: [.arcane]),
                power: 8
            ))
        case .heal:
            return .success(Spell(
                name: "Mend",
                emoji: "💚",
                effect: "Gentle magic that heals wounds",
                recipe: SpellRecipe(elements: [.heal]),
                power: 10
            ))
        }
    }
    
    private func craftModifiedSpell(_ element: Element, modifiers: [Modifier]) -> SpellResult {
        let modSet = Set(modifiers)
        
        if element == .lightning && modSet.contains(.chain) {
            return .success(Spell(
                name: "Chain Lightning",
                emoji: "⚡🔗",
                effect: "Lightning that arcs between multiple targets",
                recipe: SpellRecipe(elements: [.lightning], modifiers: [.chain]),
                power: 20
            ))
        }
        
        if element == .fire && modSet.contains(.amplify) {
            return .success(Spell(
                name: "Inferno",
                emoji: "🔥💥",
                effect: "A massive explosion of searing flame",
                recipe: SpellRecipe(elements: [.fire], modifiers: [.amplify]),
                power: 25
            ))
        }
        
        if element == .ice && modSet.contains(.amplify) {
            return .success(Spell(
                name: "Blizzard",
                emoji: "❄️💥",
                effect: "A devastating frozen storm",
                recipe: SpellRecipe(elements: [.ice], modifiers: [.amplify]),
                power: 24
            ))
        }
        
        if element == .arcane && modSet.contains(.amplify) {
            return .success(Spell(
                name: "Greater Ward",
                emoji: "🛡️💥",
                effect: "An impenetrable shield of pure energy",
                recipe: SpellRecipe(elements: [.arcane], modifiers: [.amplify]),
                power: 18
            ))
        }
        
        if element == .heal && modSet.contains(.amplify) {
            return .success(Spell(
                name: "Mass Heal",
                emoji: "💚💥",
                effect: "Powerful restorative magic that heals many",
                recipe: SpellRecipe(elements: [.heal], modifiers: [.amplify]),
                power: 20
            ))
        }
        
        if modSet.contains(.bounce) {
            return .success(Spell(
                name: "Bouncing \(element.name) Bolt",
                emoji: "\(element.emoji)↩️",
                effect: "A \(element.rawValue) bolt that ricochets unpredictably",
                recipe: SpellRecipe(elements: [element], modifiers: [.bounce]),
                power: 14
            ))
        }
        
        return .failure("Those runes don't quite mesh. The spell sputters out!")
    }
    
    private func craftCombinationSpell(elements: Set<Element>) -> SpellResult {
        if elements == [.fire, .ice] {
            return .success(Spell(
                name: "Steam Blast",
                emoji: "💨",
                effect: "Opposing forces create a scalding cloud of steam",
                recipe: SpellRecipe(elements: [.fire, .ice]),
                power: 16
            ))
        }
        
        if elements == [.fire, .lightning] {
            return .success(Spell(
                name: "Plasma Bolt",
                emoji: "🌟",
                effect: "Superheated energy that burns and shocks",
                recipe: SpellRecipe(elements: [.fire, .lightning]),
                power: 18
            ))
        }
        
        if elements == [.ice, .arcane] {
            return .success(Spell(
                name: "Frozen Barrier",
                emoji: "🧊",
                effect: "A wall of magical ice that blocks attacks",
                recipe: SpellRecipe(elements: [.ice, .arcane]),
                power: 15
            ))
        }
        
        if elements == [.heal, .arcane] {
            return .success(Spell(
                name: "Regenerating Ward",
                emoji: "💚🛡️",
                effect: "A shield that slowly heals its bearer",
                recipe: SpellRecipe(elements: [.heal, .arcane]),
                power: 16
            ))
        }
        
        if elements == [.lightning, .arcane] {
            return .success(Spell(
                name: "Storm Shield",
                emoji: "⚡🛡️",
                effect: "A crackling barrier that shocks attackers",
                recipe: SpellRecipe(elements: [.lightning, .arcane]),
                power: 17
            ))
        }
        
        return .failure("Those elements clash chaotically. Try a different combination!")
    }
    
    private func craftComplexSpell(elements: Set<Element>, modifiers: Set<Modifier>) -> SpellResult {
        if elements == [.lightning] && modifiers.contains(.chain) && modifiers.contains(.amplify) {
            return .success(Spell(
                name: "Thunderstorm",
                emoji: "⚡🔗💥",
                effect: "Devastating chain lightning of immense power",
                recipe: SpellRecipe(elements: [.lightning], modifiers: [.chain, .amplify]),
                power: 35
            ))
        }
        
        if elements.contains(.fire) && elements.contains(.ice) && modifiers.contains(.amplify) {
            return .success(Spell(
                name: "Cataclysm",
                emoji: "🌋",
                effect: "Reality tears as fire and ice collide with force",
                recipe: SpellRecipe(elements: [.fire, .ice], modifiers: [.amplify]),
                power: 30
            ))
        }
        
        return .failure("Too much power! The runes overload and fizzle harmlessly.")
    }
    
    private func craftExperimentalSpell(elements: Set<Element>) -> SpellResult {
        if elements.contains(.fire) && elements.contains(.ice) && elements.contains(.lightning) {
            return .success(Spell(
                name: "Chaos Orb",
                emoji: "🌀",
                effect: "A swirling orb of elemental chaos",
                recipe: SpellRecipe(elements: [.fire, .ice, .lightning]),
                power: 22
            ))
        }
        
        return .failure("The wizard's beard catches fire! Those elements are too unstable together.")
    }
}
