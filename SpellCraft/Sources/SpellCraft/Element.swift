public enum Element: String, CaseIterable, Codable, Sendable {
    case fire
    case ice
    case lightning
    case arcane
    case heal
    
    public var name: String { 
        rawValue.prefix(1).uppercased() + rawValue.dropFirst()
    }
    
    public var emoji: String {
        switch self {
        case .fire: return "🔥"
        case .ice: return "❄️"
        case .lightning: return "⚡"
        case .arcane: return "🛡️"
        case .heal: return "💚"
        }
    }
    
    public var description: String {
        switch self {
        case .fire: return "Burns with fierce heat"
        case .ice: return "Freezes and slows"
        case .lightning: return "Strikes with electric fury"
        case .arcane: return "Protects and shields"
        case .heal: return "Mends wounds and restores"
        }
    }
}
