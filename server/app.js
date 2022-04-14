const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const email = require('./email');
const net = require('./net-ceo');
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

// get db data
app.get('/getAllActiveUsers', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllActiveUsers();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getAllZonesData', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllZonesData();
    result.then(data => response.json(data))
        .catch(err => console.log(err));
});
app.get('/getAllActiveLocations', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllActiveLocations();
    result.then(data => response.json(data))
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
    const result = db.insertNewLocation(location.locType, location.locNumber, location.locSname, location.locLname, location.locDesc, location.locLat, location.locLong, location.locCreatedByID);
    result
        .then(data => console.log(data))
        .catch(err => console.log(err));
});
app.post('/insertNewZone', (request, response) => {
    const zone = request.body;
    console.log(zone);
    const db = dbService.getDbServiceInstance();
    const result = db.insertNewZone(zone.zoneNumber, zone.zoneName, zone.zoneShort, zone.zoneLat, zone.zoneLong, zone.zoneMaxFree, zone.zoneCreatedByID);
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
        const result = db.getUserById(userName, userPassw);
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
    console.log(request.body);
    const db = dbService.getDbServiceInstance();
    const result = db.updateLocationById(locActive, locID);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

// table
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


