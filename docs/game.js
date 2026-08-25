// Needful Mage - Game Logic

const WIZARD_REQUESTS = [
    {
        message: "Help! The brazier's gone out and I can't see my spellbook! Something hot would do the trick...",
        acceptableSpells: ['Fireball', 'Inferno', 'Plasma Bolt', 'Steam Blast'],
        successMessage: "Brilliant! The flames dance merrily now. I can see again!",
        failureMessage: "That won't light the brazier, I'm afraid. Try something with more... heat?",
        unlockElements: ['ice']
    },
    {
        message: "There's a gelatinous slime blocking my laboratory door! It's jiggling menacingly. Can you freeze it solid?",
        acceptableSpells: ['Frostbolt', 'Blizzard', 'Steam Blast', 'Frozen Barrier'],
        successMessage: "Perfect! *CRACK* The slime shatters like glass. Door's clear!",
        failureMessage: "The slime jiggles unimpressed. It needs to be frozen, not... whatever that was.",
        unlockElements: ['lightning']
    },
    {
        message: "My crystal ball's power crystal has gone dark! Hit it with some electricity to charge it back up!",
        acceptableSpells: ['Spark', 'Chain Lightning', 'Plasma Bolt', 'Thunderstorm', 'Storm Shield'],
        successMessage: "Zap! The crystal glows bright blue again. Much better!",
        failureMessage: "That didn't charge it. I need electrical energy, specifically!",
        unlockElements: ['arcane'],
        unlockModifiers: ['amplify']
    },
    {
        message: "The enchanted mirror is shooting sparks at me! I need a shield, quickly!",
        acceptableSpells: ['Ward', 'Greater Ward', 'Frozen Barrier', 'Regenerating Ward', 'Storm Shield'],
        successMessage: "Ah, blessed protection! The sparks bounce harmlessly off now.",
        failureMessage: "That's not going to protect me! I need a proper defensive spell!",
        unlockElements: ['heal'],
        unlockModifiers: ['chain']
    },
    {
        message: "My familiar got singed by those sparks! Poor little thing needs healing magic, stat!",
        acceptableSpells: ['Mend', 'Mass Heal', 'Regenerating Ward'],
        successMessage: "There we go! The little fellow perks right up. Good as new!",
        failureMessage: "That won't mend his burns. I need restorative magic!",
        unlockModifiers: ['bounce']
    },
    {
        message: "Three fire imps appeared and they're running amok! Can you hit them all at once with lightning?",
        acceptableSpells: ['Chain Lightning', 'Thunderstorm', 'Plasma Bolt'],
        successMessage: "ZAP ZAP ZAP! All three imps poof into smoke! Magnificent work!",
        failureMessage: "That only got one of them! I need something that chains between targets!",
        unlockModifiers: ['pierce']
    },
    {
        message: "The experimental potion is freezing AND boiling simultaneously! Hit it with opposing forces to stabilize it!",
        acceptableSpells: ['Steam Blast', 'Cataclysm'],
        successMessage: "*POOF* The potion settles into a pleasant lavender color. Crisis averted!",
        failureMessage: "It's getting worse! I need fire AND ice together to balance it out!"
    },
    {
        message: "The spellbook tower is collapsing! I need your MOST POWERFUL spell to blast it back into place!",
        acceptableSpells: ['Thunderstorm', 'Cataclysm', 'Inferno', 'Chaos Orb'],
        successMessage: "BOOM! The tower rights itself with a thud. You've saved my entire library! You're a true master of the craft!",
        failureMessage: "That's not strong enough! Pour more power into it! Try combining elements with amplification!"
    },
    {
        message: "I tried a healing potion but now my wounds are BURNING! Quick, cauterize them with fire-infused healing!",
        acceptableSpells: ['Cauterize'],
        successMessage: "*SIZZLE* Ow ow ow... wait, the pain's gone! That actually worked!",
        failureMessage: "That's not going to seal the wounds properly. I need fire AND heal together!",
        unlockModifiers: []
    },
    {
        message: "An ice golem outside is throwing snowballs charged with lightning! Fight ice with ice AND lightning!",
        acceptableSpells: ['Hailstorm'],
        successMessage: "BAM! The golem shatters into a million glittering shards! Brilliant!",
        failureMessage: "The golem laughs at that! I need frozen lightning strikes!",
        unlockModifiers: []
    },
    {
        message: "My rival wizard sent a magical letter that keeps dodging my dispel! Pierce through its defenses with fire!",
        acceptableSpells: ['Fire Lance'],
        successMessage: "*WHOOSH* The letter bursts into ash! Take that, Bertram!",
        failureMessage: "It dodged again! I need piercing flames, not just any fire!",
        unlockModifiers: []
    },
    {
        message: "The cauldron is overflowing with polymorphic ooze! Blast it with something versatile and powerful!",
        acceptableSpells: ['Plasma Bolt', 'Thunderstorm', 'Chaos Orb', 'Cataclysm'],
        successMessage: "SPLASH! The ooze settles back down. Crisis averted!",
        failureMessage: "That just made it angrier! Try something with more oomph!"
    },
    {
        message: "My protective charms are flickering! Layer a regenerating shield before they fail completely!",
        acceptableSpells: ['Regenerating Ward', 'Greater Ward', 'Storm Shield', 'Frozen Barrier'],
        successMessage: "Phew! The new wards shimmer beautifully. I feel much safer now!",
        failureMessage: "That won't hold! I need proper defensive magic with staying power!"
    },
    {
        message: "The spell components are frozen solid in the icebox! No wait, they're supposed to stay cold but I need them thawed just enough to use. This is delicate...",
        acceptableSpells: ['Steam Blast', 'Cauterize', 'Fire Lance'],
        successMessage: "Perfect! They're cold but usable. Your control is impeccable!",
        failureMessage: "Too much or too little! I need precise heat application!"
    }
];

