import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<div class="element"></div>
`


import { Editor, Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'


import { LoroSyncPlugin, LoroCursorPlugin, CursorAwareness, LoroUndoPlugin } from "loro-prosemirror";

import { LoroDoc } from "loro-crdt";



const loro_document = new LoroDoc();
const awareness = new CursorAwareness(loro_document.peerIdStr);



const loroSyncPlugin = Extension.create({
  name: 'loro-sync',

  addProseMirrorPlugins() {
    return [
      LoroSyncPlugin({
        //@ts-ignore
        doc: loro_document
      })
    ]
  },
})
const loroCursorPlugin = Extension.create({
  name: 'loro-cursor',

  addProseMirrorPlugins() {
    return [
      LoroCursorPlugin(awareness, {
        user: {
          name: "hey",
          color: "#dddF"
        }
      }),
    ]
  },
})

const loroUndoPlugin = Extension.create({
  name: 'loro-undo',

  addProseMirrorPlugins() {
    return [
      LoroUndoPlugin({
        doc: loro_document
      }),]
  },
})


new Editor({


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