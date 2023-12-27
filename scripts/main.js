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
    const contactMeElement = document.querySelector('#contact_me');
    
    if (headerElement) headerElement.remove();
    if (mainElement) mainElement.remove();
    if (skillsElement) skillsElement.remove();
    
    if (contactMeElement) {
        contactMeElement.parentNode.insertBefore(newMainElement, contactMeElement);
    } else {
        document.body.appendChild(newMainElement);
    }

    window.scrollTo(0, 0);
};


const projectPaths = {
    "israquarium" :"",
    "ttrpgTools" :"../projects/character_sheet/index.html",
    "xianxiaMvp" :"",
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
            HandleProjectPageLinkClick(projectPaths[element.id]);
        });
    });
});


