const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const tabela = document.querySelector('#table');
const tabela1 = document.querySelector('#table1');

const thermometer = `<svg width="16" height="15" viewBox="0 0 12 24" fill="rgb(63, 107, 164)" stroke="rgb(75, 75, 75)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thermometer"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>`
const flash = `<svg width="17" height="17" viewBox="0 0 32 32" fill="rgb(75, 75, 75)" >
<defs>
    <style>
        .cls-1 {
            fill: none;
        }
    </style>
</defs>
<path
    d="M11.61,29.92a1,1,0,0,1-.6-1.07L12.83,17H8a1,1,0,0,1-1-1.23l3-13A1,1,0,0,1,11,2H21a1,1,0,0,1,.78.37,1,1,0,0,1,.2.85L20.25,11H25a1,1,0,0,1,.9.56,1,1,0,0,1-.11,1l-13,17A1,1,0,0,1,12,30,1.09,1.09,0,0,1,11.61,29.92ZM17.75,13l2-9H11.8L9.26,15h5.91L13.58,25.28,23,13Z" />
<rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"
    transform="translate(32 32) rotate(-180)" />
</svg>`
const flashOff = `<svg width="17" height="17" viewBox="0 0 24 24" >
<g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="ic_fluent_flash_off_24_regular" fill="#212121" fill-rule="nonzero">
        <path d="M2.1471565,2.29987076 L2.21979439,2.21576937 C2.48612344,1.94956531 2.90279279,1.92545704 3.19635315,2.14338041 L3.28045454,2.2160183 L21.7804545,20.7247039 C22.073279,21.0176659 22.0731676,21.4925396 21.7802056,21.7853641 C21.5138766,22.0515681 21.0972072,22.0756764 20.8036469,21.857753 L20.7195455,21.7851151 L14.117,15.1802239 L7.79572333,21.7692956 C7.28653642,22.2999013 6.42002114,21.85631 6.50882285,21.1639805 L6.52697684,21.0680983 L8.29400141,14 L5.75,14 C5.28493478,14 4.94054997,13.5845421 5.00799493,13.1396118 L5.02885704,13.0439592 L6.573,7.63222391 L2.21954546,3.27642951 C1.9533414,3.01010047 1.92923314,2.59343112 2.1471565,2.29987076 L2.21979439,2.21576937 L2.1471565,2.29987076 Z M7.787,8.84622391 L6.74429749,12.5 L9.25458372,12.5 C9.70998352,12.5 10.0522174,12.8994407 9.9996098,13.3375588 L9.98219059,13.4319017 L8.6662195,18.6957861 L13.056,14.1182239 L7.787,8.84622391 Z M8.75,2 L15.75,2 C16.2277904,2 16.5745297,2.43688181 16.4870214,2.8899828 L16.4615125,2.98717082 L14.7905694,8 L19.25,8 C19.8740475,8 20.2101038,8.70693246 19.8601065,9.1871035 L19.7911396,9.2692956 L16.1955437,13.015 L15.1345437,11.954 L17.4908021,9.5 L13.75,9.5 C13.2722096,9.5 12.9254703,9.06311819 13.0129786,8.6100172 L13.0384875,8.51282918 L14.7094306,3.5 L9.31572606,3.5 L8.73054366,5.547 L7.51754366,4.333 L8.02885704,2.54395915 C8.11062876,2.25775812 8.35223955,2.05056404 8.64010438,2.00805425 L8.75,2 Z" id="🎨-Color"></path>
    </g>
</g>
</svg>`;

function reverseString(str) {
    const date = new Date(str).toLocaleString('sr');
    // const hours = new Date(str).toLocaleTimeString('sr');
    // return `${date} ${hours}`;
    return date;
}

// Hvatamo podatke sa servera
async function fetchApi(url) {
    const dataFetch = await fetch(url);
    const data = await dataFetch.json();
    return data;
}

