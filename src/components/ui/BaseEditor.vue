<template>
    <label
          v-if="label"
          :for="uuid"
          class="block text-sm font-medium text-gray-700"
          :class="{ 'sr-only': !showLabel }"
    >
        {{ label }}
        <span v-if="required" class="text_sm text-red-500">*</span>
    </label>
    <div v-if="editor"  class="flex flex-wrap flex-row border-opacity-50 bg-gray-100">
        <button
              title="bold"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                  px-1 py-1 text-xs font-medium text-white shadow-sm
                  hover:bg-gray-400
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('bold') }"
              @click="editor.chain().focus().toggleBold().run()">
            <svg class="remixicon ri-bold h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/>
                </g>
            </svg>
        </button>

        <button
              title="italic"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('italic') }"
              @click="editor.chain().focus().toggleItalic().run()">
            <svg class="remixicon ri-italic  h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M15 20H7v-2h2.927l2.116-12H9V4h8v2h-2.927l-2.116 12H15z"/>
                </g>
            </svg>
        </button>

        <button
              title="strike through"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
      px-1 py-1 text-xs font-medium text-white shadow-sm
      hover:bg-gray-400
      focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('strike') }"
              @click="editor.chain().focus().toggleStrike().run()">
            <svg class="remixicon ri-strikethrough-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M13 9h-2V6H5V4h14v2h-6v3zm0 6v5h-2v-5h2zM3 11h18v2H3v-2z"/>
                </g>
            </svg>
        </button>

        <button
              title="strike through"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                 hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('underline') }"
              @click="editor.chain().focus().toggleUnderline().run()">
            <svg class="remixicon ri-underline  h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M8 3v9a4 4 0 1 0 8 0V3h2v9a6 6 0 1 1-12 0V3h2zM4 20h16v2H4v-2z"/>
                </g>
            </svg>
        </button>

        <button
              title="subscript"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('subscript') }"
              @click="editor.chain().focus().toggleSubscript().run()">
            <svg class="remixicon ri-subscript-2  h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M11 6v13H9V6H3V4h14v2h-6zm8.55 10.58a.8.8 0 1 0-1.32-.36l-1.154.33A2.001 2.001 0 0 1 19 14a2 2 0 0 1 1.373 3.454L18.744 19H21v1h-4v-1l2.55-2.42z"/>
                </g>
            </svg>
        </button>
        <button
              title="superscript"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('superscript') }"
              @click="editor.chain().focus().toggleSuperscript().run()">
            <svg class="remixicon ri-superscript-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M11 7v13H9V7H3V5h12v2h-4zm8.55-.42a.8.8 0 1 0-1.32-.36l-1.154.33A2.001 2.001 0 0 1 19 4a2 2 0 0 1 1.373 3.454L18.744 9H21v1h-4V9l2.55-2.42z"/>
                </g>
            </svg>
        </button>
        <div class="border-l border-gray-400"></div>
        <button
              title="undo"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().undo().run()">
            <svg class="remixicon ri-arrow-go-back-line h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M5.828 7l2.536 2.536L6.95 10.95 2 6l4.95-4.95 1.414 1.414L5.828 5H13a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H5.828z"/>
                </g>
            </svg>
        </button>
        <button
              title="redo"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().redo().run()">
            <svg class="remixicon ri-arrow-go-forward-line h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M18.172 7H11a6 6 0 1 0 0 12h9v2h-9a8 8 0 1 1 0-16h7.172l-2.536-2.536L17.05 1.05 22 6l-4.95 4.95-1.414-1.414L18.172 7z"/>
                </g>
            </svg>
        </button>

        <div class="border-l border-gray-400"></div>
        <button
              title="paragraph"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('paragraph') }"
              @click="editor.chain().focus().setParagraph().run()">
            <svg class="remixicon ri-paragraph h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M12 6v15h-2v-5a6 6 0 1 1 0-12h10v2h-3v15h-2V6h-3zm-2 0a4 4 0 1 0 0 8V6z"/>
                </g>
            </svg>
        </button>
        <button
              title="heading1"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('heading', { level: 1 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
            <svg class="remixicon ri-h-1 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0H24V24H0z"/>
                    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm8-12v12h-2v-9.796l-2 .536V8.67L19.5 8H21z"/>
                </g>
            </svg>
        </button>
        <button
              title="heading2"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('heading', { level: 2 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
            <svg class="remixicon ri-h-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0H24V24H0z"/>
                    <path d="M4 4v7h7V4h2v16h-2v-7H4v7H2V4h2zm14.5 4c2.071 0 3.75 1.679 3.75 3.75 0 .857-.288 1.648-.772 2.28l-.148.18L18.034 18H22v2h-7v-1.556l4.82-5.546c.268-.307.43-.709.43-1.148 0-.966-.784-1.75-1.75-1.75-.918 0-1.671.707-1.744 1.606l-.006.144h-2C14.75 9.679 16.429 8 18.5 8z"/>
                </g>
            </svg>
        </button>
        <button
              title="heading3"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('heading', { level: 3 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
            <svg class="remixicon ri-h-3 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0H24V24H0z"/>
                    <path d="M22 8l-.002 2-2.505 2.883c1.59.435 2.757 1.89 2.757 3.617 0 2.071-1.679 3.75-3.75 3.75-1.826 0-3.347-1.305-3.682-3.033l1.964-.382c.156.806.866 1.415 1.718 1.415.966 0 1.75-.784 1.75-1.75s-.784-1.75-1.75-1.75c-.286 0-.556.069-.794.19l-1.307-1.547L19.35 10H15V8h7zM4 4v7h7V4h2v16h-2v-7H4v7H2V4h2z"/>
                </g>
            </svg>
        </button>
        <button
              title="heading4"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('heading', { level: 4 }) }"
              @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
            <svg class="remixicon ri-h-4 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0H24V24H0z"/>
                    <path d="M13 20h-2v-7H4v7H2V4h2v7h7V4h2v16zm9-12v8h1.5v2H22v2h-2v-2h-5.5v-1.34l5-8.66H22zm-2 3.133L17.19 16H20v-4.867z"/>
                </g>
            </svg>
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('listItem') }"
              @click="editor.chain().focus().toggleBulletList().run()">
            <svg class="remixicon ri-list-unordered h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M8 4h13v2H8V4zM4.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 7a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0 6.9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                </g>
            </svg>
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().toggleOrderedList().run()">
            <svg class="remixicon ri-list-ordered h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M8 4h13v2H8V4zM5 3v3h1v1H3V6h1V4H3V3h2zM3 14v-2.5h2V11H3v-1h3v2.5H4v.5h2v1H3zm2 5.5H3v-1h2V18H3v-1h3v4H3v-1h2v-.5zM8 11h13v2H8v-2zm0 7h13v2H8v-2z"/>
                </g>
            </svg>
        </button>
        <div class="border-l border-gray-400"></div>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().unsetAllMarks().run()">
            clear marks
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().clearNodes().run()">
            clear nodes
        </button>
        <div class="border-l border-gray-400"></div>
        <button
              title="code"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('code') }"
              @click="editor.chain().focus().toggleCode().run()">
            <svg class="remixicon ri-code-view h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M16.95 8.464l1.414-1.414 4.95 4.95-4.95 4.95-1.414-1.414L20.485 12 16.95 8.464zm-9.9 0L3.515 12l3.535 3.536-1.414 1.414L.686 12l4.95-4.95L7.05 8.464z"/>
                </g>
            </svg>
        </button>
        <button
              title="code box"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('codeBlock') }"
              @click="editor.chain().focus().toggleCodeBlock().run()">
            <svg class="remixicon ri-code-box-line h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path fill-rule="nonzero" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"/>
                </g>
            </svg>
        </button>
        <button
              title="block quote"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('blockquote') }"
              @click="editor.chain().focus().toggleBlockquote().run()">
            <svg class="remixicon ri-double-quotes-l h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
                </g>
            </svg>
        </button>
        <button
              title="horizontal rule"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('HorizontalRule') }"
              @click="editor.chain().focus().setHorizontalRule().run()">
            <svg class="remixicon ri-separator h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M2 11h2v2H2v-2zm4 0h12v2H6v-2zm14 0h2v2h-2v-2z"/>
                </g>
            </svg>
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                px-1 py-1 text-xs font-medium text-white shadow-sm
                text-black
                hover:bg-gray-400
                focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().setHardBreak().run()">
            hard break
        </button>
    </div>
    <editor-content
          :id="uuid"
          :class="{error}"
          :aria-describedby="error ? `${uuid}-error` : null"
          :aria-invalid="error ? true : false"
          :editor="editor"
          class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />

    <BaseInputErrorMessage
          v-if="error"
          :id="`${uuid}-error`"
    >
        {{ error }}
    </BaseInputErrorMessage>
</template>

<script async setup>
import {onBeforeUnmount} from 'vue'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import {EditorContent, useEditor} from '@tiptap/vue-3'

import BaseInputErrorMessage from "./BaseInputErrorMessage.vue";
import UniqueID from "../../utils/UniqueID.js";

const props = defineProps({
    label: {
        type: String,
        default: "",
    },
    error: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: "",
    },
    showLabel: {
        type: Boolean,
        default: true,
    },
    required: {
        type: Boolean,
        default: false,
    }

})
const emit = defineEmits(['update:modelValue'])
const uuid = UniqueID().getID()


const editor = useEditor({
    extensions: [
        StarterKit,
        Underline,
        Subscript,
        Superscript,
    ],
    editorProps: {
        attributes: {
            class: 'prose prose-sm  focus:outline-none',
        },
    },
    injectCSS: false,
    content: props.modelValue,
    onUpdate: ({editor}) => {
        emit('update:modelValue', editor.getHTML())
    }
})

onBeforeUnmount(() => {
    editor.value.destroy()
})
</script>

<style>
</style>