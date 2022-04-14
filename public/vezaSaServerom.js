const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const tabela = document.querySelector('#table');

// Obrcemo redosled u stringu(2022-04-07 21:56:33 -> 07.04.2022 21:56:33)
function reverseString(str) {
    let datum = str.split(' ');
    let dat = datum[0].split('-').reverse().join('.');
    let vreme = datum[1];
    return dat + '  ' + vreme;
}

// Hvatamo podatke sa servera
async function fetchApi(url) {
    const dataFetch = await fetch(url);
    const data = await dataFetch.json();
    return data;
}

// Pravimo tabelu 
async function fetchData() {
    const fetchLink = "http://192.168.0.10:2021/getAllZonesData";
    const data = await fetchApi(fetchLink);
    createTable(data);
    console.log(data);
    return data;
}
const tabela1 = document.querySelector('#table1');
function createTable(data) {
    data.forEach(dat => {
        console.log(dat.zoneCreatedTD);
        let tr = document.createElement('tr');
        tr.style.backgroundColor = dat.zoneColor;
        tr.innerHTML = `
            <th>${dat.zoneName}</th>
			<td>${dat.zoneShort}</td>
			<td>${dat.zoneMaxFree}</td>
			<td>${dat.zoneFreeNow}</td>
			<td>${dat.zoneUpDnEq}</td>
			<td>${dat.zoneOccup} %</td>
		`;
        tabela1.appendChild(tr);
    });
}
fetchData();
// const interval1 = setInterval(() => {
//     tabela1.innerHTML = '';
//     fetchData();
// }, 50000);

