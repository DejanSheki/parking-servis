const user = document.querySelector('#user');
user.innerHTML = sessionStorage.loggedUser;
const zoneNumber = document.querySelector('#zoneNumber');
const zoneShort = document.querySelector('#zoneShort');
const zoneName = document.querySelector('#zoneName');
const SlocOpisLokacije = document.querySelector('#SlocOpisLokacije');
const disp1tip = document.querySelector('#disp1tip');
const disp2tip = document.querySelector('#disp2tip');
const disp1opis = document.querySelector('#disp1opis');
const disp2opis = document.querySelector('#disp2opis');

const zoneAdd = document.querySelector('#zoneAdd');
const insertZone = document.querySelector('.insert-zone');
const closeBtn = document.querySelector('#close');
const form = document.querySelector('#insertNewZone');
const zone = {};

const sensitTable = document.querySelector('#sensitTable');

zoneAdd.addEventListener('click', () => {
    insertZone.classList.add('edit-container-show');
});
closeBtn.addEventListener('click', () => {
    form.reset();
    insertZone.classList.remove('edit-container-show');
    containerDisp1.innerHTML = '';
    containerDisp2.innerHTML = '';
});

function reverseString(str) {
    const date = new Date(str).toLocaleDateString('sr');
    const hours = new Date(str).toLocaleTimeString('sr');
    return `${date} ${hours}`;
}

function nullToX(val) {
    if (val === null) {
        return 'xx';
    } else {
        return val;
    }
}

async function fetchApi(url) {
    const dataFetch = await fetch(url);
    const data = await dataFetch.json();
    return data;
}
async function fetchSensitData() {
    const fetchLink = "http://192.168.0.10:2021/getSensitZone";
    const data = await fetchApi(fetchLink);
    // const sensitData = await data.json();
    console.log(data);
    createSensitTable(data);
}
fetchSensitData();

function createSensitTable(data) {
    data.forEach(d => {
        const tr = document.createElement('tr');
        tr.classList.add(`${d.zoneShort}`);
        tr.innerHTML = `
        <th>${d.zoneShort}</th>
        <td>${d.zoneName}</td>
        <td>${d.SlocOpisLokacije}</td>
        <td>${d.zoneNumber}</td>
        <td>${d.disp1tip}</td>
        <td>${d.disp2tip}</td>
        <td>${d.disp1opis}</td>
        <td>${d.disp2opis}</td>
        <td class="displ1" id="displ1${d.zoneShort}"></td>
        <td class="displ2" id="displ2${d.zoneShort}"></td>
        <td>${nullToX(d.zaDisp1val)}</td>
        <td>${nullToX(d.zaDisp2val)}</td>
        <td><button class='editBtn' id=${d.ID}>Izmeni</button></td>
        <td><button class='deleteBtn' id=${d.ID}>Obriši</button></td>
        `;
        sensitTable.appendChild(tr);
        zaDsiplay1(d.zaDisp1, d.zoneShort);
        zaDisplay2(d.zaDisp2, d.zoneShort);
    });
    const editBtn = document.querySelectorAll('.editBtn');
    editBtn.forEach(btn => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                ID: btn.id,
            })
        }
        btn.addEventListener('click', () => {
            fetch(`http://192.168.0.10:2021/getSensitDataByID`, options)
                .then(data => data.json())
                .then(dbData => {
                    createEditInput(dbData);
                })
        })
    });
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            deleteSensitZone(btn.id);
        })
    });
}


const selectTimeDisp1 = document.getElementById('selectTimeDisp1');
const selectTimeDisp2 = document.getElementById('selectTimeDisp2');
const containerDisp1 = document.getElementById('newInputContainer');
const containerDisp2 = document.getElementById('newInputContainerDisp2');

