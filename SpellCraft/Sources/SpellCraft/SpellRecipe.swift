public struct SpellRecipe: Equatable, Codable, Sendable {
    public let elements: [Element]
    public let modifiers: [Modifier]
    
    public init(elements: [Element], modifiers: [Modifier] = []) {
        self.elements = elements.sorted { $0.rawValue < $1.rawValue }
        self.modifiers = modifiers.sorted { $0.rawValue < $1.rawValue }
    }
    
    public var isEmpty: Bool {
        elements.isEmpty
    }
}
