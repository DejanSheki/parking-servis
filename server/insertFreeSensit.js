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

async function fetchDataL11ToL22() {
    const data = await fetch(`https://belgrade3.nedapparking.com/api/v1/parkingLots?expand=bays`, {
        headers: headers
    });
    const sensitData = await data.json();
    // console.log(sensitData);
    lot11To22(sensitData)
}
fetchDataL11ToL22();

function lot1To6(sensitData) {
    const lot1 = sensitData.find(d => d.name === 'LOT1');
    const baysL1 = lot1.bays.filter(d => d.state === 'Free');
    baysL1.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot1`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 1);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot2 = sensitData.find(d => d.name === 'LOT2');
    const baysL2 = lot2.bays.filter(d => d.state === 'Free');
    baysL2.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot2`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 2);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot3 = sensitData.find(d => d.name === 'LOT3');
    const baysL3 = lot3.bays.filter(d => d.state === 'Free');
    baysL3.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot3`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 3);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot4 = sensitData.find(d => d.name === 'LOT4');
    const baysL4 = lot4.bays.filter(d => d.state === 'Free');
    baysL4.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot4`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 4);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot5 = sensitData.find(d => d.name === 'LOT5');
    const baysL5 = lot5.bays.filter(d => d.state === 'Free');
    baysL5.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot5`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 5);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot6 = sensitData.find(d => d.name === 'LOT6');
    const baysL6 = lot6.bays.filter(d => d.state === 'Free');
    baysL6.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot6`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 6);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}

function lot7To10(sensitData) {
    const lot7 = sensitData.find(d => d.name === 'LOT7');
    const baysL7 = lot7.bays.filter(d => d.state === 'Free');
    baysL7.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot7`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 7);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot8 = sensitData.find(d => d.name === 'LOT 8');
    const baysL8 = lot8.bays.filter(d => d.state === 'Free');
    baysL8.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot8`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 8);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot9 = sensitData.find(d => d.name === 'LOT9');
    const baysL9 = lot9.bays.filter(d => d.state === 'Free');
    baysL9.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot9`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 9);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot10 = sensitData.find(d => d.name === 'LOT10');
    const baysL10 = lot10.bays.filter(d => d.state === 'Free');
    baysL10.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot10`);
        const db = dbService.getDbServiceInstance();
        const result = db.sensitFree(b.id, b.zone.id, 10);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}
