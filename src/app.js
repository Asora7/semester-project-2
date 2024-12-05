import './js/api/auth/register.js';  // Assuming register.js is in this path

import "./js/ui/register.js";

import './js/api/auth/login.js';

import "./js/ui/login.js";

import "./js/ui/header.js";

import { monitorUserActivity } from './js/ui/logout.js';

import { createHeader } from './js/ui/header.js';

window.onload = () => {
    createHeader(); 
    monitorUserActivity(); // Start monitoring user inactivity
  };

