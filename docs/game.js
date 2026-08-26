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
        message: "There's a gelatinous slime blocking my laboratory door! It's jiggling menacingly. Something cold to freeze it?",
        acceptableSpells: ['Frostbolt', 'Blizzard', 'Steam Blast', 'Frozen Barrier'],
        successMessage: "Perfect! *CRACK* The slime shatters like glass. Door's clear!",
        failureMessage: "The slime jiggles unimpressed. It needs to be frozen solid!",
        unlockElements: ['lightning']
    },
    {
        message: "My crystal ball's power crystal has gone dark! I need a jolt of energy to charge it!",
        acceptableSpells: ['Spark', 'Chain Lightning', 'Plasma Bolt', 'Thunderstorm', 'Storm Shield'],
        successMessage: "Zap! The crystal glows bright blue again. Much better!",
        failureMessage: "That didn't charge it. I need crackling electrical energy!",
        unlockElements: ['arcane'],
        unlockModifiers: ['amplify']
    },
    {
        message: "The enchanted mirror is shooting sparks at me! I need protection, quickly!",
        acceptableSpells: ['Ward', 'Greater Ward', 'Frozen Barrier', 'Regenerating Ward', 'Storm Shield'],
        successMessage: "Ah, blessed protection! The sparks bounce harmlessly off now.",
        failureMessage: "That's not going to protect me! I need a proper barrier!",
        unlockElements: ['heal'],
        unlockModifiers: ['chain']
    },
    {
        message: "My familiar got singed by those sparks! Poor little thing needs healing, stat!",
        acceptableSpells: ['Mend', 'Mass Heal', 'Regenerating Ward'],
        successMessage: "There we go! The little fellow perks right up. Good as new!",
        failureMessage: "That won't mend his burns. I need restorative magic!",
        unlockModifiers: ['bounce']
    },
    {
        message: "Three fire imps appeared and they're running amok! I need something that can hit all of them at once!",
        acceptableSpells: ['Chain Lightning', 'Thunderstorm', 'Plasma Bolt'],
        successMessage: "ZAP ZAP ZAP! All three imps poof into smoke! Magnificent work!",
        failureMessage: "That only got one of them! I need something that spreads or chains!",
        unlockModifiers: ['pierce']
    },
    {
        message: "The experimental potion is freezing AND boiling simultaneously! I need opposing forces to stabilize it!",
        acceptableSpells: ['Steam Blast', 'Cataclysm'],
        successMessage: "*POOF* The potion settles into a pleasant lavender color. Crisis averted!",
        failureMessage: "It's getting worse! Heat and cold together might balance it out!"
    },
    {
        message: "The spellbook tower is collapsing! I need your MOST POWERFUL magic to blast it back into place!",
        acceptableSpells: ['Thunderstorm', 'Cataclysm', 'Inferno', 'Chaos Orb'],
        successMessage: "BOOM! The tower rights itself with a thud. You've saved my entire library! You're a true master of the craft!",
        failureMessage: "That's not strong enough! I need SERIOUS power - try amplifying something!"
    },
    {
        message: "I tried a healing potion but now my wounds are BURNING! I need something to seal them - healing with heat!",
        acceptableSpells: ['Cauterize'],
        successMessage: "*SIZZLE* Ow ow ow... wait, the pain's gone! That actually worked!",
        failureMessage: "That's not going to seal the wounds properly. I need fire AND healing magic together!",
        unlockModifiers: []
    },
    {
        message: "An ice golem outside is throwing snowballs charged with lightning! Fight back with the same forces!",
        acceptableSpells: ['Hailstorm'],
        successMessage: "BAM! The golem shatters into a million glittering shards! Brilliant!",
        failureMessage: "The golem laughs at that! I need frozen lightning!",
        unlockModifiers: []
    },
    {
        message: "My rival wizard sent a magical letter that keeps dodging my dispel! I need something fast and penetrating!",
        acceptableSpells: ['Fire Lance'],
        successMessage: "*WHOOSH* The letter bursts into ash! Take that, Bertram!",
        failureMessage: "It dodged again! I need something that pierces defenses!",
        unlockModifiers: []
    },
    {
        message: "The cauldron is overflowing with polymorphic ooze! Blast it with something powerful and energetic!",
        acceptableSpells: ['Plasma Bolt', 'Thunderstorm', 'Chaos Orb', 'Cataclysm'],
        successMessage: "SPLASH! The ooze settles back down. Crisis averted!",
        failureMessage: "That just made it angrier! Try something with more raw power!"
    },
    {
        message: "My protective charms are flickering! Layer a strong shield before they fail completely!",
        acceptableSpells: ['Regenerating Ward', 'Greater Ward', 'Storm Shield', 'Frozen Barrier'],
        successMessage: "Phew! The new wards shimmer beautifully. I feel much safer now!",
        failureMessage: "That won't hold! I need proper defensive magic with staying power!"
    },
    {
        message: "The spell components are frozen solid! I need them thawed just enough to use - something with opposing forces for precision...",
        acceptableSpells: ['Steam Blast', 'Cauterize', 'Fire Lance'],
        successMessage: "Perfect! They're cold but usable. Your control is impeccable!",
        failureMessage: "Too much or too little! I need precise controlled heating!"
    },
    {
        message: "My enchanted quill is writing nonsense! I need lightning-fast correction magic combined with mystical precision!",
        acceptableSpells: ['Storm Shield'],
        successMessage: "There! The quill straightens up and writes properly again. Thank you!",
        failureMessage: "That won't calibrate the enchantment! Try combining crackling energy with protective magic!",
        unlockModifiers: []
    },
    {
        message: "The dimensional portal is flickering with unstable energy! Stabilize it with cold and protective magic!",
        acceptableSpells: ['Frozen Barrier', 'Blizzard'],
        successMessage: "Excellent! The portal steadies. I can finally get my mail from the other realm!",
        failureMessage: "It's getting worse! I need freezing protection!"
    },
    {
        message: "My tea has gone cold but I don't want to burn my tongue! Gentle controlled flame please!",
        acceptableSpells: ['Fireball', 'Cauterize'],
        successMessage: "Ahh, perfect temperature! You're a lifesaver. Or... tea-saver?",
        failureMessage: "That's either too hot or not hot enough! Simple fire will do!"
    },
    {
        message: "There's a swarm of enchanted moths eating my spellbooks! Drive them out with crackling energy!",
        acceptableSpells: ['Spark', 'Chain Lightning', 'Storm Shield', 'Thunderstorm'],
        successMessage: "ZAP! The moths scatter! My precious books are saved!",
        failureMessage: "They're still munching! I need electricity to scatter them!"
    },
    {
        message: "I accidentally animated my broom and now it won't stop sweeping! Bind it with magic that spreads!",
        acceptableSpells: ['Chain Lightning', 'Bouncing Arcane Bolt'],
        successMessage: "*SNAP* The broom stops mid-sweep and falls over. Finally, peace!",
        failureMessage: "That didn't bind it! I need magic that moves or connects!"
    },
    {
        message: "The moon is full and my transformation potion is EXTRA strong! Hit me with pure healing energy before I turn into a newt!",
        acceptableSpells: ['Mend', 'Mass Heal', 'Regenerating Ward', 'Cauterize'],
        successMessage: "*GLOW* Phew! Still human. Still wizard. Crisis averted!",
        failureMessage: "I'm starting to croak! HEALING, please!"
    },
    {
        message: "My rival enchanted my shoes to dance uncontrollably! I need amplified mystical power to break the hex!",
        acceptableSpells: ['Greater Ward', 'Bouncing Arcane Bolt'],
        successMessage: "YES! The shoes stop mid-jig. My poor feet... thank you!",
        failureMessage: "Still dancing! I need strong mystical magic to counter the enchantment!"
    },
    {
        message: "The potion cabinet's lock is frozen AND shocked! I need cold and lightning together to neutralize it!",
        acceptableSpells: ['Hailstorm', 'Storm Shield'],
        successMessage: "*CLICK* The lock releases! My ingredients are safe again!",
        failureMessage: "The lock's still buzzing and frozen solid. Combine freezing with electricity!"
    },
    {
        message: "There's a fire sprite trapped in my teapot and it's getting angry! Cool it down with water magic!",
        acceptableSpells: ['Steam Blast', 'Frostbolt', 'Blizzard'],
        successMessage: "*HISSSSS* The sprite escapes as harmless steam. That was close!",
        failureMessage: "The sprite's getting hotter! I need cooling magic fast!"
    },
    {
        message: "My midnight snack came alive and it's challenging me to a duel! Hit it with overwhelming elemental force!",
        acceptableSpells: ['Inferno', 'Plasma Bolt', 'Thunderstorm', 'Cataclysm', 'Chaos Orb'],
        successMessage: "KA-BOOM! My sandwich is... well, crumbs now. But at least it's not attacking anymore!",
        failureMessage: "The sandwich parries! I need something with SERIOUS magical firepower!"
    }
];

