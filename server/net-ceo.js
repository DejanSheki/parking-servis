const net = require('net');
const port = 2020;
let podaciSaTable = '';
const fileService = require('./fileService');
const dbService = require('./dbService');
// let sendEmail = require('./email');
const fs = require('fs');

const server = net.createServer((socket) => {
    console.log(`${Date()} Client connected.. ${socket.remoteAddress} : ${socket.remotePort}`);
    socket.on('data', (data) => {
        podaciSaTable = [data.toString()]; // Ceo paket string
        let tabla = podaciSaTable[0].split(','); //radi na serveru, sada i kod mene
        // let tabla = JSON.parse(podaciSaTable).split(','); //radi kod mene
        let objTabla = {
            vrstaPaketa: tabla[0],
            adresa: tabla[1],
            displej1: tabla[2],
            displej2: tabla[3],
            displej3: tabla[4],
            displej4: tabla[5],
            osvetljenje: tabla[6],
            accuNapon: tabla[7],
            accuTemp: tabla[8],
            in220: tabla[9],
            inBack1: tabla[10],
            inBack2: tabla[11],
            inBack3: tabla[12],
            inBack4: tabla[13],
            osvetljenjeHi: tabla[14],
            osvetljenjeLo: tabla[15],
            accuCutOff: tabla[16],
            offTimeSec: tabla[17],
            rele220v: tabla[18],
            releAccu: tabla[19],
            releOff: tabla[20],
            testTimerSec: tabla[21],
            test: tabla[22],
            pow: tabla[23],
            rst: tabla[24],
            pck: tabla[25],
            ses: tabla[26],
            cid: tabla[27],
            iPa: tabla[28],
            rev: tabla[29],
            ver: tabla[30],
            sgn: tabla[31],
            checksum: tabla[32],
        }
        // console.log(objTabla);
        const db = dbService.getDbServiceInstance();
        const result1 = db.updateLocatiOnLastPacket(podaciSaTable[0], objTabla.displej1, objTabla.displej2, objTabla.displej3, objTabla.displej4, objTabla.adresa);
        result1
            .then(data => console.log('Last packet update: ' + data))
            .catch(err => console.log(err));

        const crcData = CRC.ToCRC16(`${objTabla.vrstaPaketa},${objTabla.adresa},${objTabla.displej1},${objTabla.displej2},${objTabla.displej3},${objTabla.displej4},${objTabla.osvetljenje},${objTabla.accuNapon},${objTabla.accuTemp},${objTabla.in220},${objTabla.inBack1},${objTabla.inBack2},${objTabla.inBack3},${objTabla.inBack4},${objTabla.osvetljenjeHi},${objTabla.osvetljenjeLo},${objTabla.accuCutOff},${objTabla.offTimeSec},${objTabla.rele220v},${objTabla.releAccu},${objTabla.releOff},${objTabla.testTimerSec},${objTabla.test},${objTabla.pow},${objTabla.rst},${objTabla.pck},${objTabla.ses},${objTabla.cid},${objTabla.iPa},${objTabla.rev},${objTabla.ver},${objTabla.sgn},`);
        // console.log(crcData);

        // pocetak novog dela
        if (objTabla.checksum === crcData) {
            if (objTabla.adresa === '001') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'pio', 'zel', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej4 = data.find(dat => dat.zoneShort === 'Obi');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '002') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'dg');
                dbResult
                    .then(data => {
                        console.log(data);
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Dg');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '003') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mk', 'dg', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej2 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej3 = data.find(dat => dat.zoneShort === 'Obi');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '004') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mgm', 'mk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mgm');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mk');
                        let objSlanje = {
                            displej1: '0',
                            displej2: displej1.zoneFreeNow,
                            displej3: displej2.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '005') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '006') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '007') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'pio', 'mk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '008') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('bba', 'pio');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'BBa');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '009') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vuk', 'pio', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Obi');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '010') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('sla', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '011') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'vuk', 'vis', 'BV');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vis');
                        const displej4 = data.find(dat => dat.zoneShort === 'BV');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '012') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pio', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '013') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('sla');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Sla');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '015') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('sla', 'pio', 'mas', 'zel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej4 = data.find(dat => dat.zoneShort === 'Zel');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '016') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'zel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '017') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Vuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '018') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('bba');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'BBa');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '019') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mgm', 'sla', 'dg', 'kam');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mgm');
                        const displej2 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej3 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej4 = data.find(dat => dat.zoneShort === 'Kam');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '020') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mk', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mgm');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '021' || objTabla.adresa === '022') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('cvp');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'CvP');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '024') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('drak');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Drak');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '025') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('sla', 'pio', 'mas', 'zel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej4 = data.find(dat => dat.zoneShort === 'Zel');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '026') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pio', 'mas', 'vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '027') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mgm');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '028') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'sla');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Sla');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '029') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'zel', 'dg', 'kam');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej4 = data.find(dat => dat.zoneShort === 'Kam');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '030') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('scn');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Scn');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '032' || objTabla.adresa === '033' || objTabla.adresa === '034') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vuk', 'bv', 'vis');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej2 = data.find(dat => dat.zoneShort === 'BV');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vis');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '035' || objTabla.adresa === '036') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vis', 'bv');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Vis');
                        const displej2 = data.find(dat => dat.zoneShort === 'BV');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '037') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'kam', 'drak', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej3 = data.find(dat => dat.zoneShort === 'Drak');
                        const displej4 = data.find(dat => dat.zoneShort === 'Obi');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '040') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mgm', 'mk', 'pio', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mgm');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej4 = data.find(dat => dat.zoneShort === 'Obi');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '041') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'mas', 'vuk', 'bba');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej4 = data.find(dat => dat.zoneShort === 'BBa');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '042') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('bba', 'vuk', 'sla', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'BBa');
                        const displej2 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mas');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '043') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pol', 'pio', 'obi', 'mk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pol');
                        const displej2 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej3 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mk');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '044') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'obi', 'pol');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej3 = data.find(dat => dat.zoneShort === 'Pol');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '045' || objTabla.adresa === '046' || objTabla.adresa === '047') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('cuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Cuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '048') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('kam', 'dg', 'drak', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej2 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej3 = data.find(dat => dat.zoneShort === 'Drak');
                        const displej4 = data.find(dat => dat.zoneShort === 'Obi');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '049') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pio', 'zel', 'mk', 'obi');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej4 = data.find(dat => dat.zoneShort === 'Obi');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '050') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'mk', 'kam', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mgm');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '051') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mas', 'bv', 'sla', 'vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej2 = data.find(dat => dat.zoneShort === 'BV');
                        const displej3 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej4 = data.find(dat => dat.zoneShort === 'Vuk');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '052') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('drak', 'zel', 'kam', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Drak');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mas');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '053' || objTabla.adresa === '054' || objTabla.adresa === '055') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vma');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'VMA');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '056' || objTabla.adresa === '057' || objTabla.adresa === '058') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('onbg');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'ONBG');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '059') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'mk', 'zel', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mgm');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '060') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'obi', 'mk', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mgm');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '061') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'mas', 'pio', 'bv');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej3 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej4 = data.find(dat => dat.zoneShort === 'BV');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '062') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('mk', 'obi', 'sla', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej3 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mas');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '063') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'mas', 'vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '065') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('kam', 'zel', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mas');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '066') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('dg', 'mk', 'scn', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Dg');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Scn');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mgm');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '068') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('Vis', 'BV', 'Vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Vis');
                        const displej2 = data.find(dat => dat.zoneShort === 'BV');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '069') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('sla', 'zel', 'kam', 'drak');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej4 = data.find(dat => dat.zoneShort === 'Drak');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '070') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('drak', 'Sla', 'Vuk');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Drak');
                        const displej2 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej3 = data.find(dat => dat.zoneShort === 'Vuk');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '071') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('kam', 'mas', 'drak');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Kam');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej3 = data.find(dat => dat.zoneShort === 'Drak');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '072' || objTabla.adresa === '073') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('cvp');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'CvP');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '074') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pio', 'vuk', 'mas', 'mgm');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej2 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej3 = data.find(dat => dat.zoneShort === 'Mas');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mgm');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '075') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vuk', 'sla', 'pio', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Vuk');
                        const displej2 = data.find(dat => dat.zoneShort === 'Sla');
                        const displej3 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mas');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '076') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('pio', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej2 = data.find(dat => dat.zoneShort === 'Mas');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '077') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'zel', 'scn', 'bel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Scn');
                        const displej4 = data.find(dat => dat.zoneShort === 'Bel');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '078') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('bel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Bel');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: '0',
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '079') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('scn', 'bel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Scn');
                        const displej2 = data.find(dat => dat.zoneShort === 'Bel');
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '080') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('zel', 'obi', 'scn', 'bel');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej2 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej3 = data.find(dat => dat.zoneShort === 'Scn');
                        const displej4 = data.find(dat => dat.zoneShort === 'Bel');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '081' || objTabla.adresa === '082') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('obi', 'zel', 'pio', 'mas');
                dbResult
                    .then(data => {
                        const displej1 = data.find(dat => dat.zoneShort === 'Obi');
                        const displej2 = data.find(dat => dat.zoneShort === 'Zel');
                        const displej3 = data.find(dat => dat.zoneShort === 'Pio');
                        const displej4 = data.find(dat => dat.zoneShort === 'Mas');
                        console.log(data);
                        let objSlanje = {
                            displej1: displej1.zoneFreeNow,
                            displej2: displej2.zoneFreeNow,
                            displej3: displej3.zoneFreeNow,
                            displej4: displej4.zoneFreeNow,
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                        });
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '088') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('obi', 'dg');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: '0',
                            displej4: '0',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        // console.log(objSlanje);
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                            // checksum: crcData
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            }
            else if (objTabla.adresa === '017') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mas', 'vma');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: '003',
                            displej4: '004',
                            osvetljenjeHi: '0700',
                            osvetljenjeLo: '0600',
                            accuCutOff: '0500',
                            testTimerSec: '0000',
                            test: '0',
                        }
                        // console.log(objSlanje);
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                            // checksum: crcData
                        });
                        console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else {
                console.log('Nema!');
                socket.write('{-09,-09,-09,-09,0700,0600,0500,0000,0,362B}');
                socket.end();
                socket.destroy();
            }
        } else {
            console.log('Data missing!!!');
        }
        // kraj novog dela
    });
    socket.on('end', () => {
        console.log('Client disconnected...')
    });
});

