import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        target: 'esnext' //browsers can handle the latest ES features
    },
    base: "/loro-tiptap-example",
    plugins: [wasm(), topLevelAwait()],
})