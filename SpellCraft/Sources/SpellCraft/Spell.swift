public struct Spell: Equatable, Codable, Sendable {
    public let name: String
    public let emoji: String
    public let effect: String
    public let recipe: SpellRecipe
    public let power: Int
    
    public init(name: String, emoji: String, effect: String, recipe: SpellRecipe, power: Int = 10) {
        self.name = name
        self.emoji = emoji
        self.effect = effect
        self.recipe = recipe
        self.power = power
    }
}

public enum SpellResult: Equatable, Sendable {
    case success(Spell)
    case failure(String)
    
    public var spell: Spell? {
        if case .success(let spell) = self {
            return spell
        }
        return nil
    }
    
    public var isSuccess: Bool {
        if case .success = self {
            return true
        }
        return false
    }
}
