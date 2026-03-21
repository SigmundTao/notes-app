import { toggleFileHolder } from "./filetree.js"

const toggleFilesBtn = document.getElementById('files-btn')

export function initPermSidebar(){
    toggleFilesBtn.addEventListener('click', toggleFileHolder)
}