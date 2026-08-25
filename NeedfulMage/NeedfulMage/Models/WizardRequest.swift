import Foundation
import SpellCraft

struct WizardRequest: Identifiable {
    let id = UUID()
    let message: String
    let requiredElements: Set<Element>
    let acceptableSpells: Set<String>
    let successMessage: String
    let failureMessage: String
    let unlockElements: [Element]
    let unlockModifiers: [Modifier]
    
    init(
        message: String,
        requiredElements: Set<Element>,
        acceptableSpells: Set<String>,
        successMessage: String,
        failureMessage: String,
        unlockElements: [Element] = [],
        unlockModifiers: [Modifier] = []
    ) {
        self.message = message
        self.requiredElements = requiredElements
        self.acceptableSpells = acceptableSpells
        self.successMessage = successMessage
        self.failureMessage = failureMessage
        self.unlockElements = unlockElements
        self.unlockModifiers = unlockModifiers
    }
}

extension WizardRequest {
    static let campaign: [WizardRequest] = [
        WizardRequest(
            message: "Help! The brazier's gone out and I can't see my spellbook! Something hot would do the trick...",
            requiredElements: [.fire],
            acceptableSpells: ["Fireball", "Inferno", "Plasma Bolt", "Steam Blast"],
            successMessage: "Brilliant! The flames dance merrily now. I can see again!",
            failureMessage: "That won't light the brazier, I'm afraid. Try something with more... heat?",
            unlockElements: [.ice]
        ),
        
        WizardRequest(
            message: "There's a gelatinous slime blocking my laboratory door! It's jiggling menacingly. Can you freeze it solid?",
            requiredElements: [.ice],
            acceptableSpells: ["Frostbolt", "Blizzard", "Steam Blast", "Frozen Barrier"],
            successMessage: "Perfect! *CRACK* The slime shatters like glass. Door's clear!",
            failureMessage: "The slime jiggles unimpressed. It needs to be frozen, not... whatever that was.",
            unlockElements: [.lightning]
        ),
        
        WizardRequest(
            message: "My crystal ball's power crystal has gone dark! Hit it with some electricity to charge it back up!",
            requiredElements: [.lightning],
            acceptableSpells: ["Spark", "Chain Lightning", "Plasma Bolt", "Thunderstorm", "Storm Shield"],
            successMessage: "Zap! The crystal glows bright blue again. Much better!",
            failureMessage: "That didn't charge it. I need electrical energy, specifically!",
            unlockElements: [.arcane],
            unlockModifiers: [.amplify]
        ),
        
        WizardRequest(
            message: "The enchanted mirror is shooting sparks at me! I need a shield, quickly!",
            requiredElements: [.arcane],
            acceptableSpells: ["Ward", "Greater Ward", "Frozen Barrier", "Regenerating Ward", "Storm Shield"],
            successMessage: "Ah, blessed protection! The sparks bounce harmlessly off now.",
            failureMessage: "That's not going to protect me! I need a proper defensive spell!",
            unlockElements: [.heal],
            unlockModifiers: [.chain]
        ),
        
        WizardRequest(
            message: "My familiar got singed by those sparks! Poor little thing needs healing magic, stat!",
            requiredElements: [.heal],
            acceptableSpells: ["Mend", "Mass Heal", "Regenerating Ward"],
            successMessage: "There we go! The little fellow perks right up. Good as new!",
            failureMessage: "That won't mend his burns. I need restorative magic!",
            unlockModifiers: [.bounce]
        ),
        
        WizardRequest(
            message: "Three fire imps appeared and they're running amok! Can you hit them all at once with lightning?",
            requiredElements: [.lightning],
            acceptableSpells: ["Chain Lightning", "Thunderstorm", "Plasma Bolt"],
            successMessage: "ZAP ZAP ZAP! All three imps poof into smoke! Magnificent work!",
            failureMessage: "That only got one of them! I need something that chains between targets!",
            unlockModifiers: [.pierce]
        ),
        
        WizardRequest(
            message: "The experimental potion is freezing AND boiling simultaneously! Hit it with opposing forces to stabilize it!",
            requiredElements: [.fire, .ice],
            acceptableSpells: ["Steam Blast", "Cataclysm"],
            successMessage: "*POOF* The potion settles into a pleasant lavender color. Crisis averted!",
            failureMessage: "It's getting worse! I need fire AND ice together to balance it out!",
            unlockElements: []
        ),
        
        WizardRequest(
            message: "The spellbook tower is collapsing! I need your MOST POWERFUL spell to blast it back into place!",
            requiredElements: [],
            acceptableSpells: ["Thunderstorm", "Cataclysm", "Inferno", "Chaos Orb"],
            successMessage: "BOOM! The tower rights itself with a thud. You've saved my entire library! You're a true master of the craft!",
            failureMessage: "That's not strong enough! Pour more power into it! Try combining elements with amplification!"
        )
    ]
}
