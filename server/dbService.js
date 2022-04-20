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
    async getUserById(userName, userPassw) {
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
                const query = "SELECT * FROM 01users WHERE userActive=1;";
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
    async getAllZonesData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM 02zones;";
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
    async insertNewLocation(locType, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID) {
        try {
            const insertLocation = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 03locations (locType, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID, locCreatedTD) VALUES (?,?,?,?,?,?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [locType, locNumber, locSname, locLname, locDesc, locLat, locLong, locCreatedByID], (err, result) => {
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
    async insertNewZone(zoneNumber, zoneName, zoneShort, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID) {
        try {
            const insertZone = await new Promise((resolve, reject) => {
                const query = "INSERT INTO 02zones (zoneNumber, zoneName, zoneShort, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID, zoneCreatedTD) VALUES (?,?,?,?,?,?,?, CURRENT_TIMESTAMP)";
                connection.query(query, [zoneNumber, zoneName, zoneShort, zoneLat, zoneLong, zoneMaxFree, zoneCreatedByID], (err, result) => {
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
    async editLocation(locType, locNumber, locSname, locLname, locDesc, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locLat, locLong, locActive, locCreatedByID, locCreatedTD, locDisable, locDisabledByID, locDisableDesc, locEventMask, locLastCommTD, locLastPacket, locColor, locCommInfo, locID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE 03locations SET locType = ?, locNumber = ?, locSname = ?, locLname = ?, locDesc = ?, locDisp1zoneID = ?, locDisp2zoneID = ?, locDisp3zoneID = ?, locDisp4zoneID = ?, locDisp1value = ?, locDisp2value = ?, locDisp3value = ?, locDisp4value = ?, locLat = ?, locLong = ?, locActive = ?, locCreatedByID = ?, locCreatedTD = ?, locDisable = ?, locDisabledByID = ?, locDisableDesc = ?, locEventMask = ?, locLastCommTD = ?, locLastPacket = ?, locColor = ?, locCommInfo = ? WHERE locID = ?";
                connection.query(query, [locType, locNumber, locSname, locLname, locDesc, locDisp1zoneID, locDisp2zoneID, locDisp3zoneID, locDisp4zoneID, locDisp1value, locDisp2value, locDisp3value, locDisp4value, locLat, locLong, locActive, locCreatedByID, locCreatedTD, locDisable, locDisabledByID, locDisableDesc, locEventMask, locLastCommTD, locLastPacket, locColor, locCommInfo, locID], (err, result) => {
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
    // async searchByName(id) {
    //     try {
    //         const response = await new Promise((resolve, reject) => {
    //             const query = "SELECT * FROM 01users WHERE id = ?;";

    //             connection.query(query, [id], (err, results) => {
    //                 if (err) reject(new Error(err.message));
    //                 resolve(results);
    //             })
    //         });

    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
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
}

module.exports = DbService;
