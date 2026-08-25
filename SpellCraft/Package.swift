// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "SpellCraft",
    platforms: [
        .iOS(.v17),
        .macOS(.v14)
    ],
    products: [
        .library(
            name: "SpellCraft",
            targets: ["SpellCraft"]),
    ],
    targets: [
        .target(
            name: "SpellCraft"),
        .testTarget(
            name: "SpellCraftTests",
            dependencies: ["SpellCraft"]),
    ]
)
