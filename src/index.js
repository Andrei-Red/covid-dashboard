import startCreteHTML from './js/create-main-html.js';
import List from './js/country-list/country-list.js';
// RUN
startCreteHTML();
const list = new List();
list.loadInfo();