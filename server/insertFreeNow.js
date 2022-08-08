const fileService = require('./fileService');
const dbService = require('./dbService');
const db = dbService.getDbServiceInstance();
// Kalkulator procenta popunjenosti
function percentageCalculator(zauzeto, kapacitet) {
    let result = ((zauzeto / kapacitet) * 100).toFixed();
    return result;
}

// Boja prema broju sl. mesta
function bgColor(popunjenost) {
    if (popunjenost >= 90 && popunjenost < 100) {
        return 'rgb(255, 151, 151)';
    } else if (popunjenost > 50 && popunjenost < 90) {
        return 'rgb(247, 247, 136)';
    } else if (popunjenost <= 50) {
        return 'rgb(208, 233, 198)';
    } else if (popunjenost = 100) {
        return 'rgb(242, 67, 67)';
    }
}

const checkLastFreeNow = (zoneShort) => {
    // const db = dbService.getDbServiceInstance();
    const result1 = db.getZonesFreeNow(zoneShort);
    return result1
        .then(data => {
            const lastFreeObj = {
                zoneMaxFree: data[0].zoneMaxFree,
                lastFree: data[0].zoneFreeNow
            }
            return lastFreeObj;
        })
        .catch(err => console.log(err))
}

async function insertZoneFreeNow(zoneShort) {
    const check = await checkLastFreeNow(zoneShort);
    const file = fileService.getFileServiceInstance();
    const result = file.locations(zoneShort);
    result
        .then(data => {
            let slMesta = data.split('Y');
            let freeNow;
            let zoneUpDnEq;
            if (zoneShort === 'ada') {
                freeNow = slMesta[1] + slMesta[2] + slMesta[3] + slMesta[4].replace(/(\r\n|\n|\r)/gm, "");
            } else {
                freeNow = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
            }
            if (check.lastFree > Number(freeNow)) {
                zoneUpDnEq = '&#x25BC;';
                console.log('Manje mesta!');
            } else if (check.lastFree < Number(freeNow)) {
                zoneUpDnEq = '&#9650;'
                console.log('Vise mesta!');
            } else {
                zoneUpDnEq = '=';
                console.log('Nema promene!');
            }
            let occupiedSpace = check.zoneMaxFree - freeNow;
            let zoneOccup = percentageCalculator(occupiedSpace, check.zoneMaxFree);
            let zoneColor = bgColor(zoneOccup);
            // const db = dbService.getDbServiceInstance();
            const result1 = db.insertFreeNowData(freeNow, zoneOccup, zoneColor, zoneUpDnEq, zoneShort);
            result1
                .then(data => console.log(data.message))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}

const interval = setInterval(() => {
    insertZoneFreeNow('vuk');
    insertZoneFreeNow('sla');
    insertZoneFreeNow('mgm');
    insertZoneFreeNow('cvp');
    insertZoneFreeNow('mk');
    insertZoneFreeNow('dg');
    insertZoneFreeNow('pol');
    insertZoneFreeNow('kam');
    insertZoneFreeNow('vis');
    insertZoneFreeNow('cuk');
    insertZoneFreeNow('bv');
    insertZoneFreeNow('bba');
    insertZoneFreeNow('onbg');
    insertZoneFreeNow('vma');
    insertZoneFreeNow('obi');
    insertZoneFreeNow('zel');
    insertZoneFreeNow('mas');
    insertZoneFreeNow('pio');
    insertZoneFreeNow('drak');
    insertZoneFreeNow('scn');
    insertZoneFreeNow('bel');
    insertZoneFreeNow('ada');
    insertZoneFreeNow('kap');
    insertZoneFreeNow('zsnbg');
}, 30000);

async function insertFreeNowDataStatistic(zoneShort) {
    const check = await checkLastFreeNow(zoneShort);
    console.log(check.zoneMaxFree);
    const file = fileService.getFileServiceInstance();
    const result = file.locations(zoneShort);
    result
        .then(data => {
            let slMesta = data.split('Y');
            let freeNow;
            if (zoneShort === 'ada') {
                freeNow = slMesta[1] + slMesta[2] + slMesta[3] + slMesta[4].replace(/(\r\n|\n|\r)/gm, "");
            } else {
                freeNow = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
            }
            // const db = dbService.getDbServiceInstance();
            const result1 = db.insertFreeNowDataStatistic(zoneShort, check.zoneMaxFree, freeNow);
            result1
                .then(data => console.log(data))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}


const intervalStatistics = setInterval(() => {
    insertFreeNowDataStatistic('vuk');
    insertFreeNowDataStatistic('sla');
    insertFreeNowDataStatistic('mgm');
    insertFreeNowDataStatistic('cvp');
    insertFreeNowDataStatistic('mk');
    insertFreeNowDataStatistic('dg');
    insertFreeNowDataStatistic('pol');
    insertFreeNowDataStatistic('kam');
    insertFreeNowDataStatistic('vis');
    insertFreeNowDataStatistic('cuk');
    insertFreeNowDataStatistic('bv');
    insertFreeNowDataStatistic('bba');
    insertFreeNowDataStatistic('onbg');
    insertFreeNowDataStatistic('vma');
    insertFreeNowDataStatistic('obi');
    insertFreeNowDataStatistic('zel');
    insertFreeNowDataStatistic('mas');
    insertFreeNowDataStatistic('pio');
    insertFreeNowDataStatistic('drak');
    insertFreeNowDataStatistic('scn');
    insertFreeNowDataStatistic('bel');
    insertFreeNowDataStatistic('ada');
    insertFreeNowDataStatistic('kap');
    insertFreeNowDataStatistic('zsnbg');
}, 30 * 60 * 1000);
