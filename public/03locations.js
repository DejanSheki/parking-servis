const locationsTable = document.querySelector('#locations-table');
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;

const editInput = document.querySelector('#editInput');

const locSname = document.querySelector('#locSname');
const locLname = document.querySelector('#locLname');
const locType = document.querySelector('#locType');
const locNumber = document.querySelector('#locNumber');
const locDesc = document.querySelector('#locDesc');
const locLat = document.querySelector('#locLat');
const locLong = document.querySelector('#locLong');
const form = document.querySelector('#insertNewLocation');

const loc = {};

// Obrcemo redosled u stringu(datum 2022-01-01 -> 01.01.2022)
function reverseString(str) {
    const date = new Date(str).toLocaleDateString('sr');
    const hours = new Date(str).toLocaleTimeString('sr');
    return `${date} &nbsp; ${hours}`;
}

// Svi uredjaji iz baze
async function fetchData() {
    const data = await fetch("http://192.168.0.10:2021/getAllActiveLocations");
    const dbData = await data.json();
    createTable(dbData);
    console.log(dbData);
}

function createTable(dbData) {
    dbData.forEach(dat => {
        let tr = document.createElement('tr');
        let locModel = '';
        let model = () => {
            if (dat.locType === 1) {
                return locModel = 'P-INFO';
            }
            if (dat.locType === 0) {
                return locModel = 'SENSIT';
            }
        }
        tr.innerHTML = `
			<td>${dat.locSname}</td>
			<td>${dat.locID}</td>
			<td>${dat.locNumber}</td>
            <td>${dat.locLname}</td>
			<td>${reverseString(dat.locCreatedTD)}</td>
			<td>${model()}</td>
			<td>${reverseString(dat.locLastCommTD)}</td>
			<td>${dat.locDisp1value}</td>
			<td>${dat.locDisp2value}</td>
			<td>${dat.locDisp3value}</td>
			<td>${dat.locDisp4value}</td>
			<td>${dat.locDesc}</td>
            <td style="width: 200px;overflow-x: scroll;display: block;">${dat.locLastPacket}</td>
            <td><button class='editBtn' id=${dat.locID}>Edit</button></td>
            <td><button class='deleteBtn' id=${dat.locID}>Delete</button></td>
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
            fetch(`http://192.168.0.10:2021/getLocationsDataByID`, options)
                .then(data => data.json())
                .then(dbData => {
                    console.log(dbData);
                    createEditInput(dbData)
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
});


function createEditInput(dbData) {
    dbData.forEach(dat => {
        editInput.innerHTML = `
        <label for="locID">ID: </label>
        <input type="text" name="locID" value="${dat.locID}" required />
        <label for="locType">Model: </label>
        <input type="text" name="locType" value="${dat.locType}" required />
        <label for="locNumber">Broj lokacije: </label>
        <input type="text" name="locNumber" value="${dat.locNumber}" required />
        <label for="locSname">Oznaka: </label>
        <input type="text" name="locSname" value="${dat.locSname}" required />
        <label for="locLname">Naziv lokacije: </label>
        <input type="text" name="locLname" value="${dat.locLname}" required />
        <label for="locDesc">Opis: </label>
        <input type="text" name="locDesc" value="${dat.locDesc}" required />
        <label for="locDisp1zoneID">Displej 1 ID objekta: </label>
        <input type="text" name="locDisp1zoneID" value="${dat.locDisp1zoneID}" required />
        <label for="locDisp2zoneID">Displej 2 ID objekta: </label>
        <input type="text" name="locDisp2zoneID" value="${dat.locDisp2zoneID}" required />
        <label for="locDisp3zoneID">Displej 3 ID objekta: </label>
        <input type="text" name="locDisp3zoneID" value="${dat.locDisp3zoneID}" required />
        <label for="locDisp4zoneID">Displej 4 ID objekta: </label>
        <input type="text" name="locDisp4zoneID" value="${dat.locDisp4zoneID}" required />
        <label for="locDisp1value">Displej 1: </label>
        <input type="text" name="locDisp1value" value="${dat.locDisp1value}" required />
        <label for="locDisp2value">Displej 2: </label>
        <input type="text" name="locDisp2value" value="${dat.locDisp2value}" required />
        <label for="locDisp3value">Displej 3: </label>
        <input type="text" name="locDisp3value" value="${dat.locDisp3value}" required />
        <label for="locDisp4value">Displej 4: </label>
        <input type="text" name="locDisp4value" value="${dat.locDisp4value}" required />
        <label for="locLat">Latituda: </label>
        <input type="text" name="locLat" value="${dat.locLat}" required />
        <label for="locLong">Longituda: </label>
        <input type="text" name="locLong" value="${dat.locLong}" required />
        <label for="locActive">Aktivna/Neaktivna: </label>
        <input type="text" name="locActive" value="${dat.locActive}" required />
        <label for="locCreatedByID">ID korisnika: </label>
        <input type="text" name="locCreatedByID" value="${dat.locCreatedByID}" required />
        <label for="locCreatedTD">Datum kreiranja: </label>
        <input type="text" name="locCreatedTD" value="${dat.locCreatedTD}" required />
        <label for="locDisable">Enejblovana/Disejblovana: </label>
        <input type="text" name="locDisable" value="${dat.locDisable}" required />
        <label for="locDisabledByID">ID korisnika koji je disejblovao: </label>
        <input type="text" name="locDisabledByID" value="${dat.locDisabledByID}" required />
        <label for="locDisabledTD">Vreme disejblovanja: </label>
        <input type="text" name="locDisabledTD" value="${dat.locDisabledTD}" required />
        <label for="locDisableDesc">Opis disejblovanja: </label>
        <input type="text" name="locDisableDesc" value="${dat.locDisableDesc}" required />
        <label for="locEventMask">Event Mask: </label>
        <input type="text" name="locEventMask" value="${dat.locEventMask}" required />
        <label for="locLastCommTD">Poslednje javljanje: </label>
        <input type="text" name="locLastCommTD" value="${dat.locLastCommTD}" required />
        <label for="locLastPacket">Poslednji paket: </label>
        <input type="text" name="locLastPacket" value="${dat.locLastPacket}" required />
        <label for="locColor">Boja: </label>
        <input type="text" name="locColor" value="${dat.locColor}" required />
        <label for="locCommInfo">Boja: </label>
        <input type="text" name="locCommInfo" value="${dat.locCommInfo}" required />
        <button id="editBtnSubmit">Submit</button>
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
            loc.locDisp1value = editInput[10].value;
            loc.locDisp2value = editInput[11].value;
            loc.locDisp3value = editInput[12].value;
            loc.locDisp4value = editInput[13].value;
            loc.locLat = editInput[14].value;
            loc.locLong = editInput[15].value;
            loc.locActive = editInput[16].value;
            loc.locCreatedByID = editInput[17].value;
            loc.locCreatedTD = editInput[18].value;
            loc.locDisable = editInput[19].value;
            loc.locDisabledByID = editInput[20].value;
            // loc.locDisabledTD = editInput[21].value;
            loc.locDisableDesc = editInput[22].value;
            loc.locEventMask = editInput[23].value;
            loc.locLastCommTD = editInput[24].value;
            loc.locLastPacket = editInput[25].value;
            loc.locColor = editInput[26].value;
            loc.locCommInfo = editInput[27].value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loc)
            }
            fetch('http://192.168.0.10:2021/editLocation', options);
            console.log(loc);
            editInput.innerHTML = '';
            locationsTable.innerHTML = '';
            fetchData();
        })
    });

}

const interval = setInterval(() => {
    locationsTable.innerHTML = '';
    fetchData();
}, 20000);