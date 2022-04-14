const nodemailer = require("nodemailer");
const cron = require('cron');
const dotenv = require('dotenv');
dotenv.config();
const dbService = require('./dbService');
let email;

// useri iz baze
async function dbUsers() {
    const db = dbService.getDbServiceInstance();
    const result = await db.getAllActiveUsers();
    const data = JSON.stringify(result);
    const usersData = JSON.parse(data);
    return usersData;
}

// datum iz baze, odvajamo sate i minute
function date(userInfoTime) {
    return userInfoTime.split(':');
}

// podaci za slanje maila
let transporter = nodemailer.createTransport({
    // service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure: false,
    requireTLS: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

// async function samoRekap() {
//     const usersData = await dbUsers();
//     let sendingData = '';
//     usersData.map((userData) => {
//         let datum = `${date(userData.userInfoTime)[1]} ${date(userData.userInfoTime)[0]} * * *`;
//         // if (userData.userInfoType === 3) {
//         //     email.push(userData.userMail);
//         // }
//         email = userData.userMail;
//         // console.log(email);
//         sendingData += `<li>Podaci o korisnicima:${userData.userID} ${userData.userFLname}, ${userData.userTitle}, ${userData.userActive}, ${userData.userInfoTime}</li>`;
//         userData = new cron.CronJob({
//             cronTime: datum,
//             onTick: () => {
//                 transporter.sendMail({
//                     from: 'dejan.lukic@pinfo.rs',
//                     to: email,
//                     subject: `Svi podaci`,
//                     html: sendingData
//                 }, function (err, info) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('Email sent: ' + info.response);
//                     }
//                 })
//             },
//             start: true,
//             runOnInit: false
//         });
//     })
// }
// samoRekap();

// refres podataka
let refresh = new cron.CronJob('25 04 * * *', () => {
    samoRekap();
});
refresh.start();


//

let instance = null;

class sendEmail {
    static getEmailInstance() {
        return instance ? instance : new sendEmail();
    }
    async promeneNaTabli(sendingData) {
        try {
            const usersData = await dbUsers();
            // console.log(usersData);
            usersData.map((userData) => {
                email = userData.userMail;
                let zaSlanje = '';
                zaSlanje += `<li>Podaci sa table:${sendingData.vrstaPaketa}, ${sendingData.brLokacije}, ${sendingData.displej1}, ${sendingData.displej2}, ${sendingData.displej3}, ${sendingData.displej4}, ${sendingData.temperaturaEl}, ${sendingData.osvetljenjeUokruzenju}, ${sendingData.temperaturaAku}, ${sendingData.naponAku}, ${sendingData.ICCIDbr}, ${sendingData.signalAntene}, ${sendingData.relejPozOsvetljenja}, ${sendingData.checksum}</li>`;
                userData = transporter.sendMail({
                    from: 'dejan.lukic@pinfo.rs',
                    to: email,
                    subject: `Svi podaci`,
                    html: zaSlanje
                }, function (err, info) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Email sent: ' + info.response);
                        return info.response;
                    }
                })
            })
            // return usersData;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = sendEmail;



