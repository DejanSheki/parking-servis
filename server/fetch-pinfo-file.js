const { exec } = require("child_process");
const dotenv = require('dotenv');
dotenv.config();

const ipAndfolder = [
    { ip: '192.168.62.62', folder: 'obi' },
    { ip: '192.168.64.64', folder: 'mas' },
    { ip: '192.168.65.65', folder: 'pio' },
    { ip: '192.168.66.66', folder: 'scn' },
    { ip: '192.168.85.85', folder: 'onbg' },
    { ip: '192.168.61.61', folder: 'dg' },
    { ip: '192.168.55.55', folder: 'mk' },
    { ip: '192.168.63.63', folder: 'zel' },
    { ip: '192.168.67.67', folder: 'vuk' },
    { ip: '192.168.68.68', folder: 'vma' },
    { ip: '192.168.76.76', folder: 'drak' },
    { ip: '192.168.71.71', folder: 'kap' },
    { ip: '192.168.72.72', folder: 'ada' },
    { ip: '192.168.74.74', folder: 'sla' },
    { ip: '192.168.75.75', folder: 'mgm' },
    { ip: '192.168.86.86', folder: 'zsnbg' },
    { ip: '192.168.82.82', folder: 'vis' },
    { ip: '192.168.77.77', folder: 'pol' },
    { ip: '192.168.79.79', folder: 'cuk' },
    { ip: '192.168.78.78', folder: 'kam' },
    { ip: '192.168.81.81', folder: 'bel' },
    { ip: '192.168.83.83', folder: 'cvp' },
    { ip: '192.168.84.84', folder: 'bba' },
    { ip: '192.168.88.88', folder: 'bv' }
];

const interval = setInterval(() => {
    ipAndfolder.forEach(f => {
        console.log(`ip: ${f.ip}, folder: ${f.folder}`);
        exec(`curl  -k "sftp://${f.ip}:/newsys/transfer/PLS.008" --user ${process.env.ZR} -o "/home/dejan/Desktop/parkingServis/node_express/server/objekti/${f.folder}/PLS.008"`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);

        });
    })
}, 30000);