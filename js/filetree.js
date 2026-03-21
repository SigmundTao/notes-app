import { files, currentFolderId, isFileHolderOpen, toggleFileHolderState } from './state.js'
import { getFileIndex, updateFileData } from './storage.js'
import { loadFile, createBlankNote } from './editor.js'

export const fileTreeEl = document.getElementById('sidebar');
const fileTreeContainerEl = document.getElementById('displaying-notes-container')
const createNewNoteBtn = document.getElementById('new-note-btn');

createNewNoteBtn.addEventListener('click', createBlankNote)

export function renderFolderContents(){
    fileTreeContainerEl.innerHTML = ''
    const folderContents = files.filter(file => file.parentId === currentFolderId)
    folderContents.forEach(file => {
        const card = new FileCard(file)
        fileTreeContainerEl.appendChild(card.element)
    })
}

class FileCard {
    constructor(file){
        this.file = file
        this.element = this.createElement()
    }

    createElement(){
        const card = document.createElement('div')
        card.classList.add('note-card')
        card.innerHTML = `
            <div class="note-card-img"></div>
            <p class="file-name">${this.file.title}</p>
        `
        card.id = this.file.id
        card.addEventListener('click', () => loadFile(this.file.id))
        return card
    }
}

export function openFileHolder(){
    fileTreeEl.style.display = 'flex'
}

export function closeFileHolder(){
    fileTreeEl.style.display = 'none'
}

export function toggleFileHolder(){
    isFileHolderOpen ? closeFileHolder() : openFileHolder()
    toggleFileHolderState()
}

function createRightClickMenu(posX, posY){
    const menu = document.createElement('div')
    menu.classList.add('right-click-menu')
    menu.innerHTML = `
        <div class="rc-menu-item">Delete</div>
        <div class="rc-menu-item">Edit</div>
    `
    menu.style.left = posX + 'px'
    menu.style.top = posY + 'px'
    menu.style.position = 'fixed'
    return menu
}

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
    if(!event.target.classList.contains('note-card')
    && !event.target.parentElement.classList.contains('note-card')) return
    document.querySelector('.right-click-menu')?.remove()
    const menu = createRightClickMenu(event.clientX, event.clientY)
    fileTreeEl.appendChild(menu)
    menu.addEventListener('click', (e) => e.stopPropagation())
    window.addEventListener('click', () => menu.remove(), { once: true })
})