function lot11To22(sensitData) {
    const lot11 = sensitData.find(d => d.name === 'Parking lot 11');
    const baysL11 = lot11.bays.filter(d => d.state === 'Free');
    baysL11.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot11`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 11);
    });
    const lot12 = sensitData.find(d => d.name === 'Parking lot 12');
    const baysL12 = lot12.bays.filter(d => d.state === 'Free');
    baysL12.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot12`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 12);
    });
    const lot13 = sensitData.find(d => d.name === 'Parking lot 13');
    const baysL13 = lot13.bays.filter(d => d.state === 'Free');
    baysL13.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot13`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 13);
    });
    const lot14 = sensitData.find(d => d.name === 'Parking lot 14');
    const baysL14 = lot14.bays.filter(d => d.state === 'Free');
    baysL14.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot14`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 14);
    });
    const lot15 = sensitData.find(d => d.name === 'Parking lot 15');
    const baysL15 = lot15.bays.filter(d => d.state === 'Free');
    baysL15.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot15`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 15);
    });
    const lot16 = sensitData.find(d => d.name === 'Parking lot 16');
    const baysL16 = lot16.bays.filter(d => d.state === 'Free');
    baysL16.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot16`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 16);
    });
    const lot17 = sensitData.find(d => d.name === 'Parking lot 17');
    const baysL17 = lot17.bays.filter(d => d.state === 'Free');
    baysL17.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot17`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 17);
    });
    const lot18 = sensitData.find(d => d.name === 'Parking lot 18');
    const baysL18 = lot18.bays.filter(d => d.state === 'Free');
    baysL18.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot18`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 18);
    });
    const lot19 = sensitData.find(d => d.name === 'Parking lot 19');
    const baysL19 = lot19.bays.filter(d => d.state === 'Free');
    baysL19.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot19`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 19);
    });
    const lot20 = sensitData.find(d => d.name === 'Parking lot 20');
    const baysL20 = lot20.bays.filter(d => d.state === 'Free');
    baysL20.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot20`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 20);
    });
    const lot21 = sensitData.find(d => d.name === 'Parking lot 21');
    const baysL21 = lot21.bays.filter(d => d.state === 'Free');
    baysL21.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot21`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 21);
    });
    const lot22 = sensitData.find(d => d.name === 'Parking lot 22');
    const baysL22 = lot22.bays.filter(d => d.state === 'Free');
    baysL22.forEach(b => {
        // console.log(`Bay: ${b.id}, Zone: ${b.zone.id}, Lot22`);
        const db = dbService.getDbServiceInstance();
        db.sensitFree(b.id, b.zone.id, 22);
    });
}

function createTables() {
    const db = dbService.getDbServiceInstance();
    const result = db.create31LotZoneSum();
    result
        .then(data => {
            // console.log(data);
            const db = dbService.getDbServiceInstance();
            const result = db.create33dispSum1();
            result
                .then(data => {
                    // console.log(data);
                    const db = dbService.getDbServiceInstance();
                    const result = db.create34dispSum2();
                    result
                        .then(data => {
                            // console.log(data);
                            const db = dbService.getDbServiceInstance();
                            const result = db.create35unionSum();
                            result
                                .then(data => {
                                    // console.log(data);
                                    const db = dbService.getDbServiceInstance();
                                    const result = db.create36unionSum();
                                    result
                                        .then(data => {
                                            // console.log(data);
                                            const db = dbService.getDbServiceInstance();
                                            const result = db.create43dispSum1All();
                                            result
                                                .then(data => {
                                                    // console.log(data);
                                                    const db = dbService.getDbServiceInstance();
                                                    const result = db.create44dispSum2All();
                                                    result
                                                        .then(data => {
                                                            // console.log(data);
                                                            const db = dbService.getDbServiceInstance();
                                                            const result = db.create45unijaSumAll();
                                                            result
                                                                .then(data => {
                                                                    // console.log(data);
                                                                    const db = dbService.getDbServiceInstance();
                                                                    const result = db.create46groupSumAll();
                                                                    result
                                                                        .then(data => {
                                                                            // console.log(data);
                                                                            const db = dbService.getDbServiceInstance();
                                                                            const result = db.get46groupSumAllData();
                                                                            result
                                                                                .then(data => {
                                                                                    console.log(data);
                                                                                    data.forEach(d => {
                                                                                        console.log(d.zoneShort);
                                                                                        if (d.ZaDisplej1 === null) {
                                                                                            d.ZaDisplej1 = 0;
                                                                                        }
                                                                                        const db = dbService.getDbServiceInstance();
                                                                                        const result = db.update46final(d.zoneShort, d.lokacija, d.SlocOpisLokacije, d.disp1opis, d.disp2opis, d.ZaDisplej1, d.ZaDisplej2, d.disp1tip, d.disp2tip);
                                                                                        result
                                                                                            .then(data => {
                                                                                                // console.log(data);
                                                                                            })
                                                                                    })
                                                                                })
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
};

function dropTables() {
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
};

setTimeout(() => {
    createTables();
}, 1000);
setTimeout(() => {
    dropTables();
}, 30000);

setInterval(() => {
    fetchDataL1ToL6();
    fetchDataL7ToL10();
    fetchDataL11ToL22();
    setTimeout(() => {
        createTables();
    }, 1000);
    setTimeout(() => {
        dropTables();
    }, 30000);
}, 55000);

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
