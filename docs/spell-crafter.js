// SpellCraft - Spell Recipe Engine (ported from Swift)

const Elements = {
    FIRE: { id: 'fire', name: 'Fire', emoji: '🔥' },
    ICE: { id: 'ice', name: 'Ice', emoji: '❄️' },
    LIGHTNING: { id: 'lightning', name: 'Lightning', emoji: '⚡' },
    ARCANE: { id: 'arcane', name: 'Arcane', emoji: '🛡️' },
    HEAL: { id: 'heal', name: 'Heal', emoji: '💚' }
};

const Modifiers = {
    AMPLIFY: { id: 'amplify', name: 'Amplify', emoji: '💥' },
    CHAIN: { id: 'chain', name: 'Chain', emoji: '🔗' },
    BOUNCE: { id: 'bounce', name: 'Bounce', emoji: '↩️' },
    PIERCE: { id: 'pierce', name: 'Pierce', emoji: '➡️' }
};

class SpellCrafter {
    craft(elements, modifiers) {
        if (elements.length === 0) {
            return { success: false, message: "You need to add some elements to craft a spell!" };
        }

        const elementSet = new Set(elements);
        const modifierSet = new Set(modifiers);

        if (elementSet.size >= 2 && modifiers.length > 0) {
            const result = this.craftComplexSpell(elementSet, modifierSet);
            if (result.success) return result;
        }

        if (elementSet.size === 1 && modifiers.length > 1) {
            const result = this.craftComplexSpell(elementSet, modifierSet);
            if (result.success) return result;
        }

        if (elementSet.size === 1 && modifiers.length > 0) {
            return this.craftModifiedSpell(elements[0], modifierSet);
        }

        if (elements.length === 1 && modifiers.length === 0) {
            return this.craftBasicSpell(elements[0]);
        }

        if (elementSet.size === 2 && modifiers.length === 0) {
            return this.craftCombinationSpell(elementSet);
        }

        if (elementSet.size >= 3) {
            return this.craftExperimentalSpell(elementSet);
        }

        return { success: false, message: "The runes fizzle and spark but refuse to form a proper spell." };
    }

    craftBasicSpell(element) {
        const spells = {
            fire: { name: 'Fireball', emoji: '🔥', effect: 'A blazing sphere of flame', power: 15 },
            ice: { name: 'Frostbolt', emoji: '❄️', effect: 'A shard of ice that freezes', power: 12 },
            lightning: { name: 'Spark', emoji: '⚡', effect: 'A quick jolt of electricity', power: 10 },
            arcane: { name: 'Ward', emoji: '🛡️', effect: 'A shimmering barrier', power: 8 },
            heal: { name: 'Mend', emoji: '💚', effect: 'Gentle healing magic', power: 10 }
        };
        return { success: true, spell: spells[element] };
    }

    craftModifiedSpell(element, modifiers) {
        if (element === 'lightning' && modifiers.has('chain')) {
            return { success: true, spell: { name: 'Chain Lightning', emoji: '⚡🔗', effect: 'Lightning that arcs between targets', power: 20 }};
        }
        if (element === 'fire' && modifiers.has('amplify')) {
            return { success: true, spell: { name: 'Inferno', emoji: '🔥💥', effect: 'A massive explosion of flame', power: 25 }};
        }
        if (element === 'ice' && modifiers.has('amplify')) {
            return { success: true, spell: { name: 'Blizzard', emoji: '❄️💥', effect: 'A devastating frozen storm', power: 24 }};
        }
        if (element === 'arcane' && modifiers.has('amplify')) {
            return { success: true, spell: { name: 'Greater Ward', emoji: '🛡️💥', effect: 'An impenetrable shield', power: 18 }};
        }
        if (element === 'heal' && modifiers.has('amplify')) {
            return { success: true, spell: { name: 'Mass Heal', emoji: '💚💥', effect: 'Powerful restorative magic', power: 20 }};
        }
        if (modifiers.has('bounce')) {
            const elementName = Elements[element.toUpperCase()].name;
            return { success: true, spell: { name: `Bouncing ${elementName} Bolt`, emoji: `${Elements[element.toUpperCase()].emoji}↩️`, effect: `A ${element} bolt that ricochets`, power: 14 }};
        }
        return { success: false, message: "Those runes don't quite mesh. The spell sputters out!" };
    }

    craftCombinationSpell(elementSet) {
        const elements = Array.from(elementSet).sort();
        if (elements.includes('fire') && elements.includes('ice')) {
            return { success: true, spell: { name: 'Steam Blast', emoji: '💨', effect: 'Opposing forces create scalding steam', power: 16 }};
        }
        if (elements.includes('fire') && elements.includes('lightning')) {
            return { success: true, spell: { name: 'Plasma Bolt', emoji: '🌟', effect: 'Superheated energy', power: 18 }};
        }
        if (elements.includes('ice') && elements.includes('arcane')) {
            return { success: true, spell: { name: 'Frozen Barrier', emoji: '🧊', effect: 'A wall of magical ice', power: 15 }};
        }
        if (elements.includes('heal') && elements.includes('arcane')) {
            return { success: true, spell: { name: 'Regenerating Ward', emoji: '💚🛡️', effect: 'A shield that heals', power: 16 }};
        }
        if (elements.includes('lightning') && elements.includes('arcane')) {
            return { success: true, spell: { name: 'Storm Shield', emoji: '⚡🛡️', effect: 'A crackling barrier', power: 17 }};
        }
        return { success: false, message: "Those elements clash chaotically!" };
    }

    craftComplexSpell(elementSet, modifierSet) {
        const elements = Array.from(elementSet).sort();
        if (elements.length === 1 && elements[0] === 'lightning' && modifierSet.has('chain') && modifierSet.has('amplify')) {
            return { success: true, spell: { name: 'Thunderstorm', emoji: '⚡🔗💥', effect: 'Devastating chain lightning', power: 35 }};
        }
        if (elements.includes('fire') && elements.includes('ice') && modifierSet.has('amplify')) {
            return { success: true, spell: { name: 'Cataclysm', emoji: '🌋', effect: 'Reality tears apart', power: 30 }};
        }
        return { success: false, message: "Too much power! The runes overload." };
    }

    craftExperimentalSpell(elementSet) {
        const elements = Array.from(elementSet).sort();
        if (elements.includes('fire') && elements.includes('ice') && elements.includes('lightning')) {
            return { success: true, spell: { name: 'Chaos Orb', emoji: '🌀', effect: 'A swirling orb of chaos', power: 22 }};
        }
        return { success: false, message: "The wizard's beard catches fire! Too unstable!" };
    }
}
