Version 1.0.0 - MVP done
- Initial problem exploration completed  
- Basic UI/UX is finished.


Version 2.0.0
- Need to understand flow of calculation of character data is done.


abilitiesMap = FetchFromJSONFIle() //Gets all possible abilities and how they are calculated


let characterName;

characterData = FetchCharacter(characterName) // Gets the name, base attributes, health/mana/state, equipment, gear, skills.

// TODO - check if this can replace the seperate fetches inside the curly brackets
// DO both, an initail fetch for all, and smaller fetches
player = characterData.jsonify() ?
{
m_baseAttributes = characterData.attributes;
m_totalAttributes = {};

m_baseAbilities = {};
m_totalAbilities = {};

m_baseCombatStats = {};
m_totalCombatStats = {};

m_passiveSkills = FetchSkillData(characterData.skillList if skillType is Passive);
m_activeSkills = FetchSkillData(characterData.skillList if skillType is Active);

m_defensiveEquipment = FetchItemData(characterData.defensiveEquipment);
m_offensiveEquipment = FetchItemData(characterData.offensiveEquipment);
m_equippableItems = FetchItemData(characterData.items if itemType is Equippable);
m_consumablesItems = FetchItemData(characterData.items if itemType is Consumable)
m_extraItems = FetchItemData(characterData.items if itemType is NOTE Equippable or Consumable);
}

enum class BonusType {
    PASSIVE_SKILL = 0,
    ACTIVE_SKILL,
    DEFENSIVE_EQUIPMENT,
    GEAR,
    CONSUMABLE,
    BONUS_TYPES_COUNT
};


InitPlayer() 
{
    m_totalAttributes = structuredClone(baseAttributes);
    m_totalAttributes.forEach(attribute => {
        attribute += CalculateTotalAttributeBonus(attribute); 
    }); 

    abilitiesMap.forEach(ability => {
        m_baseAbilities.push(CalculateBaseAbiltity(ability));
    });

    m_totalAbilities = structuredClone(m_baseAbilities);
    m_totalAbilities.forEach(ability => {
        ability += CalculateTotalAbility(ability);
    });
}


RecalculatePlayer() 
{
    m_totalAttributes = structuredClone(baseAttributes);
    m_totalAttributes.forEach(attribute => {
        attribute += CalculateTotalAttributeBonus(attribute); 
    }); 

    abilitiesMap.forEach(ability => {
        ability += CalculateBaseAbiltity(ability);
    });

    m_totalAbilities = structuredClone(m_baseAbilities);
    m_totalAbilities.forEach(ability => {
        ability += CalculateTotalAbility(ability);
    });
}







CalculateTotalAttributeBonus(attribute)
{
    var totalAttributeBonus = 0;

    for (int i = 0; i < BonusType::BONUS_TYPE_COUNT; ++i) {
        totalAttributeBonus += CalculateAttributeBonus(attribute, i);
    }

    return totalAttributeBonus;
}

CalculateAttributeBonus(attribute, bonusType)
{

}









CalculateBaseAbility(ability)
{
    const affectingAttributesWeights = abilitiesMap[ability];
    
    let abilityBase = 0;

    affectingAttributesWeights.forEach(attribute => {
        ability += (m_baseAttributes[attribute] * affectingAttributesWeights[attribute]); 
    })    

    return abilityBase;
}


CalculateTotalAbility(ability)
{
    const passiveSkillAbilityBonus = 
}