server.listen(port, () => {
    console.log(`Opend server.... ${port}`);
});


var CRC = {};

CRC._auchCRCHi = [
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40, 0x00, 0xC1, 0x81, 0x40,
    0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0, 0x80, 0x41, 0x00, 0xC1,
    0x81, 0x40, 0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41,
    0x00, 0xC1, 0x81, 0x40, 0x01, 0xC0, 0x80, 0x41, 0x01, 0xC0,
    0x80, 0x41, 0x00, 0xC1, 0x81, 0x40
];
CRC._auchCRCLo = [
    0x00, 0xC0, 0xC1, 0x01, 0xC3, 0x03, 0x02, 0xC2, 0xC6, 0x06,
    0x07, 0xC7, 0x05, 0xC5, 0xC4, 0x04, 0xCC, 0x0C, 0x0D, 0xCD,
    0x0F, 0xCF, 0xCE, 0x0E, 0x0A, 0xCA, 0xCB, 0x0B, 0xC9, 0x09,
    0x08, 0xC8, 0xD8, 0x18, 0x19, 0xD9, 0x1B, 0xDB, 0xDA, 0x1A,
    0x1E, 0xDE, 0xDF, 0x1F, 0xDD, 0x1D, 0x1C, 0xDC, 0x14, 0xD4,
    0xD5, 0x15, 0xD7, 0x17, 0x16, 0xD6, 0xD2, 0x12, 0x13, 0xD3,
    0x11, 0xD1, 0xD0, 0x10, 0xF0, 0x30, 0x31, 0xF1, 0x33, 0xF3,
    0xF2, 0x32, 0x36, 0xF6, 0xF7, 0x37, 0xF5, 0x35, 0x34, 0xF4,
    0x3C, 0xFC, 0xFD, 0x3D, 0xFF, 0x3F, 0x3E, 0xFE, 0xFA, 0x3A,
    0x3B, 0xFB, 0x39, 0xF9, 0xF8, 0x38, 0x28, 0xE8, 0xE9, 0x29,
    0xEB, 0x2B, 0x2A, 0xEA, 0xEE, 0x2E, 0x2F, 0xEF, 0x2D, 0xED,
    0xEC, 0x2C, 0xE4, 0x24, 0x25, 0xE5, 0x27, 0xE7, 0xE6, 0x26,
    0x22, 0xE2, 0xE3, 0x23, 0xE1, 0x21, 0x20, 0xE0, 0xA0, 0x60,
    0x61, 0xA1, 0x63, 0xA3, 0xA2, 0x62, 0x66, 0xA6, 0xA7, 0x67,
    0xA5, 0x65, 0x64, 0xA4, 0x6C, 0xAC, 0xAD, 0x6D, 0xAF, 0x6F,
    0x6E, 0xAE, 0xAA, 0x6A, 0x6B, 0xAB, 0x69, 0xA9, 0xA8, 0x68,
    0x78, 0xB8, 0xB9, 0x79, 0xBB, 0x7B, 0x7A, 0xBA, 0xBE, 0x7E,
    0x7F, 0xBF, 0x7D, 0xBD, 0xBC, 0x7C, 0xB4, 0x74, 0x75, 0xB5,
    0x77, 0xB7, 0xB6, 0x76, 0x72, 0xB2, 0xB3, 0x73, 0xB1, 0x71,
    0x70, 0xB0, 0x50, 0x90, 0x91, 0x51, 0x93, 0x53, 0x52, 0x92,
    0x96, 0x56, 0x57, 0x97, 0x55, 0x95, 0x94, 0x54, 0x9C, 0x5C,
    0x5D, 0x9D, 0x5F, 0x9F, 0x9E, 0x5E, 0x5A, 0x9A, 0x9B, 0x5B,
    0x99, 0x59, 0x58, 0x98, 0x88, 0x48, 0x49, 0x89, 0x4B, 0x8B,
    0x8A, 0x4A, 0x4E, 0x8E, 0x8F, 0x4F, 0x8D, 0x4D, 0x4C, 0x8C,
    0x44, 0x84, 0x85, 0x45, 0x87, 0x47, 0x46, 0x86, 0x82, 0x42,
    0x43, 0x83, 0x41, 0x81, 0x80, 0x40
];