// Pravimo tabelu 
async function fetchData() {
    Promise.all([
        fetch('http://192.168.0.10:2021/getAllActiveLocations')
            .then(data => data.json()),
        fetch('http://192.168.0.10:2021/getAllActiveZonesData')
            .then(data => data.json()),
        fetch('http://192.168.0.10:2021/get46finalSensit')
            .then(data => data.json())
    ]).then((dbData) => {
        createTable(dbData);
    })
}

function lastPacket(dbData, type, adress) {
    const packet = [];
    const diagn = {};
    const packetPinfo = dbData[0].filter(dat => dat.locType === 1 && dat.locLastPacket != null);
    const packetSensit = dbData[0].filter(dat => dat.locType === 2 && dat.locLastPacket != null);
    // console.log(packetPinfo);
    // console.log(packetSensit);
    packetPinfo.forEach(dat => {
        const splitedPacket = dat.locLastPacket.split(',');
        packet.push(new Object({
            locType: dat.locType,
            locLname: dat.locLname,
            vrstaPaketa: splitedPacket[0],
            adresa: splitedPacket[1],
            displej1: splitedPacket[2],
            displej2: splitedPacket[3],
            displej3: splitedPacket[4],
            displej4: splitedPacket[5],
            osvetljenje: splitedPacket[6],
            accuNapon: splitedPacket[7],
            accuTemp: splitedPacket[8],
            in220: splitedPacket[9],
            inBack1: splitedPacket[10],
            inBack2: splitedPacket[11],
            inBack3: splitedPacket[12],
            inBack4: splitedPacket[13],
            osvetljenjeHi: splitedPacket[14],
            osvetljenjeLo: splitedPacket[15],
            accuCutOff: splitedPacket[16],
            offTimeSec: splitedPacket[17],
            rele220v: splitedPacket[18],
            releAccu: splitedPacket[19],
            releOff: splitedPacket[20],
            testTimerSec: splitedPacket[21],
            test: splitedPacket[22],
            Pow: splitedPacket[23],
            RstS: splitedPacket[24],
            RstH: splitedPacket[25],
            Pck: splitedPacket[26],
            Ses: splitedPacket[27],
            Cid: splitedPacket[28],
            IPa: splitedPacket[29],
            Rev: splitedPacket[30],
            Ver: splitedPacket[31],
            Sgn: splitedPacket[32],
            checksum: splitedPacket[33]
        }));
    })
    packetSensit.forEach(dat => {
        const splitedPacket = dat.locLastPacket.split(',');
        packet.push(new Object({
            locType: dat.locType,
            locLname: dat.locLname,
            vrstaPaketa: splitedPacket[0],
            adresa: splitedPacket[1],
            displej1: splitedPacket[2],
            displej1a: splitedPacket[3],
            displej2: splitedPacket[4],
            displej2a: splitedPacket[5],
            displej3: splitedPacket[6],
            displej3a: splitedPacket[7],
            displej4: splitedPacket[8],
            displej4a: splitedPacket[9],
            osvetljenje: splitedPacket[10],
            accuNapon: splitedPacket[11],
            accuTemp: splitedPacket[12],
            in220: splitedPacket[13],
            inBack1: splitedPacket[14],
            inBack2: splitedPacket[15],
            inBack3: splitedPacket[16],
            inBack4: splitedPacket[17],
            osvetljenjeHi: splitedPacket[18],
            osvetljenjeLo: splitedPacket[19],
            accuCutOff: splitedPacket[20],
            offTimeSec: splitedPacket[21],
            rele220v: splitedPacket[22],
            releAccu: splitedPacket[23],
            releOff: splitedPacket[24],
            testTimerSec: splitedPacket[25],
            test: splitedPacket[26],
            Pow: splitedPacket[27],
            RstS: splitedPacket[28],
            RstH: splitedPacket[29],
            Pck: splitedPacket[30],
            Ses: splitedPacket[31],
            Cid: splitedPacket[32],
            IPa: splitedPacket[33],
            Rev: splitedPacket[34],
            Ver: splitedPacket[35],
            Sgn: splitedPacket[36],
            checksum: splitedPacket[37]
        }))
    })
    packet.forEach(p => {
        // console.log(p.in220);
        if (p.locLname === type) {
            diagn.osvetljenje = p.osvetljenje;
            diagn.accuNapon = `${voltage(Number(p.accuNapon))}v`;
            diagn.accuTemp = `${celsius(Number(p.accuTemp)).toFixed(0)} &#8451;`;
            diagn.in220 = p.in220;
        } else if (diagn.osvetljenje === undefined) {
            diagn.osvetljenje = '';
            diagn.accuNapon = '';
            diagn.accuTemp = '';
        }

        if (diagn.in220 === '1') {
            return icon = flash, bg = 'transparent';
        } else if (diagn.in220 === '0') {
            return icon = flashOff, bg = 'rgb(238, 129, 129)';
        } else {
            return icon = '', bg = 'transparent';
        }
    })
    return { diagn, icon, bg };
}

