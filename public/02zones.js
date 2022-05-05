const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const form = document.querySelector('#insertNewZone');
const zoneNumber = document.querySelector('#zoneNumber');
const zoneName = document.querySelector('#zoneName');
const zoneShort = document.querySelector('#zoneShort');
const zoneLokacija = document.querySelector('#zoneLokacija');
const zoneLat = document.querySelector('#zoneLat');
const zoneLong = document.querySelector('#zoneLong');
const zoneMaxFree = document.querySelector('#zoneMaxFree');
const zone = {};
const zonesTable = document.querySelector('#zones-table');
const zoneAdd = document.querySelector('#zoneAdd');
const insertZone = document.querySelector('.insert-zone');
const closeBtn = document.querySelector('#close');

// Obrcemo redosled u stringu(datum 2022-01-01 -> 01.01.2022)
function reverseString(str) {
    const date = new Date(str).toLocaleDateString('sr');
    const hours = new Date(str).toLocaleTimeString('sr');
    return `${date} &nbsp; ${hours}`;
}

zoneAdd.addEventListener('click', () => {
    insertZone.classList.add('edit-container-show');
});
closeBtn.addEventListener('click', () => {
    insertZone.classList.remove('edit-container-show');
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    zone.zoneNumber = zoneNumber.value;
    zone.zoneName = zoneName.value;
    zone.zoneShort = zoneShort.value;
    zone.zoneLokacija = zoneLokacija.value;
    zone.zoneLat = zoneLat.value;
    zone.zoneLong = zoneLong.value;
    zone.zoneMaxFree = zoneMaxFree.value;
    zone.zoneCreatedByID = sessionStorage.userID;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(zone)
    }
    fetch('http://192.168.0.10:2021/insertNewZone', options);
    form.reset();
    zonesTable.innerHTML = '';
    fetchData();
    insertZone.classList.remove('edit-container-show');
});

// Svi objekti iz baze
async function fetchData() {
    const data = await fetch("http://192.168.0.10:2021/getAllActiveZonesData");
    const dbData = await data.json();
    createZonesTable(dbData);
    console.log(dbData);
}
function createZonesTable(dbData) {
    dbData.forEach(dat => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
        	<td>${dat.zoneName}</td>
            <td>${dat.zoneShort}</td>
        	<td>${reverseString(dat.zoneCreatedTD)}</td>
        	<td>${dat.zoneMaxFree}</td>
            <td><button class='deleteBtn' id=${dat.zoneID}>Obriši</button></td>
        `;
        zonesTable.appendChild(tr);
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
                    zoneID: btn.id,
                    zoneActive: 0,
                })
            }
            fetch(`http://192.168.0.10:2021/deleteZone`, options);
            btn.parentElement.parentElement.classList.add('remove');
        });
    });
}
fetchData();