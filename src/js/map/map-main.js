import {createHTML} from '../create-main-html.js';

const URL_API = 'https://corona.lmao.ninja/v2/countries';
const MAP_SKIN = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const createMap = {
    arrMark: [],
    btn: 1,

    createDivElementForMapAndAddMap() {
        const idMapWrapper = "map"
        const mapContentElement = createHTML.getHTMLElementByQuerySelector('.map-content')
        createHTML.createElementHTML('div', 'map-content-wrapper', mapContentElement, idMapWrapper)

        this.addMapInHtmlElement(idMapWrapper)
    },

    createButtonForMap() {
        const mapContentElement = createHTML.getHTMLElementByQuerySelector('.map-content');
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn1');
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn2');
        createHTML.createElementHTML('div', 'map-btn', mapContentElement, 'btn3');
        createHTML.createElementHTML('div', 'btn-map-expansion', mapContentElement, 'expansion-map');

        const buttonOne = document.getElementById('btn1');
        buttonOne.innerHTML = `<p>Active</p>`;
        const buttonTwo = document.getElementById('btn2');
        buttonTwo.innerHTML = `<p>Recovere</p>`;
        const buttonThree = document.getElementById('btn3');
        buttonThree.innerHTML = `<p>Deaths</p>`;
    },

    addMapInHtmlElement(idHtmlElement) {
        const mapOptions = {
            center: [53.898, 27.5644],
            zoom: 3,
        }

        const map = new L.map(idHtmlElement, mapOptions);

        const mainMapLayer = L.tileLayer(MAP_SKIN, {
            maxZoom: 4,
            minZoom: 1,
            noWrap: true

        });

        map.addLayer(mainMapLayer);
        
        this.addStyleToMap(map)
        this.getApiAndChangeMarkerMap(map);
        
        
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');

        btn1.addEventListener('click', () => {
            this.btn = 1;
            this.getApiAndChangeMarkerMap(map, 1);
        })

        btn2.addEventListener('click', () => {
            this.btn = 2;
            this.getApiAndChangeMarkerMap(map, 2);
        })

        btn3.addEventListener('click', () => {
            this.btn = 3;
            this.getApiAndChangeMarkerMap(map, 3);
        }) 
    },

    getApiAndChangeMarkerMap(map, btn = 1) {

        fetch(URL_API).then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    createMap.createMarker(data, btn, map);
                    return data;
                }).then(data => {
                    createMap.clearOldMarker(map);
                    createMap.createMarker(data, btn, map);
                    createMap.hoverCountry(data, map);
                })
            } else {
                console.log("Response status" + response.status + ': ' + response.statusText);
                return;
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
            const FOR_SCALE = 3000;
            const FOR_SCALE_TWO = 100;

            if (btn === 1) {
                dataInfo = element.active;
                settingsMarker.color = "red";
                settingsMarker.radius = element.activePerOneMillion / FOR_SCALE;

                const marker = L.circleMarker([latCountry, longCountry], settingsMarker);
                this.arrMark.push(marker);

            } else if (btn === 2) {
                dataInfo = element.recovered;
                settingsMarker.color = "green";
                settingsMarker.radius = element.recoveredPerOneMillion / FOR_SCALE;

                const marker = L.circleMarker([latCountry, longCountry], settingsMarker).bindPopup(`${nameCountry}`);
                this.arrMark.push(marker);

            } else if (btn === 3) {
                settingsMarker.color = "black";
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

    hoverCountry(data, map) {
        isHoverCountry();

        function isHoverCountry () {
            const infoElement = document.querySelector('.info');
            if (infoElement) {
                return
            } else {
                createHoverCountry();
            }
        }

        function createHoverCountry() {
            let settings = {
                fillColor: "#808080",
                color: "#C0C0C0",
                opacity: 1,
                fillOpacity: 0.1,
                weight: 1,
                dashArray: '3',
            }
    
            let geojson = null;
            
            fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson")
                .then(function(response) {
                return response.json();
                }).then(function(json) {
    
                    function highlightFeature(e) {
                        const layer = e.target;
                    
                        layer.setStyle({
                            weight: 4,
                            color: 'grey',
                            fillOpacity: 0.6
                        });
                    
                        info.update(e, data);
                    }
    
                    function resetHighlight(e) {
                        geojson.resetStyle(e.target);
                        info.update();
                    }
    
                    function zoomToFeature(e) {
                        map.fitBounds(e.target.getBounds());
                    }
    
                    function onEachFeature(feature, layer) {
                        layer.on({
                            mouseover: highlightFeature,
                            mouseout: resetHighlight,
                            click: zoomToFeature
                        });
                    }
                    
                    geojson = L.geoJson(json, {
                        style: settings,
                        onEachFeature: onEachFeature
                    }).addTo(map);
    

                    const info = L.control();
    
                    info.onAdd = function (map) {
                        this._div = L.DomUtil.create('div', 'info');
                        this.update();
                        return this._div;
                    };
                    
                    info.update = function (e, data) {
                        let country;
                        let dataCountryObject;
                        let countryContent; 
                        let significativeCountryContent;
                 
                        if (e) {
                            country = getCountryOfMouseEvent(e);
                            dataCountryObject = getDataCountryObject(data, country);
                            countryContent = getCountryContent(dataCountryObject);
                            significativeCountryContent = Object.keys(countryContent)[0];
                        }

                        this._div.innerHTML = '<h4>Statistic</h4>' +  (e ?
                            `'<b>'${country}'</b>'<br/>Significative ${significativeCountryContent} <br/> ${countryContent[significativeCountryContent]}` 
                            : 'Hover over a country');
                    };
                    
                    info.addTo(map);


                    function getCountryOfMouseEvent(e) {
                        try {
                            const country = e.target.feature.properties.ADMIN;
                            return country;
                        } catch {
                            return 'Country not available';
                        } 
                    }

                    function getDataCountryObject(data, country) {
                        let dataCountryObject = null;
                        data.forEach((element) => {
                            if (element.country === country) {
                                dataCountryObject = element;
                            }
                        }) 
                        return dataCountryObject;
                    }

                    function getCountryContent(dataCountryObject) {
                        const btnNow = createMap.btn;
                        try {
                            switch(btnNow) {
                            
                                case 1:
                                    return {'Active per one million': dataCountryObject.activePerOneMillion};
                                case 2:
                                    return {'Recovered per one million': dataCountryObject.recoveredPerOneMillion}; 
                                case 3:
                                    return {'Deaths per one million': dataCountryObject.deathsPerOneMillion};      
                            }
                        } catch {
                            return {'Data not available': ''}
                        }      
                    }

                    createMap.createMapLegend(map);
                }); 
        }

    },
    
    clearOldMarker(map) {
        this.arrMark.forEach((element) => {
            map.removeLayer(element);
        })
        this.arrMark = [];
    },

    createMapLegend(map) {
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function (map) {
        
            const div = L.DomUtil.create('div', 'info legend');
            const grades = ['red', 'green', 'black'];
            const value = ['Active per one million', 'Recovered per one million', 'Deaths per one million'];
            
        
            for (let i = 0; i < grades.length; i += 1) {
                div.innerHTML += 
                    `<div>
                        <i style="background:${grades[i]}"></i>
                        <p>${value[i]}</p>
                    </div> `;
            }
        
            return div;
        };
        
        legend.addTo(map);
    },

    addStyleToMap(map) {
        fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_ocean.geojson').then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    L.geoJson(data, {
                        style: function (feature) {
                            return {
                                'weight': 0.1,
                                'color': 'black',
                                'fillColor': '#000000',
                                'fillOpacity': 0.8,
                            }
                        }
                    }).addTo(map);
                   
                })
            } else {
                console.log("Response status" + response.status + ': ' + response.statusText);
            }
        })
    }, 

    expansionContent() {
        const buttonExpansion = document.getElementById('expansion-map');
        const divMapContent = document.querySelector('.map-content')
        buttonExpansion.addEventListener('click', () => {
            console.log('click')
            divMapContent.classList.toggle('expansion');
        })    
    }
}


export default function createMapInApp() {
    createMap.createButtonForMap();
    createMap.createDivElementForMapAndAddMap();
    createMap.expansionContent();
}
