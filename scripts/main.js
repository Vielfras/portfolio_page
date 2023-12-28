'use strict'

import {GetProjectPageMainElement} from "./project_page.js"
import {URLManager} from "./url_manager.js"

const portfolioPageUrl = "https://oksman.netlify.app";
// const portfolioPageUrl = "http://127.0.0.1:5500/";

const urlManager = new URLManager();

const projectPaths = {
    "israquarium" :"",
    "ttrpgTools" :"../projects/character_sheet/index.html",
    "xianxiaMvp" :"",
};

let lastWindowSize;
let isMenuHidden;

const hamburgerVisibilityMaxWidth = 730;

// ================================================================
//                             LOGIC
// ================================================================
const HandleProjectPageLink = (linkId) => {
    console.log("Link with ID", linkId, "was clicked.");

    const newMainElement = GetProjectPageMainElement(projectPaths[linkId]);
    
    if (newMainElement) {
        const headerElement = document.querySelector('header');
        const mainElement = document.querySelector('main');
        const skillsElement = document.querySelector('#skills');
        const contactMeElement = document.querySelector('#contact_me');
        
        if (headerElement) headerElement.remove();
        if (mainElement) mainElement.remove();
        if (skillsElement) skillsElement.remove();
        
        urlManager.SetSearchParams("project", linkId);

        if (contactMeElement) {
            contactMeElement.parentNode.insertBefore(newMainElement, contactMeElement);
        } else {
            document.body.appendChild(newMainElement);
        }
        
        window.scrollTo(0, 0);
    }
};


// ================================================================
//                             DOM CONTENT LOADED
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav_menu');
    const navSocial = document.querySelector('#nav_social_container');

    const headerElement = document.querySelector('#about_me');

    if (window.innerWidth > hamburgerVisibilityMaxWidth) {
        navMenu.classList.remove('hide');
        headerElement.classList.remove('top_padding');
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
            headerElement.classList.remove('top_padding');
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
        headerElement.classList.toggle('top_padding')
    });

    document.querySelectorAll(".project_page_link").forEach((element) => {
        element.addEventListener('click', (event) => {
            HandleProjectPageLink(element.id);
        });
    });

    document.querySelector("#logo").addEventListener("click", () => {
        window.location.href = portfolioPageUrl; 
    });

    let searchParams = urlManager.GetSearchParams(); 
    if (searchParams) {
        if (searchParams["project"] && searchParams["project"].trim() !== "") {
            HandleProjectPageLink(searchParams["project"]);
        }
    }
});


