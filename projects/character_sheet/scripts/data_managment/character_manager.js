'use strict';

export {
    CharacterManager,
};

const g_modifiers = { 'B': -20, 'D': -10, 'E': 5, 'G': 10 };

// TODO - character manager needs to get some event to call if it was updated so the DOM knows to update as well.
class CharacterManager {
    constructor(abilitiesMap, skillMap, characterData) {
        this.skillMap = skillMap || {};
        this.abilitiesMap = abilitiesMap || {};
       
        this.name = characterData.name || "[INVALID]";
        this.characterCondition = characterData.characterCondition || {};

        this.attributesBase = characterData.attributesBase || {};;
        this.attributesTotal = characterData.attributesTotal || {};;

        this.abilitiesBase = characterData.abilitiesBase || {};;
        this.abilitiesTotal = characterData.abilitiesTotal || {};;

        this.defensiveEquipment =characterData.defensiveEquipment || {};
        this.skillList = characterData.skillList || {};;
    }

    static async New(server, characterName) {
        let manager = new CharacterManager({}, {}, {});

        try {
            const abilities = await server.FetchAbilities();
            const skills = await server.FetchSkills();
            
            const characterData = await server.FetchCharactersData(characterName);
        
            manager = new CharacterManager(abilities, skills, characterData[0]);
        }
        catch(err) {
            console.warn(err); 
        }
        
        return manager;
    }

    AddToHealth(amount) {
        if (this.characterCondition.currHealth + amount >= 0
            && this.characterCondition.currHealth + amount <= this.characterCondition.maxHealth) {
            this.characterCondition.currHealth += amount;
        }
    }

    AddToMana(amount) {
        if (this.characterCondition.currMana + amount >= 0
            && this.characterCondition.currMana + amount <= this.characterCondition.maxMana) {
            this.characterCondition.currMana += amount;
        }
    }

    GetPhysicalConditionModifier() {
        return g_modifiers[this.characterCondition.physicalCondition] || 0;
    }

    FormatAbilityName(ability) {
        return ability
            .replace(/([A-Z])/g, ' $1') //Add space before Upper case, AnimalHandling => Animal Handling
            .replace(/^./, str => str.toUpperCase());
    }

    CalculateStat(statComponents, attributeNum) {
        const total = statComponents.reduce((sum, attribute) => sum + (this.attributesBase[attribute] || 0), 0);
        return (total / attributeNum) + this.GetPhysicalConditionModifier();
    }

    CalculateAccuracy() {
        return this.CalculateStat(['Senses', 'Nerves', 'Muscles'], 3);
    }

    CalculateEV() {
        return this.CalculateStat(['Senses', 'Nerves'], 2);
    }

    CalculateDP() {
        return this.CalculateStat(['Muscles', 'Nerves', 'Brain'], 3);
    }

    CalculateBaseDefense() {
        return this.CalculateStat(['Nerves', 'Muscles'], 2) + (this.attributesBase.Luck || 0);
    }

    CalculateTotalAR() {
        return Object.values(this.defensiveEquipment).reduce((total, item) => total + item.AR, 0);
    }

    CalculateDefenseTotal() {
        return this.CalculateBaseDefense() + this.CalculateTotalAR();
    }
}