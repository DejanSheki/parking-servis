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

// 'net use \\192.168.85.85\IPC$ /user:ZR20010 ZR20010 copy \\192.168.85.85\c$\newsys\transfer\PLS.008 c:\server01'
// 'mount //192.168.62.62/c$/newsys/transfer/ /home/dejan/Desktop/parkingServis/node_express/server/objekti/obi -o username=ZR20010,password=ZR20010'
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


// exec('curl  -k "sftp://192.168.85.85:22/newsys/transfer/PLS.008" --user "ZR20010:ZR20010" -o "/home/dejan/Desktop/parkingServis/node_express/server/objekti/onbg/PLS.008"', (error, stdout, stderr) => {
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


// sftp ZR20010@192.168.64.64:/newsys/transfer/PLS.008 /home/dejan/Desktop/parkingServis/node_express/server/objekti/mas/ 
// curl  -k "sftp://10.10.10.10:77/home/admin/test.txt" --user "admin:123456" -o "test.txt"


// curl  -k "sftp://192.168.71.71:22/newsys/transfer/PLS.008" --user "ZR20010:ZR20010" -o "/home/dejan/Desktop/parkingServis/node_express/server/objekti/kap/PLS.008"




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
// json   // "type": "module",

//veza sa serverom

class Podaci {
    constructor(displ1, displ2, displ3, displ4) {
        this.displ1 = displ1;
        this.displ2 = displ2;
        this.displ3 = displ3;
        this.displ4 = displ4;
    }
}

async function update() {
    const test = tabela1.querySelectorAll('tr');
    console.log(test);
    let test2;
    const testArr = [];
    const dataFetch = await fetch("http://192.168.0.10:2021/getAllActiveLocations");
    const data = await dataFetch.json();
    data.forEach(dat => {
        test2 = new Podaci(dat.locDisp1value, dat.locDisp2value, dat.locDisp3value, dat.locDisp4value);
        testArr.push(test2);
    })
    console.log(testArr);
}

const interval1 = setInterval(() => {
    update();
}, 10000);


//33dispSum1
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, SUM(31lotzonesum.ukupno * 23time.`sign+1-1`) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotZoneSum ON(23time.lot = 31lotZoneSum.lot) AND(23time.zone = 31lotZoneSum.zone) WHERE(((23time.`disp1-2`) = 1) AND((23time.vremeOd) <= CURRENT_TIME) AND((23time.vremeDo) >= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip"
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, SUM(31lotzonesum.ukupno * 23time.`sign+1-1`) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotzonesum ON(23time.lot = 31lotzonesum.lot) AND(23time.zone = 31lotzonesum.zone) WHERE(((23time.`disp1-2`) = 1) AND((23time.vremeOd) <= CURRENT_TIME) AND((23time.vremeDo) >= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip"
"SELECT 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, Sum([31lotZoneSum]![Ukupno]*[23time]![sign+1-1]) AS ZaDisplej1, 0 AS ZaDisplej2, [22display].disp1tip, [22display].disp2tip FROM ((21locationsS INNER JOIN 22display ON [21locationsS].Slokacija = [22display].lokacija) INNER JOIN 23time ON [22display].dispID = [23time].IDdisp) INNER JOIN 31lotZoneSum ON ([23time].Lot = [31lotZoneSum].Lot) AND ([23time].Zone = [31lotZoneSum].Zone) WHERE ((([23time].[disp1-2])=1) AND (([23time].vremeOd)<=#12/30/1899 9:0:0#) AND (([23time].vremeDo)>=#12/30/1899 9:0:0#))GROUP BY [22display].dispID,[22display].oznaka, [22display].lokacija, [21locationsS].SlocOpisLokacije, 0, [22display].disp1tip, [22display].disp2tip;"

//34dispSum2
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 0 AS ZaDisplej1, Sum(31lotZoneSum.Ukupno*23time.`sign+1-1`) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotZoneSum ON (23time.Lot = 31lotZoneSum.Lot) AND (23time.Zone = 31lotZoneSum.Zone) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip;"

//36groupSum
"SELECT 35unijaSum.dispID, 35unijaSum.zoneShort, 35unijaSum.lokacija, 35unijaSum.SlocOpisLokacije, Sum(35unijaSum.ZaDisplej1) AS ZaDisplej1, Sum(35unijaSum.ZaDisplej2) AS ZaDisplej2, 35unijaSum.disp1tip, 35unijaSum.disp2tip FROM 35unijaSum GROUP BY 35unijaSum.dispID, 35unijaSum.zoneShort, 35unijaSum.lokacija, 35unijaSum.SlocOpisLokacije, 35unijaSum.disp1tip, 35unijaSum.disp2tip;"

//43dispSum1All
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, Sum(COALESCE(31lotZoneSum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotZoneSum ON (23time.Lot = 31lotZoneSum.Lot) AND (23time.Zone = 31lotZoneSum.Zone) WHERE (((23time.`disp1-2`)=1) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip;"

//44dispSum2All
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 0 AS ZaDisplej1, Sum(COALESCE(31lotZoneSum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotZoneSum ON (23time.Zone = 31lotZoneSum.Zone) AND (23time.Lot = 31lotZoneSum.Lot) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip;"

//45unijaSumAll
"SELECT * FROM 43dispSum1all UNION ALL SELECT * FROM 44dispSum2all;"

//46groupSumAll
"SELECT 45unijaSumAll.dispID, 45unijaSumAll.zoneShort, 45unijaSumAll.lokacija, 45unijaSumAll.SlocOpisLokacije, Sum(45unijaSumAll.ZaDisplej1) AS ZaDisplej1, Sum(45unijaSumAll.ZaDisplej2) AS ZaDisplej2, 45unijaSumAll.disp1tip, 45unijaSumAll.disp2tip FROM 45unijaSumAll GROUP BY 45unijaSumAll.dispID, 45unijaSumAll.zoneShort, 45unijaSumAll.lokacija, 45unijaSumAll.SlocOpisLokacije, 45unijaSumAll.disp1tip, 45unijaSumAll.disp2tip;"

//33dispSum1
"SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 22display.disp1opis, 22display.disp2opis, 21locationss.SlocOpisLokacije, SUM(31lotzonesum.ukupno * 23time.`sign+1-1`) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotzonesum ON(23time.lot = 31lotzonesum.lot) AND(23time.zone = 31lotzonesum.zone) WHERE(((23time.`disp1-2`) = 1) AND((23time.vremeOd) <= CURRENT_TIME) AND((23time.vremeDo) >= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis, 22display.disp1tip, 22display.disp2tip"