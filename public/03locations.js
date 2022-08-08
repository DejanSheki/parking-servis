const locationsTable = document.querySelector('#locations-table');
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const locationAdd = document.querySelector('#locationAdd');
const insertLocation = document.querySelector('.insert-location');

const editContainer = document.querySelector('.edit-container');
const editInput = document.querySelector('#editInput');
const closeBtn = document.querySelector('#close');

const locSname = document.querySelector('#locSname');
const locLname = document.querySelector('#locLname');
const locType = document.querySelector('#locType');
const displej1 = document.querySelector('#locDisp1zoneID');
const displej2 = document.querySelector('#locDisp2zoneID');
const displej3 = document.querySelector('#locDisp3zoneID');
const displej4 = document.querySelector('#locDisp4zoneID');
const locNumber = document.querySelector('#locNumber');
const locDesc = document.querySelector('#locDesc');
const locLat = document.querySelector('#locLat');
const locLong = document.querySelector('#locLong');
const form = document.querySelector('#insertNewLocation');
const loc = {};

let locModel = '';
const model = (dat) => {
    if (dat.locType === 1) {
        return locModel = 'P-INFO';
    }
    if (dat.locType === 2) {
        return locModel = 'SENSIT';
    }
}
let disabledEnabled = '';
const disEnb = (dat) => {
    if (dat.locDisable === 0) {
        return disabledEnabled = 'Radi';
    }
    if (dat.locDisable === 1) {
        return disabledEnabled = 'Isključena';
    }
}
const eventMask = (dat) => {
    if (dat.locEventMask === 0) {
        return '&#x2713;';
    }
    if (dat.locEventMask === 1) {
        return '&#45;';
    }
}
function display(dbData, dat) {
    const zones = [...dbData[1], ...dbData[2]]
    const displayData = {};
    zones.forEach(d => {
        if (d.zoneShort === dat.locDisp1zoneID) {
            displayData.d1 = d.zoneShort;
        } else if (displayData.d1 === undefined) {
            displayData.d1 = '---';
        }
        if (d.zoneShort === dat.locDisp2zoneID) {
            displayData.d2 = d.zoneShort;
        } else if (displayData.d2 === undefined) {
            displayData.d2 = '---';
        }
        if (d.zoneShort === dat.locDisp3zoneID) {
            displayData.d3 = d.zoneShort;
        } else if (displayData.d3 === undefined) {
            displayData.d3 = '---';
        }
        if (d.zoneShort === dat.locDisp4zoneID) {
            displayData.d4 = d.zoneShort;
        } else if (displayData.d4 === undefined) {
            displayData.d4 = '---';
        }
    })
    return displayData;
}
function selectedID(dbData, dat) {
    const displayData = {};
    dbData[0].forEach(d => {
        if (d.locDisp1zoneID === undefined || dat.locDisp1zoneID === '0') {
            displayData.d1 = '---';
        } else {
            displayData.d1 = dat.locDisp1zoneID;
        }
        if (dat.locDisp2zoneID === undefined || dat.locDisp2zoneID === '0') {
            displayData.d2 = '---';
        } else {
            displayData.d2 = dat.locDisp2zoneID;
        }
        if (dat.locDisp3zoneID === undefined || dat.locDisp3zoneID === '0') {
            displayData.d3 = '---';
        } else {
            displayData.d3 = dat.locDisp3zoneID;
        }
        if (dat.locDisp4zoneID === undefined || dat.locDisp4zoneID === '0') {
            displayData.d4 = '---';
        } else {
            displayData.d4 = dat.locDisp4zoneID;
        }
    })
    return displayData
}

// Dodaj lokaciju
locationAdd.addEventListener('click', () => {
    insertLocation.classList.add('edit-container-show');
});
closeBtn.addEventListener('click', () => {
    insertLocation.classList.remove('edit-container-show');
});

// Obrcemo redosled u stringu(datum 2022-01-01 -> 01.01.2022)
function reverseString(str) {
    const date = new Date(str).toLocaleDateString('sr');
    const hours = new Date(str).toLocaleTimeString('sr');
    return `${date} ${hours}`;
}

// Svi uredjaji iz baze
async function fetchData() {
    Promise.all([
        fetch(`http://192.168.0.10:2021/getAllActiveLocations`)
            .then(data => data.json()),
        fetch(`http://192.168.0.10:2021/getAllActiveZonesData`)
            .then(data => data.json()),
        fetch('http://192.168.0.10:2021/get46finalSensit')
            .then(data => data.json())
    ])
        .then((dbData) => {
            createTable(dbData);
        })
}

