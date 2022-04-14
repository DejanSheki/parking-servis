const addUser = document.querySelector('#userAdd');
const userName = document.querySelector('#userName');
const userPassw = document.querySelector('#userPassw');
const userFLname = document.querySelector('#userFLname');
const userRank = document.querySelector('#userRank');
const userTitle = document.querySelector('#userTitle');
const userMail = document.querySelector('#userMail');
const userInfoType = document.querySelector('#userInfoType');
const userInfoTime = document.querySelector('#userInfoTime');
const submit = document.querySelector('#submit');
const form = document.querySelector('#adminForm');
const insertUserForm = document.querySelector('.insert-user');
const userTable = document.querySelector('#user-table');
const loggedUser = document.querySelector('#user');
loggedUser.innerHTML = sessionStorage.loggedUser;
const user = {};

if (sessionStorage.userRank === '3') {
    addUser.classList.add('remove');
}
if (sessionStorage.userRank === '2') {
    userRank.value = 3;
    userTitle.value = 'User';
    userRank[0].classList.add('remove');
    userRank[1].classList.add('remove');
    userRank[2].classList.add('remove');
    userTitle[0].classList.add('remove');
    userTitle[1].classList.add('remove');
    userTitle[2].classList.add('remove');
}
if (sessionStorage.userRank === '1') {
    userRank.value = 2;
    userTitle.value = 'Admin';
    userRank[0].classList.add('remove');
    userRank[1].classList.add('remove');
    userTitle[0].classList.add('remove');
    userTitle[1].classList.add('remove');
}
addUser.addEventListener('click', () => {
    insertUserForm.classList.remove('remove');
});

// Obrcemo redosled u stringu(datum 2022-01-01 -> 01.01.2022)
function reverseString(str) {
    const date = new Date(str).toLocaleDateString('sr');
    const hours = new Date(str).toLocaleTimeString('sr');
    return `${date} / ${hours}`;
}

// Svi korisnici iz baze
async function fetchData() {
    const data = await fetch("http://192.168.0.10:2021/getAllActiveUsers");
    const dbData = await data.json();
    createTable(dbData);
}
function createTable(dbData) {
    dbData.forEach(dat => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
			<td>${dat.userName}</td>
			<td>${dat.userFLname}</td>
            <td>${dat.userMail}</td>
			<td>${dat.userTitle}</td>
			<td>${reverseString(dat.userCreatedTD)}</td>
            <td><button id=${dat.userID}>Delete</button></td>
		`;
        userTable.appendChild(tr);
    });
    const btn = document.querySelectorAll(`td button`);
    btn.forEach(b => {
        if (sessionStorage.userRank === '3' || sessionStorage.userRank === '2') {
            b.classList.add('remove');
        }
        b.addEventListener('click', (e) => {
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    userID: b.id,
                    userActive: 0
                })
            }
            fetch(`http://192.168.0.10:2021/deleteUser`, options);
            b.parentElement.parentElement.classList.add('remove');
        });
    });
}
fetchData();


form.addEventListener('submit', (e) => {
    e.preventDefault();
    user.userName = userName.value;
    user.userPassw = userPassw.value;
    user.userFLname = userFLname.value;
    user.userRank = Number(userRank.value);
    user.userTitle = userTitle.value;
    user.userMail = userMail.value;
    user.userInfoType = Number(userInfoType.value);
    user.userInfoTime = userInfoTime.value;
    user.userCreatedByID = sessionStorage.userID;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }
    fetch('http://192.168.0.10:2021/insertNewUser', options);
    form.reset();
    userTable.innerHTML = '';
    fetchData();
    insertUserForm.classList.add('remove');
});

