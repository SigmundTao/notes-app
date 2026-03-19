import { renderSidebarNoteCards } from './sidebar';
import { updateNoteData } from './main';
import { updateTagData } from './storage';

const tags = JSON.parse(localStorage.getItem('tags')) || [];
const tagInputEl = document.getElementById('tags-input');
const tagDisplayEl = document.getElementById('tags-display');
const tagSelectEl = document.getElementById('tag-select');

tagSelectEl.addEventListener('change', () => {
    const selected = tagSelectEl.value;
    if(selected === 'All'){
        resetDisplayingNotes()
        renderSidebarNoteCards()
    } else {
        filterByTag(selected)
    }
})

function filterByTag(tag){
    console.log('this is firing');
    displayingNotes = notes.filter(note => note.tags && note.tags.includes(tag));
    renderSidebarNoteCards();
}

function updateTagSelect(){
    tagSelectEl.innerHTML = '';
    const allOption = document.createElement('option');
    allOption.textContent = 'All'
    tagSelectEl.appendChild(allOption);

    tags.forEach(tag => {
        tagSelectEl.appendChild(createTagOption(tag))
    })
}

function createTagOption(tag){
    const option = document.createElement('option');
    option.textContent = tag;
    option.value = tag;
    return option
}

const tagColours = [
    [98, 0, 255, 0.5],
    [0, 223, 255, 0.5],
    [255, 0, 0, 0.5],
    [228, 255, 0, 0.5],
    [218, 0, 255, 0.5],
    [0, 255, 0, 0.5],
];

function getTags(){
    const matches = tagInputEl.value.match(/\[([^\]]+)\]/g) || []
    const tags = matches.map(tag => tag.slice(1, -1))
    return tags
}

function saveTags(tagArr){
    const index = getNoteIndex(currentNoteID)
    if(index === -1) return

    const oldTags = notes[index].tags;
    const removedTags = oldTags.filter(tag => !tagArr.includes(tag))

    notes[index].tags = tagArr

    tagArr.forEach(tag => {
        if(!tags.includes(tag)) tags.push(tag)
    })

    removedTags.forEach(t => {
        const stillInUse = notes.some(t =>notes.tag && notes.tag.includes(t))
        if(!stillInUse){
            tags.splice(tags.indexOf(t), 1)
        }
    })
    updateTagData();
    updateTagSelect()
    updateNoteData()
}

tagInputEl.addEventListener('blur', () => {
    const tags = getTags();
    tagInputEl.style.display = 'none';
    tagDisplayEl.style.display = 'flex';
    tagDisplayEl.innerHTML = tags.map(tag => `
        <span class="tag">${tag}</span>
    `).join('')
    saveTags(tags);
})

tagDisplayEl.addEventListener('click', () => {
    tagDisplayEl.style.display = 'none'
    tagInputEl.style.display = 'block'
    tagInputEl.focus()
})