class Game {
    constructor() {
        this.crafter = new SpellCrafter();
        this.currentQuest = 0;
        this.selectedElements = [];
        this.selectedModifiers = [];
        this.availableElements = ['fire'];
        this.availableModifiers = [];
        this.craftedSpell = null;
        this.masteredSpells = new Set();
        this.loadProgress();
        this.init();
    }

    init() {
        this.renderElements();
        this.renderModifiers();
        this.renderSpellbook();
        this.updateUI();
    }

    saveProgress() {
        const saveData = {
            currentQuest: this.currentQuest,
            availableElements: this.availableElements,
            availableModifiers: this.availableModifiers,
            masteredSpells: Array.from(this.masteredSpells)
        };
        localStorage.setItem('needfulMage_save', JSON.stringify(saveData));
    }

    loadProgress() {
        const saved = localStorage.getItem('needfulMage_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.currentQuest = data.currentQuest || 0;
                this.availableElements = data.availableElements || ['fire'];
                this.availableModifiers = data.availableModifiers || [];
                this.masteredSpells = new Set(data.masteredSpells || []);
            } catch (e) {
                console.error('Failed to load save:', e);
            }
        }
    }

    renderSpellbook() {
        const book = document.getElementById('spellbook');
        if (!book) return;
        
        if (this.masteredSpells.size === 0) {
            book.innerHTML = '<div class="spellbook-empty">Master spells to fill your spellbook</div>';
            return;
        }

        book.innerHTML = '<h4>Spellbook</h4>';
        Array.from(this.masteredSpells).sort().forEach(spellName => {
            const btn = document.createElement('button');
            btn.className = 'spell-quick-cast';
            btn.textContent = spellName;
            btn.onclick = () => this.quickCast(spellName);
            book.appendChild(btn);
        });
    }

    quickCast(spellName) {
        const allSpells = [
            this.crafter.craftBasicSpell('fire').spell,
            this.crafter.craftBasicSpell('ice').spell,
            this.crafter.craftBasicSpell('lightning').spell,
            this.crafter.craftBasicSpell('arcane').spell,
            this.crafter.craftBasicSpell('heal').spell
        ];

        for (const elements of [
            ['fire'], ['ice'], ['lightning'], ['arcane'], ['heal'],
            ['fire', 'ice'], ['fire', 'lightning'], ['fire', 'heal'],
            ['ice', 'lightning'], ['ice', 'arcane'], ['heal', 'arcane'],
            ['lightning', 'arcane'], ['fire', 'ice', 'lightning']
        ]) {
            const result = this.crafter.craft(elements, []);
            if (result.success && result.spell.name === spellName) {
                this.craftedSpell = result.spell;
                this.selectedElements = elements;
                this.selectedModifiers = [];
                this.updateUI();
                this.renderElements();
                this.renderModifiers();
                return;
            }
        }

        for (const modifier of ['amplify', 'chain', 'bounce', 'pierce']) {
            for (const element of ['fire', 'ice', 'lightning', 'arcane', 'heal']) {
                const result = this.crafter.craft([element], [modifier]);
                if (result.success && result.spell.name === spellName) {
                    this.craftedSpell = result.spell;
                    this.selectedElements = [element];
                    this.selectedModifiers = [modifier];
                    this.updateUI();
                    this.renderElements();
                    this.renderModifiers();
                    return;
                }
            }
        }

        for (const modifiers of [['chain', 'amplify']]) {
            for (const element of ['lightning']) {
                const result = this.crafter.craft([element], modifiers);
                if (result.success && result.spell.name === spellName) {
                    this.craftedSpell = result.spell;
                    this.selectedElements = [element];
                    this.selectedModifiers = modifiers;
                    this.updateUI();
                    this.renderElements();
                    this.renderModifiers();
                    return;
                }
            }
        }
    }

    renderElements() {
        const grid = document.getElementById('elementsGrid');
        grid.innerHTML = '';
        this.availableElements.forEach(elementId => {
            const element = Elements[elementId.toUpperCase()];
            const btn = this.createRuneButton(element, 'element');
            grid.appendChild(btn);
        });
    }

    renderModifiers() {
        const section = document.getElementById('modifiersSection');
        const grid = document.getElementById('modifiersGrid');
        if (this.availableModifiers.length === 0) {
            section.classList.add('hidden');
            return;
        }
        section.classList.remove('hidden');
        grid.innerHTML = '';
        this.availableModifiers.forEach(modifierId => {
            const modifier = Modifiers[modifierId.toUpperCase()];
            const btn = this.createRuneButton(modifier, 'modifier');
            grid.appendChild(btn);
        });
    }

    createRuneButton(rune, type) {
        const btn = document.createElement('button');
        btn.className = 'rune-btn';
        btn.innerHTML = `<span class="rune-emoji">${rune.emoji}</span><span class="rune-name">${rune.name}</span>`;
        btn.onclick = () => this.toggleRune(rune.id, type, btn);
        return btn;
    }

    toggleRune(id, type, btn) {
        if (type === 'element') {
            const index = this.selectedElements.indexOf(id);
            if (index > -1) {
                this.selectedElements.splice(index, 1);
                btn.classList.remove('selected');
            } else {
                this.selectedElements.push(id);
                btn.classList.add('selected');
            }
        } else {
            const index = this.selectedModifiers.indexOf(id);
            if (index > -1) {
                this.selectedModifiers.splice(index, 1);
                btn.classList.remove('selected');
            } else {
                this.selectedModifiers.push(id);
                btn.classList.add('selected');
            }
        }
        this.craftedSpell = null;
        this.updateUI();
    }

    clearRecipe() {
        this.selectedElements = [];
        this.selectedModifiers = [];
        this.craftedSpell = null;
        document.querySelectorAll('.rune-btn').forEach(btn => btn.classList.remove('selected'));
        this.updateUI();
    }

    craftSpell() {
        const result = this.crafter.craft(this.selectedElements, this.selectedModifiers);
        if (result.success) {
            this.craftedSpell = result.spell;
            this.showModal(`You've crafted: ${result.spell.emoji} ${result.spell.name}!`);
        } else {
            this.showModal(result.message);
        }
        this.updateUI();
    }

    castSpell() {
        if (!this.craftedSpell) return;
        const request = WIZARD_REQUESTS[this.currentQuest];
        
        if (request.acceptableSpells.includes(this.craftedSpell.name)) {
            this.playCastEffect(this.craftedSpell);
            this.masteredSpells.add(this.craftedSpell.name);
            this.renderSpellbook();
            this.saveProgress();
            setTimeout(() => {
                this.showModal(request.successMessage, () => this.nextQuest());
            }, 800);
        } else {
            this.playFizzleEffect();
            this.showModal(request.failureMessage);
        }
    }

    playCastEffect(spell) {
        const circle = document.querySelector('.crafting-circle');
        const effect = document.createElement('div');
        effect.className = 'cast-effect';
        
        const spellType = this.getSpellType(spell.name);
        effect.classList.add(`effect-${spellType}`);
        
        circle.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
    }

    playFizzleEffect() {
        const circle = document.querySelector('.crafting-circle');
        circle.classList.add('shake');
        setTimeout(() => circle.classList.remove('shake'), 500);
    }

    getSpellType(spellName) {
        if (spellName.includes('Fire') || spellName.includes('Inferno') || spellName.includes('Plasma')) return 'fire';
        if (spellName.includes('Frost') || spellName.includes('Ice') || spellName.includes('Blizzard') || spellName.includes('Frozen') || spellName.includes('Hail')) return 'ice';
        if (spellName.includes('Lightning') || spellName.includes('Spark') || spellName.includes('Thunder') || spellName.includes('Storm')) return 'lightning';
        if (spellName.includes('Ward') || spellName.includes('Shield') || spellName.includes('Barrier')) return 'shield';
        if (spellName.includes('Heal') || spellName.includes('Mend') || spellName.includes('Cauterize')) return 'heal';
        return 'arcane';
    }

    nextQuest() {
        this.currentQuest++;
        if (this.currentQuest >= WIZARD_REQUESTS.length) {
            this.showVictory();
            return;
        }
        const request = WIZARD_REQUESTS[this.currentQuest];
        if (request.unlockElements) {
            request.unlockElements.forEach(el => {
                if (!this.availableElements.includes(el)) this.availableElements.push(el);
            });
        }
        if (request.unlockModifiers) {
            request.unlockModifiers.forEach(mod => {
                if (!this.availableModifiers.includes(mod)) this.availableModifiers.push(mod);
            });
        }
        this.saveProgress();
        this.clearRecipe();
        this.renderElements();
        this.renderModifiers();
        this.updateUI();
    }

    updateUI() {
        const progress = (this.currentQuest / WIZARD_REQUESTS.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('questCounter').textContent = `Quest ${this.currentQuest + 1} / ${WIZARD_REQUESTS.length}`;
        document.getElementById('wizardMessage').textContent = WIZARD_REQUESTS[this.currentQuest].message;
        
        const circle = document.getElementById('circleContent');
        if (this.craftedSpell) {
            circle.innerHTML = `<div class="spell-emoji">${this.craftedSpell.emoji}</div><div class="spell-name">${this.craftedSpell.name}</div>`;
        } else if (this.selectedElements.length > 0 || this.selectedModifiers.length > 0) {
            const runes = [];
            this.selectedElements.forEach(id => runes.push(Elements[id.toUpperCase()].emoji));
            this.selectedModifiers.forEach(id => runes.push(Modifiers[id.toUpperCase()].emoji));
            circle.innerHTML = `<div class="rune-combo">${runes.join(' ')}</div>`;
        } else {
            circle.innerHTML = '<span class="hint">Select runes</span>';
        }
        
        const craftBtn = document.getElementById('craftBtn');
        const castBtn = document.getElementById('castBtn');
        const actionButtons = document.querySelector('.action-buttons');
        craftBtn.disabled = this.selectedElements.length === 0;
        if (this.craftedSpell) {
            craftBtn.classList.add('hidden');
            castBtn.classList.remove('hidden');
            actionButtons.classList.add('with-cast');
        } else {
            craftBtn.classList.remove('hidden');
            castBtn.classList.add('hidden');
            actionButtons.classList.remove('with-cast');
        }
    }

    showModal(message, onClose = null) {
        const modal = document.getElementById('modal');
        document.getElementById('modalMessage').textContent = message;
        modal.classList.remove('hidden');
        document.getElementById('modalBtn').onclick = () => {
            this.closeModal();
            if (onClose) onClose();
        };
    }

    closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    showVictory() {
        const list = document.getElementById('masteredList');
        list.innerHTML = '<h3>Spells Mastered:</h3>';
        Array.from(this.masteredSpells).sort().forEach(spell => {
            const div = document.createElement('div');
            div.textContent = `✨ ${spell}`;
            list.appendChild(div);
        });
        document.getElementById('victoryScreen').classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
    }

    resetGame() {
        if (!document.getElementById('victoryScreen').classList.contains('hidden')) {
            document.getElementById('victoryScreen').classList.remove('hidden');
            document.getElementById('gameScreen').classList.add('hidden');
        }
        this.currentQuest = 0;
        this.selectedElements = [];
        this.selectedModifiers = [];
        this.availableElements = ['fire'];
        this.availableModifiers = [];
        this.craftedSpell = null;
        this.masteredSpells = new Set();
        localStorage.removeItem('needfulMage_save');
        document.getElementById('victoryScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        this.renderElements();
        this.renderModifiers();
        this.renderSpellbook();
        this.updateUI();
    }

    hardReset() {
        if (confirm('Reset all progress? This cannot be undone.')) {
            this.resetGame();
        }
    }
}

const game = new Game();
