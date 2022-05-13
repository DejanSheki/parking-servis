let instance = null;
const fs = require('fs');

class FileService {
    static getFileServiceInstance() {
        return instance ? instance : new FileService();
    }
    async locations(zoneShort) {
        try {
            const response = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${zoneShort}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // novi deo 
    async emptyParkingSpaces1(displej) {
        try {
            const response = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async emptyParkingSpaces2(displej1, displej2) {
        try {
            const slobodnaMesta = [];
            const slMestaDisplej1 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej1}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej2 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej2}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            slobodnaMesta.push(slMestaDisplej1, slMestaDisplej2)
            return slobodnaMesta;
        } catch (error) {
            console.log(error);
        }
    }
    async emptyParkingSpaces3(displej1, displej2, displej3) {
        try {
            const slobodnaMesta = [];
            const slMestaDisplej1 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej1}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej2 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej2}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej3 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej3}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            slobodnaMesta.push(slMestaDisplej1, slMestaDisplej2, slMestaDisplej3)
            return slobodnaMesta;
        } catch (error) {
            console.log(error);
        }
    }
    async emptyParkingSpaces4(displej1, displej2, displej3, displej4) {
        try {
            const slobodnaMesta = [];
            const slMestaDisplej1 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej1}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej2 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej2}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej3 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej3}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            const slMestaDisplej4 = await new Promise((resolve, reject) => {
                fs.readFile(`./objekti/${displej4}/PLS.008`, 'utf8', (err, data) => {
                    if (err) reject(new Error(err.message));
                    resolve(data);
                })
            });
            slobodnaMesta.push(slMestaDisplej1, slMestaDisplej2, slMestaDisplej3, slMestaDisplej4)
            return slobodnaMesta;
        } catch (error) {
            console.log(error);
        }
    }
    // log file
    async logFile(lastPacket) {
        try {
            const response = await new Promise((resolve, reject) => {
                fs.appendFile(`./log-file.log`, (lastPacket), err => {
                    if (err) reject(new Error(err.message));
                    resolve(lastPacket);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async logFileSensit(lastPacket) {
        try {
            const response = await new Promise((resolve, reject) => {
                fs.appendFile(`./log-file-sensit.log`, (lastPacket), err => {
                    if (err) reject(new Error(err.message));
                    resolve(lastPacket);
                })
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = FileService;
