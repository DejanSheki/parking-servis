const dbService = require('./dbService');
const db = dbService.getDbServiceInstance();
const sendEmail = require('./email');
const email = sendEmail.getEmailInstance();

function packets(data) {
    const packet = [];
    const packetPinfo = data.filter(dat => dat.locType === 1 && dat.locLastPacket != null);
    const packetSensit = data.filter(dat => dat.locType === 2 && dat.locLastPacket != null);
    // console.log(packetPinfo);
    // console.log(packetSensit);
    packetPinfo.forEach(dat => {
        const splitedPacket = dat.locLastPacket.split(',');
        packet.push(new Object({
            locType: dat.locType,
            locSname: dat.locSname,
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
            locSname: dat.locSname,
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
    return packet;
}


// original

function lastComm() {
    const result = db.lastCommunication();
    result
        .then(data => {
            const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5));
            //console.log(fiveMinuteAgo);
            const notNull = data.filter(d => d.locLastCommTD !== null);
            // console.log(notNull);
            const notCommunicate = notNull.filter(d => new Date(d.locLastCommTD) <= fiveMinuteAgo)
            // console.log(notCommunicate);
            notCommunicate.forEach(dat => {
                console.log(dat.locID);
                const result = db.updateLastCommunication('#b4b4b4', dat.locID);
            })
            const communicate = data.filter(d => new Date(d.locLastCommTD) > fiveMinuteAgo);
            // console.log(communicate);
            communicate.forEach(dat => {
                // console.log(dat.locID);
                const result = db.updateLastCommunication('#ffffff', dat.locID);
            })
            const isNull = data.filter(d => d.locLastCommTD === null);
            // console.log(isNull);
            isNull.forEach(dat => {
                // console.log(dat.locID);
                const result = db.updateLastCommunication('#ffffff', dat.locID);
            })
        })
        .catch(err => console.log(err));
}

lastComm();
// Last comm
function lastCommunication() {
    const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5));
    const result = db.lastCommunication();
    result
        .then(data => {
            let message;
            const notNull = data.filter(d => d.locLastCommTD !== null);
            notNull.forEach(notC => {
                if (new Date(notC.locLastCommTD) <= fiveMinuteAgo && notC.emailSent === 0) {
                    db.updateLastCommunicationOnEmailSent(1, notC.locID);
                    message = `Uredjaj br. S${notC.locNumber}, ${notC.locLname} se zadnji put javio u ${notC.locLastCommTD}!`;
                    email.promeneNaTabli(message);
                    console.log('Uredjaj ne komunicira vise od 5 min!!!');
                }
                if (new Date(notC.locLastCommTD) >= fiveMinuteAgo && notC.emailSent === 1) {
                    db.updateLastCommunicationOnEmailSent(0, notC.locID);
                    message = `Uredjaj br. S${notC.locNumber}, ${notC.locLname} se ponovo javio u ${notC.locLastCommTD}!`;
                    email.promeneNaTabli(message);
                    console.log('Uredjaj se ponovo javio!!!');
                }
            });
        })
}
lastCommunication();

setInterval(lastCommunication, 30000);
setInterval(lastComm, 30000);