function voltage(accuNapon) {
    let v = (accuNapon * 0.01448).toFixed(2);
    return v;
}
function celsius(w) {
    let x = 615;
    let y = 25;
    let z = x - w;
    let q = y - (z / 2);
    return q;
}

'01,001,Er,Er,00,00,03,00,Er,Er,999,0666,0777,0,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,55555,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,C245'

function display(dbData, dat) {
    const zones = [...dbData[1], ...dbData[2]];
    const displayData = {};
    zones.forEach(d => {
        if (d.zoneShort === dat.locDisp1zoneID) {
            displayData.d1 = d.zoneShort;
            // console.log(d.zoneShort);
        } else if (displayData.d1 === undefined) {
            displayData.d1 = '---';
        }
        if (d.zoneShort === dat.locDisp2zoneID) {
            displayData.d2 = d.zoneShort;
        } else if (displayData.d2 === undefined) {
            displayData.d2 = '---';
        }
        if (d.zoneShort === dat.locDisp3zoneID) {
            displayData.d3 = d.zoneShort;
        } else if (displayData.d3 === undefined) {
            displayData.d3 = '---';
        }
        if (d.zoneShort === dat.locDisp4zoneID) {
            displayData.d4 = d.zoneShort;
        } else if (displayData.d4 === undefined) {
            displayData.d4 = '---';
        }
    })
    return displayData;
}
function displayValue(dbData, dat) {
    const displayValue = {};
    dbData[0].forEach(d => {
        if (dat.locDisp1zoneID === '0') {
            displayValue.d1 = ' ';
        } else {
            displayValue.d1 = dat.locDisp1value;
        }
        if (dat.locDisp2zoneID === '0') {
            displayValue.d2 = ' ';
        } else {
            displayValue.d2 = dat.locDisp2value;
        }
        if (dat.locDisp3zoneID === '0') {
            displayValue.d3 = ' ';
        } else {
            displayValue.d3 = dat.locDisp3value;
        }
        if (dat.locDisp4zoneID === '0') {
            displayValue.d4 = ' ';
        } else {
            displayValue.d4 = dat.locDisp4value;
        }
    })
    return displayValue;
}

function displayBg(dbData, dat) {
    const displayBg = {};
    dbData[0].forEach(d => {
        if (dat.locDisp1value === 'Err' || dat.locDisp1value === 'Er/Er' && dat.locDisp1zoneID !== '0') {
            displayBg.bg1 = 'rgb(238, 129, 129)';
        } else {
            displayBg.bg1 = 'transparent';
        }
        if (dat.locDisp2value === 'Err' || dat.locDisp2value === 'Er/Er' && dat.locDisp2zoneID !== '0') {
            displayBg.bg2 = 'rgb(238, 129, 129)';
        } else {
            displayBg.bg2 = 'transparent';
        }
        if (dat.locDisp3value === 'Err' || dat.locDisp3value === 'Er/Er' && dat.locDisp3zoneID !== '0') {
            displayBg.bg3 = 'rgb(238, 129, 129)';
        } else {
            displayBg.bg3 = 'transparent';
        }
        if (dat.locDisp4value === 'Err' || dat.locDisp4value === 'Er/Er' && dat.locDisp4zoneID !== '0') {
            displayBg.bg4 = 'rgb(238, 129, 129)';
        } else {
            displayBg.bg4 = 'transparent';
        }
    })
    return displayBg;
}
function model(dat) {
    if (dat.locType === 1) {
        return {
            locModel: `P${dat.locNumber}`,
            idBackground: 'rgb(96, 143, 255)'
        }
    } else if (dat.locType === 2) {
        return {
            locModel: `S${dat.locNumber}`,
            idBackground: 'rgb(166, 126, 78)'
        }
    } else {
        return {
            locModel: `Nije izabran!`,
            idBackground: 'rgb(255, 64, 64)'
        }
    }
}

