const sidebarEl = document.getElementById('sidebar');
const displayingNotesContainerEl = document.getElementById('displaying-notes-container');
let showingBookmarks = false;
const bookmarkNavBtn = document.getElementById('bookmark-nav-item');
const displayAllNotesBtn = document.getElementById('all-notes-btn');
const noteDisplayDivEl = document.getElementById('notes-display-div');

export function renderSidebarNoteCards(){
    displayingNotesContainerEl.innerHTML = '';
    displayingNotes.forEach(note => createSidebarNoteCard(note.title, note.date, displayingNotesContainerEl, note.id, note.bookmarked));
}

function createSidebarNoteCard(title, date, containerEl, noteID, bookmarked){
    const sidebarNoteCard = document.createElement('div');
    sidebarNoteCard.classList.add('note-card')
    sidebarNoteCard.innerHTML = `
        <h4>${title}</h4>
        <p>${date}</p>
    `;
     
    const bookmark = document.createElement('div');
    bookmark.classList.add('note-card-bookmark')
    if(bookmarked){
        bookmark.classList.add('bookmarked')
    } else {
        bookmark.classList.add('unbookmarked');
    }

    sidebarNoteCard.appendChild(bookmark)

    bookmark.addEventListener('click', (e) => {
        e.stopPropagation();
        notes[getNoteIndex(noteID)].bookmarked = !notes[getNoteIndex(noteID)].bookmarked;
        if(showingBookmarks){
            showBookmarkedNotes()
        } else{
            renderSidebarNoteCards()
        }        
    })

    const deleteNoteBtn = document.createElement('button');
    deleteNoteBtn.classList.add('delete-note-btn');
    deleteNoteBtn.textContent = 'x';
    deleteNoteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notes.splice(getNoteIndex(noteID), 1);
        updateNoteData()
        resetDisplayingNotes()
        renderSidebarNoteCards()
    })

    sidebarNoteCard.appendChild(deleteNoteBtn) 

    sidebarNoteCard.addEventListener('click', () => loadNote(noteID))
    containerEl.appendChild(sidebarNoteCard)
}

function showAllNotes(){
    resetDisplayingNotes();
    showingBookmarks = false;
    renderSidebarNoteCards()
}

function showBookmarkedNotes(){
    showingBookmarks = true;
    displayingNotes = [];
    notes.forEach(note => {
        if(note.bookmarked){
            displayingNotes.push(note);
        }
    })
    renderSidebarNoteCards()
}

bookmarkNavBtn.addEventListener('click', showBookmarkedNotes);
displayAllNotesBtn.addEventListener('click', showAllNotes);