const lotNoLabel = '<label for="lotNo">Lot: </label>';
const lotNoInput = '<input type="text" name="lotNo" id="lotNo" required placeholder="1"/>';
const zoneNoLabel = '<label for="zoneNo">Zona: </label>';
const zoneNoInput = '<input type="text" name="zoneNo" id="zoneNo" required placeholder="1,2,3,4,5"/>';

selectTimeDisp1.addEventListener('change', (e) => {
    if (selectTimeDisp1.value === '0') { containerDisp1.innerHTML = ''; }
    if (selectTimeDisp1.value === '1') {
        containerDisp1.innerHTML = '';
        containerDisp1.innerHTML = `
        <div class="timeOneData">
        <p>00:00 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" id="inputAddBtn">+</button>
        </div>
        `;
        const inputAddBtn = document.querySelector('#inputAddBtn');
        inputAddBtn.addEventListener('click', (e) => {
            const container = e.target.parentElement;
            const div = document.createElement('div');
            div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
            container.appendChild(div);
        });
    }
    if (selectTimeDisp1.value === '2') {
        containerDisp1.innerHTML = '';
        containerDisp1.innerHTML = `
        <div class="timeOneData">
        <p>00:00 - 07:00</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        <div class="timeTwoData">
        <p>07:01 - 16:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        <div class="timeThreeData">
        <p>16:59 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        `;
        const inputAddBtn = document.querySelectorAll('.inputAddBtn');
        inputAddBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.parentElement;
                const div = document.createElement('div');
                div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
                container.appendChild(div);
            });
        })
    }
});
selectTimeDisp2.addEventListener('change', (e) => {
    if (selectTimeDisp2.value === '0') { containerDisp2.innerHTML = ''; }
    if (selectTimeDisp2.value === '1') {
        containerDisp2.innerHTML = '';
        containerDisp2.innerHTML = `
        <div class="timeOneDataDisp2">
        <p>00:00 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" id="inputAddBtnDisp2">+</button>
        </div>
        `;
        const inputAddBtn = document.querySelector('#inputAddBtnDisp2');
        inputAddBtn.addEventListener('click', (e) => {
            const container = e.target.parentElement;
            const div = document.createElement('div');
            div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
            container.appendChild(div);
        });
    }
    if (selectTimeDisp2.value === '2') {
        containerDisp2.innerHTML = '';
        containerDisp2.innerHTML = `
        <div class="timeOneDataDisp2">
        <p>00:00 - 07:00</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        <div class="timeTwoDataDisp2">
        <p>07:01 - 16:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        <div class="timeThreeDataDisp2">
        <p>16:59 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        `;
        const inputAddBtn = document.querySelectorAll('.inputAddBtnDisp2');
        inputAddBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const container = e.target.parentElement;
                // console.log(container);
                const div = document.createElement('div');
                div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
                container.appendChild(div);
            });
        })
    }
});
submitForm();