CRC.CRC16 = function (buffer) {
    var hi = 0xff;
    var lo = 0xff;
    for (var i = 0; i < buffer.length; i++) {
        var idx = hi ^ buffer[i];
        hi = (lo ^ CRC._auchCRCHi[idx]);
        lo = CRC._auchCRCLo[idx];
    }

    return CRC.padLeft((hi << 8 | lo).toString(16).toUpperCase(), 4, '0');
};

CRC.isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
};

CRC.ToCRC16 = function (str) {
    return CRC.CRC16(CRC.isArray(str) ? str : CRC.strToByte(str));
};

CRC.strToByte = function (str) {
    var tmp = str.split(''), arr = [];
    for (var i = 0, c = tmp.length; i < c; i++) {
        var j = encodeURI(tmp[i]);
        if (j.length == 1) {
            arr.push(j.charCodeAt());
        } else {
            var b = j.split('%');
            for (var m = 1; m < b.length; m++) {
                arr.push(parseInt('0x' + b[m]));
            }
        }
    }
    return arr;
};

CRC.padLeft = function (s, w, pc) {
    if (pc == undefined) {
        pc = '0';
    }
    for (var i = 0, c = w - s.length; i < c; i++) {
        s = pc + s;
    }
    return s;
};

// const crcData = CRC.ToCRC16([
//     '01,017,001,002,003,004,0555,0666,0777,1,0,0,0,0,0700,0600,0500,0000,0,1,0,0000,0,11111,22222,33333,4444444444,5555555555555555555555,111.222.333.444,m95v567890123,135,11.0_,'
// ])

// console.log(crcData);