import './js/api/auth/register.js';  // Assuming register.js is in this path

import "./js/ui/register.js";

import './js/api/auth/login.js';

import "./js/ui/login.js";

import "./js/ui/header.js";

import "./js/api/profile/read.js";

import "./js/api/profile/update.js";

import "./js/ui/profile/profile.js";

import "./js/api/listings/listings.js";

import "./js/ui/listings/create.js";

import "./js/api/listings/create.js";

import "./js/ui/listings/display.js";

import router from "./js/router/index.js";

import { monitorUserActivity } from './js/ui/logout.js';

import { createHeader } from './js/ui/header.js';

import "./js/ui/listings/search.js";


window.onload = () => {
    createHeader(); 
    monitorUserActivity(); // Start monitoring user inactivity
  };


  document.addEventListener("DOMContentLoaded", () => {
    router(); // This will handle routing based on the current URL
  });