// var Client = require('ftp');

// var c = new Client();
// c.on('connect', function () {
//     console.log('weeee!');
//     c.list(function (err, list) {
//         if (err) throw err;
//         console.dir(list);
//         c.end();
//     });
// });
// const Client = require('ftp');
// const fs = require("fs");
// const c = new Client();

// c.on('ready', function () {
//     c.list("/", function (err, list) {
//         if (err) throw err;
//         console.dir(list);
//     });
// });
// c.connect(
//     {
//         // host: '192.168..0.10',
//         port: '22',
//         // user: 'dejan',
//         // password: 'N3w-5t4rt21'
//     }
// );

// var Client = require('ftp');
// var fs = require('fs');

// var c = new Client();
// c.on('ready', function () {
//     c.get('/home/dejan/Desktop/node_express/server/app.js', function (err, stream) {
//         if (err) throw err;
//         stream.once('close', function () { c.end(); });
//         stream.pipe(fs.createWriteStream('copy.js'));
//     });
// });
// c.connect({
//     host: '192.168..42.42',
//     port: '22',
//     user: 'dejan',
//     password: 'N3w-5t4rt21'
// });
// c.connect({
//     host: '192.168..72.72',
//     port: '22',
//     user: 'ZR20010',
//     password: 'ZR20010'
// });

// 'net use \\192.168.72.72\IPC$ /user:ZR20010 ZR20010 copy \\192.168.72.72\c$\newsys\transfer\PLS.008 c:\server01'
// 'mount //192.168.81.81/c$/newsys/transfer/ /home/dejan/test -o username=ZR20010,password=ZR20010'
// exec('net use \\192.168.72.72\\IPC$ /user:ZR20010 ZR20010 "&" copy \\192.168.72.72\\c$\\newsys\\transfer\PLS.008 c:\server01', (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);

// });


// UPDATE 02zones SET zoneColor = 'rgb(208, 233, 198)' WHERE zoneShort = mgm

// fs.readdir('./objekti/', function (err, folders) {
//     if (err) {
//         return console.log('Unable to scan directory: ' + err);
//     }
//     folders.forEach(folder => {
//         const file = fileService.getFileServiceInstance();
//         const result = file.emptyParkingSpaces1(folder);
//         result
//             .then(data => {
//                 console.log(data);
//                 const db = dbService.getDbServiceInstance();
//                 const result1 = db.insertFreeNowData(data, folder);
//                 result1
//                     .then(data => console.log(data))
//                     .catch(err => console.log(err));
//             })
//             .catch(err => console.log(err));
//     })
//     // folders.forEach(function (folder) {
//     //     // console.log(folder);
//     //     const file = fileService.getFileServiceInstance();
//     //     const result = file.emptyParkingSpaces1(folder);
//     //     result
//     //         .then(data => {
//     //             obj[folder] = data
//     //             // console.log(folder + ': ' + data);
//     //             // console.log(obj);
//     //             // const slMesta = data.split('Y');
//     //             // const slMestaDisplej1 = slMesta[1] + slMesta[2] + slMesta[3].replace(/(\r\n|\n|\r)/gm, "");
//     //             const db = dbService.getDbServiceInstance();
//     //             const result1 = db.insertFreeNowData('421jhk24', folder);
//     //             result1
//     //                 .then(data => console.log(data))
//     //                 .catch(err => console.log(err));
//     //         })
//     //         .catch(err => console.log(err));
//     // });
// });
// // fs.readFile('./PLS.008', 'utf8', (err, data) => {
// //     if (err) {
// //         console.error(err)
// //         return
// //     }
// //     const tabla = data.split('Y');
// //     const mesta = tabla[1] + tabla[2] + tabla[3];
// //     console.log(mesta)
// // })