const toggleFilesBtn = document.getElementById('files-btn')
const collapsingFileHolderEl = document.getElementById('sidebar');

let isFileHolderOpen = false

function toggleFileHolderState(){
    isFileHolderOpen = !isFileHolderOpen
}

function openFileHolder(){
    collapsingFileHolderEl.style.display = 'flex';
}

function closeFileHolder(){
    collapsingFileHolderEl.style.display = 'none';
}

function toggleFileHolder(){
    console.log('is this shit working')
    if(isFileHolderOpen){
        closeFileHolder()
        toggleFileHolderState()
    } else {
        openFileHolder()
        toggleFileHolderState()
    }
}

export function initPermSidebar(){
    toggleFilesBtn.addEventListener('click', toggleFileHolder)
}