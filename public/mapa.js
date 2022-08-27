// Popup elementi
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
const user = document.querySelector('#user');
const mapTest = document.querySelector('#map');
user.innerHTML = sessionStorage.loggedUser;
let processedData = [];

// Kalkulator procenta popunjenosti
function percentageCalculator(zauzeto, kapacitet) {
    let result = ((zauzeto / kapacitet) * 100).toFixed();
    return result;
}

closer.addEventListener('click', () => {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
});

// Create an overlay to anchor the popup to the map.
const overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 50,
    },
});

const view = new ol.View({
    center: ol.proj.fromLonLat([20.4429037, 44.8049605]),
    zoom: 13
});

async function getData() {
    const dataFetch = await fetch("http://192.168.42.42:2021/getAllActiveZonesData");
    const dbData = await dataFetch.json();
    dbData.map(data => {
        let coordinates = [data.zoneLong, data.zoneLat];
        let occupied = data.zoneMaxFree - data.zoneFreeNow;
        let occupancy = percentageCalculator(occupied, data.zoneMaxFree);
        let feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
            locationName: data.zoneName,
            locationShort: data.zoneShort,
            occupancy: occupancy,
            slMesta: parseInt(data.zoneFreeNow).toString(),
        });
        console.log(feature);
        processedData.push(feature);
    });
}

let iconStyleLowOccupancy = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 15,
        stroke: new ol.style.Stroke({
            color: 'rgb(50, 178, 80)',
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgb(96, 143, 255)',
        }),
    }),
});
let iconStyleMidleOccupancy = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 15,
        stroke: new ol.style.Stroke({
            color: 'rgb(244, 244, 0)',
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgb(96, 143, 255)',
        }),
    }),
});
let iconStyleFullOccupancy = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 15,
        stroke: new ol.style.Stroke({
            color: 'rgb(208, 26, 26)',
            width: 3
        }),
        fill: new ol.style.Fill({
            color: 'rgb(96, 143, 255)',
        }),
    }),
});

let labelStyle = new ol.style.Style({
    text: new ol.style.Text({
        font: '12px Calibri, sans-serif',
        weight: 'bold',
        overflow: true,
        fill: new ol.style.Fill({
            color: '#e5ebf1'
        }),
        stroke: new ol.style.Stroke({
            color: '#b3b3b3',
            width: 1
        }),
    })
});

let style = [iconStyleLowOccupancy, labelStyle, iconStyleMidleOccupancy];
let map;
mapCreate();

async function mapCreate() {
    await getData();
    map = new ol.Map({
        target: 'map',
        view: view,
        overlays: [overlay],
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: processedData
                }),
                style: (feature) => {
                    // console.log(feature);
                    labelStyle.getText().setText(feature.get('locationShort'));
                    if (feature.get("occupancy") <= 50) {
                        style = [iconStyleLowOccupancy, labelStyle]
                        return style
                    }
                    if (feature.get("occupancy") > 50 && feature.get("occupancy") < 90) {
                        style = [iconStyleMidleOccupancy, labelStyle]
                        return style
                    }
                    if (feature.get("occupancy") >= 90) {
                        style = [iconStyleFullOccupancy, labelStyle]
                        return style
                    }
                    return style;
                }
            })
        ]
    })
    map.on("click", (evt) => {
        if (map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)) {
            const name = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("locationName");
            });
            const occupancy = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("occupancy");
            });
            const slMesta = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("slMesta");
            });
            const coordinate = evt.coordinate;
            content.innerHTML = `${name} <br> Popunjenost: ${occupancy}% <br> Sl.Mesta: ${slMesta}`;
            overlay.setPosition(coordinate);
        }
    })
    map.on('pointermove', (evt) => {
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });
}

// test 2 maps

let sensitData = [];
let clear = () => {
    mapTest.innerHTML = '';
}

async function getSensitData() {
    const dataFetch = await fetch("http://192.168.0.10:2021/getSensitZone");
    const dbData = await dataFetch.json();
    console.log(dbData);
    dbData.map(data => {
        let coordinates = [data.zoneLong, data.zoneLat];
        let feature = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(coordinates)),
            locationName: data.zoneName,
            locationShort: data.zoneShort,
            disp1description: data.disp1opis,
            disp2description: data.disp2opis
        });
        console.log(feature);
        sensitData.push(feature);
    });
}

let sensitStyle = new ol.style.Style({
    image: new ol.style.RegularShape({
        fill: new ol.style.Fill({
            color: 'rgb(166, 126, 78)',
        }),
        stroke: new ol.style.Stroke({
            color: 'rgb(0, 0, 0)',
            width: 0.2
        }),
        radius: 10 / Math.SQRT2,
        radius2: 10,
        points: 4,
        angle: 0,
        scale: [2.5, 1],
    }),
});

let style2 = [sensitStyle, labelStyle];
let map2;
// mapCreate();

async function mapCreate2() {
    await getSensitData();
    map2 = new ol.Map({
        target: 'map',
        view: view,
        overlays: [overlay],
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: sensitData
                }),
                style: (feature) => {
                    labelStyle.getText().setText(feature.get('locationShort'));
                    return style2;
                }
            })
        ]
    })
    map2.on("click", (evt) => {
        if (map2.getTargetElement().style.cursor = map2.hasFeatureAtPixel(evt.pixel)) {
            const name = map2.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("locationName");
            });
            const mark = map2.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("locationShort");
            });
            const disp1description = map2.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("disp1description");
            });
            const disp2description = map2.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("disp2description");
            });
            const coordinate = evt.coordinate;
            content.innerHTML = `${name} <br> Oznaka: ${mark} <br> Disp1: ${disp1description} <br> Disp2: ${disp2description}`;
            overlay.setPosition(coordinate);
        }
    })
    map2.on('pointermove', (evt) => {
        map2.getTargetElement().style.cursor = map2.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });
}

function mapChange(val) {
    if (val == "garaze") {
        clear();
        mapCreate();
    }
    else if (val == "sensit") {
        clear();
        mapCreate2();
    }
}