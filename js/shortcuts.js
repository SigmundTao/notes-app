import { selectedFileId, currentAppState, files, currentFolderId } from './state.js'
import { getFileIndex } from './storage.js'
import { saveNoteChanges, createBlankNote, createNewNote, loadFile } from './editor.js'
import { openSearchMenu } from './search.js'

export function initShortcuts(){
    window.addEventListener('keydown', handleKeydown)
}

function handleKeydown(e){
    if(e.altKey && e.key === 's'){
        e.preventDefault()
        if(currentAppState === 'Creating') createNewNote()
        else if(currentAppState === 'Editing') saveNoteChanges()

    } else if(e.altKey && e.key === 'n'){
        e.preventDefault()
        createBlankNote()

    } else if(e.altKey && e.key === 'ArrowDown'){
        const folderContents = files.filter(f => f.parentId === currentFolderId)
        if(selectedFileId === null){
            loadFile(folderContents[0].id)
        } else {
            const nextIndex = folderContents.findIndex(f => f.id === selectedFileId) + 1
            if(nextIndex > folderContents.length - 1) return
            loadFile(folderContents[nextIndex].id)
        }

    } else if(e.altKey && e.key === 'ArrowUp'){
        const folderContents = files.filter(f => f.parentId === currentFolderId)
        if(selectedFileId === null){
            loadFile(folderContents[folderContents.length - 1].id)
        } else {
            const prevIndex = folderContents.findIndex(f => f.id === selectedFileId) - 1
            if(prevIndex < 0) return
            loadFile(folderContents[prevIndex].id)
        }

    } else if(e.altKey && e.key === 'd'){
        e.preventDefault()
        openSearchMenu()
    }
}