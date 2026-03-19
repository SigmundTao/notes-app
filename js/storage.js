export function updateNoteData(){
    localStorage.setItem('notes', JSON.stringify(notes));
}

 export function getNoteIndex(id){
    return notes.findIndex(i => i.id === id);
}

export function updateTagData(){
    localStorage.setItem('tags', JSON.stringify(tags));
}