function submitForm() {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const div = document.querySelectorAll(`.timeOneData`);
        const divDisp2 = document.querySelectorAll(`.timeOneDataDisp2`);
        const div2 = document.querySelectorAll(`.timeTwoData`);
        const div2Disp2 = document.querySelectorAll(`.timeTwoDataDisp2`);
        const div3 = document.querySelectorAll(`.timeThreeData`);
        const div3Disp2 = document.querySelectorAll(`.timeThreeDataDisp2`);
        let timeOneData = [];
        let timeOneDataDisp2 = [];
        let timeTwoData = [];
        let timeTwoDataDisp2 = [];
        let timeThreeData = [];
        let timeThreeDataDisp2 = [];

        let jsonDisp1;
        let jsonDisp2;
        let jsonDisplArr = [];
        let jsonDisplArrDisp2 = [];
        let timeObj;
        let timeObjDisp2;

        div3.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                // console.log(num1.value, num2.value);
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeThreeData.push(timeObj)
            });
            // console.log(timeThreeData);
            const vreme = time[0].innerHTML.split(' - ');
            // console.log(vreme);
            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeThreeData
            })
            jsonDisplArr.push(jsonDisp1)
        });
        div3Disp2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                // console.log(num1.value, num2.value);
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeThreeDataDisp2.push(timeObjDisp2)
            });
            // console.log(timeThreeDataDisp2);
            const vreme = time[0].innerHTML.split(' - ');
            // console.log(vreme);
            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeThreeDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)
        });

        div2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                // console.log(num1.value, num2.value);
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeTwoData.push(timeObj)
            });
            // console.log(timeTwoData);
            const vreme = time[0].innerHTML.split('-');
            // console.log(vreme);
            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeTwoData
            })
            jsonDisplArr.push(jsonDisp1)
        });
        div2Disp2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                // console.log(num1.value, num2.value);
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeTwoDataDisp2.push(timeObjDisp2)
            });
            // console.log(timeTwoDataDisp2);
            const vreme = time[0].innerHTML.split('-');
            // console.log(vreme);
            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeTwoDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)
        });

        div.forEach(d => {
            // console.log(d);
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);

            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeOneData.push(timeObj)
            });
            // console.log(timeOneData);
            const vreme = time[0].innerHTML.split('-');
            // console.log(vreme);

            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeOneData
            })
            jsonDisplArr.push(jsonDisp1)

        });
        divDisp2.forEach(d => {
            // console.log(d);
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);

            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeOneDataDisp2.push(timeObjDisp2)
            });
            // console.log(timeOneDataDisp2);
            const vreme = time[0].innerHTML.split('-');
            // console.log(vreme);

            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeOneDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)

        });

        zone.zoneNumber = zoneNumber.value;
        zone.zoneShort = zoneShort.value;
        zone.zoneName = zoneName.value;
        zone.SlocOpisLokacije = SlocOpisLokacije.value;
        zone.disp1tip = disp1tip.value;
        zone.disp2tip = disp2tip.value;
        zone.disp1opis = disp1opis.value;
        zone.disp2opis = disp2opis.value;
        zone.zaDisp1 = jsonDisplArr;
        zone.zaDisp2 = jsonDisplArrDisp2;
        zone.zoneCreatedByID = sessionStorage.loggedUser;
        console.log(zone);
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zone)
        }
        fetch('http://192.168.0.10:2021/insertNewSensitZone', options);
        form.reset();
        containerDisp1.innerHTML = '';
        containerDisp2.innerHTML = '';
        insertZone.classList.remove('edit-container-show');
        sensitTable.innerHTML = '';
        fetchSensitData();
    });
}

// display 1
function removeSec(time) {
    const splited = time.split(':');
    const noSecTime = `${splited[0]}:${splited[1]}`;
    return noSecTime;
}

function zaDsiplay1(zaDisp1, zoneShort) {
    let display1 = JSON.parse(zaDisp1);
    const displ1 = document.getElementById(`displ1${zoneShort}`);
    display1.forEach(dis => {
        const el = document.createElement('p');
        el.innerHTML = `${removeSec(dis.vremeOd)} - ${removeSec(dis.vremeDo)}`;
        displ1.appendChild(el);
        dis.zone.forEach(z => {
            const labelLot = document.createElement('label');
            const inputLot = document.createElement('input');
            const labelZone = document.createElement('label');
            const inputZone = document.createElement('input');
            labelLot.for = 'lotNo'
            labelLot.innerHTML = 'Lot: '
            inputLot.id = 'lotNo';
            inputLot.value = `${z.lotNo}`;
            inputLot.setAttribute('disabled', '');

            labelZone.for = 'zoneNo'
            labelZone.innerHTML = 'Zona: '
            inputZone.id = 'zoneNo'
            inputZone.value = `${z.zoneNo}`;
            inputZone.setAttribute('disabled', '');

            displ1.appendChild(labelLot);
            displ1.appendChild(inputLot);
            displ1.appendChild(labelZone);
            displ1.appendChild(inputZone);
        })
    });
}
// display 2
function zaDisplay2(zaDisp2, zoneShort) {
    let display2 = JSON.parse(zaDisp2);
    const displ2 = document.getElementById(`displ2${zoneShort}`);
    display2.forEach(dis => {
        const el = document.createElement('p');
        el.innerHTML = `${removeSec(dis.vremeOd)} - ${removeSec(dis.vremeDo)}`;
        displ2.appendChild(el);
        dis.zone.forEach(z => {
            const labelLot = document.createElement('label');
            const inputLot = document.createElement('input');
            const labelZone = document.createElement('label');
            const inputZone = document.createElement('input');
            labelLot.for = 'lotNo'
            labelLot.innerHTML = 'Lot: '
            inputLot.id = 'lotNo';
            inputLot.value = `${z.lotNo}`;
            inputLot.setAttribute('disabled', '');

            labelZone.for = 'zoneNo'
            labelZone.innerHTML = 'Zona: '
            inputZone.id = 'zoneNo'
            inputZone.value = `${z.zoneNo}`;
            inputZone.setAttribute('disabled', '');

            displ2.appendChild(labelLot);
            displ2.appendChild(inputLot);
            displ2.appendChild(labelZone);
            displ2.appendChild(inputZone);
        })
    });
}

