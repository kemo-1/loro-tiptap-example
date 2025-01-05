import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="element"></div>
`

import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import {
  CursorAwareness,
  LoroCursorPlugin,
  LoroSyncPlugin,
  LoroUndoPlugin,
  undo,
  redo,
} from "loro-prosemirror";
import { LoroDoc } from "loro-crdt";
import { keymap } from '@tiptap/pm/keymap'


const doc = new LoroDoc();
const awareness = new CursorAwareness(doc.peerIdStr);

// this example loads the EditorState class from the ProseMirror state package
import { EditorState } from '@tiptap/pm/state'





const editor = new Editor({

  element: document.querySelector('.element')!,
  extensions: [StarterKit.configure({ history: false })],
  content: '<p>Hello World!</p>',
})
const plugins = [
  LoroSyncPlugin({
    doc: doc
  }),
  LoroUndoPlugin({
    doc: doc
  }),
  keymap({
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
  LoroCursorPlugin(awareness, {}),
];


editor.state = EditorState.create({ doc, plugins })