const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    timezone: 'CET',
    dateString: [
        'DATE',
        'TIMESTAMP'
    ]
});

connection.on('connection', connection => {
    connection.query("SET time_zone='+02:00';", err => {
        if (err) {
            throw err;
        }
    });
});

connection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed!');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections!');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused!')
        }
    }
    if (connection) connection.release();
    console.log('Database parkingServis ' + connection.state);
    return;
});

class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    async getUserByNameAndPassword(userName, userPassw) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 01users WHERE userName=? AND userPassw=?;";
                connection.query(query, [userName, userPassw], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllActiveUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 01users WHERE userActive=1 AND userRank IN (1, 2, 3);";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllUsers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 01users;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllActiveLocations() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 03locations WHERE locActive=1 ORDER BY locID;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllActiveZonesData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 02zones WHERE zoneActive=1;";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getZonesFreeNow(zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT zoneMaxFree, zoneFreeNow FROM 02zones WHERE zoneShort=?;";
                connection.query(query, [zoneShort], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getAllDataByZoneShort(zoneShort, zoneShort2, zoneShort3, zoneShort4) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT zoneFreeNow, zoneShort FROM 02zones WHERE zoneShort IN (?,?,?,?);";
                connection.query(query, [zoneShort, zoneShort2, zoneShort3, zoneShort4], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getLocationsDataByID(locID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 03locations WHERE locID = ?;";
                connection.query(query, [locID], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getLocationsDataByLocNumber(locNumber) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 03locations WHERE locNumber = ?;";
                connection.query(query, [locNumber], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async insertNewUser(userName, userPassw, userFLname, userRank, userTitle, userMail, userInfoType, userInfoTime, userCreatedByID) {
        try {
            const insertUser = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 01users (userName, userPassw, userFLname, userRank, userTitle, userMail, userInfoType, userInfoTime, userCreatedByID, userCreatedTD) VALUES (?,?,?,?,?,?,?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [userName, userPassw, userFLname, userRank, userTitle, userMail, userInfoType, userInfoTime, userCreatedByID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertUser);
                })
            });
            // return {
            //     userName: userName
            // };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewLocation(locType, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID) {
        try {
            const insertLocation = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 03locations (locType, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID, locCreatedTD) VALUES (?,?,?,?,?,?,?,?,?,?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [locType, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    // console.log(result);
                    resolve(result);
                })
            });
            return {
                insertLocation
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewZone(zoneNumber, zoneName, zoneShort, zoneLokacija, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 02zones (zoneNumber, zoneName, zoneShort, zoneLokacija, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID, zoneCreatedTD) VALUES (?,?,?,?,?,?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [zoneNumber, zoneName, zoneShort, zoneLokacija, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    // console.log(result);
                    resolve(result);
                })
            });
            return {
                insertZone
            };
        } catch (error) {
            console.log(error);
        }
    }
    async insertFreeNowData(zoneFreeNow, zoneOccup, zoneColor, zoneUpDnEq, zoneShort) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "UPDATE 02zones SET zoneFreeNow = ?, zoneOccup = ?, zoneColor = ?, zoneUpDnEq = ? WHERE zoneShort = ?";
                connection.query(query, [zoneFreeNow, zoneOccup, zoneColor, zoneUpDnEq, zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(insertZone);
            return insertZone;
        } catch (error) {
            console.log(error);
        }
    }
    async updateUserById(userActive, userID) {
        try {
            userID = parseInt(userID, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 01users SET userActive = ? WHERE userID = ?";

                connection.query(query, [userActive, userID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateLocationById(locActive, locID) {
        try {
            console.log(locID);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locActive = ? WHERE locID = ?";
                connection.query(query, [locActive, locID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateLocatiOnLastPacket(lastPacket, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locNumber) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locLastPacket = ?, locDisp1value = ?, locDisp2value =?, locDisp3value = ?, locDisp4value = ?, locLastCommTD = CURRENT_TIMESTAMP WHERE locNumber = ? and locType = 1";
                connection.query(query, [lastPacket, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locNumber], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async editLocation(locType, locNumber, locSname, locLname, locDesc, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locLat, locLong, locCreatedTD, locDisable, locDisabledByID, locDisableDesc, locEventMask, locCommInfo, locID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locType = ?, locNumber = ?, locSname = ?, locLname = ?, locDesc = ?, locDisp1zoneID = ?, locDisp2zoneID = ?, locDisp3zoneID = ?, locDisp4zoneID = ?, locLat = ?, locLong = ?, locCreatedTD = ?, locDisable = ?, locDisabledByID = ?, locDisableDesc = ?, locEventMask = ?, locCommInfo = ? WHERE locID = ?";
                connection.query(query, [locType, locNumber, locSname, locLname, locDesc, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locLat, locLong, locCreatedTD, locDisable, locDisabledByID, locDisableDesc, locEventMask, locCommInfo, locID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateZoneById(zoneActive, zoneID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 02zones SET zoneActive = ? WHERE zoneID = ?";
                connection.query(query, [zoneActive, zoneID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getZoneData(zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 02zones WHERE zoneShort = ?;";
                connection.query(query, [zoneShort], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getZoneDataByID(locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT zoneFreeNow, zoneShort FROM 02zones WHERE zoneShort IN (?,?,?,?);";
                connection.query(query, [locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // Statistics 
    async insertFreeNowDataStatistic(zoneShort, zoneMaxFree, zoneFreeNow) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "INSERT INTO zonefree (zoneShort, zoneMaxFree, zoneFreeNow, zoneDT) VALUES (?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [zoneShort, zoneMaxFree, zoneFreeNow], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return insertZone;
        } catch (error) {
            console.log(error);
        }
    }
    async getFreeNowDataStatistic() {
        try {
            const getStatisticFreeNow = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM zonefree;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return getStatisticFreeNow;
        } catch (error) {
            console.log(error);
        }
    }
    // Sensit free
    async sensitFree(bay, zone, lot) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 24nedapjson (bay, zone, lot) VALUE (?,?,?)";
                connection.query(query, [bay, zone, lot], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            return false;
        }
    }
    async create31LotZoneSum() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 'CREATE TABLE 31lotzonesum SELECT `lot`, `zone`, COUNT(*) AS `ukupno` FROM `24nedapjson` GROUP BY `lot`, `zone`;'
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async create33dispSum1() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 33dispsum1 SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 22display.disp1opis, 22display.disp2opis, 21locationss.SlocOpisLokacije, SUM(31lotzonesum.ukupno * 23time.`sign+1-1`) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotzonesum ON(23time.lot = 31lotzonesum.lot) AND(23time.zone = 31lotzonesum.zone) WHERE(((23time.`disp1-2`) = 1) AND((23time.vremeOd) <= CURRENT_TIME) AND((23time.vremeDo) >= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis, 22display.disp1tip, 22display.disp2tip";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create34dispSum2() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 34dispsum2 SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 22display.disp1opis, 22display.disp2opis, 21locationss.SlocOpisLokacije, 0 AS ZaDisplej1, Sum(31lotzonesum.Ukupno*23time.`sign+1-1`) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotzonesum ON (23time.Lot = 31lotzonesum.Lot) AND (23time.Zone = 31lotzonesum.Zone) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis,  22display.disp1tip, 22display.disp2tip";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create35unionSum() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 35unijasum SELECT * FROM 33dispsum1 UNION ALL SELECT * FROM 34dispsum2;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create36unionSum() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 36unijasum SELECT 35unijasum.dispID, 35unijasum.zoneShort, 35unijasum.lokacija, 35unijasum.SlocOpisLokacije, 35unijasum.disp1opis, 35unijasum.disp2opis, Sum(35unijasum.ZaDisplej1) AS ZaDisplej1, Sum(35unijasum.ZaDisplej2) AS ZaDisplej2, 35unijasum.disp1tip, 35unijasum.disp2tip FROM 35unijasum GROUP BY 35unijasum.dispID, 35unijasum.zoneShort, 35unijasum.lokacija, 35unijasum.SlocOpisLokacije, 35unijasum.disp1opis, 35unijasum.disp2opis, 35unijasum.disp1tip, 35unijasum.disp2tip;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create43dispSum1All() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 43dispsum1all SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis,  Sum(COALESCE(31lotzonesum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotzonesum ON (23time.Lot = 31lotzonesum.Lot) AND (23time.Zone = 31lotzonesum.Zone) WHERE (((23time.`disp1-2`)=1) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije,22display.disp1opis, 22display.disp2opis,  22display.disp1tip, 22display.disp2tip;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create44dispSum2All() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 44dispsum2all SELECT 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis, 0 AS ZaDisplej1, Sum(COALESCE(31lotzonesum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationss INNER JOIN 22display ON 21locationss.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotzonesum ON (23time.Zone = 31lotzonesum.Zone) AND (23time.Lot = 31lotzonesum.Lot) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.zoneShort, 22display.lokacija, 21locationss.SlocOpisLokacije, 22display.disp1opis, 22display.disp2opis, 22display.disp1tip, 22display.disp2tip;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create45unijaSumAll() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 45unijasumall SELECT * FROM 43dispsum1all UNION ALL SELECT * FROM 44dispsum2all;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async create46groupSumAll() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "CREATE TABLE 46groupsumall SELECT 45unijasumall.dispID, 45unijasumall.zoneShort, 45unijasumall.lokacija, 45unijasumall.SlocOpisLokacije, 45unijasumall.disp1opis, 45unijasumall.disp2opis, Sum(45unijasumall.ZaDisplej1) AS ZaDisplej1, Sum(45unijasumall.ZaDisplej2) AS ZaDisplej2, 45unijasumall.disp1tip, 45unijasumall.disp2tip FROM 45unijasumall GROUP BY 45unijasumall.dispID, 45unijasumall.zoneShort, 45unijasumall.lokacija, 45unijasumall.SlocOpisLokacije, 45unijasumall.disp1opis, 45unijasumall.disp2opis, 45unijasumall.disp1tip, 45unijasumall.disp2tip;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async get46groupSumAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 46groupsumall;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // async update46final(zoneShort, lokacija, zoneName, disp1opis, disp2opis, ZaDisplej1, ZaDisplej2, disp1tip, disp2tip) {
    async update46final(ZaDisplej1, ZaDisplej2, zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 46final SET ZaDisplej1 = ?, ZaDisplej2 = ? WHERE zoneShort = ?;";
                // const query = "UPDATE 46final SET zoneShort = ?, lokacija = ?, zoneName = ?, disp1opis = ?, disp2opis = ?, ZaDisplej1 = ?, ZaDisplej2 = ?, disp1tip = ?, disp2tip = ? WHERE zoneShort = ?;";
                // const query = "INSERT INTO 46final (zoneShort, lokacija, zoneName, disp1opis, disp2opis, ZaDisplej1, ZaDisplej2, disp1tip, disp2tip) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE zoneShort = VALUES(zoneShort), lokacija = VALUES(lokacija), zoneName = VALUES(zoneName), disp1opis = VALUES(disp1opis), disp2opis = VALUES(disp2opis), ZaDisplej1 = VALUES(ZaDisplej1), ZaDisplej2 = VALUES(ZaDisplej2), disp1tip = VALUES(disp1tip), disp2tip = VALUES(disp2tip);";
                // connection.query(query, [zoneShort, lokacija, zoneName, disp1opis, disp2opis, ZaDisplej1, ZaDisplej2, disp1tip, disp2tip, zoneShort], (err, result) => {
                connection.query(query, [ZaDisplej1, ZaDisplej2, zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async get46finalSensit() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 46final ORDER BY zoneShort;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getSensitDataByDisplayID(locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 46final WHERE zoneShort IN (?,?,?,?);";
                connection.query(query, [locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async getSensitDataByLocNumber(locNumber) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 03locations WHERE locNumber = ? AND locType = 2";
                connection.query(query, [locNumber], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async updateSensitOnLastPacket(sensitLastPacket, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locNumber) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locLastPacket = ?, locDisp1value = ?, locDisp2value = ?, locDisp3value = ?, locDisp4value = ?, locLastCommTD = CURRENT_TIMESTAMP WHERE locNumber = ? and locType = 2";
                connection.query(query, [sensitLastPacket, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locNumber], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteFromSensitFree() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM 24nedapjson";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async dropSumTables() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DROP TABLE 31lotzonesum, 33dispsum1, 34dispsum2, 35unijasum, 36unijasum, 43dispsum1all, 44dispsum2all, 45unijasumall, 46groupsumall";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    // last communication
    async lastCommunication() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT locID, locLname, locLastCommTD, emailSent, locNumber FROM 03locations;"
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateLastCommunication(locColor, locID) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locColor = ? WHERE locID = ?";
                connection.query(query, [locColor, locID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(insertZone);
            return insertZone;
        } catch (error) {
            console.log(error);
        }
    }
    async updateLastCommunicationOnEmailSent(emailSent, locID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET emailSent = ? WHERE locID = ?";
                connection.query(query, [emailSent, locID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            // console.log(insertZone);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async lastCommunicationMail() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT locID, locLastCommTD, locLastPacket, locType, locSname FROM 03locations;"
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async insertEvents(eventName, eventDesc) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 04events (eventName, eventDesc) VALUES (?,?)";
                connection.query(query, [eventName, eventDesc], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async selectEvents() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 04events";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    //test
    async updateTest(upTest) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE packagetest SET package = ? WHERE id = 2";
                connection.query(query, [upTest], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getTest() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM packagetest WHERE id = 2;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateTest2(upTest) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE packagetest2 SET package = ? WHERE id = 1";
                connection.query(query, [upTest], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getTest2() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM packagetest2 WHERE id = 1;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    // Insert New Sensit
    async sensitFree2(bay, zone, lot) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 24nedapjson2 (bay, zone, lot) VALUE (?,?,?)";
                connection.query(query, [bay, zone, lot], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response === 1 ? true : false;
        } catch (error) {
            return false;
        }
    }
    async create31LotZoneSum2() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 'CREATE TABLE 31lotzonesum2 SELECT `lot`, `zone`, COUNT(*) AS `ukupno` FROM `24nedapjson2` GROUP BY `lot`, `zone`;'
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async deleteFromSensitFree2() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM 24nedapjson2";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async dropSumTables2() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DROP TABLE 31lotzonesum2";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async insertNewSensitZone(zoneNumber, zoneShort, zoneName, SlocOpisLokacije, disp1tip, disp2tip, disp1opis, disp2opis, zaDisp1, zaDisp2, zoneCreatedByID) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "INSERT INTO sensitzone (zoneNumber, zoneShort, zoneName, SlocOpisLokacije, disp1tip, disp2tip, disp1opis, disp2opis, zaDisp1, zaDisp2, zoneCreatedByID) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
                connection.query(query, [zoneNumber, zoneShort, zoneName, SlocOpisLokacije, disp1tip, disp2tip, disp1opis, disp2opis, zaDisp1, zaDisp2, zoneCreatedByID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    // console.log(result);
                    resolve(result);
                })
            });
            return {
                insertZone
            };
        } catch (error) {
            console.log(error);
        }
    }
    async getSensitData(zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM sensitzone WHERE zoneShort = ?;";
                connection.query(query, [zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getSensitZoneShort() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT zoneShort FROM sensitzone;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async get31LotZoneSum(lot) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 31lotzonesum2 WHERE lot = ?;";
                connection.query(query, [lot], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getSensitZone() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM sensitzone;";
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateSensitZoneDisplay1(zaDisp1val, zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE sensitzone SET zaDisp1val = ? WHERE zoneShort = ?";;
                connection.query(query, [zaDisp1val, zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateSensitZoneDisplay2(zaDisp2val, zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE sensitzone SET zaDisp2val = ? WHERE zoneShort = ?";;
                connection.query(query, [zaDisp2val, zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async getSensitDataByID(ID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM sensitzone WHERE ID = ?;";
                connection.query(query, [ID], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async updateSensitZone(zoneName, SlocOpisLokacije, disp1tip, disp2tip, disp1opis, disp2opis, zaDisp1, zaDisp2, zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE sensitzone SET zoneName = ?, SlocOpisLokacije = ?, disp1tip =? , disp2tip = ?, disp1opis = ?, disp2opis = ?, zaDisp1= ?, zaDisp2= ?  WHERE zoneShort = ?;";
                connection.query(query, [zoneName, SlocOpisLokacije, disp1tip, disp2tip, disp1opis, disp2opis, zaDisp1, zaDisp2, zoneShort], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async deleteSensitZone(zoneID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM sensitzone WHERE ID = ?;";
                connection.query(query, [zoneID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;