// Edit
const editContainer = document.querySelector('.edit-container');
const editInput = document.querySelector('#editInput');

function createEditInput(dbData) {
    editContainer.classList.add('edit-container-show');
    dbData.forEach(dat => {
        editInput.innerHTML = `
        <form id="editForm" class="insert-zone-input">
        <label for="zoneNumber">Br. lokacije: </label>
        <input type="text" id="zoneNumber" name="zoneNumber" value="${dat.zoneNumber}" disabled/>
        <label for="zoneShort">Oznaka: </label>
        <input type="text" id="zoneShort" name="zoneShort" value="${dat.zoneShort}" disabled />
        <label for="zoneName">Naziv: </label>
        <input type="text" name="zoneName" id="zoneName" value="${dat.zoneName}" required />
        <label for="SlocOpisLokacije">Opis: </label>
        <input
          type="text"
          name="SlocOpisLokacije"
          id="SlocOpisLokacije"
          value="${dat.SlocOpisLokacije}"
          required
        />
        <label for="zoneCreatedByID">Kreirao: </label>
        <input type="text" id="zoneCreatedByID" name="zoneCreatedByID" value="${dat.zoneCreatedByID}" disabled/>
        <label for="zoneCreatedTD">Vreme kreiranja: </label>
        <input type="text" id="zoneCreatedTD" name="zoneCreatedTD" value="${reverseString(dat.zoneCreatedTD)}" disabled/>
        <label for="disp1tip">Displ 1 tip: </label>
        <input type="text" name="disp1tip" id="disp1tip" value="${dat.disp1tip}" required />
        <label for="disp2tip">Displ 2 tip: </label>
        <input type="text" name="disp2tip" id="disp2tip" value="${dat.disp2tip}" required />
        <label for="disp1opis">Displ 1 opis: </label>
        <input type="text" name="disp1opis" id="disp1opis" value="${dat.disp1opis}" required />
        <label for="disp2opis">Displ 2 opis: </label>
        <input type="text" name="disp2opis" id="disp2opis" value="${dat.disp2opis}" required />
        <div class="zaDispl">
          <div class="timeContainer">
            <p>Za displ 1:</p>
            <select name="" id="selectTimeDisp1Edit">
              <option value="0" selected>Izaberi vreme</option>
              <option value="1">Od 00:00 do 23:59</option>
              <option value="2">
                Od 00:00 do 07:00 - <br />
                Od 07:01 do 16:59 - <br />
                Od 17:00 do 23:59
              </option>
            </select>
          </div>
          <div class="displ1 padding" id="editDisplay1${dat.zoneShort}"></div>
        </div>
        <div class="zaDispl">
          <div class="timeContainer">
            <p>Za displ 2:</p>
            <select name="" id="selectTimeDisp2Edit">
              <option value="0" selected>Izaberi vreme</option>
              <option value="1">Od 00:00 do 23:59</option>
              <option value="2">
                Od 00:00 do 07:00 - <br />
                Od 07:01 do 16:59 - <br />
                Od 17:00 do 23:59
              </option>
            </select>
          </div>
          <div class="displ2 padding" id="editDisplay2${dat.zoneShort}"></div>
        </div>
        <button type="submit" id="editBtnSubmit">Izmeni</button>
        <button id="closeBtn">Otkaži</button>
      </form>
		`;

        //display 1 
        let display1 = JSON.parse(dat.zaDisp1);
        const containerDisp1 = document.getElementById(`editDisplay1${dat.zoneShort}`);
        // zaDisplay1Edit(display1, containerDisp1);

        //display2
        const containerDisp2 = document.getElementById(`editDisplay2${dat.zoneShort}`);
        let display2 = JSON.parse(dat.zaDisp2);
        // zaDisplay2Edit(display2, containerDisp2);

        const selectTimeDisp1Edit = document.getElementById('selectTimeDisp1Edit');
        const selectTimeDisp2Edit = document.getElementById('selectTimeDisp2Edit');

        selectTimeDisp1Edit.addEventListener('change', (e) => {
            if (selectTimeDisp1Edit.value === '0') {
                //display 1
                containerDisp1.innerHTML = '';
                // zaDisplay1Edit(display1, containerDisp1);
            }
            if (selectTimeDisp1Edit.value === '1') {
                containerDisp1.innerHTML = '';
                containerDisp1.innerHTML = `
        <div class="timeOneData">
        <p>00:00 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" id="inputAddBtnEdit">+</button>
        </div>
        `;
                const inputAddBtnEdit = document.querySelector('#inputAddBtnEdit');
                inputAddBtnEdit.addEventListener('click', (e) => {
                    const container = e.target.parentElement;
                    const div = document.createElement('div');
                    div.innerHTML = `
                        ${lotNoLabel}
                        ${lotNoInput}
                        ${zoneNoLabel}
                        ${zoneNoInput}
                    `;
                    container.appendChild(div);
                });
            }
            if (selectTimeDisp1Edit.value === '2') {
                containerDisp1.innerHTML = '';
                containerDisp1.innerHTML = `
        <div class="timeOneData">
        <p>00:00 - 07:00</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        <div class="timeTwoData">
        <p>07:01 - 16:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        <div class="timeThreeData">
        <p>16:59 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtn">+</button>
        </div>
        `;
                const inputAddBtn = document.querySelectorAll('.inputAddBtn');
                inputAddBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const container = e.target.parentElement;
                        const div = document.createElement('div');
                        div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
                        container.appendChild(div);
                    });
                })
            }
        });
        selectTimeDisp2Edit.addEventListener('change', (e) => {
            if (selectTimeDisp2Edit.value === '0') {
                containerDisp2.innerHTML = '';
                // zaDisplay2Edit(display2, containerDisp2);
            }
            if (selectTimeDisp2Edit.value === '1') {
                containerDisp2.innerHTML = '';
                containerDisp2.innerHTML = `
        <div class="timeOneDataDisp2">
        <p>00:00 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" id="inputAddBtnDisp2Edit">+</button>
        </div>
        `;
                const inputAddBtn = document.querySelector('#inputAddBtnDisp2Edit');
                inputAddBtn.addEventListener('click', (e) => {
                    const container = e.target.parentElement;
                    const div = document.createElement('div');
                    div.innerHTML = `
                ${lotNoLabel}
                ${lotNoInput}
                ${zoneNoLabel}
                ${zoneNoInput}
                `;
                    container.appendChild(div);
                });
            }
            if (selectTimeDisp2Edit.value === '2') {
                containerDisp2.innerHTML = '';
                containerDisp2.innerHTML = `
        <div class="timeOneDataDisp2">
        <p>00:00 - 07:00</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        <div class="timeTwoDataDisp2">
        <p>07:01 - 16:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        <div class="timeThreeDataDisp2">
        <p>16:59 - 23:59</p>
        ${lotNoLabel}
        ${lotNoInput}
        ${zoneNoLabel}
        ${zoneNoInput}
        <button type="button" class="inputAddBtnDisp2">+</button>
        </div>
        `;
                const inputAddBtn = document.querySelectorAll('.inputAddBtnDisp2');
                inputAddBtn.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const container = e.target.parentElement;
                        // console.log(container);
                        const div = document.createElement('div');
                        div.innerHTML = `
                            ${lotNoLabel}
                            ${lotNoInput}
                            ${zoneNoLabel}
                            ${zoneNoInput}
                        `;
                        container.appendChild(div);
                    });
                })
            }
        });
    });
    const editBtnSubmit = document.querySelector('#editBtnSubmit');
    const closeBtn = document.querySelector('#closeBtn');
    closeBtn.addEventListener('click', () => {
        editContainer.classList.remove('edit-container-show');
    });
    const editForm = document.querySelector('.edit-container form');
    const editZone = {};
    editBtnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        const div = document.querySelectorAll(`.timeOneData`);
        const divDisp2 = document.querySelectorAll(`.timeOneDataDisp2`);
        const div2 = document.querySelectorAll(`.timeTwoData`);
        const div2Disp2 = document.querySelectorAll(`.timeTwoDataDisp2`);
        const div3 = document.querySelectorAll(`.timeThreeData`);
        const div3Disp2 = document.querySelectorAll(`.timeThreeDataDisp2`);
        let timeOneData = [];
        let timeOneDataDisp2 = [];
        let timeTwoData = [];
        let timeTwoDataDisp2 = [];
        let timeThreeData = [];
        let timeThreeDataDisp2 = [];

        let jsonDisp1;
        let jsonDisp2;
        let jsonDisplArr = [];
        let jsonDisplArrDisp2 = [];
        let timeObj;
        let timeObjDisp2;

        div3.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeThreeData.push(timeObj)
            });
            const vreme = time[0].innerHTML.split(' - ');
            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeThreeData
            })
            jsonDisplArr.push(jsonDisp1)
        });
        div3Disp2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeThreeDataDisp2.push(timeObjDisp2)
            });
            const vreme = time[0].innerHTML.split(' - ');
            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeThreeDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)
        });
        div2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeTwoData.push(timeObj)
            });
            const vreme = time[0].innerHTML.split('-');
            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeTwoData
            })
            jsonDisplArr.push(jsonDisp1)
        });
        div2Disp2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeTwoDataDisp2.push(timeObjDisp2)
            });
            const vreme = time[0].innerHTML.split('-');
            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeTwoDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)
        });
        div.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObj = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeOneData.push(timeObj)
            });
            const vreme = time[0].innerHTML.split('-');
            jsonDisp1 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeOneData
            })
            jsonDisplArr.push(jsonDisp1)
        });
        divDisp2.forEach(d => {
            const lotNo = d.querySelectorAll(`#lotNo`);
            const zoneNo = d.querySelectorAll(`#zoneNo`);
            const time = d.querySelectorAll(`p`);
            lotNo.forEach((num1, index) => {
                const num2 = zoneNo[index];
                timeObjDisp2 = new Object({
                    'lotNo': num1.value,
                    'zoneNo': num2.value,
                })
                timeOneDataDisp2.push(timeObjDisp2)
            });
            const vreme = time[0].innerHTML.split('-');
            jsonDisp2 = new Object({
                'vremeOd': `${vreme[0].replace(/\s/g, "")}:00`,
                'vremeDo': `${vreme[1].replace(/\s/g, "")}:00`,
                'zone': timeOneDataDisp2
            })
            jsonDisplArrDisp2.push(jsonDisp2)

        });

        editZone.zoneNumber = editForm[0].value;
        editZone.zoneShort = editForm[1].value;
        editZone.zoneName = editForm[2].value;
        editZone.SlocOpisLokacije = editForm[3].value;
        editZone.disp1tip = editForm[6].value;
        editZone.disp2tip = editForm[7].value;
        editZone.disp1opis = editForm[8].value;
        editZone.disp2opis = editForm[9].value;
        editZone.zaDisp1 = jsonDisplArr;
        editZone.zaDisp2 = jsonDisplArrDisp2;
        console.log(editForm);
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editZone)
        }
        fetch('http://192.168.0.10:2021/updateSensitZone', options);
        form.reset();
        editContainer.classList.remove('edit-container-show');
        sensitTable.innerHTML = '';
        fetchSensitData();
    })

}



