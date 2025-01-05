import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="element"></div>
`

import { Editor, Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'

import {
  CursorAwareness,
  LoroCursorPlugin,
  LoroSyncPlugin,
  LoroUndoPlugin,
} from "loro-prosemirror";
import { LoroDoc } from "loro-crdt";


const doc = new LoroDoc();
const awareness = new CursorAwareness(doc.peerIdStr);



let loroSyncPlugin = Extension.create({
  name: 'LoroSyncPlugin',

  addProseMirrorPlugins() {
    return [
      LoroSyncPlugin({ doc })
    ]
  },
})
let loroCursorPlugin = Extension.create({
  name: 'LoroCursorPlugin',

  addProseMirrorPlugins() {
    return [
      LoroCursorPlugin(awareness, {}),
    ]
  },
})

let loroUndoPlugin = Extension.create({
  name: 'LoroUndoPlugin',

  addProseMirrorPlugins() {
    return [
      LoroUndoPlugin({
        doc: doc
      }),]
  },
})


const editor = new Editor({

  element: document.querySelector('.element')!,
  extensions: [StarterKit.configure({ history: false }), loroSyncPlugin, loroCursorPlugin, loroUndoPlugin],
  content: '<p>Hello World!</p>',
})
// const plugins = [
//   LoroSyncPlugin({
//     doc: doc
//   }),
//   LoroUndoPlugin({
//     doc: doc
//   }),
//   keymap({
//     "Mod-z": undo,
//     "Mod-y": redo,
//     "Mod-Shift-z": redo,
//   }),
// ];


// editor.state = EditorState.create({ doc, plugins })