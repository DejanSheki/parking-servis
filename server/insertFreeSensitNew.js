const dbService = require('./dbService');
const db = dbService.getDbServiceInstance();

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
    lot11To22(sensitData)
}
fetchDataL11ToL22();

async function fetchDataL23ToL34() {
    const data = await fetch(`https://belgrade4.nedapparking.com/api/v1/parkingLots?expand=bays`, {
        headers: headers
    });
    const sensitData = await data.json();
    lot23To34(sensitData)
}
fetchDataL23ToL34();



function lot1To6(sensitData) {
    const lot1 = sensitData.find(d => d.name === 'LOT1');
    const baysL1 = lot1.bays.filter(d => d.state === 'Free');
    baysL1.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 1);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot2 = sensitData.find(d => d.name === 'LOT2');
    const baysL2 = lot2.bays.filter(d => d.state === 'Free');
    baysL2.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 2);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot3 = sensitData.find(d => d.name === 'LOT3');
    const baysL3 = lot3.bays.filter(d => d.state === 'Free');
    baysL3.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 3);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot4 = sensitData.find(d => d.name === 'LOT4');
    const baysL4 = lot4.bays.filter(d => d.state === 'Free');
    baysL4.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 4);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot5 = sensitData.find(d => d.name === 'LOT5');
    const baysL5 = lot5.bays.filter(d => d.state === 'Free');
    baysL5.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 5);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot6 = sensitData.find(d => d.name === 'LOT6');
    const baysL6 = lot6.bays.filter(d => d.state === 'Free');
    baysL6.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 6);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}

function lot7To10(sensitData) {
    const lot7 = sensitData.find(d => d.name === 'LOT7');
    const baysL7 = lot7.bays.filter(d => d.state === 'Free');
    baysL7.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 7);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot8 = sensitData.find(d => d.name === 'LOT 8');
    const baysL8 = lot8.bays.filter(d => d.state === 'Free');
    baysL8.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 8);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot9 = sensitData.find(d => d.name === 'LOT9');
    const baysL9 = lot9.bays.filter(d => d.state === 'Free');
    baysL9.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 9);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
    const lot10 = sensitData.find(d => d.name === 'LOT10');
    const baysL10 = lot10.bays.filter(d => d.state === 'Free');
    baysL10.forEach(b => {
        const result = db.sensitFree2(b.id, b.zone.id, 10);
        result
            // .then(data => console.log(data))
            .catch(err => console.log(err));
    });
}
function lot11To22(sensitData) {
    const lot11 = sensitData.find(d => d.name === 'Parking lot 11');
    const baysL11 = lot11.bays.filter(d => d.state === 'Free');
    baysL11.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 11);
    });
    const lot12 = sensitData.find(d => d.name === 'Parking lot 12');
    const baysL12 = lot12.bays.filter(d => d.state === 'Free');
    baysL12.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 12);
    });
    const lot13 = sensitData.find(d => d.name === 'Parking lot 13');
    const baysL13 = lot13.bays.filter(d => d.state === 'Free');
    baysL13.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 13);
    });
    const lot14 = sensitData.find(d => d.name === 'Parking lot 14');
    const baysL14 = lot14.bays.filter(d => d.state === 'Free');
    baysL14.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 14);
    });
    const lot15 = sensitData.find(d => d.name === 'Parking lot 15');
    const baysL15 = lot15.bays.filter(d => d.state === 'Free');
    baysL15.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 15);
    });
    const lot16 = sensitData.find(d => d.name === 'Parking lot 16');
    const baysL16 = lot16.bays.filter(d => d.state === 'Free');
    baysL16.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 16);
    });
    const lot17 = sensitData.find(d => d.name === 'Parking lot 17');
    const baysL17 = lot17.bays.filter(d => d.state === 'Free');
    baysL17.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 17);
    });
    const lot18 = sensitData.find(d => d.name === 'Parking lot 18');
    const baysL18 = lot18.bays.filter(d => d.state === 'Free');
    baysL18.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 18);
    });
    const lot19 = sensitData.find(d => d.name === 'Parking lot 19');
    const baysL19 = lot19.bays.filter(d => d.state === 'Free');
    baysL19.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 19);
    });
    const lot20 = sensitData.find(d => d.name === 'Parking lot 20');
    const baysL20 = lot20.bays.filter(d => d.state === 'Free');
    baysL20.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 20);
    });
    const lot21 = sensitData.find(d => d.name === 'Parking lot 21');
    const baysL21 = lot21.bays.filter(d => d.state === 'Free');
    baysL21.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 21);
    });
    const lot22 = sensitData.find(d => d.name === 'Parking lot 22');
    const baysL22 = lot22.bays.filter(d => d.state === 'Free');
    baysL22.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 22);
    });
}
function lot23To34(sensitData) {
    const lot23 = sensitData.find(d => d.name === 'Parking lot 23');
    const baysL23 = lot23.bays.filter(d => d.state === 'Free');
    baysL23.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 23);
    });
    const lot24 = sensitData.find(d => d.name === 'Parking lot 24');
    const baysL24 = lot24.bays.filter(d => d.state === 'Free');
    baysL24.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 24);
    });
    const lot25 = sensitData.find(d => d.name === 'Parking lot 25');
    const baysL25 = lot25.bays.filter(d => d.state === 'Free');
    baysL25.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 25);
    });
    const lot26 = sensitData.find(d => d.name === 'Parking lot 26');
    const baysL26 = lot26.bays.filter(d => d.state === 'Free');
    baysL26.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 26);
    });
    const lot27 = sensitData.find(d => d.name === 'Parking lot 27');
    const baysL27 = lot27.bays.filter(d => d.state === 'Free');
    baysL27.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 27);
    });
    const lot28 = sensitData.find(d => d.name === 'Parking lot 28');
    const baysL28 = lot28.bays.filter(d => d.state === 'Free');
    baysL28.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 28);
    });
    const lot29 = sensitData.find(d => d.name === 'Parking lot 29');
    const baysL29 = lot29.bays.filter(d => d.state === 'Free');
    baysL29.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 29);
    });
    const lot30 = sensitData.find(d => d.name === 'Parking lot 30');
    const baysL30 = lot30.bays.filter(d => d.state === 'Free');
    baysL30.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 30);
    });
    const lot31 = sensitData.find(d => d.name === 'Parking lot 31');
    const baysL31 = lot31.bays.filter(d => d.state === 'Free');
    baysL31.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 31);
    });
    const lot32 = sensitData.find(d => d.name === 'Parking lot 32');
    const baysL32 = lot32.bays.filter(d => d.state === 'Free');
    baysL32.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 32);
    });
    const lot33 = sensitData.find(d => d.name === 'Parking lot 33');
    const baysL33 = lot33.bays.filter(d => d.state === 'Free');
    baysL33.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 33);
    });
    const lot34 = sensitData.find(d => d.name === 'Parking lot 34');
    const baysL34 = lot34.bays.filter(d => d.state === 'Free');
    baysL34.forEach(b => {
        db.sensitFree2(b.id, b.zone.id, 34);
    });
}
function createTables() {
    const result = db.create31LotZoneSum2();
    result
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
};

