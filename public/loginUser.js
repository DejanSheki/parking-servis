const login = document.querySelector("#login");
const logMsg = document.querySelector('.message');

login.addEventListener("click", () => {
    const userName = document.querySelector("input[name='username']").value;
    const userPassw = document.querySelector("input[name='password']").value;
    const loginData = { userName, userPassw };
    return fetchUserData(loginData)
    // .then(user => console.log(user.userName))
    // .catch(err => console.log(err));
});

async function fetchUserData(loginData) {
    const dataFetch = await fetch(
        `http://192.168.0.10:2021/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
    }
    );
    const userData = await dataFetch.json();
    console.log(userData);
    if (userData.message === 'Success!!') {
        sessionStorage.setItem('loggedUser', userData.success[0].userFLname);
        sessionStorage.setItem('userID', userData.success[0].userID);
        sessionStorage.setItem('userRank', userData.success[0].userRank);
        window.location.href = '/dbPodaci';
        return userData;
    } else if (userData.success === 0) {
        console.log(userData.message);
        logMsg.innerHTML = `${userData.message}`
    } else {
        logMsg.innerHTML = `${userData.message}`
    }
    // return userData;
}
