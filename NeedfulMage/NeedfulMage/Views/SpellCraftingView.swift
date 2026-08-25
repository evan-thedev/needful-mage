import SwiftUI
import SpellCraft

struct SpellCraftingView: View {
    @Bindable var gameState: GameState
    
    var body: some View {
        VStack(spacing: 20) {
            RecipeDisplay(recipe: gameState.currentRecipe, craftedSpell: gameState.craftedSpell)
            
            VStack(spacing: 16) {
                Text("Elements")
                    .font(.headline)
                    .foregroundStyle(.white)
                
                LazyVGrid(columns: [GridItem(.adaptive(minimum: 60))], spacing: 12) {
                    ForEach(Array(gameState.availableElements.sorted(by: { $0.rawValue < $1.rawValue })), id: \.self) { element in
                        RuneButton(
                            emoji: element.emoji,
                            name: element.name,
                            isSelected: gameState.currentRecipe.elements.contains(element)
                        ) {
                            gameState.toggleElement(element)
                        }
                    }
                }
                
                if !gameState.availableModifiers.isEmpty {
                    Text("Modifiers")
                        .font(.headline)
                        .foregroundStyle(.white)
                        .padding(.top, 8)
                    
                    LazyVGrid(columns: [GridItem(.adaptive(minimum: 60))], spacing: 12) {
                        ForEach(Array(gameState.availableModifiers.sorted(by: { $0.rawValue < $1.rawValue })), id: \.self) { modifier in
                            RuneButton(
                                emoji: modifier.emoji,
                                name: modifier.name,
                                isSelected: gameState.currentRecipe.modifiers.contains(modifier)
                            ) {
                                gameState.toggleModifier(modifier)
                            }
                        }
                    }
                }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 16)
                    .fill(.ultraThinMaterial)
            )
            
            HStack(spacing: 12) {
                Button(action: { gameState.clearRecipe() }) {
                    Text("Clear")
                        .font(.headline)
                        .foregroundStyle(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(
                            RoundedRectangle(cornerRadius: 12)
                                .fill(.red.opacity(0.7))
                        )
                }
                
                if gameState.craftedSpell == nil {
                    Button(action: { gameState.craftSpell() }) {
                        Text("Craft")
                            .font(.headline)
                            .foregroundStyle(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(gameState.currentRecipe.isEmpty ? .gray : .blue)
                            )
                    }
                    .disabled(gameState.currentRecipe.isEmpty)
                } else {
                    Button(action: { gameState.castSpell() }) {
                        Text("Cast!")
                            .font(.headline)
                            .foregroundStyle(.white)
                            .padding()
                            .frame(maxWidth: .infinity)
                            .background(
                                RoundedRectangle(cornerRadius: 12)
                                    .fill(.green)
                            )
                    }
                }
            }
        }
    }
}

struct RecipeDisplay: View {
    let recipe: SpellRecipe
    let craftedSpell: Spell?
    
    var body: some View {
        VStack(spacing: 12) {
            Text("Crafting Circle")
                .font(.headline)
                .foregroundStyle(.white)
            
            ZStack {
                Circle()
                    .stroke(
                        LinearGradient(
                            colors: [.purple, .blue, .purple],
                            startPoint: .topLeading,
                            endPoint: .bottomTrailing
                        ),
                        lineWidth: 3
                    )
                    .frame(width: 140, height: 140)
                
                if let spell = craftedSpell {
                    VStack(spacing: 8) {
                        Text(spell.emoji)
                            .font(.system(size: 50))
                        Text(spell.name)
                            .font(.caption)
                            .bold()
                            .foregroundStyle(.white)
                    }
                } else if !recipe.isEmpty {
                    HStack(spacing: 4) {
                        ForEach(recipe.elements, id: \.self) { element in
                            Text(element.emoji)
                                .font(.system(size: 30))
                        }
                        ForEach(recipe.modifiers, id: \.self) { modifier in
                            Text(modifier.emoji)
                                .font(.system(size: 20))
                        }
                    }
                } else {
                    Text("Select runes")
                        .font(.caption)
                        .foregroundStyle(.white.opacity(0.5))
                }
            }
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
                .shadow(color: .purple.opacity(0.3), radius: 10)
        )
    }
}

struct RuneButton: View {
    let emoji: String
    let name: String
    let isSelected: Bool
    let action: () -> Void
    
    var body: some View {
        Button(action: action) {
            VStack(spacing: 4) {
                Text(emoji)
                    .font(.system(size: 32))
                Text(name)
                    .font(.caption2)
                    .foregroundStyle(.white)
                    .lineLimit(1)
                    .minimumScaleFactor(0.5)
            }
            .frame(width: 70, height: 70)
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(isSelected ? .purple.opacity(0.6) : .black.opacity(0.3))
                    .shadow(color: isSelected ? .purple : .clear, radius: 8)
            )
        }
    }
}

#Preview {
    SpellCraftingView(gameState: GameState())
        .background(Color.black)
}