//druga tabela menjamo samo polja u tabeli
const lok01 = document.querySelector('#lok_01');
const slMesta01 = document.querySelector('#sl_mesta_01');
const promena01 = document.querySelector('#prom_01');
const popunjenost01 = document.querySelector('#pop_01');
const lok02 = document.querySelector('#lok_02');
const slMesta02 = document.querySelector('#sl_mesta_02');
const promena02 = document.querySelector('#prom_02');
const popunjenost02 = document.querySelector('#pop_02');
const lok03 = document.querySelector('#lok_03');
const slMesta03 = document.querySelector('#sl_mesta_03');
const promena03 = document.querySelector('#prom_03');
const popunjenost03 = document.querySelector('#pop_03');
const lok04 = document.querySelector('#lok_04');
const slMesta04 = document.querySelector('#sl_mesta_04');
const promena04 = document.querySelector('#prom_04');
const popunjenost04 = document.querySelector('#pop_04');
const lok05 = document.querySelector('#lok_05');
const slMesta05 = document.querySelector('#sl_mesta_05');
const promena05 = document.querySelector('#prom_05');
const popunjenost05 = document.querySelector('#pop_05');
const lok06 = document.querySelector('#lok_06');
const slMesta06 = document.querySelector('#sl_mesta_06');
const promena06 = document.querySelector('#prom_06');
const popunjenost06 = document.querySelector('#pop_06');
const lok07 = document.querySelector('#lok_07');
const slMesta07 = document.querySelector('#sl_mesta_07');
const promena07 = document.querySelector('#prom_07');
const popunjenost07 = document.querySelector('#pop_07');
const lok08 = document.querySelector('#lok_08');
const slMesta08 = document.querySelector('#sl_mesta_08');
const promena08 = document.querySelector('#prom_08');
const popunjenost08 = document.querySelector('#pop_08');
const lok09 = document.querySelector('#lok_09');
const slMesta09 = document.querySelector('#sl_mesta_09');
const promena09 = document.querySelector('#prom_09');
const popunjenost09 = document.querySelector('#pop_09');
const lok10 = document.querySelector('#lok_10');
const slMesta10 = document.querySelector('#sl_mesta_10');
const promena10 = document.querySelector('#prom_10');
const popunjenost10 = document.querySelector('#pop_10');
const lok11 = document.querySelector('#lok_11');
const slMesta11 = document.querySelector('#sl_mesta_11');
const promena11 = document.querySelector('#prom_11');
const popunjenost11 = document.querySelector('#pop_11');
const lok12 = document.querySelector('#lok_12');
const slMesta12 = document.querySelector('#sl_mesta_12');
const promena12 = document.querySelector('#prom_12');
const popunjenost12 = document.querySelector('#pop_12');
const lok13 = document.querySelector('#lok_13');
const slMesta13 = document.querySelector('#sl_mesta_13');
const promena13 = document.querySelector('#prom_13');
const popunjenost13 = document.querySelector('#pop_13');
const lok14 = document.querySelector('#lok_14');
const slMesta14 = document.querySelector('#sl_mesta_14');
const promena14 = document.querySelector('#prom_14');
const popunjenost14 = document.querySelector('#pop_14');
const lok15 = document.querySelector('#lok_15');
const slMesta15 = document.querySelector('#sl_mesta_15');
const promena15 = document.querySelector('#prom_15');
const popunjenost15 = document.querySelector('#pop_15');
const lok16 = document.querySelector('#lok_16');
const slMesta16 = document.querySelector('#sl_mesta_16');
const promena16 = document.querySelector('#prom_16');
const popunjenost16 = document.querySelector('#pop_16');
const lok17 = document.querySelector('#lok_17');
const slMesta17 = document.querySelector('#sl_mesta_17');
const promena17 = document.querySelector('#prom_17');
const popunjenost17 = document.querySelector('#pop_17');
const lok18 = document.querySelector('#lok_18');
const slMesta18 = document.querySelector('#sl_mesta_18');
const promena18 = document.querySelector('#prom_18');
const popunjenost18 = document.querySelector('#pop_18');
const lok19 = document.querySelector('#lok_19');
const slMesta19 = document.querySelector('#sl_mesta_19');
const promena19 = document.querySelector('#prom_19');
const popunjenost19 = document.querySelector('#pop_19');
const lok20 = document.querySelector('#lok_20');
const slMesta20 = document.querySelector('#sl_mesta_20');
const promena20 = document.querySelector('#prom_20');
const popunjenost20 = document.querySelector('#pop_20');
const lok21 = document.querySelector('#lok_21');
const slMesta21 = document.querySelector('#sl_mesta_21');
const promena21 = document.querySelector('#prom_21');
const popunjenost21 = document.querySelector('#pop_21');
const lok22 = document.querySelector('#lok_22');
const slMesta22 = document.querySelector('#sl_mesta_22');
const promena22 = document.querySelector('#prom_22');
const popunjenost22 = document.querySelector('#pop_22');
const lok23 = document.querySelector('#lok_23');
const slMesta23 = document.querySelector('#sl_mesta_23');
const promena23 = document.querySelector('#prom_23');
const popunjenost23 = document.querySelector('#pop_23');
const lok24 = document.querySelector('#lok_24');
const slMesta24 = document.querySelector('#sl_mesta_24');
const promena24 = document.querySelector('#prom_24');
const popunjenost24 = document.querySelector('#pop_24');


// Kalkulator procenta popunjenosti
function percentageCalculator(zauzeto, kapacitet) {
    let result = ((zauzeto / kapacitet) * 100).toFixed();
    return result;
}

// Boja prema broju sl. mesta
function bgColor(popunjenost, bgSlMesta, bgPopunjenost) {
    if (popunjenost >= 90) {
        return bgSlMesta.style.backgroundColor = 'rgb(224, 105, 105)', bgPopunjenost.style.backgroundColor = 'rgb(224, 105, 105)';
    } else if (popunjenost > 50 && popunjenost < 90) {
        return bgSlMesta.style.backgroundColor = 'rgb(247, 247, 136)', bgPopunjenost.style.backgroundColor = 'rgb(247, 247, 136)';
    } else if (popunjenost <= 50) {
        return bgSlMesta.style.backgroundColor = 'rgb(208, 233, 198)', bgPopunjenost.style.backgroundColor = 'rgb(208, 233, 198)';
    }
}

