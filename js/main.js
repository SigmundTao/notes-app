import { renderFolderContents } from './filetree.js'
import { initTags } from './tags.js'
import { initEditor, updateEditorVisibility } from './editor.js'
import { initSearch } from './search.js'
import { initShortcuts } from './shortcuts.js'
import { initPermSidebar } from './navbar.js'

initEditor()
initTags()
initSearch()
initShortcuts()
initPermSidebar()
updateEditorVisibility()
renderFolderContents()