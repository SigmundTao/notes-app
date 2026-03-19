import { renderSidebarNoteCards } from './sidebar.js'
import { updateTagSelect, initTags } from './tags.js'
import { initEditor } from './editor.js'
import { initSearch } from './search.js'
import { initShortcuts } from './shortcuts.js'
import { showBookmarkedNotes, showAllNotes } from './bookmarks.js'
import { updateEditorVisibility } from './state.js'

const bookmarkNavBtn = document.getElementById('bookmark-nav-item')
const displayAllNotesBtn = document.getElementById('all-notes-btn')

bookmarkNavBtn.addEventListener('click', showBookmarkedNotes)
displayAllNotesBtn.addEventListener('click', showAllNotes)

initEditor()
updateEditorVisibility()
initTags()
initSearch()
initShortcuts()
renderSidebarNoteCards()
updateTagSelect()