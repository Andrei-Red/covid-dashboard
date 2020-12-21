import {createHTML} from '../create-main-html.js';

const URL_API = 'https://corona.lmao.ninja/v2/countries';
const MAP_SKIN = 'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png';

const createMap = {
    arrMark: [],

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

        const buttonOne = document.getElementById('btn1')
        buttonOne.innerHTML = `<p>Active</p>`
        const buttonTwo = document.getElementById('btn2')
        buttonTwo.innerHTML = `<p>Recovere</p>`
        const buttonThree = document.getElementById('btn3')
        buttonThree.innerHTML = `<p>Deaths</p>`
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

        this.getApiAndChangeMarkerMap(map)
        
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        const btn3 = document.getElementById('btn3')

        btn1.addEventListener('click', () => {
            this.getApiAndChangeMarkerMap(map, 1)
        })

        btn2.addEventListener('click', () => {
            this.getApiAndChangeMarkerMap(map, 2)
        })

        btn3.addEventListener('click', () => {
            this.getApiAndChangeMarkerMap(map, 3)
        })
    },

    getApiAndChangeMarkerMap(map, btn = 1) {

        fetch(URL_API).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    createMap.createMarker(data, btn, map);
                    return data;
                }).then(data => {
                    createMap.clearOldMarker(),
                    createMap.createMarker(data, btn, map)
                })
            } else {
                console.log("Response status" + response.status + ': ' + response.statusText);
            }
        })
    },

    createMarker(data, btn, map) {

        data.forEach(element => {

             const settingsMarker = {
                "weight": 1,
            }

            const nameCountry = element.country;
            const latCountry = element.countryInfo.lat;
            const longCountry = element.countryInfo.long;
                
            let dataInfo = null;
            const FOR_SCALE = 5000;
            const FOR_SCALE_TWO = 200;

            if (btn === 1) {
                dataInfo = element.active;
                settingsMarker.color = "red";
                settingsMarker.radius = element.activePerOneMillion / FOR_SCALE;

                const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`).bindTooltip("my tooltip text").openTooltip();
                this.arrMark.push(marker);

            } else if (btn === 2) {
                dataInfo = element.recovered;
                settingsMarker.color = "green";
                settingsMarker.radius = element.recoveredPerOneMillion / FOR_SCALE;

                const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`);
                this.arrMark.push(marker);

            } else if (btn === 3) {
                settingsMarker.color = "grey";
                dataInfo = element.deaths;
                settingsMarker.radius = element.deathsPerOneMillion / FOR_SCALE_TWO;

                const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`);
                this.arrMark.push(marker);
            }
        })

        this.arrMark.forEach((element) => {
            element.addTo(map);
        })
    },
    
    clearOldMarker() {
        this.arrMark.forEach((e) => {
            e.remove()
        })
        this.arrMark = []
    }
}


export default function createMapInApp() {
    createMap.createButtonForMap();
    createMap.createDivElementForMapAndAddMap();
}
