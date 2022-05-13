const net = require('net');
const port = 2020;
let podaciSaTable = '';
const dbService = require('./dbService');
const FileService = require('./fileService');
// let sendEmail = require('./email');

const server = net.createServer((socket) => {
    console.log(`${Date()} Client connected.. ${socket.remoteAddress} : ${socket.remotePort}`);
    socket.on('data', (data) => {
        podaciSaTable = [data.toString()]; // Ceo paket string
        // insert last packet in log file
        const lastPacket = podaciSaTable[0];
        const datum = new Date().toLocaleString('sr');
        const lastPacketFile = `${datum}: ${lastPacket} \n`
        const file = FileService.getFileServiceInstance();
        const result = file.logFile(lastPacketFile);
        result
            .then(data => console.log(data))
            .catch(err => console.log(err));

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
            Pow: tabla[23],
            RstS: tabla[24],
            RstH: tabla[25],
            Pck: tabla[26],
            Ses: tabla[27],
            Cid: tabla[28],
            IPa: tabla[29],
            Rev: tabla[30],
            Ver: tabla[31],
            Sgn: tabla[32],
            checksum: tabla[33],
        }
        const db = dbService.getDbServiceInstance();
        const result1 = db.updateLocatiOnLastPacket(podaciSaTable[0], objTabla.displej1, objTabla.displej2, objTabla.displej3, objTabla.displej4, objTabla.adresa);
        result1
            .then(data => console.log('Last packet update: ' + data))
            .catch(err => console.log(err));

        const crcData = CRC.ToCRC16(`${objTabla.vrstaPaketa},${objTabla.adresa},${objTabla.displej1},${objTabla.displej2},${objTabla.displej3},${objTabla.displej4},${objTabla.osvetljenje},${objTabla.accuNapon},${objTabla.accuTemp},${objTabla.in220},${objTabla.inBack1},${objTabla.inBack2},${objTabla.inBack3},${objTabla.inBack4},${objTabla.osvetljenjeHi},${objTabla.osvetljenjeLo},${objTabla.accuCutOff},${objTabla.offTimeSec},${objTabla.rele220v},${objTabla.releAccu},${objTabla.releOff},${objTabla.testTimerSec},${objTabla.test},${objTabla.Pow},${objTabla.RstS},${objTabla.RstH},${objTabla.Pck},${objTabla.Ses},${objTabla.Cid},${objTabla.IPa},${objTabla.Rev},${objTabla.Ver},${objTabla.Sgn},`);
        // console.log(crcData);

        // pocetak novog dela
        if (objTabla.checksum === crcData) {
            //Test!!
            if (objTabla.adresa === '255') {
                const db = dbService.getDbServiceInstance();
                const result = db.getTest();
                result
                    .then(data => {
                        const dataSplit = data[0].package.split(',');
                        let objSlanje = {
                            displej1: dataSplit[0],
                            displej2: dataSplit[1],
                            displej3: dataSplit[2],
                            displej4: dataSplit[3],
                            osvetljenjeHi: dataSplit[4],
                            osvetljenjeLo: dataSplit[5],
                            accuCutOff: dataSplit[6],
                            testTimerSec: dataSplit[7],
                            test: dataSplit[8],
                        }
                        console.log(objSlanje);
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
            } else {
                const db = dbService.getDbServiceInstance();
                const dbResult = db.getLocationsDataByLocNumber(objTabla.adresa);
                dbResult
                    .then(data => {
                        const displayData = {};
                        displayData.locDisp1zoneID = data[0].locDisp1zoneID;
                        displayData.locDisp2zoneID = data[0].locDisp2zoneID;
                        displayData.locDisp3zoneID = data[0].locDisp3zoneID;
                        displayData.locDisp4zoneID = data[0].locDisp4zoneID;

                        const db = dbService.getDbServiceInstance();
                        const dbResult = db.getZoneDataByID(displayData.locDisp1zoneID, displayData.locDisp2zoneID, displayData.locDisp3zoneID, displayData.locDisp4zoneID);
                        dbResult
                            .then(data => {
                                const displej1 = () => {
                                    if (data.find(dat => dat.zoneID === displayData.locDisp1zoneID) !== undefined) {
                                        return data.find(dat => dat.zoneID === displayData.locDisp1zoneID).zoneFreeNow;
                                    } else {
                                        return '000';
                                    }
                                }
                                const displej2 = () => {
                                    if (data.find(dat => dat.zoneID === displayData.locDisp2zoneID) !== undefined) {
                                        return data.find(dat => dat.zoneID === displayData.locDisp2zoneID).zoneFreeNow;
                                    } else {
                                        return '000';
                                    }
                                }
                                const displej3 = () => {
                                    if (data.find(dat => dat.zoneID === displayData.locDisp3zoneID) !== undefined) {
                                        return data.find(dat => dat.zoneID === displayData.locDisp3zoneID).zoneFreeNow;
                                    } else {
                                        return '000';
                                    }
                                }
                                const displej4 = () => {
                                    if (data.find(dat => dat.zoneID === displayData.locDisp4zoneID) !== undefined) {
                                        return data.find(dat => dat.zoneID === displayData.locDisp4zoneID).zoneFreeNow;
                                    } else {
                                        return '000';
                                    }
                                }
                                let objSlanje = {
                                    displej1: displej1(),
                                    displej2: displej2(),
                                    displej3: displej3(),
                                    displej4: displej4(),
                                    osvetljenjeHi: '0700',
                                    osvetljenjeLo: '0600',
                                    accuCutOff: '0500',
                                    testTimerSec: '0000',
                                    test: '0',
                                }
                                console.log(objSlanje);
                                const objSlanjeCheck = Object.assign(objSlanje, {
                                    checksum: CRC.ToCRC16(`${objSlanje.displej1},${objSlanje.displej2},${objSlanje.displej3},${objSlanje.displej4},${objSlanje.osvetljenjeHi},${objSlanje.osvetljenjeLo},${objSlanje.accuCutOff},${objSlanje.testTimerSec},${objSlanje.test},`)
                                });
                                socket.write(`{${Object.values(objSlanjeCheck).toString()}}`);
                                socket.end();
                                socket.destroy();
                            })
                    })
                    .catch(err => console.log(err));
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



