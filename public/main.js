const dropdownBtn = document.querySelector('#dropdown-btn');
const itemList = document.querySelector('.item-list');
const dropdownBtnLocations = document.querySelector('#dropdown-btn-locations');
const itemListLocations = document.querySelector('.item-list-locations');

dropdownBtn.addEventListener('click', () => {
    itemList.classList.toggle('display');
});
dropdownBtnLocations.addEventListener('click', () => {
    itemListLocations.classList.toggle('display');
});

(document.body || document.documentElement).addEventListener('click', function (event) {
    if (event.target !== itemListLocations && event.target !== dropdownBtnLocations)
        itemListLocations.classList.remove('display');
    if (event.target !== itemList && event.target !== dropdownBtn)
        itemList.classList.remove('display');
}, false);