//table
async function fetchDataVuk() {
    const fetchLink = "http://192.168.0.10:2021/vuk";
    const data = await fetchApi(fetchLink);
    slMesta01.textContent = data[0].zoneFreeNow;
    popunjenost01.textContent = data[0].zoneOccup + '%';
    lok01.style.backgroundColor = data[0].zoneColor;
    promena01.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVuk();
async function fetchDataSla() {
    const fetchLink = "http://192.168.0.10:2021/sla";
    const data = await fetchApi(fetchLink);
    slMesta02.textContent = data[0].zoneFreeNow;
    popunjenost02.textContent = data[0].zoneOccup + '%';
    lok02.style.backgroundColor = data[0].zoneColor;
    promena02.innerHTML = data[0].zoneUpDnEq;
}
fetchDataSla();
async function fetchDataMgm() {
    const fetchLink = "http://192.168.0.10:2021/mgm";
    const data = await fetchApi(fetchLink);
    slMesta03.textContent = data[0].zoneFreeNow;
    popunjenost03.textContent = data[0].zoneOccup + '%';
    lok03.style.backgroundColor = data[0].zoneColor;
    promena03.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMgm();
async function fetchDataCvP() {
    const fetchLink = "http://192.168.0.10:2021/cvp";
    const data = await fetchApi(fetchLink);
    slMesta04.textContent = data[0].zoneFreeNow;
    popunjenost04.textContent = data[0].zoneOccup + '%';
    lok04.style.backgroundColor = data[0].zoneColor;
    promena04.innerHTML = data[0].zoneUpDnEq;
}
fetchDataCvP();
async function fetchDataMk() {
    const fetchLink = "http://192.168.0.10:2021/mk";
    const data = await fetchApi(fetchLink);
    slMesta05.textContent = data[0].zoneFreeNow;
    popunjenost05.textContent = data[0].zoneOccup + '%';
    lok05.style.backgroundColor = data[0].zoneColor;
    promena05.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMk();
async function fetchDataDg() {
    const fetchLink = "http://192.168.0.10:2021/dg";
    const data = await fetchApi(fetchLink);
    slMesta06.textContent = data[0].zoneFreeNow;
    popunjenost06.textContent = data[0].zoneOccup + '%';
    lok06.style.backgroundColor = data[0].zoneColor;
    promena06.innerHTML = data[0].zoneUpDnEq;
}
fetchDataDg();
async function fetchDataPol() {
    const fetchLink = "http://192.168.0.10:2021/pol";
    const data = await fetchApi(fetchLink);
    slMesta07.textContent = data[0].zoneFreeNow;
    popunjenost07.textContent = data[0].zoneOccup + '%';
    lok07.style.backgroundColor = data[0].zoneColor;
    promena07.innerHTML = data[0].zoneUpDnEq;
}
fetchDataPol();
async function fetchDataKam() {
    const fetchLink = "http://192.168.0.10:2021/kam";
    const data = await fetchApi(fetchLink);
    slMesta08.textContent = data[0].zoneFreeNow;
    popunjenost08.textContent = data[0].zoneOccup + '%';
    lok08.style.backgroundColor = data[0].zoneColor;
    promena08.innerHTML = data[0].zoneUpDnEq;
}
fetchDataKam();
async function fetchDataVis() {
    const fetchLink = "http://192.168.0.10:2021/vis";
    const data = await fetchApi(fetchLink);
    slMesta09.textContent = data[0].zoneFreeNow;
    popunjenost09.textContent = data[0].zoneOccup + '%';
    lok09.style.backgroundColor = data[0].zoneColor;
    promena09.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVis();
async function fetchDataCuk() {
    const fetchLink = "http://192.168.0.10:2021/cuk";
    const data = await fetchApi(fetchLink);
    slMesta10.textContent = data[0].zoneFreeNow;
    popunjenost10.textContent = data[0].zoneOccup + '%';
    lok10.style.backgroundColor = data[0].zoneColor;
    promena10.innerHTML = data[0].zoneUpDnEq;
}
fetchDataCuk();
async function fetchDataBv() {
    const fetchLink = "http://192.168.0.10:2021/bv";
    const data = await fetchApi(fetchLink);
    slMesta11.textContent = data[0].zoneFreeNow;
    popunjenost11.textContent = data[0].zoneOccup + '%';
    lok11.style.backgroundColor = data[0].zoneColor;
    promena11.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBv();
async function fetchDataBba() {
    const fetchLink = "http://192.168.0.10:2021/bba";
    const data = await fetchApi(fetchLink);
    slMesta12.textContent = data[0].zoneFreeNow;
    popunjenost12.textContent = data[0].zoneOccup + '%';
    lok12.style.backgroundColor = data[0].zoneColor;
    promena12.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBba();
async function fetchDataOnbg() {
    const fetchLink = "http://192.168.0.10:2021/onbg";
    const data = await fetchApi(fetchLink);
    slMesta13.textContent = data[0].zoneFreeNow;
    popunjenost13.textContent = data[0].zoneOccup + '%';
    lok13.style.backgroundColor = data[0].zoneColor;
    promena13.innerHTML = data[0].zoneUpDnEq;
}
fetchDataOnbg();
async function fetchDataVma() {
    const fetchLink = "http://192.168.0.10:2021/vma";
    const data = await fetchApi(fetchLink);
    slMesta14.textContent = data[0].zoneFreeNow;
    popunjenost14.textContent = data[0].zoneOccup + '%';
    lok14.style.backgroundColor = data[0].zoneColor;
    promena14.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVma();
async function fetchDataObi() {
    const fetchLink = "http://192.168.0.10:2021/obi";
    const data = await fetchApi(fetchLink);
    slMesta15.textContent = data[0].zoneFreeNow;
    popunjenost15.textContent = data[0].zoneOccup + '%';
    lok15.style.backgroundColor = data[0].zoneColor;
    promena15.innerHTML = data[0].zoneUpDnEq;
}
fetchDataObi();
async function fetchDataZel() {
    const fetchLink = "http://192.168.0.10:2021/zel";
    const data = await fetchApi(fetchLink);
    slMesta16.textContent = data[0].zoneFreeNow;
    popunjenost16.textContent = data[0].zoneOccup + '%';
    lok16.style.backgroundColor = data[0].zoneColor;
    promena16.innerHTML = data[0].zoneUpDnEq;
}
fetchDataZel();
async function fetchDataMas() {
    const fetchLink = "http://192.168.0.10:2021/mas";
    const data = await fetchApi(fetchLink);
    slMesta17.textContent = data[0].zoneFreeNow;
    popunjenost17.textContent = data[0].zoneOccup + '%';
    lok17.style.backgroundColor = data[0].zoneColor;
    promena17.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMas();
async function fetchDataPio() {
    const fetchLink = "http://192.168.0.10:2021/pio";
    const data = await fetchApi(fetchLink);
    slMesta18.textContent = data[0].zoneFreeNow;
    popunjenost18.textContent = data[0].zoneOccup + '%';
    lok18.style.backgroundColor = data[0].zoneColor;
    promena18.innerHTML = data[0].zoneUpDnEq;
}
fetchDataPio();
async function fetchDataDrak() {
    const fetchLink = "http://192.168.0.10:2021/drak";
    const data = await fetchApi(fetchLink);
    slMesta19.textContent = data[0].zoneFreeNow;
    popunjenost19.textContent = data[0].zoneOccup + '%';
    lok19.style.backgroundColor = data[0].zoneColor;
    promena19.innerHTML = data[0].zoneUpDnEq;
}
fetchDataDrak();
async function fetchDataScn() {
    const fetchLink = "http://192.168.0.10:2021/scn";
    const data = await fetchApi(fetchLink);
    slMesta20.textContent = data[0].zoneFreeNow;
    popunjenost20.textContent = data[0].zoneOccup + '%';
    lok20.style.backgroundColor = data[0].zoneColor;
    promena20.innerHTML = data[0].zoneUpDnEq;
}
fetchDataScn();
async function fetchDataBel() {
    const fetchLink = "http://192.168.0.10:2021/bel";
    const data = await fetchApi(fetchLink);
    slMesta21.textContent = data[0].zoneFreeNow;
    popunjenost21.textContent = data[0].zoneOccup + '%';
    lok21.style.backgroundColor = data[0].zoneColor;
    promena21.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBel();
async function fetchDataAda() {
    const fetchLink = "http://192.168.0.10:2021/ada";
    const data = await fetchApi(fetchLink);
    slMesta22.textContent = data[0].zoneFreeNow;
    popunjenost22.textContent = data[0].zoneOccup + '%';
    lok22.style.backgroundColor = data[0].zoneColor;
    promena22.innerHTML = data[0].zoneUpDnEq;
}
fetchDataAda();
async function fetchDataKap() {
    const fetchLink = "http://192.168.0.10:2021/kap";
    const data = await fetchApi(fetchLink);
    slMesta23.textContent = data[0].zoneFreeNow;
    popunjenost23.textContent = data[0].zoneOccup + '%';
    lok23.style.backgroundColor = data[0].zoneColor;
    promena23.innerHTML = data[0].zoneUpDnEq;
}
fetchDataKap();
async function fetchDataZsnbg() {
    const fetchLink = "http://192.168.0.10:2021/zsnbg";
    const data = await fetchApi(fetchLink);
    slMesta24.textContent = data[0].zoneFreeNow;
    popunjenost24.textContent = data[0].zoneOccup + '%';
    lok24.style.backgroundColor = data[0].zoneColor;
    promena24.innerHTML = data[0].zoneUpDnEq;
}
fetchDataZsnbg();

const interval = setInterval(() => {
    fetchDataVuk();
    fetchDataSla();
    fetchDataMgm();
    fetchDataCvP();
    fetchDataAda();
    fetchDataKam();
    fetchDataCuk();
    fetchDataDrak();
    fetchDataBel();
    fetchDataMas();
    fetchDataVma();
    fetchDataZel();
    fetchDataScn();
    fetchDataPol();
    fetchDataDg();
    fetchDataMk();
    fetchDataObi();
    fetchDataZsnbg();
    fetchDataVis();
    fetchDataOnbg();
    fetchDataBba();
    fetchDataBv();
    fetchDataKap();
}, 30000);




// async function fetchFiksedData() {
//     // const dataFetch = await fetch("http://192.168.0.10:2021/getAllData");
//     // const data = await dataFetch.json();

//     data.forEach(dat => {
//         if (dat.lokacija === '00001') {
//             datum01.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta01.textContent = dat.slobodna_mesta;
//             lok01.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta01)
//         } else if (dat.lokacija === '00002') {
//             datum02.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta02.textContent = dat.slobodna_mesta;
//             lok02.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta02);
//         } else if (dat.lokacija === '00003') {
//             datum03.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta03.textContent = dat.slobodna_mesta;
//             lok03.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta03);
//         } else if (dat.lokacija === '00004') {
//             datum04.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta04.textContent = dat.slobodna_mesta;
//             lok04.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta04);
//         } else if (dat.lokacija === '00005') {
//             datum05.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta05.textContent = dat.slobodna_mesta;
//             lok05.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta05);
//         } else if (dat.lokacija === '00006') {
//             datum06.textContent = `${reverseString(dat.datum)} / ${dat.vreme}`;
//             slMesta06.textContent = dat.slobodna_mesta;
//             lok06.textContent = dat.naziv_lokacije;
//             bgColor(dat.slobodna_mesta, slMesta06);
//         }
//     });
// }
// fetchFiksedData();

// const interval = setInterval(() => {
// 	fetchFiksedData();
// }, 5000);
