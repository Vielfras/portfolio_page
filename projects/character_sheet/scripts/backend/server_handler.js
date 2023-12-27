'use strict'

import { FetchJSON } from "../shared_data/my_utils.js";

const abilitiesFilePath = "./jsons/abilities.json"
const skillsFilePath = "./jsons/skills.json"
const itemsFilePath = "./jsons/items.js"

const characterMap = {
    "Liora Stonefist": "./jsons/characters/liora_stonefist.json",
    "Killik Glassfeather": "./jsons/characters/killik_glassfeather.json",
    "Goblin": "./jsons/enemies/goblin.json"
};

const g_abilitiesMap = {};
const g_skillMap = {};

export {
    ServerManager
};

class ServerManager {
    constructor(ip, port) {
        this.ip = ip;
        this.port = port;

        const server = ConnectToServer(this.ip, this.port);
    }

    static async New(ip, port) {
        const newServer = await new ServerManager(ip, port);

        return newServer;
    }

    async FetchCharacterNames(letters) {
        if (!letters) {
            return characterMap;
        }

        return FetchJSON(characterMap[letters]);
    }

    async FetchCharactersData(...characters) {
        let characterData = [];
    
        for (const character of characters) {
            let blob = await FetchCharacterBlob(character);
            characterData.push(blob);
        }
    
        return characterData;
    }

    async FetchAbilities(abilities = null) {
        if (!abilities) {
            return g_abilitiesMap;
        }
    }

    async FetchSkills(skills = null) {
        if (!skills) {
            return g_skillMap;
        }
    }

    async FetchItems(items = null) {
        if (!skills) {
            return g_skillMap;
        }
    }
}


/*-----------------------------------------------------------------------------
                                   PRIVATE
 ----------------------------------------------------------------------------*/
async function ConnectToServer(ip, port) {
    console.log("Server connected!");

    const fetchedAbilities = await FetchJSON(abilitiesFilePath);
    Object.keys(g_abilitiesMap).forEach(key => delete g_abilitiesMap[key]);
    Object.assign(g_abilitiesMap, fetchedAbilities);

    const fetchedSkills = await FetchJSON(skillsFilePath);
    Object.keys(g_skillMap).forEach(key => delete g_skillMap[key]);
    Object.assign(g_skillMap, fetchedSkills);

    const fetchedItems = await FetchJSON(skillsFilePath);
    Object.keys(g_skillMap).forEach(key => delete g_skillMap[key]);
    Object.assign(g_skillMap, fetchedItems);

    return undefined;
}

async function FetchCharacterBlob(characterName)
{
    if (!characterMap[characterName]) {
        console.error(`Character ${characterName} not found.`);
        return null;
    }

    const characterJsonPath = characterMap[characterName];
    const characterData = await FetchJSON(characterJsonPath);

    const characterBlob = {
        name: characterName || "[INVALID]",
        characterCondition: characterData.characterCondition || {},
        attributesBase: characterData.attributesMap || {},
        defensiveEquipment: characterData.defensiveEquipment || {},
        skillList: characterData.skillList || {},
    };

    characterBlob.attributesTotal = await FetchAttributesTotal(characterData);
    characterBlob.abilitiesBase = await FetchAbilitiesBase(characterBlob);
    characterBlob.abilitiesTotal = await FetchAbilitiesTotal(characterBlob);

    return characterBlob;
}



/*-----------------------------------------------------------------------------
                                   TO BE MOVED INTO THE SERVER
 ----------------------------------------------------------------------------*/
 async function FetchAttributesTotal(characterData) {
    let attributesWithBonuses = { ...characterData.attributesMap };

    for (const item in characterData.defensiveEquipment) {
        const equipment = characterData.defensiveEquipment[item];
        for (const attribute in equipment.Bonuses) {
            attributesWithBonuses[attribute] = (attributesWithBonuses[attribute] || 0) + (equipment.Bonuses[attribute] || 0);
        }
    }

    for (const skillName of characterData.skillList) {
        const skill = g_skillMap.skills.find(s => s.name === skillName);

        if (skill && skill.type === "Passive") {
            for (const attribute in skill.effect) {
                const effectValue = skill.effect[attribute];
                if (!isNaN(effectValue)) {
                    attributesWithBonuses[attribute] = (attributesWithBonuses[attribute] || 0) + effectValue;
                }
            }
        }
    }


    return attributesWithBonuses;
}

async function FetchAbilitiesBase(characterData) {
    if (!characterData.attributesTotal) {
        console.error("attributesTotal is undefined for", characterData.name);
        return {};
    }

    let abilitiesBase = {};

    for (const ability in g_abilitiesMap) {
        const attributeConfig = g_abilitiesMap[ability];
        const total = Object.entries(attributeConfig).reduce((acc, [attribute, weight]) => {
            return acc + (characterData.attributesTotal[attribute] * weight);
        }, 0);
        const numOfAffectingAttributes = Object.values(attributeConfig).reduce(acc => ++acc, 0);

        abilitiesBase[ability] = total / numOfAffectingAttributes;
    }

    return abilitiesBase;
}

async function FetchAbilitiesTotal(characterData) {
    let abilitiesTotal = {};

    if (!characterData.attributesTotal) {
        console.error("attributesTotal is undefined for", characterData.name);
        return {};
    }

    for (const ability in g_abilitiesMap) {
        const attributeConfig = g_abilitiesMap[ability];
        let totalScore = 0;
        let countAttributes = 0;

        for (const attribute in attributeConfig) {
            if (characterData.attributesTotal[attribute] !== undefined) {
                totalScore += characterData.attributesTotal[attribute] * attributeConfig[attribute];
                countAttributes++;
            }
        }

        abilitiesTotal[ability] = countAttributes > 0 ? totalScore / countAttributes : 0;
    }

    for (const item in characterData.defensiveEquipment) {
        const equipment = characterData.defensiveEquipment[item];
        if (equipment.Bonuses) {
            for (const ability in equipment.Bonuses) {
                abilitiesTotal[ability] = (abilitiesTotal[ability] || 0) + equipment.Bonuses[ability];
            }
        }

        if (equipment.Penalty) {
            for (const ability in equipment.Penalty) {
                abilitiesTotal[ability] = (abilitiesTotal[ability] || 0) + equipment.Penalty[ability];
            }
        }
    }

    for (const skillName of characterData.skillList) {
        const skill = g_skillMap.skills.find(s => s.name === skillName);
        if (skill && skill.AbilityEffects) {
            for (const ability in skill.AbilityEffects) {
                const effectValue = skill.AbilityEffects[ability];
                if (!isNaN(effectValue)) {
                    abilitiesTotal[ability] = (abilitiesTotal[ability] || 0) + effectValue;
                }
            }
        }
    }

    return abilitiesTotal;
}

