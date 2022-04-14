// Popup elementi
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;

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

let obradjeniPodaci = [];
let style = [];
let iconStyle;
async function getData() {
    const dataFetch = await fetch("http://192.168.0.10:2021/getAllData");
    const podaci = await dataFetch.json();
    // podaci.map((item) => {
    //     console.log(item);
    // })
    podaci.map(podatak => {
        console.log(podatak);
        let koordinate = podatak.koordinate.match(/\d+(?:\.\d+)?/g).map(Number);
        // let koordinate = [podatak.koordinate]
        let lokacija = parseInt(podatak.lokacija);
        let zauzeto = podatak.kapacitet - podatak.slobodna_mesta;
        let popunjenost = percentageCalculator(zauzeto, podatak.kapacitet);
        podatak = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(koordinate)),
            ime: lokacija.toString(),
            podaci: podatak.naziv_lokacije,
            popunjenost: popunjenost,
            slMesta: parseInt(podatak.slobodna_mesta).toString(),
        });
        iconStyle = new ol.style.Style({
            image: new ol.style.Circle({
                radius: 15,
                stroke: new ol.style.Stroke({
                    color: '#ee0b0b',
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: 'green',
                }),
            }),
        });
        obradjeniPodaci.push(podatak);
        style.push(iconStyle);
        // console.log(boja);
    });
}

// let iconStyle = new ol.style.Style({
//     image: new ol.style.Circle({
//         radius: 15,
//         stroke: new ol.style.Stroke({
//             color: '#ee0b0b',
//             width: 1
//         }),
//         fill: new ol.style.Fill({
//             color: '#18066b'
//         }),
//     }),
// });
let labelStyle = new ol.style.Style({
    text: new ol.style.Text({
        font: '15px Calibri, sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
            color: '#e5ebf1'
        }),
        stroke: new ol.style.Stroke({
            color: '#dde1e6',
            width: 1
        }),
    })
});
style.push(labelStyle)
// let style = [iconStyle, labelStyle];
let map;
kreirajMapu()

async function kreirajMapu() {
    await getData();
    map = new ol.Map({
        target: 'map',
        overlays: [overlay],
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),

            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: obradjeniPodaci
                }),
                style: (feature) => {
                    labelStyle.getText().setText(feature.get('ime'));
                    if (feature.get('popunjenost') > 50) {
                        boja = '#310562';
                        console.log(boja);
                    } else {
                        console.log(feature.get('popunjenost'));
                        boja = '#4e066b';
                        console.log(boja);
                    }
                    iconStyle.getImage().getFill().setColor(boja);
                    return style;
                }
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([20.4429037, 44.8049605]),
            zoom: 13
        })
    })
    map.on("singleclick", (evt) => {
        if (map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel)) {
            const name = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("podaci");
            });
            const popunjenost = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("popunjenost");
            });
            const slMesta = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
                return feature.get("slMesta");
            });
            const coordinate = evt.coordinate;
            content.innerHTML = `${name} \n Popunjenost: ${popunjenost}% \n Sl.Mesta: ${slMesta}`;
            overlay.setPosition(coordinate);
        }
    })
    map.on('pointermove', (evt) => {
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
    });
}

