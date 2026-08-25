public enum Modifier: String, CaseIterable, Codable, Sendable {
    case amplify
    case chain
    case bounce
    case pierce
    
    public var name: String { 
        rawValue.prefix(1).uppercased() + rawValue.dropFirst()
    }
    
    public var emoji: String {
        switch self {
        case .amplify: return "💥"
        case .chain: return "🔗"
        case .bounce: return "↩️"
        case .pierce: return "➡️"
        }
    }
    
    public var description: String {
        switch self {
        case .amplify: return "Increases power dramatically"
        case .chain: return "Jumps to multiple targets"
        case .bounce: return "Ricochets between foes"
        case .pierce: return "Passes through obstacles"
        }
    }
}
