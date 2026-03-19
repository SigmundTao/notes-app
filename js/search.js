
const searchMenu = document.getElementById('search-menu');
const closeSearchMenuBtn = document.getElementById('close-search-menu-btn');
const searchBarEl = document.getElementById('search-bar');
const searchResultsHolderEl = document.getElementById('search-results');

let searchResults = [...notes]
let debounceTimer;

function openSearchMenu(){
    searchBarEl.value = '';
    displaySearchResults(searchResults, searchResultsHolderEl)
    searchMenu.showModal();
    searchBarEl.focus();
}

function closeSearchMenu(){
    searchMenu.close();
}



function createMenuItem(fileObj){
    const menuItem = document.createElement('div');
    menuItem.classList.add('search-menu-item');
    menuItem.innerHTML = `
        <img src="assets/text-icon.svg" class ="search-result-img">
        <p>${fileObj.title}</p>
        <div class="date-container">
            <img src="assets/date-icon.svg" class ="search-result-img">
            <p>${fileObj.date}</p>
        </div>
    `

    menuItem.addEventListener('click', () => {
        loadNote(fileObj.id);
        closeSearchMenu();
    })
    return menuItem;
}

function displaySearchResults(array, desiredOuputContainer){
    array.forEach(item => {
        desiredOuputContainer.appendChild(createMenuItem(item))
    })
}

let searchDebounce

searchBarEl.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
        searchResults = [];
        searchResultsHolderEl.innerHTML = '';
        notes.forEach(item => {
            if(item.title.includes(e.target.value)){
                searchResults.push(item)
            }
        });
        console.log(searchResults);
        displaySearchResults(searchResults, searchResultsHolderEl)
    },300)
})

searchMenu.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
        closeSearchMenu()
    }
})

closeSearchMenuBtn.addEventListener('click', closeSearchMenu);