function createTable(dbData) {
    dbData[0].forEach(dat => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${model(dat)}</td>
			<td>${dat.locSname}</td>
            <td>${dat.locNumber}</td>
            <td>${dat.locLname}</td>
			<td>${reverseString(dat.locLastCommTD)}</td>
			<td>${display(dbData, dat).d1}</td>
			<td>${display(dbData, dat).d2}</td>
			<td>${display(dbData, dat).d3}</td>
			<td>${display(dbData, dat).d4}</td>
            <td >${dat.locLastPacket}</td>
            <td><button class='editBtn' id=${dat.locID}>Izmeni</button></td>
            <td><button class='deleteBtn' id=${dat.locID}>Obriši</button></td>
		`;
        locationsTable.appendChild(tr);
    });
    const deleteBtn = document.querySelectorAll(`.deleteBtn`);
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    locID: btn.id,
                    locActive: 0,
                })
            }
            fetch(`http://192.168.0.10:2021/deleteLocation`, options);
            btn.parentElement.parentElement.classList.add('remove');
        });
    });
    const editBtn = document.querySelectorAll('.editBtn');
    editBtn.forEach(btn => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                locID: btn.id,
            })
        }
        btn.addEventListener('click', (e) => {
            Promise.all([
                fetch(`http://192.168.0.10:2021/getLocationsDataByID`, options)
                    .then(data => data.json()),
                fetch(`http://192.168.0.10:2021/getAllActiveZonesData`)
                    .then(data => data.json()),
                fetch(`http://192.168.0.10:2021/getAllUsers`)
                    .then(data => data.json()),
                fetch(`http://192.168.0.10:2021/get46finalSensit`)
                    .then(data => data.json())
            ])
                .then((dbData) => {
                    console.log(dbData);
                    const { locCreatedByID, locDisabledByID } = dbData[0][0];
                    const { userFLname } = dbData[2].find(e => e.userID === locCreatedByID);
                    console.log(userFLname);
                    const userName = (id, name) => {
                        if (dbData[2].find(e => e.userID === locDisabledByID) === undefined) {
                            name = '---';
                            id = 0;
                            return { id, name }
                        } else if (dbData[2].find(e => e.userID === locDisabledByID)) {
                            name = dbData[2].find(e => e.userID === locDisabledByID).userName;
                            id = dbData[2].find(e => e.userID === locDisabledByID).userID;
                            return { id, name };
                        }
                    }
                    const disabledByName = userName();
                    // console.log(disabledByName);
                    // console.log(locDisabledByID);
                    createEditInput(dbData, userFLname, disabledByName);
                    createOptions(dbData);
                })
        });
    });
}
fetchData();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    loc.locSname = locSname.value;
    loc.locLname = locLname.value;
    loc.locType = locType.value;
    loc.locDisp1zoneID = displej1.value;
    loc.locDisp2zoneID = displej2.value;
    loc.locDisp3zoneID = displej3.value;
    loc.locDisp4zoneID = displej4.value;
    loc.locNumber = locNumber.value;
    loc.locDesc = locDesc.value;
    loc.locLat = locLat.value;
    loc.locLong = locLong.value;
    loc.locCreatedByID = sessionStorage.userID;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loc)
    }
    fetch('http://192.168.0.10:2021/insertNewLocation', options);
    form.reset();
    locationsTable.innerHTML = '';
    fetchData();
    insertLocation.classList.remove('edit-container-show');
});

