const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const email = require('./email');
// const net = require('./net-ceo2');
const fs = require('fs');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.static('../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/favicon.ico', express.static('../public/favicon.ico'));

// read
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/login.html'));
});
app.get('/dbPodaci', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/dbPodaci.html'));
});
app.post('/dbPodaci', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/dbPodaci.html'));
});
app.get('/01users', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/01users.html'));
});
app.get('/mapa', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/mapa.html'));
});
app.get('/statistika', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/statistika.html'));
});
app.get('/03locations', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/03locations.html'));
});
app.get('/02zones', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/02zones.html'));
});
app.get('/sensitZones', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/sensitZones.html'));
});
app.get('/test', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/test.html'));
});
app.get('/test2', (request, response) => {
    response.sendFile(path.join(__dirname, '../public/test2.html'));
});

// get db data
app.get('/getAllActiveUsers', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllActiveUsers();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getAllUsers', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllUsers();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getAllActiveZonesData', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllActiveZonesData();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getAllActiveLocations', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllActiveLocations();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getFreeNowDataStatistic', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getFreeNowDataStatistic();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.patch('/getLocationsDataByID', (request, response) => {
    const locID = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.getLocationsDataByID(locID.locID);
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
// sensit data
app.get('/get46finalSensit', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.get46finalSensit();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getSensitZone', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getSensitZone();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.patch('/getSensitDataByID', (request, response) => {
    const locID = request.body;
    console.log(locID);
    const db = dbService.getDbServiceInstance();
    const result = db.getSensitDataByID(locID.ID);
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.patch('/updateSensitZone', (request, response) => {
    const sensitUpdate = request.body;
    const zaDisp1 = JSON.stringify(sensitUpdate.zaDisp1);
    const zaDisp2 = JSON.stringify(sensitUpdate.zaDisp2);
    const db = dbService.getDbServiceInstance();
    const result = db.updateSensitZone(sensitUpdate.zoneName, sensitUpdate.SlocOpisLokacije, sensitUpdate.disp1tip, sensitUpdate.disp2tip, sensitUpdate.disp1opis, sensitUpdate.disp2opis, zaDisp1, zaDisp2, sensitUpdate.zoneShort);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/deleteSensitZone', (request, response) => {
    const zoneID = request.body.ID;
    console.log(zoneID);
    const db = dbService.getDbServiceInstance();
    const result = db.deleteSensitZone(zoneID);
    result.then(data => console.log(data))
        .catch(err => console.log(err));
});
// create 
app.post('/insertNewUser', (request, response) => {
    const user = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewUser(user.userName, user.userPassw, user.userFLname, user.userRank, user.userTitle, user.userMail, user.userInfoType, user.userInfoTime, user.userCreatedByID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});
app.post('/insertNewLocation', (request, response) => {
    const location = request.body;
    // console.log(location);
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewLocation(location.locType, location.locDisp1zoneID, location.locDisp2zoneID, location.locDisp3zoneID, location.locDisp4zoneID, location.locNumber, location.locSname, location.locLname, location.locDesc, location.locLat, location.locLong, location.locCreatedByID);
    result
        .then(data => console.log(data))
        .catch(err => console.log(err));
});
app.post('/insertNewZone', (request, response) => {
    const zone = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewZone(zone.zoneNumber, zone.zoneName, zone.zoneShort, zone.zoneLokacija, zone.zoneLat, zone.zoneLong, zone.zoneMaxFree, zone.zoneCreatedByID);
    result
        .then(data => console.log(data))
        .catch(err => console.log(err));
});
app.post('/insertNewSensitZone', (request, response) => {
    const zone = request.body;
    console.log(zone);
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewSensitZone(Number(zone.zoneNumber), zone.zoneShort, zone.zoneName, zone.SlocOpisLokacije, zone.disp1tip, zone.disp2tip, zone.disp1opis, zone.disp2opis, JSON.stringify(zone.zaDisp1), JSON.stringify(zone.zaDisp2), zone.zoneCreatedByID);
    result
        .then(data => console.log(data))
        .catch(err => console.log(err));
});

// Login
app.post('/login', (request, response) => {
    const userName = request.body.userName;
    const userPassw = request.body.userPassw;
    if (userName && userPassw) {
        const db = dbService.getDbServiceInstance();
        const result = db.getUserByNameAndPassword(userName, userPassw);
        result.then(data => {
            if (data.length > 0) {
                const userData = data[0];
                if (userData.userActive === 1) {
                    response.json({ success: data, message: 'Success!!' })
                    return;
                }
                if (userData.userActive === 0) {
                    response.json({ success: 0, message: 'Korisnik nije aktivan! Obratite  se adminu.' })
                    return;
                }
            } else {
                response.json({ message: 'Pogresan Usernam ili Password!' })
            }

        })
            .catch(err => console.log(err));
    }
});
// update 
app.patch('/updateTest', (request, response) => {
    const { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10 } = request.body;
    const upTest = `${a1}, ${a2}, ${a3}, ${a4}, ${a5}, ${a6}, ${a7}, ${a8}, ${a9}, ${a9}, ${a10}`;
    console.log(upTest.replace(/\s/g, '').toString());
    const db = dbService.getDbServiceInstance();
    const result = db.updateTest(upTest.replace(/\s/g, '').toString());
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/updateTest2', (request, response) => {
    const { a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14 } = request.body;
    const upTest = `${a1}, ${a2}, ${a3}, ${a4}, ${a5}, ${a6}, ${a7}, ${a8}, ${a9}, ${a10}, ${a11}, ${a12}, ${a13}, ${a14}`;
    console.log(upTest.replace(/\s/g, '').toString());
    const db = dbService.getDbServiceInstance();
    const result = db.updateTest2(upTest.replace(/\s/g, '').toString());
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/deleteUser', (request, response) => {
    const { userID, userActive } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateUserById(userActive, userID);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/deleteLocation', (request, response) => {
    const { locActive, locID } = request.body;
    const db = dbService.getDbServiceInstance();
    const result = db.updateLocationById(locActive, locID);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/editLocation', (request, response) => {
    const location = request.body;
    console.log(location);
    // console.log(location.locDisabledTD.replace(/['"]+/g, ''));
    const db = dbService.getDbServiceInstance();
    const result = db.editLocation(location.locType, location.locNumber, location.locSname, location.locLname, location.locDesc, location.locDisp1zoneID, location.locDisp2zoneID, location.locDisp3zoneID, location.locDisp4zoneID, location.locLat, location.locLong, location.locCreatedTD, location.locDisable, location.locDisabledByID, location.locDisableDesc, location.locEventMask, location.locCommInfo, location.locID);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});
app.patch('/deleteZone', (request, response) => {
    const { zoneActive, zoneID } = request.body;
    console.log(zoneID);
    const db = dbService.getDbServiceInstance();
    const result = db.updateZoneById(zoneActive, zoneID);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// zone data
app.get('/vuk', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('vuk');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/sla', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('sla');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/mgm', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('mgm');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/cvp', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('cvp');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/mk', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('mk');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/dg', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('dg');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/pol', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('pol');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/kam', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('kam');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/vis', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('vis');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/cuk', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('cuk');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/bv', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('bv');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/bba', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('bba');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/onbg', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('onbg');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/vma', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('vma');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/obi', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('obi');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/zel', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('zel');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/mas', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('mas');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/pio', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('pio');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/drak', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('drak');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/scn', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('scn');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/bel', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('bel');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/ada', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('ada');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/kap', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('kap');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})
app.get('/zsnbg', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getZoneData('zsnbg');
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})

app.listen(process.env.PORT, process.env.IP, () => {
    console.log("app is running");
});


