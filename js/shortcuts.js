import { currentNoteID, currentNoteDisplayState, notes, displayingNotes } from './state.js'
import { getNoteIndex } from './storage.js'
import { saveNote, saveNoteChanges, createBlankNote, loadNote } from './editor.js'
import { openSearchMenu } from './search.js'

export function initShortcuts(){
    window.addEventListener('keydown', handleKeydown)
}

function handleKeydown(e){
    if(e.altKey && e.key === 's'){
        e.preventDefault()
        if(currentNoteDisplayState === 'Creating') saveNote()
        else if(currentNoteDisplayState === 'Editing') saveNoteChanges()

    } else if(e.altKey && e.key === 'n'){
        e.preventDefault()
        createBlankNote()

    } else if(e.altKey && e.key === 'ArrowDown'){
        if(currentNoteID === null){
            loadNote(displayingNotes[0].id)
        } else {
            const nextIndex = displayingNotes.findIndex(note => note.id === currentNoteID) + 1
            if(nextIndex > displayingNotes.length - 1) return
            loadNote(displayingNotes[nextIndex].id)
        }

    } else if(e.altKey && e.key === 'ArrowUp'){
        if(currentNoteID === null){
            loadNote(displayingNotes[displayingNotes.length - 1].id)
        } else {
            const prevIndex = displayingNotes.findIndex(note => note.id === currentNoteID) - 1
            if(prevIndex < 0) return
            loadNote(displayingNotes[prevIndex].id)
        }

    } else if(e.altKey && e.key === 'd'){
        e.preventDefault()
        openSearchMenu()
    }
}