import XCTest
@testable import SpellCraftTests

fileprivate extension SpellCrafterTests {
    @available(*, deprecated, message: "Not actually deprecated. Marked as deprecated to allow inclusion of deprecated tests (which test deprecated functionality) without warnings")
    static let __allTests__SpellCrafterTests = [
        ("testBlizzard", testBlizzard),
        ("testBouncingSpell", testBouncingSpell),
        ("testCataclysm", testCataclysm),
        ("testChainLightning", testChainLightning),
        ("testChaosOrb", testChaosOrb),
        ("testEmptyRecipe", testEmptyRecipe),
        ("testFireball", testFireball),
        ("testFrostbolt", testFrostbolt),
        ("testFrozenBarrier", testFrozenBarrier),
        ("testGreaterWard", testGreaterWard),
        ("testInferno", testInferno),
        ("testMassHeal", testMassHeal),
        ("testMend", testMend),
        ("testPlasmaBolt", testPlasmaBolt),
        ("testRecipeNormalization", testRecipeNormalization),
        ("testRegeneratingWard", testRegeneratingWard),
        ("testSpark", testSpark),
        ("testSteamBlast", testSteamBlast),
        ("testStormShield", testStormShield),
        ("testThunderstorm", testThunderstorm),
        ("testWard", testWard),
    ]
}
@available(*, deprecated, message: "Not actually deprecated. Marked as deprecated to allow inclusion of deprecated tests (which test deprecated functionality) without warnings")
func __SpellCraftTests__allTests() -> [XCTestCaseEntry] {
    return [
        testCase(SpellCrafterTests.__allTests__SpellCrafterTests),
    ]
}