function createTable(dbData) {
    dbData[0].forEach(dat => {
        const tr = document.createElement('tr');
        tr.classList.add(`${model(dat).locModel}`);
        tr.style.backgroundColor = dat.locColor;
        tr.innerHTML = `
            <th style="background-color: ${model(dat).idBackground};">${model(dat).locModel}</th>
        	<td>${dat.locSname}</td>
        	<td style="background-color: ${displayBg(dbData, dat).bg1};">${display(dbData, dat).d1}  ${displayValue(dbData, dat).d1}</td>
        	<td style="background-color: ${displayBg(dbData, dat).bg2};">${display(dbData, dat).d2}  ${displayValue(dbData, dat).d2}</td>
        	<td style="background-color: ${displayBg(dbData, dat).bg3};">${display(dbData, dat).d3}  ${displayValue(dbData, dat).d3}</td>
        	<td style="background-color: ${displayBg(dbData, dat).bg4};">${display(dbData, dat).d4}  ${displayValue(dbData, dat).d4}</td>
        	<td>${reverseString(dat.locLastCommTD)}</td>
        	<td style="background-color: ${lastPacket(dbData, dat.locLname, dat.locNumber).bg};">${lastPacket(dbData, dat.locLname, dat.locNumber).icon} &nbsp; <i class="fa fa-car-battery"></i> ${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuNapon} &nbsp; ${thermometer}${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuTemp}</td>
        `;
        tabela1.appendChild(tr);
    });
}
fetchData();

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
    slMesta01.textContent = Number(data[0].zoneFreeNow);
    popunjenost01.textContent = data[0].zoneOccup + '%';
    lok01.style.backgroundColor = data[0].zoneColor;
    promena01.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVuk();
