const locationsTable = document.querySelector('#locations-table');
const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;

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
            <td><button id=${dat.locID}>Delete</button></td>
		`;
        locationsTable.appendChild(tr);
    });
    const btn = document.querySelectorAll(`td button`);
    btn.forEach(b => {
        b.addEventListener('click', (e) => {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    locID: b.id,
                    locActive: 0,
                })
            }
            fetch(`http://192.168.0.10:2021/deleteLocation`, options);
            b.parentElement.parentElement.classList.add('remove');
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
    // insertUserForm.classList.add('remove');
    console.log(loc);
});