function dropTables() {
    const result = db.deleteFromSensitFree2();
    result
        .then(data => {
            // console.log(data);
            const result = db.dropSumTables2();
            result
                .then(data => console.log(data))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
};

function getSensitData() {
    const result = db.getSensitZoneShort();
    result
        .then(data => {
            // console.log(data);
            data.forEach(d => {
                // console.log(d.zoneShort);
                const result = db.getSensitData(d.zoneShort);
                result
                    .then(data => {
                        // console.log(data);
                        display1(data, d.zoneShort);
                        display2(data, d.zoneShort);
                    });
            });
        });
}
function display1(data, zoneShort) {
    let display1 = [];
    const datum = new Date().toLocaleTimeString('sr')
    const zaDisp1 = data[0].zaDisp1;
    const obj = JSON.parse(zaDisp1);
    // if (obj.length > 0) {
    //     obj.forEach(el => {
    //         if (el.vremeOd <= datum && el.vremeDo >= datum) {
    //             let zonesByTime = el.zone;
    //             zonesByTime.forEach(e => {
    //                 const result = db.get31LotZoneSum(e.lotNo);
    //                 result
    //                     .then(data => {
    //                         let a = e.zoneNo;
    //                         let b = Array.from(a.split(','), Number);;
    //                         const res = data.filter(i => b.includes(i.zone));
    //                         // console.log(res);
    //                         res.forEach(r => {
    //                             if (!undefined) {
    //                                 display1.push(r.ukupno);
    //                             }
    //                         })
    //                         // console.log('Display1: ' + display1);
    //                         if (display1.length > 0) {
    //                             const zaDisp1val = display1.reduce((acc, curr) => parseInt(curr) + parseInt(acc), 0);
    //                             // console.log(zaDisp1val);
    //                             db.updateSensitZoneDisplay1(zaDisp1val, zoneShort);
    //                         }
    //                         if (display1.length === 0) {
    //                             const zaDisp1val = 0;
    //                             db.updateSensitZoneDisplay1(zaDisp1val, zoneShort);
    //                         }
    //                     });
    //             });
    //         }
    //     });
    // } else {
    //     const zaDisp1val = null;
    //     db.updateSensitZoneDisplay1(zaDisp1val, zoneShort);
    // }
    obj.forEach(el => {
        if (el.vremeOd <= datum && el.vremeDo >= datum) {
            let zonesByTime = el.zone;
            zonesByTime.forEach(e => {
                const result = db.get31LotZoneSum(e.lotNo);
                result
                    .then(data => {
                        let a = e.zoneNo;
                        let b = Array.from(a.split(','), Number);;
                        const res = data.filter(i => b.includes(i.zone));
                        // console.log(res);
                        res.forEach(r => {
                            if (!undefined) {
                                display1.push(r.ukupno);
                            }
                        })
                        // console.log('Display1: ' + display1);
                        if (display1.length > 0) {
                            const zaDisp1val = display1.reduce((acc, curr) => parseInt(curr) + parseInt(acc), 0);
                            // console.log(zaDisp1val);
                            db.updateSensitZoneDisplay1(zaDisp1val, zoneShort);
                        }
                        if (display1.length === 0) {
                            const zaDisp1val = 0;
                            db.updateSensitZoneDisplay1(zaDisp1val, zoneShort);
                        }
                    });
            });
        }
    });
}
function display2(data, zoneShort) {
    let display2 = [];
    const datum = new Date().toLocaleTimeString('sr')
    const zaDisp2 = data[0].zaDisp2;
    // console.log(data[0]);
    const obj = JSON.parse(zaDisp2);
    // if (obj.length > 0) {
    //     obj.forEach(el => {
    //         if (el.vremeOd <= datum && el.vremeDo >= datum) {
    //             let zonesByTime = el.zone;
    //             zonesByTime.forEach(e => {
    //                 // console.log(e);
    //                 const result = db.get31LotZoneSum(e.lotNo, e.zoneNo);
    //                 result
    //                     .then(data => {
    //                         // console.log(data);
    //                         let a = e.zoneNo;
    //                         let b = Array.from(a.split(','), Number);
    //                         const res = data.filter(i => b.includes(i.zone));
    //                         // console.log(a);
    //                         // console.log(b);
    //                         // console.log(res);
    //                         res.forEach(r => {
    //                             ;
    //                             if (!undefined) {
    //                                 display2.push(r.ukupno);
    //                             }
    //                         })
    //                         if (display2.length > 0) {
    //                             const zaDisp2val = display2.reduce((acc, curr) => parseInt(curr) + parseInt(acc), 0);
    //                             // console.log('zaDisp2val  ' + zaDisp2val + '  zoneShort  ' + zoneShort + ' display2 ' + display2);
    //                             db.updateSensitZoneDisplay2(zaDisp2val, zoneShort);
    //                         } if (display2.length === 0) {
    //                             const zaDisp2val = 0;
    //                             db.updateSensitZoneDisplay2(zaDisp2val, zoneShort);
    //                         }
    //                     });
    //             });
    //         }
    //     });
    // } else {
    //     const zaDisp2val = null;
    //     db.updateSensitZoneDisplay2(zaDisp2val, zoneShort);
    // }
    obj.forEach(el => {
        if (el.vremeOd <= datum && el.vremeDo >= datum) {
            let zonesByTime = el.zone;
            zonesByTime.forEach(e => {
                const result = db.get31LotZoneSum(e.lotNo);
                result
                    .then(data => {
                        let a = e.zoneNo;
                        let b = Array.from(a.split(','), Number);;
                        const res = data.filter(i => b.includes(i.zone));
                        console.log(res);
                        res.forEach(r => {
                            if (!undefined) {
                                display2.push(r.ukupno);
                            }
                        })
                        // console.log('Display2: ' + display2);
                        if (display2.length > 0) {
                            const zaDisp2val = display2.reduce((acc, curr) => parseInt(curr) + parseInt(acc), 0);
                            console.log('tttt ' + zaDisp2val);
                            db.updateSensitZoneDisplay2(zaDisp2val, zoneShort);
                        } if (display2.length === 0) {
                            const zaDisp2val = 0;
                            db.updateSensitZoneDisplay2(zaDisp2val, zoneShort);
                        }
                    });
            });
        }
    });
}


setTimeout(() => {
    createTables();
}, 5000);

setTimeout(() => {
    getSensitData();
}, 10000);

setTimeout(() => {
    dropTables();
}, 30000);

setInterval(() => {
    fetchDataL1ToL6();
    fetchDataL7ToL10();
    fetchDataL11ToL22();
    fetchDataL23ToL34();
    setTimeout(() => {
        createTables();
    }, 5000);

    setTimeout(() => {
        getSensitData();
    }, 10000);

    setTimeout(() => {
        dropTables();
    }, 30000);
}, 55000);