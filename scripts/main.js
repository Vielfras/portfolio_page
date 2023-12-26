'use strict'

import {GetProjectPageMainElement} from "./project_page.js"

var lastWindowSize = window.innerWidth;
var isMenuHidden;

const hamburgerVisibilityMaxWidth = 730;

const HandleProjectPageLinkClick = (linkId) => {
    console.log("Link with ID", linkId, "was clicked.");

    const newMainElement = GetProjectPageMainElement(linkId);

    const headerElement = document.querySelector('header');
    const mainElement = document.querySelector('main');
    const skillsElement = document.querySelector('#skills');

    if (headerElement) headerElement.remove();
    if (mainElement) mainElement.remove();
    if (skillsElement) skillsElement.remove();

    const contactMeSection = document.querySelector('#contact_me');
    if (contactMeSection) {
        contactMeSection.parentNode.insertBefore(newMainElement, contactMeSection);
    } else {
        document.body.appendChild(newMainElement);
    }

    window.scrollTo(0, 0);
};


const projectPaths = {
    "israquarium" :"../projects/turn_based_combat.md",
    "ttrpgTools" :"../projects/turn_based_combat.md",
    "xianxiaMvp" :"../projects/turn_based_combat.md",
};

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav_menu');
    const navSocial = document.querySelector('#nav_social_container');

    const header = document.querySelector('#about_me');

    if (window.innerWidth > hamburgerVisibilityMaxWidth) {
        navMenu.classList.remove('hide');
        header.classList.remove('top_padding');
        // navChoices.classList.remove('hide');
        navSocial.classList.add('hide');

        isMenuHidden = false;
    } else {
        navMenu.classList.add('hide');
        isMenuHidden = true;
    }

    window.addEventListener('resize', () => {
        var currWindowSize = window.innerWidth;

        if (window.innerWidth > hamburgerVisibilityMaxWidth) {
            navMenu.classList.remove('hide');
            header.classList.remove('top_padding');
            navSocial.classList.add('hide');

            isMenuHidden = false;
        }
        else if (!isMenuHidden) {
            navMenu.classList.add('hide');
            isMenuHidden = true;
        }

        lastWindowSize = currWindowSize;
    });

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('hide');
        navSocial.classList.toggle('hide');
        header.classList.toggle('top_padding')
    });

    document.querySelectorAll(".project_page_link").forEach((element) => {
        element.addEventListener('click', (event) => {
            HandleProjectPageLinkClick(event, projectPaths[element.id]);
        });
    });
});


