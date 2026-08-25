import XCTest
import SpellCraftPackageDiscoveredTests

@main
@available(*, deprecated, message: "Not actually deprecated. Marked as deprecated to allow inclusion of deprecated tests (which test deprecated functionality) without warnings")
struct Runner {
    static func main() {
        XCTMain(__allDiscoveredTests())
    }
}
