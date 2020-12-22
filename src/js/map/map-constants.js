let geojson = null;
        
        let settings = {
            fillColor: "#808080",
            color: "#C0C0C0",
            opacity: 1,
            fillOpacity: 0.1,
            weight: 1,
            dashArray: '3',
        }

        fetch("https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson")
            .then(function(response) {
            return response.json();
            }).then(function(json) {
                //L.geoJSON(json, settings).addTo(map);

                
                //L.geoJson(json, settings).addTo(map);

                function highlightFeature(e) {
                    var layer = e.target;
                
                    layer.setStyle({
                        weight: 4,
                        color: 'grey',
                        fillOpacity: 0.5
                    });
                
                    /* if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        layer.bringToFront();
                    } */
                    info.update('f');
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

                map.removeLayer(geojson)

                //////////////// INFO
                var info = L.control();

                info.onAdd = function (map) {
                    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
                    this.update();
                    return this._div; 
                };
                
                // method that we will use to update the control based on feature properties passed
                info.update = function (props) {
                    this._div.innerHTML = '<h4>Statistic</h4>' +  (props ?
                        '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
                        : 'Hover over a state');
                };
                
                info.addTo(map);
            });



//////////////////////////
            isHoverCountry()

            function isHoverCountry () {
                const infoElement = document.querySelector('.info')
                if (infoElement) {
                    console.log('exoit')
                    return
                } else {
                    console.log('create')
                    createHoverCountry()
                }
            }
    
            function createHoverCountry() {
                
            }