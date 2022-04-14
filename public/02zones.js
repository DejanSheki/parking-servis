const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const form = document.querySelector('#insertNewZone');
const zoneNumber = document.querySelector('#zoneNumber');
const zoneName = document.querySelector('#zoneName');
const zoneShort = document.querySelector('#zoneShort');
const zoneLat = document.querySelector('#zoneLat');
const zoneLong = document.querySelector('#zoneLong');
const zoneMaxFree = document.querySelector('#zoneMaxFree');
const zone = {};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    zone.zoneNumber = zoneNumber.value;
    zone.zoneName = zoneName.value;
    zone.zoneShort = zoneShort.value;
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
    // locationsTable.innerHTML = '';
    // fetchData();
    // insertUserForm.classList.add('remove');
    console.log(zone);
});