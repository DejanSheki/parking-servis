const net = require('net');
const port = 2022;
let podaciSaTable = '';
const fileService = require('./fileService');
const file = fileService.getFileServiceInstance();
const dbService = require('./dbService');
const db = dbService.getDbServiceInstance();
const sendEmail = require('./email');
const email = sendEmail.getEmailInstance();
// const { stringify } = require('querystring');


const server = net.createServer((socket) => {
    console.log(`${Date()} Client connected.. ${socket.remoteAddress} : ${socket.remotePort}`);
    socket.on('data', (data) => {
        podaciSaTable = [data.toString()]; // Ceo paket string

        // insert last packet in log file
        const lastPacket = podaciSaTable[0];
        const datum = new Date().toLocaleString('sr');
        const IP = socket.remoteAddress.replace('::ffff:', '');
        const lastPacketFile = `Date: ${datum} IP: ${IP} \n ${lastPacket} \n`

        let tabla = podaciSaTable[0].split(','); //radi na serveru, sada i kod mene
        // let tabla = JSON.parse(podaciSaTable).split(','); //radi kod mene
        let objTabla = {
            vrstaPaketa: tabla[0],
            adresa: tabla[1],
            displej1: tabla[2],
            displej2: tabla[3],
            displej3: tabla[4],
            displej4: tabla[5],
            displej5: tabla[6],
            displej6: tabla[7],
            displej7: tabla[8],
            displej8: tabla[9],
            osvetljenje: tabla[10],
            accuNapon: tabla[11],
            accuTemp: tabla[12],
            in220: tabla[13],
            inBack1: tabla[14],
            inBack2: tabla[15],
            inBack3: tabla[16],
            inBack4: tabla[17],
            osvetljenjeHi: tabla[18],
            osvetljenjeLo: tabla[19],
            accuCutOff: tabla[20],
            offTimeSec: tabla[21],
            rele220v: tabla[22],
            releAccu: tabla[23],
            releOff: tabla[24],
            testTimerSec: tabla[25],
            test: tabla[26],
            Pow: tabla[27],
            RstS: tabla[28],
            RstH: tabla[29],
            Pck: tabla[30],
            Ses: tabla[31],
            Cid: tabla[32],
            IPa: tabla[33],
            Rev: tabla[34],
            Ver: tabla[35],
            Sgn: tabla[36],
            checksum: tabla[37],
        }
        // Provera i slanje mail-a
        checkDataForMail(objTabla.adresa, objTabla);

        // Last packet update
        const result = db.updateSensitOnLastPacket(lastPacket, `${objTabla.displej1}/${objTabla.displej2}`, `${objTabla.displej3}/${objTabla.displej4}`, `${objTabla.displej5}/${objTabla.displej6}`, `${objTabla.displej7}/${objTabla.displej8}`, objTabla.adresa);
        result
            .then(data => console.log('Last packet update: ' + data.message))
            .catch(err => console.log(err));

        const crcData = CRC.ToCRC16(`${objTabla.vrstaPaketa},${objTabla.adresa},${objTabla.displej1},${objTabla.displej2},${objTabla.displej3},${objTabla.displej4},${objTabla.displej5},${objTabla.displej6},${objTabla.displej7},${objTabla.displej8},${objTabla.osvetljenje},${objTabla.accuNapon},${objTabla.accuTemp},${objTabla.in220},${objTabla.inBack1},${objTabla.inBack2},${objTabla.inBack3},${objTabla.inBack4},${objTabla.osvetljenjeHi},${objTabla.osvetljenjeLo},${objTabla.accuCutOff},${objTabla.offTimeSec},${objTabla.rele220v},${objTabla.releAccu},${objTabla.releOff},${objTabla.testTimerSec},${objTabla.test},${objTabla.Pow},${objTabla.RstS},${objTabla.RstH},${objTabla.Pck},${objTabla.Ses},${objTabla.Cid},${objTabla.IPa},${objTabla.Rev},${objTabla.Ver},${objTabla.Sgn},`);
        console.log('CRC = ' + crcData);

        if (objTabla.checksum === crcData && (objTabla.Pow <= 999 && objTabla.RstS <= 999 && objTabla.RstH <= 999 && objTabla.Pck <= 999)) {
            //Test!!
            if (objTabla.adresa === '255') {
                const result = db.getTest2();
                result
                    .then(data => {
                        const dataSplit = data[0].package.split(',');
                        let objSlanje = {
                            adresa: dataSplit[0],
                            displej1: dataSplit[1],
                            displej1a: dataSplit[2],
                            displej2: dataSplit[3],
                            displej2a: dataSplit[4],
                            displej3: dataSplit[5],
                            displej3a: dataSplit[6],
                            displej4: dataSplit[7],
                            displej4a: dataSplit[8],
                            osvetljenjeHi: dataSplit[9],
                            osvetljenjeLo: dataSplit[10],
                            accuCutOff: dataSplit[11],
                            testTimerSec: dataSplit[12],
                            test: dataSplit[13],
                        }
                        console.log(objSlanje);
                        const objSlanjeCheck = Object.assign(objSlanje, {
                            checksum: CRC.ToCRC16(`${objSlanje.adresa},${objSlanje.displej1},${objSlanje.displej1a},${objSlanje.displej2},${objSlanje.displej2a},${objSlanje.displej3},${objSlanje.displej3a},${objSlanje.displej4},${objSlanje.displej4a},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                            // checksum: crcData
                        });
                        // console.log(objSlanjeCheck);
                        socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        // socket.end();
                        // socket.destroy();
                    })
                    .catch(err => console.log(err));
            } else {
                const dbResult = db.getSensitDataByLocNumber(objTabla.adresa);
                dbResult
                    .then(data => {
                        const displayData = {};
                        displayData.locDisp1zoneID = data[0].locDisp1zoneID;
                        displayData.locDisp2zoneID = data[0].locDisp2zoneID;
                        displayData.locDisp3zoneID = data[0].locDisp3zoneID;
                        displayData.locDisp4zoneID = data[0].locDisp4zoneID;
                        const dbResult = db.getSensitDataByDisplayID(displayData.locDisp1zoneID, displayData.locDisp2zoneID, displayData.locDisp3zoneID, displayData.locDisp4zoneID);
                        dbResult
                            .then(data => {
                                const displej1 = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp1zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp1zoneID).ZaDisplej1;
                                    }
                                }
                                const displej1a = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp1zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp1zoneID).ZaDisplej2;
                                    }
                                }
                                const displej2 = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp2zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp2zoneID).ZaDisplej1;
                                    }
                                }
                                const displej2a = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp2zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp2zoneID).ZaDisplej2;
                                    }
                                }
                                const displej3 = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp3zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp3zoneID).ZaDisplej1;
                                    }
                                }
                                const displej3a = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp3zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp3zoneID).ZaDisplej2;
                                    }
                                }
                                const displej4 = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp4zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp4zoneID).ZaDisplej1;
                                    }
                                }
                                const displej4a = () => {
                                    if (data.find(dat => dat.zoneShort === displayData.locDisp4zoneID) === undefined) {
                                        return '00';
                                    } else {
                                        return data.find(dat => dat.zoneShort === displayData.locDisp4zoneID).ZaDisplej2;
                                    }
                                }

                                let objSlanje = {
                                    adresa: objTabla.adresa,
                                    displej1: displej1(),
                                    displej1a: displej1a(),
                                    displej2: displej2(),
                                    displej2a: displej2a(),
                                    displej3: displej3(),
                                    displej3a: displej3a(),
                                    displej4: displej4(),
                                    displej4a: displej4a(),
                                    osvetljenjeHi: '0077',
                                    osvetljenjeLo: '0600',
                                    accuCutOff: '0500',
                                    testTimerSec: '0000',
                                    test: '0',
                                }
                                // console.log(objSlanje);
                                const objSlanjeCheck = Object.assign(objSlanje, {
                                    checksum: CRC.ToCRC16(`${objSlanje.adresa},${objSlanje.displej1},${objSlanje.displej1a},${objSlanje.displej2},${objSlanje.displej2a},${objSlanje.displej3},${objSlanje.displej3a},${objSlanje.displej4},${objSlanje.displej4a},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                                });
                                const result = file.logFileSensit(`${lastPacketFile} ${Object.values(objSlanjeCheck).toString()} \n`);
                                result
                                    .then(data => console.log(`File: ${data}`))
                                    .catch(err => console.log(err));
                                socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                            })
                    })
                    .catch(err => console.log(err));
            }
        } else {
            console.log('Data missing!!!');
            const dbResult = db.getSensitDataByLocNumber(objTabla.adresa);
            dbResult
                .then(data => {
                    const displayData = {};
                    displayData.locDisp1zoneID = data[0].locDisp1zoneID;
                    displayData.locDisp2zoneID = data[0].locDisp2zoneID;
                    displayData.locDisp3zoneID = data[0].locDisp3zoneID;
                    displayData.locDisp4zoneID = data[0].locDisp4zoneID;
                    const dbResult = db.getSensitDataByDisplayID(displayData.locDisp1zoneID, displayData.locDisp2zoneID, displayData.locDisp3zoneID, displayData.locDisp4zoneID);
                    dbResult
                        .then(data => {
                            const displej1 = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp1zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp1zoneID).ZaDisplej1;
                                }
                            }
                            const displej1a = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp1zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp1zoneID).ZaDisplej2;
                                }
                            }
                            const displej2 = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp2zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp2zoneID).ZaDisplej1;
                                }
                            }
                            const displej2a = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp2zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp2zoneID).ZaDisplej2;
                                }
                            }
                            const displej3 = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp3zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp3zoneID).ZaDisplej1;
                                }
                            }
                            const displej3a = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp3zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp3zoneID).ZaDisplej2;
                                }
                            }
                            const displej4 = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp4zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp4zoneID).ZaDisplej1;
                                }
                            }
                            const displej4a = () => {
                                if (data.find(dat => dat.zoneShort === displayData.locDisp4zoneID) === undefined) {
                                    return '00';
                                } else {
                                    return data.find(dat => dat.zoneShort === displayData.locDisp4zoneID).ZaDisplej2;
                                }
                            }

                            let objSlanje = {
                                adresa: objTabla.adresa,
                                displej1: displej1(),
                                displej1a: displej1a(),
                                displej2: displej2(),
                                displej2a: displej2a(),
                                displej3: displej3(),
                                displej3a: displej3a(),
                                displej4: displej4(),
                                displej4a: displej4a(),
                                osvetljenjeHi: '0077',
                                osvetljenjeLo: '0600',
                                accuCutOff: '0500',
                                testTimerSec: '0000',
                                test: '0',
                            }
                            console.log(objSlanje);
                            const objSlanjeCheck = Object.assign(objSlanje, {
                                checksum: CRC.ToCRC16(`${objSlanje.adresa},${objSlanje.displej1},${objSlanje.displej1a},${objSlanje.displej2},${objSlanje.displej2a},${objSlanje.displej3},${objSlanje.displej3a},${objSlanje.displej4},${objSlanje.displej4a},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                            });
                            const result = file.logFileSensit(`${lastPacketFile} Brojac veci od 999!! \n ${Object.values(objSlanjeCheck).toString()} \n`);
                            result
                                .then(data => console.log(`File: ${data}`))
                                .catch(err => console.log(err));
                            socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                        })
                })
                .catch(err => console.log(err));
        }
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

// provera i slanje mail-a
function checkDataForMail(locNumber, objTabla) {
    const result = db.getSensitDataByLocNumber(locNumber);
    result
        .then(data => {
            // Napon
            const dataSplit = data[0].locLastPacket.split(',');
            const in220Last = Number(dataSplit[13]);
            const in220New = Number(objTabla.in220);
            const emailSent = data[0].emailSent;
            console.log(`Last : ${in220Last}, New : ${in220New}, MailSent : ${emailSent}`);
            if (in220New === 0 && in220Last === 1 && emailSent === 0) {
                db.updateLastCommunicationOnEmailSent(1, data[0].locID);
                let message = `Uredjaj br. S${data[0].locNumber}, ${data[0].locSname} je ostao bez napona!`;
                email.promeneNaTabli(message);
                console.log('Nestalo struje!!!');
            }
            if (in220New === 1 && in220Last === 0 && emailSent === 1) {
                db.updateLastCommunicationOnEmailSent(2, data[0].locID);
                let message = `Uredjaj br. S${data[0].locNumber}, ${data[0].locSname} je dobio napon!`;
                email.promeneNaTabli(message);
                console.log('Dosla struja!!!');
            }
            if (in220New === 1 && in220Last === 1 && emailSent === 2) {
                db.updateLastCommunicationOnEmailSent(0, data[0].locID);
                console.log('Sve vraceno na pocetak!!!');
            }
        });
}

// // Last comm
// function lastCommunication() {
//     const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5));
//     const result = db.lastCommunication();
//     result
//         .then(data => {
//             let message;
//             const notNull = data.filter(d => d.locLastCommTD !== null);
//             // const notCommunicate = notNull.filter(d => new Date(d.locLastCommTD) <= fiveMinuteAgo);
//             // const communicate = notNull.filter(d => new Date(d.locLastCommTD) >= fiveMinuteAgo);
//             // const communicateData = [...notCommunicate, ...communicate];
//             // console.log(notNull);
//             notNull.forEach(notC => {
//                 if (new Date(notC.locLastCommTD) <= fiveMinuteAgo && notC.emailSent === 0) {
//                     db.updateLastCommunicationOnEmailSent(1, notC.locID);
//                     message = `Uredjaj br. S${notC.locNumber}, ${notC.locLname} se zadnji put javio u ${notC.locLastCommTD}!`;
//                     email.promeneNaTabli(message);
//                     console.log('Uredjaj ne komunicira vise od 5 min!!!');
//                 }
//                 if (new Date(notC.locLastCommTD) >= fiveMinuteAgo && notC.emailSent === 1) {
//                     db.updateLastCommunicationOnEmailSent(0, notC.locID);
//                     message = `Uredjaj br. S${notC.locNumber}, ${notC.locLname} se ponovo javio u ${notC.locLastCommTD}!`;
//                     email.promeneNaTabli(message);
//                     console.log('Uredjaj se ponovo javio!!!');
//                 }
//             });
//         })
// }
// lastCommunication()
