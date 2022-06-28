const dbService = require('./dbService');
let sendEmail = require('./email');

let counter = 0;

function lastComm() {
    const db = dbService.getDbServiceInstance();
    const result = db.lastCommunication();
    result
        .then(data => {
            const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5));
            const tenMinuteAgo = new Date(Date.now() - 1000 * (60 * 10));
            console.log(fiveMinuteAgo);
            // console.log(tenMinuteAgo);
            const notNull = data.filter(d => d.locLastCommTD !== null);
            // console.log(notNull);
            const notCommunicate = notNull.filter(d => new Date(d.locLastCommTD) <= fiveMinuteAgo);
            notCommunicate.forEach(dat => {
                console.log(dat.locLname);
                const db = dbService.getDbServiceInstance();
                const result = db.updateLastCommunication('#b4b4b4', dat.locID);

                const eventName = `Zadnje javljanje.`;
                const eventDesc = `Lokacija: ${dat.locID}, ${dat.locLname} se zadnji put javila u ${dat.locLastCommTD}.`
                const dbEvents = dbService.getDbServiceInstance();
                const resultEvents = dbEvents.insertEvents(eventName, eventDesc);
            })
            const communicate = data.filter(d => new Date(d.locLastCommTD) >= fiveMinuteAgo);
            // console.log(communicate);
            communicate.forEach(dat => {
                // console.log(dat.locID);
                const db = dbService.getDbServiceInstance();
                const result = db.updateLastCommunication('#ffffff', dat.locID);
            })
            const isNull = data.filter(d => d.locLastCommTD === null);
            // console.log(isNull);
            isNull.forEach(dat => {
                // console.log(dat.locID);
                const db = dbService.getDbServiceInstance();
                const result = db.updateLastCommunication('#ffffff', dat.locID);
            })
        })
        .catch(err => console.log(err));
}

lastComm();

// const interval = setInterval(() => {
//     lastComm();
//     console.log(counter);
// }, 30000);

function sendMail() {
    const db = dbService.getDbServiceInstance();
    const result = db.selectEvents();
    result
        .then(data => {
            console.log(data);
            data.forEach(d => {
                if (d.eventID > counter) {
                    let message = `Event : ${d.eventID} \n ${d.eventName} \n ${d.eventDesc}`;
                    const email = sendEmail.getEmailInstance();
                    const sent = email.promeneNaTabli(message);
                    counter++;
                    console.log(counter);
                }
            })
        })
        .catch(err => console.log(err));
}
console.log(counter);
sendMail();

// const db = dbService.getDbServiceInstance();
// const result = db.lastCommunicationMail();
// result
//     .then(data => {
//         // console.log(data);
//         // const zadnji = new Date(Math.max(...data.map(e => new Date(e.locLastCommTD)))).toLocaleString('sr');
//         // const notNull = data.filter(e => e.locLastPacket !== null);

//         const packet = packets(data);
//         const packet98 = packet.filter(dat => dat.vrstaPaketa === '99');
//         packet98.forEach(pack => {
//             let message = `Uredjaj ${pack.adresa}: \nNaziv: ${pack.locSname} \n Vrsta paketa: ${pack.vrstaPaketa} Uredjaj se upalio.`
//             // const email = sendEmail.getEmailInstance();
//             // const sent = email.promeneNaTabli(message);
//         })
//         // console.log(packet98);
//         const packetIN220 = packet.filter(dat => dat.in220 === '0');
//         packetIN220.forEach(pack => {
//             console.log(pack);
//             // const eventName = `Zadnje javljanje.`;
//             // const eventDesc = `Lokacija: ${dat.locID}, ${dat.locLname} se zadnji put javila u ${dat.locLastCommTD}.`
//             // const dbEvents = dbService.getDbServiceInstance();
//             // const resultEvents = dbEvents.insertEvents(eventName, eventDesc);
//             // let message = `Uredjaj ${pack.adresa}: \nNaziv: ${pack.locSname} \n Uredjaj je ostao bez napona.`
//             // const email = sendEmail.getEmailInstance();
//             // const sent = email.promeneNaTabli(message);
//         })
//         // console.log(packetIN220);
//     })

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

// function lastComm() {
//     const db = dbService.getDbServiceInstance();
//     const result = db.lastCommunication();
//     result
//         .then(data => {
//             const fiveMinuteAgo = new Date(Date.now() - 1000 * (60 * 5));
//             //console.log(fiveMinuteAgo);
//             const notNull = data.filter(d => d.locLastCommTD !== null);
//             // console.log(notNull);
//             const notCommunicate = notNull.filter(d => new Date(d.locLastCommTD) <= fiveMinuteAgo)
//             // console.log(notCommunicate);
//             notCommunicate.forEach(dat => {
//                 console.log(dat.locID);
//                 const db = dbService.getDbServiceInstance();
//                 const result = db.updateLastCommunication('#b4b4b4', dat.locID);
//             })
//             const communicate = data.filter(d => new Date(d.locLastCommTD) > fiveMinuteAgo);
//             // console.log(communicate);
//             communicate.forEach(dat => {
//                 // console.log(dat.locID);
//                 const db = dbService.getDbServiceInstance();
//                 const result = db.updateLastCommunication('#ffffff', dat.locID);
//             })
//             const isNull = data.filter(d => d.locLastCommTD === null);
//             // console.log(isNull);
//             isNull.forEach(dat => {
//                 // console.log(dat.locID);
//                 const db = dbService.getDbServiceInstance();
//                 const result = db.updateLastCommunication('#ffffff', dat.locID);
//             })
//         })
//         .catch(err => console.log(err));
// }

// lastComm();
