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
        this.init();
    }

    init() {
        this.renderElements();
        this.renderModifiers();
        this.updateUI();
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
        btn.innerHTML = `
            <span class="rune-emoji">${rune.emoji}</span>
            <span class="rune-name">${rune.name}</span>
        `;
        
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
        
        document.querySelectorAll('.rune-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
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
            this.masteredSpells.add(this.craftedSpell.name);
            this.showModal(request.successMessage, () => {
                this.nextQuest();
            });
        } else {
            this.showModal(request.failureMessage);
        }
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
                if (!this.availableElements.includes(el)) {
                    this.availableElements.push(el);
                }
            });
        }
        
        if (request.unlockModifiers) {
            request.unlockModifiers.forEach(mod => {
                if (!this.availableModifiers.includes(mod)) {
                    this.availableModifiers.push(mod);
                }
            });
        }
        
        this.clearRecipe();
        this.renderElements();
        this.renderModifiers();
        this.updateUI();
    }

    updateUI() {
        // Progress bar
        const progress = (this.currentQuest / WIZARD_REQUESTS.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        document.getElementById('questCounter').textContent = `Quest ${this.currentQuest + 1} / ${WIZARD_REQUESTS.length}`;
        
        // Wizard message
        document.getElementById('wizardMessage').textContent = WIZARD_REQUESTS[this.currentQuest].message;
        
        // Crafting circle
        const circle = document.getElementById('circleContent');
        
        if (this.craftedSpell) {
            circle.innerHTML = `
                <div class="spell-emoji">${this.craftedSpell.emoji}</div>
                <div class="spell-name">${this.craftedSpell.name}</div>
            `;
        } else if (this.selectedElements.length > 0 || this.selectedModifiers.length > 0) {
            const runes = [];
            this.selectedElements.forEach(id => {
                runes.push(Elements[id.toUpperCase()].emoji);
            });
            this.selectedModifiers.forEach(id => {
                runes.push(Modifiers[id.toUpperCase()].emoji);
            });
            circle.innerHTML = `<div class="rune-combo">${runes.join(' ')}</div>`;
        } else {
            circle.innerHTML = '<span class="hint">Select runes</span>';
        }
        
        // Buttons
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
        const modalMessage = document.getElementById('modalMessage');
        const modalBtn = document.getElementById('modalBtn');
        
        modalMessage.textContent = message;
        modal.classList.remove('hidden');
        
        modalBtn.onclick = () => {
            this.closeModal();
            if (onClose) onClose();
        };
    }

    closeModal() {
        document.getElementById('modal').classList.add('hidden');
    }

    showVictory() {
        const screen = document.getElementById('victoryScreen');
        const list = document.getElementById('masteredList');
        
        list.innerHTML = '<h3>Spells Mastered:</h3>';
        Array.from(this.masteredSpells).sort().forEach(spell => {
            const div = document.createElement('div');
            div.textContent = `✨ ${spell}`;
            list.appendChild(div);
        });
        
        screen.classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
    }

    resetGame() {
        this.currentQuest = 0;
        this.selectedElements = [];
        this.selectedModifiers = [];
        this.availableElements = ['fire'];
        this.availableModifiers = [];
        this.craftedSpell = null;
        this.masteredSpells = new Set();
        
        document.getElementById('victoryScreen').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        
        this.renderElements();
        this.renderModifiers();
        this.updateUI();
    }
}

// Start the game
const game = new Game();