class Game {
    constructor() {
        this.crafter = new SpellCrafter();
        this.audio = new AudioEngine();
        this.currentQuest = 0;
        this.selectedElements = [];
        this.selectedModifiers = [];
        this.availableElements = ['fire'];
        this.availableModifiers = [];
        this.craftedSpell = null;
        this.masteredSpells = new Set();
        this.masteredRecipes = new Map();
        this.discoveredSpells = new Set();
        this.failCount = 0;
        this.endlessMode = false;
        this.endlessScore = 0;
        this.endlessStreak = 0;
        this.bestStreak = parseInt(localStorage.getItem('needfulMage_bestStreak') || '0');
        this.loadProgress();
        this.init();
    }

    init() {
        this.renderElements();
        this.renderModifiers();
        this.renderSpellbook();
        this.updateUI();
        this.showTutorial();
        this.showA2HSHint();
        this.updateMuteButton();
    }

    saveProgress() {
        const saveData = {
            currentQuest: this.currentQuest,
            availableElements: this.availableElements,
            availableModifiers: this.availableModifiers,
            masteredSpells: Array.from(this.masteredSpells),
            masteredRecipes: Array.from(this.masteredRecipes.entries()),
            discoveredSpells: Array.from(this.discoveredSpells)
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
                this.masteredRecipes = new Map(data.masteredRecipes || []);
                this.discoveredSpells = new Set(data.discoveredSpells || []);
                
                if (this.currentQuest === 0 && this.masteredSpells.size > 0) {
                    const quest0Spells = WIZARD_REQUESTS[0].acceptableSpells;
                    const hasCompletedQuest0 = quest0Spells.some(spell => this.masteredSpells.has(spell));
                    if (hasCompletedQuest0) {
                        this.currentQuest = 1;
                        if (WIZARD_REQUESTS[0].unlockElements) {
                            WIZARD_REQUESTS[0].unlockElements.forEach(el => {
                                if (!this.availableElements.includes(el)) {
                                    this.availableElements.push(el);
                                }
                            });
                        }
                        if (WIZARD_REQUESTS[0].unlockModifiers) {
                            WIZARD_REQUESTS[0].unlockModifiers.forEach(mod => {
                                if (!this.availableModifiers.includes(mod)) {
                                    this.availableModifiers.push(mod);
                                }
                            });
                        }
                    }
                }
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

        book.innerHTML = '<h4>Spellbook</h4><p class="spellbook-hint">Tap spells to mix them</p>';
        Array.from(this.masteredSpells).sort().forEach(spellName => {
            const btn = document.createElement('button');
            btn.className = 'spell-quick-cast';
            
            const recipe = this.masteredRecipes.get(spellName);
            let recipeHint = '';
            if (recipe) {
                const runes = [];
                recipe.elements.forEach(id => runes.push(Elements[id.toUpperCase()].emoji));
                recipe.modifiers.forEach(id => runes.push(Modifiers[id.toUpperCase()].emoji));
                recipeHint = `<span class="recipe-hint">${runes.join(' ')}</span>`;
            }
            
            btn.innerHTML = `${spellName}${recipeHint}`;
            btn.onclick = () => this.addSpellToCircle(spellName);
            book.appendChild(btn);
        });
    }

    addSpellToCircle(spellName) {
        const recipe = this.masteredRecipes.get(spellName);
        if (!recipe) return;
        
        recipe.elements.forEach(el => {
            if (!this.selectedElements.includes(el)) {
                this.selectedElements.push(el);
            }
        });
        recipe.modifiers.forEach(mod => {
            if (!this.selectedModifiers.includes(mod)) {
                this.selectedModifiers.push(mod);
            }
        });
        
        this.craftedSpell = null;
        this.renderElements();
        this.renderModifiers();
        this.updateUI();
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
        const allElements = ['fire', 'ice', 'lightning', 'arcane', 'heal'];
        allElements.forEach(elementId => {
            const element = Elements[elementId.toUpperCase()];
            const isLocked = !this.availableElements.includes(elementId);
            const btn = this.createRuneButton(element, 'element', isLocked);
            grid.appendChild(btn);
        });
    }

    renderModifiers() {
        const section = document.getElementById('modifiersSection');
        const grid = document.getElementById('modifiersGrid');
        section.classList.remove('hidden');
        grid.innerHTML = '';
        
        const allModifiers = ['amplify', 'chain', 'bounce', 'pierce'];
        allModifiers.forEach(modifierId => {
            const modifier = Modifiers[modifierId.toUpperCase()];
            const isLocked = !this.availableModifiers.includes(modifierId);
            const btn = this.createRuneButton(modifier, 'modifier', isLocked);
            grid.appendChild(btn);
        });
    }

    createRuneButton(rune, type, isLocked = false) {
        const btn = document.createElement('button');
        btn.className = 'rune-btn';
        
        if (isLocked) {
            btn.classList.add('locked');
            btn.innerHTML = `<span class="rune-emoji">${rune.emoji}</span><span class="rune-name">${rune.name}</span><span class="lock-icon">🔒</span>`;
            btn.disabled = true;
        } else {
            btn.innerHTML = `<span class="rune-emoji">${rune.emoji}</span><span class="rune-name">${rune.name}</span>`;
            btn.onclick = () => this.toggleRune(rune.id, type, btn);
        }
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
        this.audio.craftHum();
        const result = this.crafter.craft(this.selectedElements, this.selectedModifiers);
        if (result.success) {
            this.craftedSpell = result.spell;
            this.showCraftParticles();
            
            const isNewDiscovery = !this.discoveredSpells.has(result.spell.name);
            if (isNewDiscovery) {
                this.discoveredSpells.add(result.spell.name);
                this.showToast(`✨ Discovered: ${result.spell.emoji} ${result.spell.name}!`);
            } else {
                this.showModal(`You've crafted: ${result.spell.emoji} ${result.spell.name}!`);
            }
        } else {
            this.craftedSpell = null;
            this.audio.fizzle();
            this.showModal(result.message);
        }
        this.updateUI();
    }

    showCraftParticles() {
        const circle = document.querySelector('.crafting-circle');
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'craft-particle';
            particle.style.setProperty('--angle', `${(i * 45)}deg`);
            circle.appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    }

    castSpell() {
        if (!this.craftedSpell) return;
        const request = WIZARD_REQUESTS[this.currentQuest];
        
        if (request.acceptableSpells.includes(this.craftedSpell.name)) {
            this.playCastEffect(this.craftedSpell);
            this.masteredSpells.add(this.craftedSpell.name);
            this.masteredRecipes.set(this.craftedSpell.name, {
                elements: [...this.selectedElements],
                modifiers: [...this.selectedModifiers]
            });
            this.renderSpellbook();
            
            setTimeout(() => {
                this.showToast(request.successMessage);
                this.nextQuest();
            }, 800);
        } else {
            this.playFizzleEffect();
            this.showToast(request.failureMessage);
        }
    }

    playCastEffect(spell) {
        const circle = document.querySelector('.crafting-circle');
        const effect = document.createElement('div');
        effect.className = 'cast-effect';
        
        const spellType = this.getSpellType(spell.name);
        effect.classList.add(`effect-${spellType}`);
        
        const elements = this.selectedElements;
        if (elements.includes('fire')) this.audio.castFire();
        else if (elements.includes('ice')) this.audio.castIce();
        else if (elements.includes('lightning')) this.audio.castLightning();
        else if (elements.includes('arcane')) this.audio.castShield();
        else if (elements.includes('heal')) this.audio.castHeal();
        else this.audio.castArcane();
        
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        circle.appendChild(effect);
        setTimeout(() => effect.remove(), 1000);
        this.updateWizardMood('happy');
        this.failCount = 0;
        
        if (this.endlessMode) {
            this.endlessStreak++;
            if (this.endlessStreak > this.bestStreak) {
                this.bestStreak = this.endlessStreak;
                localStorage.setItem('needfulMage_bestStreak', this.bestStreak);
            }
            this.updateEndlessUI();
        }
    }

    playFizzleEffect() {
        const circle = document.querySelector('.crafting-circle');
        circle.classList.add('shake');
        this.audio.fizzle();
        this.updateWizardMood('worried');
        setTimeout(() => circle.classList.remove('shake'), 500);
        this.failCount++;
        if (this.failCount >= 3) {
            this.showHint();
        }
        
        if (this.endlessMode) {
            this.endlessStreak = 0;
            this.updateEndlessUI();
        }
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
        const completedRequest = WIZARD_REQUESTS[this.currentQuest];
        const unlocked = [];
        
        if (completedRequest.unlockElements) {
            completedRequest.unlockElements.forEach(el => {
                if (!this.availableElements.includes(el)) {
                    this.availableElements.push(el);
                    const element = Elements[el.toUpperCase()];
                    unlocked.push(`${element.emoji} ${element.name}`);
                }
            });
        }
        if (completedRequest.unlockModifiers) {
            completedRequest.unlockModifiers.forEach(mod => {
                if (!this.availableModifiers.includes(mod)) {
                    this.availableModifiers.push(mod);
                    const modifier = Modifiers[mod.toUpperCase()];
                    unlocked.push(`${modifier.emoji} ${modifier.name}`);
                }
            });
        }
        
        this.currentQuest++;
        if (this.currentQuest >= WIZARD_REQUESTS.length) {
            setTimeout(() => this.showVictory(), 500);
            return;
        }
        
        if (unlocked.length > 0) {
            setTimeout(() => this.showToast(`Unlocked: ${unlocked.join(', ')}`), 1000);
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
        const chapter = Math.floor(this.currentQuest / 5) + 1;
        const questInChapter = (this.currentQuest % 5) + 1;
        document.getElementById('questCounter').textContent = `Ch.${chapter} Q${questInChapter} / ${WIZARD_REQUESTS.length}`;
        document.getElementById('wizardMessage').textContent = WIZARD_REQUESTS[this.currentQuest].message;
        
        this.updateWizardMood(this.failCount > 0 ? 'worried' : 'desperate');
        
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
        
        const endlessBtn = document.createElement('button');
        endlessBtn.className = 'btn btn-primary';
        endlessBtn.textContent = 'Endless Mode 🔮';
        endlessBtn.style.marginRight = '10px';
        endlessBtn.onclick = () => {
            document.getElementById('victoryScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.remove('hidden');
            this.startEndlessMode();
        };
        
        const victoryContent = document.querySelector('.victory-content');
        const playAgainBtn = victoryContent.querySelector('button');
        if (playAgainBtn && playAgainBtn.parentNode) {
            playAgainBtn.parentNode.insertBefore(endlessBtn, playAgainBtn);
        }
        
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
            localStorage.removeItem('needfulMage_save');
            localStorage.removeItem('needfulMage_tutorial');
            localStorage.removeItem('needfulMage_a2hs');
            location.reload();
        }
    }

    toggleMute() {
        const muted = this.audio.toggleMute();
        this.updateMuteButton();
        return muted;
    }

    updateMuteButton() {
        const icon = document.querySelector('.mute-icon');
        if (icon) {
            icon.textContent = this.audio.muted ? '🔇' : '🔊';
        }
    }

    showTutorial() {
        const seen = localStorage.getItem('needfulMage_tutorial');
        if (!seen) {
            document.getElementById('tutorialOverlay').classList.remove('hidden');
        }
    }

    closeTutorial() {
        document.getElementById('tutorialOverlay').classList.add('hidden');
        localStorage.setItem('needfulMage_tutorial', 'true');
    }

    showHint() {
        const hints = [
            'Try combining what you know with what you have',
            'Mix elements, or mix a mastered spell with new runes',
            'Sometimes simple is better, sometimes you need more power',
            'Tap a spell in your book to use it as an ingredient'
        ];
        const hintText = hints[Math.floor(Math.random() * hints.length)];
        document.getElementById('hintText').textContent = hintText;
        document.getElementById('hintBox').classList.remove('hidden');
    }

    closeHint() {
        document.getElementById('hintBox').classList.add('hidden');
    }

    showA2HSHint() {
        const seen = localStorage.getItem('needfulMage_a2hs');
        if (!seen && this.currentQuest === 2) {
            setTimeout(() => {
                document.getElementById('a2hsHint').classList.remove('hidden');
            }, 5000);
        }
    }

    closeA2HS() {
        document.getElementById('a2hsHint').classList.add('hidden');
        localStorage.setItem('needfulMage_a2hs', 'true');
    }

    updateWizardMood(mood) {
        const moodEl = document.getElementById('wizardMood');
        if (!moodEl) return;
        
        const moods = {
            worried: '😰',
            happy: '😊',
            excited: '🤩',
            relieved: '😌',
            desperate: '😱'
        };
        
        moodEl.textContent = moods[mood] || moods.worried;
    }

    showToast(message) {
        const toast = document.getElementById('unlockToast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }

    startEndlessMode() {
        this.endlessMode = true;
        this.endlessScore = 0;
        this.endlessStreak = 0;
        this.generateEndlessQuest();
    }

    generateEndlessQuest() {
        const allSpells = Array.from(this.masteredSpells);
        if (allSpells.length === 0) return this.resetGame();
        
        const targetSpell = allSpells[Math.floor(Math.random() * allSpells.length)];
        const messages = [
            `Quick! I need a ${targetSpell}!`,
            `The situation calls for ${targetSpell}!`,
            `Only ${targetSpell} will work here!`,
            `${targetSpell}, please! Hurry!`
        ];
        
        this.currentEndlessQuest = {
            message: messages[Math.floor(Math.random() * messages.length)],
            acceptableSpells: [targetSpell],
            successMessage: `Perfect! Streak: ${this.endlessStreak + 1} 🔥`,
            failureMessage: `Not quite! That wasn't ${targetSpell}...`
        };
        
        this.updateUI();
    }

    updateEndlessUI() {
        const counter = document.getElementById('endlessCounter');
        if (counter && this.endlessMode) {
            counter.textContent = `Streak: ${this.endlessStreak} 🔥 Best: ${this.bestStreak}`;
            counter.style.display = 'block';
        }
    }
}

const game = new Game();