function createEditInput(dbData, userFLname, disabledByName) {
    editContainer.classList.add('edit-container-show');
    dbData[0].forEach(dat => {
        editInput.innerHTML = `
        <label for="locID">ID: </label>
        <input type="text" name="locID" value="${dat.locID}" readonly />
        <label for="locType">Model: </label>
        <select name="locType" id="locType">
            <option value="${dat.locType}" selected>${model(dat)}</option>
            <option value="1">P-INFO</option>
            <option value="2">SENSIT</option>
        </select>
        <label for="locNumber">Broj lokacije: </label>
        <input type="text" name="locNumber" value="${dat.locNumber}" required />
        <label for="locSname">Oznaka: </label>
        <input type="text" name="locSname" value="${dat.locSname}" required />
        <label for="locLname">Naziv lokacije: </label>
        <input type="text" name="locLname" value="${dat.locLname}" required />
        <label for="locDesc">Opis: </label>
        <input type="text" name="locDesc" value="${dat.locDesc}" required />
        <label for="locDisp1zoneID">Displej 1: </label>
        <select name="locDisp1zoneID" id="display1options">
            <option value="${dat.locDisp1zoneID}" selected>${selectedID(dbData, dat).d1}</option>
            <option value="0">---</option>
        </select>
        <label for="locDisp2zoneID">Displej 2: </label>
        <select name="locDisp1zoneID" id="display2options">
        <option value="${dat.locDisp2zoneID}" selected>${selectedID(dbData, dat).d2}</option>
        <option value="0">---</option>
    </select>
        <label for="locDisp3zoneID">Displej 3: </label>
        <select name="locDisp1zoneID" id="display3options">
        <option value="${dat.locDisp3zoneID}" selected>${selectedID(dbData, dat).d3}</option>
        <option value="0">---</option>
    </select>
        <label for="locDisp4zoneID">Displej 4: </label>
        <select name="locDisp1zoneID" id="display4options">
        <option value="${dat.locDisp4zoneID}" selected>${selectedID(dbData, dat).d4}</option>
        <option value="0">---</option>
    </select>
        <label for="locLat">Latituda: </label>
        <input type="text" name="locLat" value="${dat.locLat}" required />
        <label for="locLong">Longituda: </label>
        <input type="text" name="locLong" value="${dat.locLong}" required />
        <label for="locCreatedByID">Kreirao: </label>
        <input type="text" name="locCreatedByID" value="${userFLname}" readonly />
        <label for="locCreatedTD">Datum kreiranja: </label>
        <input type="text" name="locCreatedTD" value="${dat.locCreatedTD}" required />
        <label for="locDisable">Privremeno isključena: </label>
        <select name="locDisable">
            <option value="${dat.locDisable}" selected>${disEnb(dat)}</option>
            <option value="0">Radi</option>
            <option value="1">Isključena</option>
        </select>
        <label for="locDisabledByID">Isključena od strane: </label>
        <input type="text" name="locDisabledByID" value="${disabledByName.name}" placeholder="${disabledByName.id}" required />
        <label for="locDisabledTD">Vreme privremenog isključenja: </label>
        <input type="text" name="locDisabledTD" value="${dat.locDisabledTD}" required />
        <label for="locDisableDesc">Opis privremenog isključenja: </label>
        <input type="text" name="locDisableDesc" value="${dat.locDisableDesc}" required />
        <label for="locEventMask">Event Mask: </label>
        <input type="text" name="locEventMask" value="${eventMask(dat)}" placeholder="${dat.locEventMask}" required />
        <label for="locCommInfo">Dodatni podaci: </label>
        <input type="text" name="locCommInfo" value="${dat.locCommInfo}" required />
        <button id="editBtnSubmit">Izmeni</button>
        <button id="close">Otkaži</button>
		`;
        const editBtnSubmit = document.querySelector('#editBtnSubmit');

        editBtnSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            loc.locID = editInput[0].value;
            loc.locType = editInput[1].value;
            loc.locNumber = editInput[2].value;
            loc.locSname = editInput[3].value;
            loc.locLname = editInput[4].value;
            loc.locDesc = editInput[5].value;
            loc.locDisp1zoneID = editInput[6].value;
            loc.locDisp2zoneID = editInput[7].value;
            loc.locDisp3zoneID = editInput[8].value;
            loc.locDisp4zoneID = editInput[9].value;
            loc.locLat = editInput[10].value;
            loc.locLong = editInput[11].value;;
            loc.locCreatedByID = editInput[12].value;
            loc.locCreatedTD = editInput[13].value;
            loc.locDisable = editInput[14].value;
            loc.locDisabledByID = editInput[15].placeholder;
            loc.locDisabledTD = editInput[16].value;
            loc.locDisableDesc = editInput[17].value;
            loc.locEventMask = editInput[18].placeholder;
            loc.locCommInfo = editInput[19].value;
            console.log(loc);
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loc)
            }
            fetch('http://192.168.0.10:2021/editLocation', options);
            editContainer.classList.remove('edit-container-show');
            editInput.innerHTML = '';
            locationsTable.innerHTML = '';
            fetchData();
        })
    });

}

const interval = setInterval(() => {
    locationsTable.innerHTML = '';
    fetchData();
}, 30000);

function createOptions(dbData) {
    const locDisp1 = document.querySelector('#display1options');
    const locDisp2 = document.querySelector('#display2options');
    const locDisp3 = document.querySelector('#display3options');
    const locDisp4 = document.querySelector('#display4options');
    const data = [...dbData[1], ...dbData[3]]
    data.forEach(dat => {
        locDisp1.add(new Option(dat.zoneShort, dat.zoneShort));
        locDisp2.add(new Option(dat.zoneShort, dat.zoneShort));
        locDisp3.add(new Option(dat.zoneShort, dat.zoneShort));
        locDisp4.add(new Option(dat.zoneShort, dat.zoneShort));
    })
}
