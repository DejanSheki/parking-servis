// Popup elementi
const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
let boja;

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
let iconStyle;
async function getData() {
    const dataFetch = await fetch("http://192.168.42.42:2021/getAllActiveZonesData");
    const podaci = await dataFetch.json();
    podaci.map(podatak => {
        console.log(podatak);
        // let koordinate = podatak.koordinate.match(/\d+(?:\.\d+)?/g).map(Number);
        let koordinate = [podatak.zoneLong, podatak.zoneLat];
        let lokacija = parseInt(podatak.zoneNumber);
        let zauzeto = podatak.zoneMaxFree - podatak.zoneFreeNow;
        let popunjenost = percentageCalculator(zauzeto, podatak.zoneMaxFree);
        podatak = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.fromLonLat(koordinate)),
            ime: lokacija.toString(),
            podaci: podatak.zoneShort,
            popunjenost: popunjenost,
            slMesta: parseInt(podatak.zoneFreeNow).toString(),
        });
        obradjeniPodaci.push(podatak);
    });
}

iconStyle = new ol.style.Style({
    image: new ol.style.Circle({
        radius: 15,
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 247, 0, 0.204)',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: '#0938d1',
        }),
    }),
});
let labelStyle = new ol.style.Style({
    text: new ol.style.Text({
        font: '12px Calibri, sans-serif',
        overflow: true,
        fill: new ol.style.Fill({
            color: '#e5ebf1'
        }),
        stroke: new ol.style.Stroke({
            color: '#000000',
            width: 1
        }),
    })
});

let style = [iconStyle, labelStyle];
let map;
mapCreate()

async function mapCreate() {
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
                    labelStyle.getText().setText(feature.get('podaci'));
                    if (feature.get('popunjenost') < 50) {
                        boja = '#0938d1';
                        iconStyle.getImage().getFill().setColor(boja);
                    } else {
                        boja = '#d11818';
                        iconStyle.getImage().getFill().setColor(boja);
                    }
                    // iconStyle.getImage().getFill().setColor(boja);
                    return style;
                }
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([20.4429037, 44.8049605]),
            zoom: 13
        })
    })
    map.on("click", (evt) => {
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

