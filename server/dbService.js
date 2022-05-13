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
                const query = "SELECT * FROM 03locations WHERE locActive=1;";
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
                const query = "UPDATE 03locations SET locLastPacket = ?, locDisp1value = ?, locDisp2value =?, locDisp3value = ?, locDisp4value = ?, locLastCommTD = CURRENT_TIMESTAMP WHERE locNumber = ?";
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
                const query = "SELECT zoneFreeNow, zoneID FROM 02zones WHERE zoneID IN (?,?,?,?);";
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
                    resolve(result.protocol41);
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
                const query = "INSERT INTO 24nedapJSON (bay, zone, lot) VALUE (?,?,?)";
                connection.query(query, [bay, zone, lot], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
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
                const query = "CREATE TABLE 33dispSum1 SELECT 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, SUM(31lotzonesum.ukupno * 23time.`sign+1-1`) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotZoneSum ON(23time.lot = 31lotZoneSum.lot) AND(23time.zone = 31lotZoneSum.zone) WHERE(((23time.`disp1-2`) = 1) AND((23time.vremeOd) <= CURRENT_TIME) AND((23time.vremeDo) >= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip";
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
                const query = "CREATE TABLE 34dispSum2 SELECT 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 0 AS ZaDisplej1, Sum(31lotZoneSum.Ukupno*23time.`sign+1-1`) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) INNER JOIN 23time ON 22display.dispID = 23time.IDdisp) INNER JOIN 31lotZoneSum ON (23time.Lot = 31lotZoneSum.Lot) AND (23time.Zone = 31lotZoneSum.Zone) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip";
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
                const query = "CREATE TABLE 35unijaSum SELECT * FROM 33dispSum1 UNION ALL SELECT * FROM 34dispSum2;";
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
                const query = "CREATE TABLE 36unijaSum SELECT 35unijaSum.dispID, 35unijaSum.oznaka, 35unijaSum.lokacija, 35unijaSum.SlocOpisLokacije, Sum(35unijaSum.ZaDisplej1) AS ZaDisplej1, Sum(35unijaSum.ZaDisplej2) AS ZaDisplej2, 35unijaSum.disp1tip, 35unijaSum.disp2tip FROM 35unijaSum GROUP BY 35unijaSum.dispID, 35unijaSum.oznaka, 35unijaSum.lokacija, 35unijaSum.SlocOpisLokacije, 35unijaSum.disp1tip, 35unijaSum.disp2tip;";
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
                const query = "CREATE TABLE 43dispSum1All SELECT 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, Sum(COALESCE(31lotZoneSum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej1, 0 AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotZoneSum ON (23time.Lot = 31lotZoneSum.Lot) AND (23time.Zone = 31lotZoneSum.Zone) WHERE (((23time.`disp1-2`)=1) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip;";
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
                const query = "CREATE TABLE 44dispSum2All SELECT 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 0 AS ZaDisplej1, Sum(COALESCE(31lotZoneSum.Ukupno)*COALESCE(23time.`sign+1-1`)) AS ZaDisplej2, 22display.disp1tip, 22display.disp2tip FROM ((21locationsS INNER JOIN 22display ON 21locationsS.Slokacija = 22display.lokacija) LEFT JOIN 23time ON 22display.dispID = 23time.IDdisp) LEFT JOIN 31lotZoneSum ON (23time.Zone = 31lotZoneSum.Zone) AND (23time.Lot = 31lotZoneSum.Lot) WHERE (((23time.`disp1-2`)=2) AND ((23time.vremeOd)<= CURRENT_TIME) AND ((23time.vremeDo)>= CURRENT_TIME)) GROUP BY 22display.dispID, 22display.oznaka, 22display.lokacija, 21locationsS.SlocOpisLokacije, 22display.disp1tip, 22display.disp2tip;;";
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
                const query = "CREATE TABLE 45unijaSumAll SELECT * FROM 43dispSum1all UNION ALL SELECT * FROM 44dispSum2all;";
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
                const query = "CREATE TABLE 46groupSumAll SELECT 45unijaSumAll.dispID, 45unijaSumAll.oznaka, 45unijaSumAll.lokacija, 45unijaSumAll.SlocOpisLokacije, Sum(45unijaSumAll.ZaDisplej1) AS ZaDisplej1, Sum(45unijaSumAll.ZaDisplej2) AS ZaDisplej2, 45unijaSumAll.disp1tip, 45unijaSumAll.disp2tip FROM 45unijaSumAll GROUP BY 45unijaSumAll.dispID, 45unijaSumAll.oznaka, 45unijaSumAll.lokacija, 45unijaSumAll.SlocOpisLokacije, 45unijaSumAll.disp1tip, 45unijaSumAll.disp2tip;";
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
    async deleteFromSensitFree() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM 24nedapJSON";
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
                const query = "DROP TABLE 31lotzonesum, 33dispSum1, 34dispSum2, 35unijaSum, 36unijaSum, 43dispSum1All, 44dispSum2All, 45unijaSumAll, 46groupSumAll";
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
}

module.exports = DbService;

