import { loadNote, createBlankNote, saveNoteChanges, } from './main';
import { openSearchMenu } from './search';
import { createBlankNote, saveNote, saveNoteChanges} from './notes';



window.addEventListener('keydown', (e) => {
    //Save note with alt+s
    if(e.altKey && e.key === 's'){
        e.preventDefault()
        if(currentNoteDisplayState === 'Creating'){
            saveNote()
        } else if(currentNoteDisplayState === 'Editing'){
            saveNoteChanges()
        }
    //create new note with alt+n
    } else if(e.altKey && e.key === 'n'){
        e.preventDefault()
        createBlankNote()
    //cycle through notes using alt + upArrow/downArrow
    } else if(e.altKey && e.key === 'ArrowDown'){
        if(currentNoteID === 0){
            loadNote(notes[0].id)
        } else {
            const nextIndex = getNoteIndex(currentNoteID) + 1; 
            if(nextIndex > notes.length -1) return;
            loadNote(notes[nextIndex].id);
        }
    } else if(e.altKey && e.key === 'ArrowUp'){
        if(currentNoteID === 0){
            loadNote(notes[notes.length - 1].id)
        } else {
            const prevIndex = getNoteIndex(currentNoteID) - 1;
            if(prevIndex < 0) return;
            loadNote(notes[prevIndex].id);
        }
//Search menu shortcut
    } else if (e.altKey && e.key === 'd'){
        e.preventDefault()
        openSearchMenu()
    }
})