import SwiftUI

struct ContentView: View {
    @State private var gameState = GameState()
    
    var body: some View {
        ZStack {
            LinearGradient(
                colors: [Color(red: 0.1, green: 0.05, blue: 0.2), Color(red: 0.2, green: 0.1, blue: 0.3)],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()
            
            if gameState.gameComplete {
                VictoryView(gameState: gameState)
            } else {
                GameView(gameState: gameState)
            }
        }
        .preferredColorScheme(.dark)
    }
}

struct GameView: View {
    @Bindable var gameState: GameState
    
    var body: some View {
        VStack(spacing: 20) {
            ProgressView(value: Double(gameState.currentRequestIndex), total: Double(WizardRequest.campaign.count))
                .tint(.purple)
                .padding(.horizontal)
            
            Text("Quest \(gameState.progress)")
                .font(.caption)
                .foregroundStyle(.white.opacity(0.7))
            
            if let request = gameState.currentRequest {
                WizardRequestCard(request: request)
            }
            
            SpellCraftingView(gameState: gameState)
            
            Spacer()
        }
        .padding()
        .alert(gameState.resultMessage, isPresented: $gameState.showingResult) {
            if gameState.isSuccess {
                Button("Continue") {
                    gameState.nextRequest()
                }
            } else {
                Button("Try Again") {
                    gameState.showingResult = false
                }
            }
        }
    }
}

struct WizardRequestCard: View {
    let request: WizardRequest
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("🧙‍♂️")
                    .font(.system(size: 40))
                Text("The Wizard")
                    .font(.headline)
                    .foregroundStyle(.white)
                Spacer()
            }
            
            Text(request.message)
                .font(.body)
                .foregroundStyle(.white.opacity(0.9))
                .fixedSize(horizontal: false, vertical: true)
        }
        .padding()
        .background(
            RoundedRectangle(cornerRadius: 16)
                .fill(.ultraThinMaterial)
                .shadow(color: .purple.opacity(0.3), radius: 10)
        )
    }
}

struct VictoryView: View {
    @Bindable var gameState: GameState
    
    var body: some View {
        VStack(spacing: 30) {
            Text("🎉")
                .font(.system(size: 100))
            
            Text("Master Spellcrafter!")
                .font(.largeTitle)
                .bold()
                .foregroundStyle(.white)
            
            Text("You've helped the wizard through all their troubles!")
                .font(.title3)
                .foregroundStyle(.white.opacity(0.8))
                .multilineTextAlignment(.center)
            
            VStack(alignment: .leading, spacing: 8) {
                Text("Spells Mastered:")
                    .font(.headline)
                    .foregroundStyle(.white)
                
                ForEach(Array(gameState.masteredSpells.sorted()), id: \.self) { spell in
                    Text("✨ \(spell)")
                        .foregroundStyle(.white.opacity(0.9))
                }
            }
            .padding()
            .background(
                RoundedRectangle(cornerRadius: 12)
                    .fill(.ultraThinMaterial)
            )
            
            Button(action: { gameState.resetGame() }) {
                Text("Play Again")
                    .font(.headline)
                    .foregroundStyle(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(
                        RoundedRectangle(cornerRadius: 12)
                            .fill(.purple)
                    )
            }
            .padding(.horizontal)
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
