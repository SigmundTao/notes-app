import { files, getFileIndex, idNum, currentFolderId, incrementIdNum, setSelectedFileId, setAppState } from "./state.js"
import { getFormattedDate, updateFileData, checkForDuplicateTitles } from "./storage.js"
import { createTab, renderTabs } from "./tabs.js"
import { renderFolderContents } from "./filetree.js"

const createNoteBtn = document.getElementById('create-note-btn')
createNoteBtn.addEventListener('click', createNewNote)

export function highlightSelectedFile(id){
    document.querySelectorAll('.file-card').forEach(card => card.classList.remove('selected-file'))
    const selectedCard = document.getElementById(id)
    if(selectedCard) selectedCard.classList.add('selected-file')
}

function getTitleInput(){
    return document.querySelector('.note-title')
}

function getBodyInput(){
    return document.querySelector('.note-body')
}

export function saveNote(file){
    const fileIndex = getFileIndex(file.id)
    if(fileIndex === -1) return
    console.log(checkForDuplicateTitles(file.title, file.id))
    if(checkForDuplicateTitles(file.title, file.id)) return
    file.title = getTitleInput().value
    console.log(getTitleInput().value)
    file.body = getBodyInput().value
    file.lastEdited = getFormattedDate(new Date())
    setSelectedFileId(file.id)
    setAppState('Editing')
    updateFileData()
    renderFolderContents()
    renderTabs()
}

export function createNewNote(){
    const date = getFormattedDate(new Date())
    const id = idNum
    files.push({
        title: 'Untitled',
        body: '',
        id,
        type: 'note',
        parentId: currentFolderId,
        date,
        lastEdited: date,
        tags: []
    })
    createTab(id)
    incrementIdNum()
    updateFileData()
    setSelectedFileId(id)
    setAppState('Editing')
    renderFolderContents()
    return id
}

export function initEditor(){
    
}