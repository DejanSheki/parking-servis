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
        podaciSaTable = [data.toString()];
        // console.log(podaciSaTable);
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
        const result1 = db.updateLocatiOnLastPacket(podaciSaTable[0], objTabla.adresa);
        result1
            .then(data => console.log(data))
            .catch(err => console.log(err));

        const crcData = CRC.ToCRC16(`${objTabla.vrstaPaketa},${objTabla.adresa},${objTabla.displej1},${objTabla.displej2},${objTabla.displej3},${objTabla.displej4},${objTabla.osvetljenje},${objTabla.accuNapon},${objTabla.accuTemp},${objTabla.in220},${objTabla.inBack1},${objTabla.inBack2},${objTabla.inBack3},${objTabla.inBack4},${objTabla.osvetljenjeHi},${objTabla.osvetljenjeLo},${objTabla.accuCutOff},${objTabla.offTimeSec},${objTabla.rele220v},${objTabla.releAccu},${objTabla.releOff},${objTabla.testTimerSec},${objTabla.test},${objTabla.pow},${objTabla.rst},${objTabla.pck},${objTabla.ses},${objTabla.cid},${objTabla.iPa},${objTabla.rev},${objTabla.ver},${objTabla.sgn},`);
        // console.log(crcData);

        // pocetak novog dela
        if (objTabla.checksum === crcData) {
            if (objTabla.adresa === '001') {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getAllDataByZoneShort('vma', 'ada', 'cvp');
                dbResult
                    .then(data => {
                        console.log(data);
                        data.forEach(element => {
                            console.log(element.zoneFreeNow);
                        });
                    })
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mas', 'pio', 'zel', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
                        // console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        socket.end();
                        socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else if (objTabla.adresa === '002') {
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
            } else if (objTabla.adresa === '003') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('mk', 'dg', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '004') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mgm', 'mk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: '0',
                            displej2: slMestaDisplej1,
                            displej3: slMestaDisplej2,
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
            } else if (objTabla.adresa === '005') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('dg', 'obi');
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
            } else if (objTabla.adresa === '006') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('dg', 'obi');
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
            } else if (objTabla.adresa === '007') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('obi', 'pio', 'mk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '008') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('bba', 'pio');
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
            } else if (objTabla.adresa === '009') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('vuk', 'pio', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '010') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('sla', 'mas');
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
            } else if (objTabla.adresa === '011' || objTabla.adresa === '012') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('pio', 'mas');
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
            } else if (objTabla.adresa === '013') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('sla');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '015') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('sla', 'pio', 'mas', 'zel');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '016') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mas', 'zel');
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
            } else if (objTabla.adresa === '017') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mas', 'vuk');
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
            } else if (objTabla.adresa === '018') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('bba');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '019') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mgm', 'sla', 'dg', 'kam');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '020') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mk', 'mgm');
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
            } else if (objTabla.adresa === '021' || objTabla.adresa === '022') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('cvp');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '024') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('drak');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '025') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('sla', 'pio', 'mas', 'zel');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '026') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('pio', 'mas', 'vuk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '027') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('dg', 'mgm');
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
            } else if (objTabla.adresa === '028') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('mas', 'sla');
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
            } else if (objTabla.adresa === '029') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('obi', 'zel', 'dg', 'kam');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '030') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('scn');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '032' || objTabla.adresa === '033' || objTabla.adresa === '034') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('vuk', 'bv', 'vis');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '035' || objTabla.adresa === '036') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces2('vis', 'bv');
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
            } else if (objTabla.adresa === '037') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mas', 'kam', 'drak', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '040') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mgm', 'mk', 'pio', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '041') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('obi', 'mas', 'vuk', 'bba');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '042') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('bba', 'vuk', 'sla', 'mas');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '043') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('pol', 'pio', 'obi', 'mk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '044') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('dg', 'obi', 'pol');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '045' || objTabla.adresa === '046' || objTabla.adresa === '047') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('cuk');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '048') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('kam', 'dg', 'drak', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '049') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('pio', 'zel', 'mk', 'obi');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '050') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('dg', 'mk', 'kam', 'mgm');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '051') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mas', 'bv', 'sla', 'vuk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '052') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('drak', 'zel', 'kam', 'mas');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '053' || objTabla.adresa === '054' || objTabla.adresa === '055') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('vma');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '056' || objTabla.adresa === '057' || objTabla.adresa === '058') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces1('onbg');
                result
                    .then(data => {
                        const slMesta = data.split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: '0',
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
            } else if (objTabla.adresa === '059') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('obi', 'mk', 'zel', 'mgm');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '060') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('dg', 'obi', 'mk', 'mgm');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '061') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('obi', 'mas', 'pio', 'bv');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '062') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces4('mk', 'obi', 'sla', 'mas');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[2].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta4 = data[3].split('Y');
                        const slMestaDisplej4 = slMesta4[1] + slMesta4[2] + slMesta4[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
                            displej4: slMestaDisplej4,
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
            } else if (objTabla.adresa === '063') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('obi', 'mas', 'vuk');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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
            } else if (objTabla.adresa === '065') {
                const file = fileService.getFileServiceInstance();
                const result = file.emptyParkingSpaces3('kam', 'zel', 'mas');
                result
                    .then(data => {
                        const slMesta = data[0].split('Y');
                        const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta2 = data[1].split('Y');
                        const slMestaDisplej2 = slMesta2[1] + slMesta2[2] + slMesta2[3].replace(/(\r\n|\n|\r)/gm, "");
                        const slMesta3 = data[1].split('Y');
                        const slMestaDisplej3 = slMesta3[1] + slMesta3[2] + slMesta3[3].replace(/(\r\n|\n|\r)/gm, "");
                        let objSlanje = {
                            displej1: slMestaDisplej1,
                            displej2: slMestaDisplej2,
                            displej3: slMestaDisplej3,
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