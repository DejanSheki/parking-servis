const canvas = document.getElementById('myChart');
const canvas2 = document.getElementById('myChart2');
const form = document.querySelector('#form');
const datumOd = document.querySelector('#datumOd');
const datumDo = document.querySelector('#datumDo');
const lokacija = document.querySelector('#lokacija');
const vremeOd = document.querySelector('#vremeOd');
const vremeDo = document.querySelector('#vremeDo');
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const datumAxis = [];
const slMestaAxis = [];
const vremeAxis = [];
const popunjenostAxis = [];
let myChart;
let myChart2;
// Obrcemo redosled i cistimo input
// function reverseString(str) {
//     return str.split('-').reverse().join('.');
// }
// function reverseString(str) {
//     let datum = str.split(' ');
//     let dat = datum[0].split('-').reverse().join('.');
//     let vreme = datum[1];
//     return dat + '  ' + vreme;
// }

function clearInp() {
    document.querySelectorAll("input").forEach(val => {
        val.value = '';
    });
}
// Izracunavamo procenat popunjenosti
function percentageCalculator(zauzeto, kapacitet) {
    let result = ((zauzeto / kapacitet) * 100).toFixed();
    return result;
}

// Skupljamo podatke i obradjujemo ih
async function getData() {
    const dataFetch = await fetch("http://192.168.0.10:2021/getFreeNowDataStatistic");
    const podaci = await dataFetch.json();
    const poredjenjeOd = new Date(datumOd.value + ' ' + vremeOd.value);
    const poredjenjeDo = new Date(datumDo.value + ' ' + vremeDo.value);
    const rezultati = podaci.filter(item => lokacija.value.toLowerCase().includes(item.zoneShort) && new Date(item.zoneDT) >= poredjenjeOd && new Date(item.zoneDT) <= poredjenjeDo);
    rezultati.forEach(element => {
        const zauzeto = element.zoneMaxFree - element.zoneFreeNow;
        const popunjenost = percentageCalculator(zauzeto, element.zoneMaxFree);
        const datum = new Date(element.zoneDT).toLocaleString('sr-SR', {
            timeZone: 'Europe/Belgrade',
            hourCycle: 'h23',
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        console.log(datum);
        const vreme = (datum.split(" ")[1]);
        console.log(vreme);
        const slMesta = element.zoneFreeNow;
        datumAxis.push(datum);
        slMestaAxis.push(slMesta);
        vremeAxis.push(datum.split(" ")[0] + '  ' + vreme);
        popunjenostAxis.push(popunjenost);
    });
}
getData()

// Pravimo grafikon
async function chartIt() {
    await getData();
    myChart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: vremeAxis,
            datasets: [{
                label: 'Slobodnih mesta',
                data: slMestaAxis,
                backgroundColor: [
                    'rgba(195, 22, 60, 0.2)',
                ],
                borderColor: [
                    'rgb(195, 22, 60)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        }
    });
    clearInp();
}
async function chartIt2() {
    await getData();
    myChart2 = new Chart(canvas2, {
        type: 'line',
        data: {
            labels: vremeAxis,
            datasets: [{
                label: 'Popunjenost %',
                data: popunjenostAxis,
                backgroundColor: [
                    'rgba(12, 64, 236, 0.2)',
                ],
                borderColor: [
                    'rgb(12, 64, 236)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });
    clearInp();
}
async function updateChart() {
    await getData();
    myChart.data.labels = vremeAxis;
    myChart2.data.labels = vremeAxis;
    myChart.data.datasets[0].data = slMestaAxis;
    myChart2.data.datasets[0].data = popunjenostAxis;
    myChart.update();
    myChart2.update();
    clearInp();
}

form.addEventListener('submit', (e) => {
    if (canvas.style.display === '') {
        chartIt();
        chartIt2();
    } else {
        datumAxis.length = 0;
        slMestaAxis.length = 0;
        vremeAxis.length = 0;
        popunjenostAxis.length = 0;
        updateChart();
    }
    e.preventDefault();
});