// 
function zaDisplay1Edit(display1, containerDisp1) {
    display1.forEach(dis => {
        const el = document.createElement('p');
        el.innerHTML = `${dis.vremeOd} - ${dis.vremeDo}`;
        containerDisp1.appendChild(el);
        dis.zone.forEach(z => {
            const labelLot = document.createElement('label');
            const inputLot = document.createElement('input');
            const labelZone = document.createElement('label');
            const inputZone = document.createElement('input');
            labelLot.for = 'lotNo'
            labelLot.innerHTML = 'LotNo: '
            inputLot.id = 'lotNo';
            inputLot.value = `${z.lotNo}`;
            // inputLot.setAttribute('disabled', '');

            labelZone.for = 'zoneNo'
            labelZone.innerHTML = 'ZoneNo: '
            inputZone.id = 'zoneNo'
            inputZone.value = `${z.zoneNo}`;
            // inputZone.setAttribute('disabled', '');

            containerDisp1.appendChild(labelLot);
            containerDisp1.appendChild(inputLot);
            containerDisp1.appendChild(labelZone);
            containerDisp1.appendChild(inputZone);
        })
    });
}
function zaDisplay2Edit(display2, containerDisp2) {
    display2.forEach(dis => {
        const el = document.createElement('p');
        el.innerHTML = `${dis.vremeOd} - ${dis.vremeDo}`;
        containerDisp2.appendChild(el);
        dis.zone.forEach(z => {

            const labelLot = document.createElement('label');
            const inputLot = document.createElement('input');
            const labelZone = document.createElement('label');
            const inputZone = document.createElement('input');
            labelLot.for = 'lotNo'
            labelLot.innerHTML = 'LotNo: '
            inputLot.id = 'lotNo';
            inputLot.value = `${z.lotNo}`;
            // inputLot.setAttribute('disabled', '');

            labelZone.for = 'zoneNo'
            labelZone.innerHTML = 'ZoneNo: '
            inputZone.id = 'zoneNo'
            inputZone.value = `${z.zoneNo}`;
            // inputZone.setAttribute('disabled', '');
            containerDisp2.appendChild(labelLot);
            containerDisp2.appendChild(inputLot);
            containerDisp2.appendChild(labelZone);
            containerDisp2.appendChild(inputZone);
        });
    });
}

async function updateTable() {
    const fetchLink = "http://192.168.0.10:2021/getSensitZone";
    const data = await fetchApi(fetchLink);
    console.log(data);
    data.forEach(dat => {
        const sensitDisplays = document.querySelectorAll(`.${dat.zoneShort}`);
        sensitDisplays[0].cells[10].innerHTML = nullToX(dat.zaDisp1val);
        sensitDisplays[0].cells[11].innerHTML = nullToX(dat.zaDisp2val);
    });
}
setInterval(updateTable, 60000);

function deleteSensitZone(zoneID) {
    console.log(zoneID);
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ID: zoneID,
        })

    }
    fetch('http://192.168.0.10:2021/deleteSensitZone', options);
    sensitTable.innerHTML = '';
    fetchSensitData();
}

