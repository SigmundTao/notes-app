import { displayingNotes, notes, showingBookmarks, resetDisplayingNotes, getCurrentNoteId, setCurrentNoteID, setDisplayState, updateEditorVisibility, tags } from './state.js'
import { getNoteIndex, updateNoteData, updateTagData } from './storage.js'
import { loadNote } from './editor.js'
import { showBookmarkedNotes } from './bookmarks.js'
import { updateTagSelect } from './tags.js'

const displayingNotesContainerEl = document.getElementById('displaying-notes-container')

export function renderSidebarNoteCards(){
    displayingNotesContainerEl.innerHTML = ''
    displayingNotes.forEach(note => {
        const card = new NoteCard(note)
        displayingNotesContainerEl.appendChild(card.element)
    })
}

class NoteCard {
    constructor(note){
        this.note = note
        this.element = this.createElement()
    }

    createElement(){
        const card = document.createElement('div')
        card.classList.add('note-card')
        card.innerHTML = `
            <div class="note-card-img"></div>
            <p>${this.note.title}</p>
        `
        card.id = this.note.id;
        card.addEventListener('click', () => loadNote(this.note.id))
        return card
    }
}