'use strict'

import { IsEmptyObject } from "../shared_data/my_utils.js";
import { CharacterManager } from "../data_managment/character_manager.js"

export {
    InitCharacterPage    
};

async function InitCharacterPage(server, characterName) {
    const player = await CharacterManager.New(server, characterName);
    
    UpdateCharacterPage(player);
}

/*-----------------------------------------------------------------------------
                                   PRIVATE
 ----------------------------------------------------------------------------*/
function UpdateCharacterPage(player) {
    document.title = player.name;

    // PopulatePlayerBaseInfo()
    {
        document.querySelector('.character-name').textContent = player.name;
        
        document.querySelector('#health-curr').textContent = player.characterCondition.currHealth;
        document.querySelector('#health-max').textContent = player.characterCondition.maxHealth;
        document.querySelector('#mana-curr').textContent = player.characterCondition.currMana;
        document.querySelector('#mana-max').textContent = player.characterCondition.maxMana;

        document.querySelector('#movement .value').textContent = player.characterCondition.movement;
        document.querySelector('#physical-condition .value').textContent = player.characterCondition.physicalCondition;
        
        document.querySelector('.character-stats #accuracy .value').textContent = player.CalculateAccuracy().toFixed(0);
        document.querySelector('.character-stats #evasiveness .value').textContent = player.CalculateEV().toFixed(0);
        document.querySelector('.character-stats #defense-penetration .value').textContent = player.CalculateDP().toFixed(0);
        document.querySelector('.character-stats #defense #defense-base').textContent = player.CalculateBaseDefense().toFixed(0);
        document.querySelector('.character-stats #defense #defense-total').textContent = player.CalculateDefenseTotal().toFixed(0);
    }
    
    // PopulatePlayerAttributes()
    {
        const attributeGridEl = document.querySelector('.attribute-grid');
        Object.entries(player.attributesBase).forEach(([key, value]) => {
            const attributeItemEl = document.createElement('div');
            attributeItemEl.className = 'attribute-item';
            attributeItemEl.innerHTML = `
            <span class="name">${key}</span>
            <span class="value">${value} / ${player.attributesTotal[key]}</span>
            `;
            attributeGridEl.appendChild(attributeItemEl);
        });

        const abilitiesListEl = document.querySelector('.abilities-list');
        const fragment = document.createDocumentFragment();
        
        Object.keys(player.abilitiesMap).forEach(ability => {
            const abilityBase = player.abilitiesBase[ability];
            const abilityTotal = player.abilitiesTotal[ability];
            const abilityName = player.FormatAbilityName(ability);
        
            const rowElement = document.createElement('tr');
            rowElement.innerHTML = `
                <td class="ability-name">${abilityName}</td>
                <td class="ability-total">${abilityTotal.toFixed(0)}</td>
                <td class="ability-base">${abilityBase.toFixed(0)}</td>
            `;
        
            fragment.appendChild(rowElement);
        });
        
        abilitiesListEl.appendChild(fragment);
    }
    
    // PopulatePlayerEquipment()
    {
        const equipmentListEl = document.getElementById('equipment-list');
        Object.entries(player.defensiveEquipment).forEach(([item, stats]) => {
            const row = equipmentListEl.insertRow();
            row.insertCell().textContent = item;
            row.insertCell().textContent = stats.AR;
            row.insertCell().innerHTML = Object.entries(stats.Penalty).map(([skill, penalty]) => `${skill}: ${penalty}`).join('<br>') || '-';
            row.insertCell().innerHTML = stats.Bonuses ? Object.entries(stats.Bonuses).map(([attribute, bonus]) => `${attribute}: +${bonus}`).join('<br>') : '-';
        });
    }

    // PopulatePlayerSkills()
    {
        const passiveSkillsListEl = document.querySelector('#passive-skill-list');
        const activeSkillsListEl = document.querySelector('#active-skill-list');
        if (!IsEmptyObject(player.skillList)) {
            player.skillList.forEach(skillName => {
                const skill = player.skillMap.skills.find(s => s.name === skillName);
                
                if (skill) {
                    if (skill.type[0] !== "P") {
                        const row = activeSkillsListEl.insertRow();
                        row.insertCell().textContent = skill.name;
                        row.insertCell().textContent = typeof skill.effect === 'object' ? Object.entries(skill.effect).map(([key, value]) => `${value} ${key}`).join(', ') : skill.effect;
                        row.insertCell().textContent = skill.description || '-';
                    } else {
                        const row = passiveSkillsListEl.insertRow();
                        row.insertCell().textContent = skill.name;
                        row.insertCell().textContent = typeof skill.effect === 'object' ? Object.entries(skill.effect).map(([key, value]) => `${value} ${key}`).join(', ') : skill.effect;
                    }
                }
            });
        }
    }

    // AddDOMLissteners()
    {
        document.querySelectorAll('.collapsible').forEach(collapsible => {
            collapsible.addEventListener('click', () => {
                const targetId = collapsible.dataset.collapsetarget;
                const content = document.getElementById(targetId);

                collapsible.classList.toggle('active');
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        });

        const buttons = document.querySelectorAll('.increment-button, .decrement-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const change = button.classList.contains('increment-button') ? 1 : -1;
                
                if (button.classList.contains('health')) {
                    player.AddToHealth(change);
                    document.querySelector('#health-curr').textContent = player.characterCondition.currHealth;
                } else if (button.classList.contains('mana')) {
                    player.AddToMana(change);
                    document.querySelector('#mana-curr').textContent = player.characterCondition.currMana;
                }
            });
        });
    }

}

