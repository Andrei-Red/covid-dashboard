import {createHTML} from '../create-main-html.js';
//import {covidDataJSON} from '../../index.js';

//console.log(covidDataJSON)

const URL_API = 'https://corona.lmao.ninja/v2/countries';
const MAP_SKIN = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';

const createMap = {
    createDivElementForMapAndAddMap() {
        const idMapWrapper = "map"
        const mapContentElement = createHTML.getHTMLElementByQuerySelector('.map-content')
        createHTML.createElementHTML('div', 'map-content-wrapper', mapContentElement, idMapWrapper)

        this.addMapInHtmlElement(idMapWrapper)
    },

    createButtonForMap() {
        const mapContentElement = createHTML.getHTMLElementByQuerySelector('.map-content')
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn1')
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn2')
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn3')

    },

    addMapInHtmlElement(idHtmlElement) {
        const mapOptions = {
            center: [53.898, 27.5644],
            zoom: 3,
        }

        const map = new L.map(idHtmlElement, mapOptions)

        const CartoDB_DarkMatterNoLabels = L.tileLayer(MAP_SKIN, {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 5,
            minZoom: 1
        });

        map.addLayer(CartoDB_DarkMatterNoLabels)

        this.getApi(map)
        
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')

        btn1.addEventListener('click', () => {
            console.log(1)

            this.getApi(map, 1)
        })

        btn2.addEventListener('click', () => {
            console.log(2)
            this.getApi(map, 2)
        })

        btn3.addEventListener('click', () => {
            console.log(3)
            this.getApi(map, 3)
        })
    },

    arrMark: [],

    getApi(map, btn = 1) {

        fetch(URL_API).then(function(response) {
            if(response.ok) {
                response.json().then(function(dataApi) {
                    const data = dataApi;
                    createMarker(data, btn)
                });
            } else {
                console.log("Response status" + response.status + ': ' + response.statusText);
            }
        });


        
        const clearOldMarker = () => {
            this.arrMark.forEach((e) => {
                e.remove()
            })
            this.arrMark = []
        }
        clearOldMarker()


        const createMarker = (data, btn) => {
            console.log(data)

            data.forEach(element => {

                 const settingsMarker = {
                    "weight": 1,
                }

                const nameCountry = element.country;
                const latCountry = element.countryInfo.lat;
                const longCountry = element.countryInfo.long;
                    
                let dataInfo = null;
                
                if (btn === 1) {
                    dataInfo = element.active;
                    settingsMarker.color = "red";
                    settingsMarker.radius = element.activePerOneMillion / 5000;

                    const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`).bindTooltip("my tooltip text").openTooltip();
                    this.arrMark.push(marker);


                } else if (btn === 2) {
                    dataInfo = element.recovered;
                    settingsMarker.color = "green";
                    settingsMarker.radius = element.recoveredPerOneMillion / 5000;

                    const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`);
                    this.arrMark.push(marker);

                } else if (btn === 3) {
                    settingsMarker.color = "grey";
                    dataInfo = element.deaths;
                    settingsMarker.radius = element.deathsPerOneMillion / 200;

                    const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`);
                    this.arrMark.push(marker);
                }
            })

            this.arrMark.forEach((e) => {
                e.addTo(map);
            })
        }
    }, 
}




export default function createMapInApp() {
    createMap.createButtonForMap();
    createMap.createDivElementForMapAndAddMap();
    
    createMap.controlButtonClick()
}
