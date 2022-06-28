const { exec } = require("child_process");

const ipAndfolder = [
    { ip: '192.168.62.62', folder: 'obi' },
    { ip: '192.168.64.64', folder: 'mas' },
    { ip: '192.168.65.65', folder: 'pio' },
    { ip: '192.168.66.66', folder: 'scn' },
    { ip: '192.168.71.71', folder: 'kap' },
    { ip: '192.168.85.85', folder: 'onbg' }
];

const interval = setInterval(() => {
    ipAndfolder.forEach(f => {
        console.log(`ip: ${f.ip}, folder: ${f.folder}`);
        exec(`curl  -k "sftp://${f.ip}:/newsys/transfer/PLS.008" --user "ZR20010:ZR20010" -o "/home/dejan/Desktop/parkingServis/node_express/server/objekti/${f.folder}/PLS.008"`, (error, stdout, stderr) => {
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