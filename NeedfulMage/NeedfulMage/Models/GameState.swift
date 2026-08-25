import Foundation
import SpellCraft

@Observable
class GameState {
    var currentRequestIndex: Int = 0
    var masteredSpells: Set<String> = []
    var availableElements: Set<Element> = [.fire]
    var availableModifiers: Set<Modifier> = []
    var currentRecipe: SpellRecipe = SpellRecipe(elements: [])
    var craftedSpell: Spell?
    var showingResult: Bool = false
    var resultMessage: String = ""
    var isSuccess: Bool = false
    var gameComplete: Bool = false
    
    let crafter = SpellCrafter()
    
    var currentRequest: WizardRequest? {
        guard currentRequestIndex < WizardRequest.campaign.count else {
            return nil
        }
        return WizardRequest.campaign[currentRequestIndex]
    }
    
    var progress: String {
        "\(currentRequestIndex + 1) / \(WizardRequest.campaign.count)"
    }
    
    func toggleElement(_ element: Element) {
        var elements = currentRecipe.elements
        if let index = elements.firstIndex(of: element) {
            elements.remove(at: index)
        } else {
            elements.append(element)
        }
        currentRecipe = SpellRecipe(elements: elements, modifiers: currentRecipe.modifiers)
        craftedSpell = nil
    }
    
    func toggleModifier(_ modifier: Modifier) {
        var modifiers = currentRecipe.modifiers
        if let index = modifiers.firstIndex(of: modifier) {
            modifiers.remove(at: index)
        } else {
            modifiers.append(modifier)
        }
        currentRecipe = SpellRecipe(elements: currentRecipe.elements, modifiers: modifiers)
        craftedSpell = nil
    }
    
    func craftSpell() {
        let result = crafter.craft(currentRecipe)
        
        switch result {
        case .success(let spell):
            craftedSpell = spell
            resultMessage = "You've crafted: \(spell.emoji) \(spell.name)!"
            showingResult = true
        case .failure(let message):
            craftedSpell = nil
            resultMessage = message
            showingResult = true
        }
    }
    
    func castSpell() {
        guard let spell = craftedSpell,
              let request = currentRequest else {
            return
        }
        
        if request.acceptableSpells.contains(spell.name) {
            isSuccess = true
            resultMessage = request.successMessage
            masteredSpells.insert(spell.name)
            
            for element in request.unlockElements {
                availableElements.insert(element)
            }
            for modifier in request.unlockModifiers {
                availableModifiers.insert(modifier)
            }
            
            showingResult = true
        } else {
            isSuccess = false
            resultMessage = request.failureMessage
            showingResult = true
        }
    }
    
    func nextRequest() {
        currentRequestIndex += 1
        currentRecipe = SpellRecipe(elements: [])
        craftedSpell = nil
        showingResult = false
        
        if currentRequestIndex >= WizardRequest.campaign.count {
            gameComplete = true
        }
    }
    
    func clearRecipe() {
        currentRecipe = SpellRecipe(elements: [])
        craftedSpell = nil
    }
    
    func resetGame() {
        currentRequestIndex = 0
        masteredSpells = []
        availableElements = [.fire]
        availableModifiers = []
        currentRecipe = SpellRecipe(elements: [])
        craftedSpell = nil
        showingResult = false
        resultMessage = ""
        isSuccess = false
        gameComplete = false
    }
}
