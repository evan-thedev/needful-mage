import XCTest
@testable import SpellCraft

final class SpellCrafterTests: XCTestCase {
    let crafter = SpellCrafter()
    
    func testEmptyRecipe() {
        let recipe = SpellRecipe(elements: [])
        let result = crafter.craft(recipe)
        
        XCTAssertFalse(result.isSuccess)
    }
    
    func testFireball() {
        let recipe = SpellRecipe(elements: [.fire])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Fireball")
        XCTAssertEqual(result.spell?.power, 15)
    }
    
    func testFrostbolt() {
        let recipe = SpellRecipe(elements: [.ice])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Frostbolt")
    }
    
    func testSpark() {
        let recipe = SpellRecipe(elements: [.lightning])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Spark")
    }
    
    func testWard() {
        let recipe = SpellRecipe(elements: [.arcane])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Ward")
    }
    
    func testMend() {
        let recipe = SpellRecipe(elements: [.heal])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Mend")
    }
    
    func testChainLightning() {
        let recipe = SpellRecipe(elements: [.lightning], modifiers: [.chain])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Chain Lightning")
        XCTAssertEqual(result.spell?.power, 20)
    }
    
    func testInferno() {
        let recipe = SpellRecipe(elements: [.fire], modifiers: [.amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Inferno")
        XCTAssertEqual(result.spell?.power, 25)
    }
    
    func testBlizzard() {
        let recipe = SpellRecipe(elements: [.ice], modifiers: [.amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Blizzard")
    }
    
    func testGreaterWard() {
        let recipe = SpellRecipe(elements: [.arcane], modifiers: [.amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Greater Ward")
    }
    
    func testMassHeal() {
        let recipe = SpellRecipe(elements: [.heal], modifiers: [.amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Mass Heal")
    }
    
    func testSteamBlast() {
        let recipe = SpellRecipe(elements: [.fire, .ice])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Steam Blast")
    }
    
    func testPlasmaBolt() {
        let recipe = SpellRecipe(elements: [.fire, .lightning])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Plasma Bolt")
    }
    
    func testFrozenBarrier() {
        let recipe = SpellRecipe(elements: [.ice, .arcane])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Frozen Barrier")
    }
    
    func testRegeneratingWard() {
        let recipe = SpellRecipe(elements: [.heal, .arcane])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Regenerating Ward")
    }
    
    func testStormShield() {
        let recipe = SpellRecipe(elements: [.lightning, .arcane])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Storm Shield")
    }
    
    func testThunderstorm() {
        let recipe = SpellRecipe(elements: [.lightning], modifiers: [.chain, .amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Thunderstorm")
        XCTAssertEqual(result.spell?.power, 35)
    }
    
    func testCataclysm() {
        let recipe = SpellRecipe(elements: [.fire, .ice], modifiers: [.amplify])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Cataclysm")
        XCTAssertEqual(result.spell?.power, 30)
    }
    
    func testChaosOrb() {
        let recipe = SpellRecipe(elements: [.fire, .ice, .lightning])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertEqual(result.spell?.name, "Chaos Orb")
    }
    
    func testRecipeNormalization() {
        let recipe1 = SpellRecipe(elements: [.fire, .ice])
        let recipe2 = SpellRecipe(elements: [.ice, .fire])
        
        XCTAssertEqual(recipe1, recipe2)
    }
    
    func testBouncingSpell() {
        let recipe = SpellRecipe(elements: [.fire], modifiers: [.bounce])
        let result = crafter.craft(recipe)
        
        XCTAssertTrue(result.isSuccess)
        XCTAssertTrue(result.spell?.name.contains("Bouncing") ?? false)
    }
}
