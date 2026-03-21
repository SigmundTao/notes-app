import { files, selectedFileId } from './state.js'
import { getFileIndex, updateFileData } from './storage.js'
import { renderFolderContents } from './filetree.js'

export const tagInputEl = document.getElementById('tags-input')
const tagDisplayEl = document.getElementById('tags-display')

export function initTags(){
    tagInputEl.addEventListener('blur', handleTagBlur)
    tagDisplayEl.addEventListener('click', handleTagDisplayClick)
}

function handleTagBlur(){
    const parsedTags = getTags()
    tagInputEl.style.display = 'none'
    tagDisplayEl.style.display = 'flex'
    tagDisplayEl.innerHTML = parsedTags.map(tag => `<span class="tag">${tag}</span>`).join('')
    saveTags(parsedTags)
}

export function handleTagDisplayClick(){
    tagDisplayEl.style.display = 'none'
    tagInputEl.style.display = 'block'
    tagInputEl.focus()
}

export function getTags(){
    const matches = tagInputEl.value.match(/\[([^\]]+)\]/g) || []
    return matches.map(tag => tag.slice(1, -1))
}

export function loadTagsForNote(file){
    tagInputEl.value = file.tags && file.tags.length > 0
        ? file.tags.map(tag => `[${tag}]`).join(' ')
        : ''
    tagDisplayEl.innerHTML = file.tags && file.tags.length > 0
        ? file.tags.map(tag => `<span class="tag">${tag}</span>`).join('')
        : ''
    tagInputEl.style.display = 'none'
    tagDisplayEl.style.display = 'flex'
}

export function clearTags(){
    tagInputEl.value = ''
    tagDisplayEl.innerHTML = ''
}

export function saveTags(tagArr){
    const index = getFileIndex(selectedFileId)
    if(index === -1) return
    files[index].tags = tagArr
    updateFileData()
    renderFolderContents()
}