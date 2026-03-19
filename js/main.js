import { updateTagSelect, tagInputEl } from './tags'
import { renderSidebarNoteCards } from './sidebar';
import { noteTitleEl, noteBodyEl,  } from './notes';



const noteDisplayStates = ['Idle', 'Editing', 'Creating'];
let currentNoteDisplayState = 'Idle';
let currentNoteID = 0;


getTags()

//character and word count
const wordCount = document.getElementById('word-count');
const characterCount = document.getElementById('character-count');
function updateWordCount(){
    const words = noteBodyEl.value.split(' ').length;
    const characters = noteBodyEl.value.split('').length;

    wordCount.textContent = `${words} Words`;
    characterCount.textContent = `${characters} Characters`
}

noteTitleEl.value = '';
noteBodyEl.value = `Press 'alt + n' to create a new note`;
tagInputEl.value = '';
renderSidebarNoteCards()
updateTagSelect()