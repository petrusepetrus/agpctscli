<template>
    <div class="flex flex-wrap flex-row border-opacity-50 bg-gray-100">
        <button
              title="bold"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
                  px-1 py-1 text-xs font-medium text-white shadow-sm
                  hover:bg-gray-400
                  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('bold') }"
              @click="editor.chain().focus().toggleBold().run()">
            <svg class="remixicon ri-bold h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g>
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M8 11h4.5a2.5 2.5 0 1 0 0-5H8v5zm10 4.5a4.5 4.5 0 0 1-4.5 4.5H6V4h6.5a4.5 4.5 0 0 1 3.256 7.606A4.498 4.498 0 0 1 18 15.5zM8 13v5h5.5a2.5 2.5 0 1 0 0-5H8z"/>
                </g>
            </svg>
            <!--<RiBold class="h-4 w-4" aria-hidden="true"/>-->
        </button>
        <!--
        <button
              title="italic"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('italic') }"
              @click="editor.chain().focus().toggleItalic().run()">
            <RiItalic class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              title="strike through"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('strike') }"
              @click="editor.chain().focus().toggleStrike().run()">
            <RiStrikethrough2 class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              title="strike through"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('underline') }"
              @click="editor.chain().focus().toggleUnderline().run()">
            <RiUnderline class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              title="subscript"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('subscript') }"
              @click="editor.chain().focus().toggleSubscript().run()">
            <RiSubscript2 class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              title="superscript"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
              px-1 py-1 text-xs font-medium text-white shadow-sm
              hover:bg-gray-400
              focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('superscript') }"
              @click="editor.chain().focus().toggleSuperscript().run()">
            <RiSuperscript2 class="h-4 w-4" aria-hidden="true"/>
        </button>
        <div class="border-l border-gray-400"></div>
        <button
              title="undo"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
            px-1 py-1 text-xs font-medium text-white shadow-sm
            hover:bg-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().undo().run()">
            <RiArrowGoBackLine class="h-4 w-4" aria-hidden="true"></RiArrowGoBackLine>
        </button>
        <button
              title="redo"
              class="inline-flex items-center rounded border border-transparent bg-white m-1
            px-1 py-1 text-xs font-medium text-white shadow-sm
            hover:bg-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().redo().run()">
            <RiArrowGoForwardLine class="h-4 w-4" aria-hidden="true"></RiArrowGoForwardLine>
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
            <RiParagraph class="h-4 w-4" aria-hidden="true"/>
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
            <RiH1 class="h-4 w-4" aria-hidden="true"/>
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
            <RiH2 class="h-4 w-4" aria-hidden="true"/>
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
            <RiH3 class="h-4 w-4" aria-hidden="true"/>
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
            <RiH4 class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
            px-1 py-1 text-xs font-medium text-white shadow-sm
            text-black
            hover:bg-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              :class="{ 'bg-gray-400': editor.isActive('listItem') }"
              @click="editor.chain().focus().toggleBulletList().run()">
            <RiListUnordered class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button
              class="inline-flex items-center rounded border border-transparent bg-white m-1
            px-1 py-1 text-xs font-medium text-white shadow-sm
            text-black
            hover:bg-gray-400
            focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1"
              @click="editor.chain().focus().toggleOrderedList().run()">
            <RiListOrdered class="h-4 w-4" aria-hidden="true"/>
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
            <RiCodeView class="h-4 w-4" aria-hidden="true"/>
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
            <RiCodeBoxLine class="h-4 w-4" aria-hidden="true"/>
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
            <RiDoubleQuotesL class="h-4 w-4" aria-hidden="true"/>
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
            <RiSeparator class="h-4 w-4" aria-hidden="true"/>
        </button>
        <button @click="editor.chain().focus().setHardBreak().run()">
            hard break
        </button>
        -->

    </div>
</template>

<script>
export default {
    name: "BaseEditorMenu"
}
</script>

<style scoped>

</style>