async function fetchDataSla() {
    const fetchLink = "http://192.168.0.10:2021/sla";
    const data = await fetchApi(fetchLink);
    slMesta02.textContent = Number(data[0].zoneFreeNow);
    popunjenost02.textContent = data[0].zoneOccup + '%';
    lok02.style.backgroundColor = data[0].zoneColor;
    promena02.innerHTML = data[0].zoneUpDnEq;
}
fetchDataSla();
async function fetchDataMgm() {
    const fetchLink = "http://192.168.0.10:2021/mgm";
    const data = await fetchApi(fetchLink);
    slMesta03.textContent = Number(data[0].zoneFreeNow);
    popunjenost03.textContent = data[0].zoneOccup + '%';
    lok03.style.backgroundColor = data[0].zoneColor;
    promena03.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMgm();
async function fetchDataCvP() {
    const fetchLink = "http://192.168.0.10:2021/cvp";
    const data = await fetchApi(fetchLink);
    slMesta04.textContent = Number(data[0].zoneFreeNow);
    popunjenost04.textContent = data[0].zoneOccup + '%';
    lok04.style.backgroundColor = data[0].zoneColor;
    promena04.innerHTML = data[0].zoneUpDnEq;
}
fetchDataCvP();
async function fetchDataMk() {
    const fetchLink = "http://192.168.0.10:2021/mk";
    const data = await fetchApi(fetchLink);
    slMesta05.textContent = Number(data[0].zoneFreeNow);
    popunjenost05.textContent = data[0].zoneOccup + '%';
    lok05.style.backgroundColor = data[0].zoneColor;
    promena05.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMk();
async function fetchDataDg() {
    const fetchLink = "http://192.168.0.10:2021/dg";
    const data = await fetchApi(fetchLink);
    slMesta06.textContent = Number(data[0].zoneFreeNow);
    popunjenost06.textContent = data[0].zoneOccup + '%';
    lok06.style.backgroundColor = data[0].zoneColor;
    promena06.innerHTML = data[0].zoneUpDnEq;
}
fetchDataDg();
async function fetchDataPol() {
    const fetchLink = "http://192.168.0.10:2021/pol";
    const data = await fetchApi(fetchLink);
    slMesta07.textContent = Number(data[0].zoneFreeNow);
    popunjenost07.textContent = data[0].zoneOccup + '%';
    lok07.style.backgroundColor = data[0].zoneColor;
    promena07.innerHTML = data[0].zoneUpDnEq;
}
fetchDataPol();
async function fetchDataKam() {
    const fetchLink = "http://192.168.0.10:2021/kam";
    const data = await fetchApi(fetchLink);
    slMesta08.textContent = Number(data[0].zoneFreeNow);
    popunjenost08.textContent = data[0].zoneOccup + '%';
    lok08.style.backgroundColor = data[0].zoneColor;
    promena08.innerHTML = data[0].zoneUpDnEq;
}
fetchDataKam();
async function fetchDataVis() {
    const fetchLink = "http://192.168.0.10:2021/vis";
    const data = await fetchApi(fetchLink);
    slMesta09.textContent = Number(data[0].zoneFreeNow);
    popunjenost09.textContent = data[0].zoneOccup + '%';
    lok09.style.backgroundColor = data[0].zoneColor;
    promena09.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVis();
async function fetchDataCuk() {
    const fetchLink = "http://192.168.0.10:2021/cuk";
    const data = await fetchApi(fetchLink);
    slMesta10.textContent = Number(data[0].zoneFreeNow);
    popunjenost10.textContent = data[0].zoneOccup + '%';
    lok10.style.backgroundColor = data[0].zoneColor;
    promena10.innerHTML = data[0].zoneUpDnEq;
}
fetchDataCuk();
async function fetchDataBv() {
    const fetchLink = "http://192.168.0.10:2021/bv";
    const data = await fetchApi(fetchLink);
    slMesta11.textContent = Number(data[0].zoneFreeNow);
    popunjenost11.textContent = data[0].zoneOccup + '%';
    lok11.style.backgroundColor = data[0].zoneColor;
    promena11.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBv();
async function fetchDataBba() {
    const fetchLink = "http://192.168.0.10:2021/bba";
    const data = await fetchApi(fetchLink);
    slMesta12.textContent = Number(data[0].zoneFreeNow);
    popunjenost12.textContent = data[0].zoneOccup + '%';
    lok12.style.backgroundColor = data[0].zoneColor;
    promena12.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBba();
async function fetchDataOnbg() {
    const fetchLink = "http://192.168.0.10:2021/onbg";
    const data = await fetchApi(fetchLink);
    slMesta13.textContent = Number(data[0].zoneFreeNow);
    popunjenost13.textContent = data[0].zoneOccup + '%';
    lok13.style.backgroundColor = data[0].zoneColor;
    promena13.innerHTML = data[0].zoneUpDnEq;
}
fetchDataOnbg();
async function fetchDataVma() {
    const fetchLink = "http://192.168.0.10:2021/vma";
    const data = await fetchApi(fetchLink);
    slMesta14.textContent = Number(data[0].zoneFreeNow);
    popunjenost14.textContent = data[0].zoneOccup + '%';
    lok14.style.backgroundColor = data[0].zoneColor;
    promena14.innerHTML = data[0].zoneUpDnEq;
}
fetchDataVma();
async function fetchDataObi() {
    const fetchLink = "http://192.168.0.10:2021/obi";
    const data = await fetchApi(fetchLink);
    slMesta15.textContent = Number(data[0].zoneFreeNow);
    popunjenost15.textContent = data[0].zoneOccup + '%';
    lok15.style.backgroundColor = data[0].zoneColor;
    promena15.innerHTML = data[0].zoneUpDnEq;
}
fetchDataObi();
async function fetchDataZel() {
    const fetchLink = "http://192.168.0.10:2021/zel";
    const data = await fetchApi(fetchLink);
    slMesta16.textContent = Number(data[0].zoneFreeNow);
    popunjenost16.textContent = data[0].zoneOccup + '%';
    lok16.style.backgroundColor = data[0].zoneColor;
    promena16.innerHTML = data[0].zoneUpDnEq;
}
fetchDataZel();
async function fetchDataMas() {
    const fetchLink = "http://192.168.0.10:2021/mas";
    const data = await fetchApi(fetchLink);
    slMesta17.textContent = Number(data[0].zoneFreeNow);
    popunjenost17.textContent = data[0].zoneOccup + '%';
    lok17.style.backgroundColor = data[0].zoneColor;
    promena17.innerHTML = data[0].zoneUpDnEq;
}
fetchDataMas();
async function fetchDataPio() {
    const fetchLink = "http://192.168.0.10:2021/pio";
    const data = await fetchApi(fetchLink);
    slMesta18.textContent = Number(data[0].zoneFreeNow);
    popunjenost18.textContent = data[0].zoneOccup + '%';
    lok18.style.backgroundColor = data[0].zoneColor;
    promena18.innerHTML = data[0].zoneUpDnEq;
}
fetchDataPio();
async function fetchDataDrak() {
    const fetchLink = "http://192.168.0.10:2021/drak";
    const data = await fetchApi(fetchLink);
    slMesta19.textContent = Number(data[0].zoneFreeNow);
    popunjenost19.textContent = data[0].zoneOccup + '%';
    lok19.style.backgroundColor = data[0].zoneColor;
    promena19.innerHTML = data[0].zoneUpDnEq;
}
fetchDataDrak();
async function fetchDataScn() {
    const fetchLink = "http://192.168.0.10:2021/scn";
    const data = await fetchApi(fetchLink);
    slMesta20.textContent = Number(data[0].zoneFreeNow);
    popunjenost20.textContent = data[0].zoneOccup + '%';
    lok20.style.backgroundColor = data[0].zoneColor;
    promena20.innerHTML = data[0].zoneUpDnEq;
}
fetchDataScn();
async function fetchDataBel() {
    const fetchLink = "http://192.168.0.10:2021/bel";
    const data = await fetchApi(fetchLink);
    slMesta21.textContent = Number(data[0].zoneFreeNow);
    popunjenost21.textContent = data[0].zoneOccup + '%';
    lok21.style.backgroundColor = data[0].zoneColor;
    promena21.innerHTML = data[0].zoneUpDnEq;
}
fetchDataBel();
async function fetchDataAda() {
    const fetchLink = "http://192.168.0.10:2021/ada";
    const data = await fetchApi(fetchLink);
    slMesta22.textContent = Number(data[0].zoneFreeNow);
    popunjenost22.textContent = data[0].zoneOccup + '%';
    lok22.style.backgroundColor = data[0].zoneColor;
    promena22.innerHTML = data[0].zoneUpDnEq;
}
fetchDataAda();
async function fetchDataKap() {
    const fetchLink = "http://192.168.0.10:2021/kap";
    const data = await fetchApi(fetchLink);
    slMesta23.textContent = Number(data[0].zoneFreeNow);
    popunjenost23.textContent = data[0].zoneOccup + '%';
    lok23.style.backgroundColor = data[0].zoneColor;
    promena23.innerHTML = data[0].zoneUpDnEq;
}
fetchDataKap();
async function fetchDataZsnbg() {
    const fetchLink = "http://192.168.0.10:2021/zsnbg";
    const data = await fetchApi(fetchLink);
    slMesta24.textContent = Number(data[0].zoneFreeNow);
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
    fetchDataMk();
    fetchDataDg();
    fetchDataPol();
    fetchDataKam();
    fetchDataVis();
    fetchDataCuk();
    fetchDataBv();
    fetchDataBba();
    fetchDataOnbg();
    fetchDataVma();
    fetchDataObi();
    fetchDataZel();
    fetchDataMas();
    fetchDataPio();
    fetchDataDrak();
    fetchDataScn();
    fetchDataBel();
    fetchDataAda();
    fetchDataKap();
    fetchDataZsnbg();
}, 30000);


// Sensit
const sensitTable = document.querySelector('#sensitTable');

async function fetchSensitData() {
    const fetchLink = "http://192.168.0.10:2021/get46finalSensit";
    const data = await fetchApi(fetchLink);
    // const sensitData = await data.json();
    console.log(data);
    createSensitTable(data);
}
fetchSensitData();

function createSensitTable(data) {
    data.forEach(d => {
        const tr = document.createElement('tr');
        tr.classList.add(`${d.zoneShort}`);
        tr.innerHTML = `
        <th>${d.zoneShort}</th>
        <td>${d.zoneName}</td>
        <td>${d.lokacija}</td>
        <td>${d.ZaDisplej1}</td>
        <td>${d.ZaDisplej2}</td>
        <td>${d.disp1opis}</td>
        <td>${d.disp2opis}</td>
        `;
        sensitTable.appendChild(tr);
    })
}

async function updateTable() {
    // Sensit
    const fetchLink = "http://192.168.0.10:2021/get46finalSensit";
    const data = await fetchApi(fetchLink);
    console.log(data);
    data.forEach(dat => {
        const sensitDisplays = document.querySelectorAll(`.${dat.zoneShort}`);
        sensitDisplays[0].cells[3].innerHTML = dat.ZaDisplej1;
        sensitDisplays[0].cells[4].innerHTML = dat.ZaDisplej2;
    });

    Promise.all([
        fetch('http://192.168.0.10:2021/getAllActiveLocations')
            .then(data => data.json()),
        fetch('http://192.168.0.10:2021/getAllActiveZonesData')
            .then(data => data.json()),
        fetch('http://192.168.0.10:2021/get46finalSensit')
            .then(data => data.json())
    ]).then((dbData) => {
        dbData[0].forEach(dat => {
            const displayCells = document.querySelector(`.${model(dat).locModel}`);
            displayCells.style.backgroundColor = dat.locColor;
            displayCells.cells[2].innerHTML = `${display(dbData, dat).d1}  ${displayValue(dbData, dat).d1}`;
            displayCells.cells[2].style.backgroundColor = `${displayBg(dbData, dat).bg1}`;
            displayCells.cells[3].innerHTML = `${display(dbData, dat).d2}  ${displayValue(dbData, dat).d2}`;
            displayCells.cells[3].style.backgroundColor = `${displayBg(dbData, dat).bg2}`;
            displayCells.cells[4].innerHTML = `${display(dbData, dat).d3}  ${displayValue(dbData, dat).d3}`;
            displayCells.cells[4].style.backgroundColor = `${displayBg(dbData, dat).bg3}`;
            displayCells.cells[5].innerHTML = `${display(dbData, dat).d4}  ${displayValue(dbData, dat).d4}`;
            displayCells.cells[5].style.backgroundColor = `${displayBg(dbData, dat).bg4}`;
            displayCells.cells[6].innerHTML = reverseString(dat.locLastCommTD);
            displayCells.cells[7].innerHTML = `${lastPacket(dbData, dat.locLname, dat.locNumber).icon} &nbsp; <i class="fa fa-car-battery"></i> ${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuNapon} &nbsp; ${thermometer}${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuTemp}`;
            displayCells.cells[7].style.backgroundColor = `${lastPacket(dbData, dat.locLname, dat.locNumber).bg}`;
        });
    })
}
setInterval(updateTable, 30000);


// <td style="background-color: ${lastPacket(dbData, dat.locLname, dat.locNumber).bg};">${lastPacket(dbData, dat.locLname, dat.locNumber).icon} &nbsp; <i class="fa fa-car-battery"></i> ${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuNapon} &nbsp; ${thermometer}${lastPacket(dbData, dat.locLname, dat.locNumber).diagn.accuTemp}</td>