import './styles/root.css'
import './styles/style.css'

import { runApp } from './functions/projectsAdd';
import localStorageReview from './functions/localStorage';

document.addEventListener('DOMContentLoaded', () => {
    // localStorage.clear();
    localStorageReview();
    runApp();
});

