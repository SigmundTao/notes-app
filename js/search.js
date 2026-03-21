import { files } from './state.js'
import { loadFile } from './editor.js'

const searchMenu = document.getElementById('search-menu')
const closeSearchMenuBtn = document.getElementById('close-search-menu-btn')
const searchBarEl = document.getElementById('search-bar')
const searchResultsHolderEl = document.getElementById('search-results')

let searchResults = [...files]
let searchDebounce

export function initSearch(){
    closeSearchMenuBtn.addEventListener('click', closeSearchMenu)
    searchBarEl.addEventListener('input', handleSearchInput)
    searchMenu.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') closeSearchMenu()
    })
}

export function openSearchMenu(){
    searchBarEl.value = ''
    searchResultsHolderEl.innerHTML = ''
    displaySearchResults(files, searchResultsHolderEl)
    searchMenu.showModal()
    searchBarEl.focus()
    window.addEventListener('click', () => closeSearchMenu(), { once: true })
}

export function closeSearchMenu(){
    searchMenu.close()
}

function handleSearchInput(e){
    clearTimeout(searchDebounce)
    searchDebounce = setTimeout(() => {
        searchResults = files.filter(item =>
            item.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.body && item.body.toLowerCase().includes(e.target.value.toLowerCase())
        )
        searchResultsHolderEl.innerHTML = ''
        displaySearchResults(searchResults, searchResultsHolderEl)
    }, 300)
}

function createMenuItem(file){
    const menuItem = document.createElement('div')
    menuItem.classList.add('search-menu-item')
    menuItem.innerHTML = `
        <img src="assets/file.svg" class="search-result-img">
        <p>${file.title}</p>
        <div class="date-container">
            <img src="assets/date-icon.svg" class="search-result-img">
            <p>${file.date}</p>
        </div>
    `
    menuItem.addEventListener('click', () => {
        loadFile(file.id)
        closeSearchMenu()
    })
    return menuItem
}

function displaySearchResults(array, container){
    array.forEach(item => container.appendChild(createMenuItem(item)))
}