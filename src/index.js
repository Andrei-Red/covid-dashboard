import './css/country-list/keyboard.css';
import './style.css';
import './css/table/table.css';
import './css/country-list/country-list.css';
import './css/graph/graph.css';
import './css/map/map.css';

import startCreteHTML from './js/create-main-html.js';
import createMapInApp from './js/map/map-main.js';
import createTableInApp from './js/table/table.js';
import createGraphInApp from './js/graph/graph.js';
import List from './js/country-list/country-list.js';

// RUN
startCreteHTML();
createMapInApp();
createTableInApp();
createGraphInApp();
const list = new List();
list.loadInfo();



