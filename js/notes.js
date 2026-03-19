import { renderSidebarNoteCards } from "./sidebar"
import { getNoteIndex } from "./storage"

export const noteTitleEl = document.getElementById('note-title');
export const noteBodyEl = document.getElementById('note-body');
export const notes = JSON.parse(localStorage.getItem('notes')) || [];
const noteDisplayDivEl = document.getElementById('notes-display-div');

export let displayingNotes = [...notes]


function resetDisplayingNotes(){
    displayingNotes = [...notes]
}

let idNum = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;

function updateCurrentNoteID(id){
    currentNoteID = id;
}


export function loadNote(id){
    const noteIndex = getNoteIndex(id);
    const note = notes[noteIndex];
    const createNewNoteBtn = document.getElementById('create-new-note-btn');


    noteTitleEl.value = note.title;
    noteBodyEl.value = note.body;
    if(!note.tags || note.tags.length === 0){
        tagInputEl.value = ''
    } else {
        tagInputEl.value = note.tags.map(tag => `[${tag}]`).join(' ')
    }
    tagInputEl.style.display = 'none'
    tagDisplayEl.style.display = 'flex'
    updateCurrentNoteID(note.id)
    updateWordCount()

    currentNoteDisplayState = 'Editing';

    const noteCards = document.querySelectorAll('.note-card')
    noteCards.forEach(card => {
        card.classList.remove('selected-note')
    })
    noteCards[noteIndex].classList.add('selected-note');
    
    tagDisplayEl.innerHTML = note.tags 
    ? note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
    : ''
}

function createBlankNote(){
    noteBodyEl.value = '';
    noteTitleEl.value = 'Untitled Note';
    currentNoteDisplayState = 'Creating';
    noteTitleEl.focus()
}

createNewNoteBtn.addEventListener('click', createBlankNote);

function createNewNote(){
    const noteTitle =  noteTitleEl.value;
    const noteBody = noteBodyEl.value;
    const day = new Date();
    const date = `${day.getDate()}-${day.getMonth() + 1}-${day.getFullYear()}`;
    const id = idNum;
    idNum++;

    notes.push({title: noteTitle, body: noteBody, id:id, date: date, bookmarked: false,tags: []});
    updateNoteData()
    resetDisplayingNotes()
    updateCurrentNoteID(id);
    renderSidebarNoteCards();
    currentNoteDisplayState = 'Editing';
}

function saveNoteChanges(){
    const noteIndex = getNoteIndex(currentNoteID);
    if(noteIndex === -1) return console.log('note not found, currentNoteID:', currentNoteID)
    if(checkForDuplicateNoteTitles(noteTitleEl.value, notes[noteIndex].id)){
        return;
    }
    notes[noteIndex].title = noteTitleEl.value;
    notes[noteIndex].body = noteBodyEl.value;
    updateCurrentNoteID(notes[noteIndex].id)
    updateNoteData()
    renderSidebarNoteCards(); 
    currentNoteDisplayState = 'Editing';
}

export function createOrEdit(){
    if(currentNoteDisplayState === 'Creating') createNewNote();
    if(currentNoteDisplayState === 'Editing') saveNoteChanges();
}

function checkForDuplicateNoteTitles(title, id){
    let hasDuplicates = false;
    notes.forEach(note => {
        if(note.id === id){
            return;
        } else {
            if(note.title === title){
                hasDuplicates = true;
            }
        }
        
    })
    return hasDuplicates;
}

let bodyDebounce

noteBodyEl.addEventListener('input', () => {
    clearTimeout(bodyDebounce);
    bodyDebounce = setTimeout(() => {
        updateWordCount()
        if(currentNoteDisplayState === 'Editing'){
            createOrEdit()
        }
    },300)
})

let titleDebounce

noteTitleEl.addEventListener('input', () => {
    clearTimeout(titleDebounce);
    titleDebounce = setTimeout(() => {
        if(!checkForDuplicateNoteTitles(noteTitleEl.value, currentNoteID)){
            createOrEdit()
        }
        console.log('bouncy debounce')
    }, 300)
})