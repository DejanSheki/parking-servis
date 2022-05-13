const dbService = require('./dbService');

const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config();

const password = process.env.SENSIT_PASSWORD
const username = process.env.SENSIT_USER
const headers = {
    'Authorization': 'Basic ' + Buffer.from(username + ":" + password).toString('base64')
}
async function fetchDataL1ToL6() {
    const data = await fetch(`https://belgrade.nedapparking.com/api/v1/parkingLots?expand=bays`, {
        headers: headers
    });
    const sensitData = await data.json();
    // console.log(sensitData);
    lot1To6(sensitData);
}
fetchDataL1ToL6();

async function fetchDataL7ToL10() {
    const data = await fetch(`https://belgrade2.nedapparking.com/api/v1/parkingLots?expand=bays`, {
        headers: headers
    });
    const sensitData = await data.json();
    // console.log(sensitData);
    lot7To10(sensitData)
}
fetchDataL7ToL10();

function lot1To6(sensitData) {
    const lot1 = sensitData.find(d => d.name === 'LOT1');
    const baysL1 = lot1.bays.filter(d => d.state === 'Free');
    baysL1.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot1`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 1);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot2 = sensitData.find(d => d.name === 'LOT2');
    const baysL2 = lot2.bays.filter(d => d.state === 'Free');
    baysL2.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot2`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 2);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot3 = sensitData.find(d => d.name === 'LOT3');
    const baysL3 = lot3.bays.filter(d => d.state === 'Free');
    baysL3.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot3`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 3);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot4 = sensitData.find(d => d.name === 'LOT4');
    const baysL4 = lot4.bays.filter(d => d.state === 'Free');
    baysL4.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot4`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 4);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot5 = sensitData.find(d => d.name === 'LOT5');
    const baysL5 = lot5.bays.filter(d => d.state === 'Free');
    baysL5.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot5`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 5);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot6 = sensitData.find(d => d.name === 'LOT6');
    const baysL6 = lot6.bays.filter(d => d.state === 'Free');
    baysL6.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot6`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 6);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}

function lot7To10(sensitData) {
    const lot7 = sensitData.find(d => d.name === 'LOT7');
    const baysL7 = lot7.bays.filter(d => d.state === 'Free');
    baysL7.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot7`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 7);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot8 = sensitData.find(d => d.name === 'LOT 8');
    const baysL8 = lot8.bays.filter(d => d.state === 'Free');
    baysL8.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot8`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 8);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot9 = sensitData.find(d => d.name === 'LOT9');
    const baysL9 = lot9.bays.filter(d => d.state === 'Free');
    baysL9.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot9`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 9);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot10 = sensitData.find(d => d.name === 'LOT10');
    const baysL10 = lot10.bays.filter(d => d.state === 'Free');
    baysL10.forEach(b => {
        console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot10`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 10);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}

setTimeout(() => {
    const db = dbService.getDbServiceInstance();
    const result = db.create31LotZoneSum();
    result
        .then(data => {
            console.log(data);
            const db = dbService.getDbServiceInstance();
            const result = db.create33dispSum1();
            result
                .then(data => {
                    console.log(data);
                    const db = dbService.getDbServiceInstance();
                    const result = db.create34dispSum2();
                    result
                        .then(data => {
                            console.log(data);
                            const db = dbService.getDbServiceInstance();
                            const result = db.create35unionSum();
                            result
                                .then(data => {
                                    console.log(data);
                                    const db = dbService.getDbServiceInstance();
                                    const result = db.create36unionSum();
                                    result
                                        .then(data => {
                                            console.log(data);
                                            const db = dbService.getDbServiceInstance();
                                            const result = db.create43dispSum1All();
                                            result
                                                .then(data => {
                                                    console.log(data);
                                                    const db = dbService.getDbServiceInstance();
                                                    const result = db.create44dispSum2All();
                                                    result
                                                        .then(data => {
                                                            console.log(data);
                                                            const db = dbService.getDbServiceInstance();
                                                            const result = db.create45unijaSumAll();
                                                            result
                                                                .then(data => {
                                                                    console.log(data);
                                                                    const db = dbService.getDbServiceInstance();
                                                                    const result = db.create46groupSumAll();
                                                                    result
                                                                        .then(data => {
                                                                            console.log(data);
                                                                        })
                                                                })
                                                        })
                                                })
                                        })
                                })
                        })
                })
        })
        .catch(err => console.log(err));
}, 1000);

setTimeout(() => {
    const db = dbService.getDbServiceInstance();
    const result = db.deleteFromSensitFree();
    result
        .then(data => {
            console.log(data);
            const db = dbService.getDbServiceInstance();
            const result = db.dropSumTables();
            result
                .then(data => console.log(data))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
}, 30000);

// pokusaj 1
// Promise.all([
//     fetch(`https://belgrade.nedapparking.com/api/v1/parkingLots?expand=bays`, {
//         headers: headers
//     })
//         .then(data => data.json()),
    // fetch(`https://belgrade2.nedapparking.com/api/v1/parkingLots?expand=bays`, {
    //     headers: headers
    // })
    //     .then(data => data.json()),
    // fetch(`https://belgrade3.nedapparking.com/api/v1/parkingLots?expand=bays`, {
    //     headers: headers
    // })
    //     .then(data => data.json()),
    // fetch(`https://belgrade4.nedapparking.com/api/v1/parkingLots?expand=bays`, {
    //     headers: headers
    // })
    //     .then(data => data.json())
// ]).then(sensitData => {
//     console.log(sensitData)[0];

// })
// const lotsArr = sensitData.flat();
