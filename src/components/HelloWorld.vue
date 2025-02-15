<!-- SpreadsheetFormatter.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import { useSpreadsheetFormatter } from './useSpreadsheetFormatter'

const inputText = ref<string>('')
const formattedText = ref<string>('')
const outputArea = ref<HTMLTextAreaElement | null>(null)

const { formatSpreadsheetContent } = useSpreadsheetFormatter()

const formatText = (): void => {
  if (!inputText.value) return
  formattedText.value = formatSpreadsheetContent(inputText.value)
}

const copyToClipboard = async (): Promise<void> => {
  if (!outputArea.value) return
  try {
    outputArea.value.select()
    await navigator.clipboard.writeText(formattedText.value)
    alert('Copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy text:', error)
    alert('Failed to copy to clipboard. Please try selecting and copying manually.')
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Spreadsheet Content Formatter</h1>

    <div class="mb-4">
      <label class="block text-gray-700 mb-2">Paste spreadsheet content here:</label>
      <textarea
          v-model="inputText"
          class="w-full h-48 p-2 border rounded"
          :style="{
          fontFamily: 'Consolas, Monaco, Courier New, monospace',
      whiteSpace: 'pre',
      wordWrap: 'normal',
      overflowX: 'auto'
      }"
      placeholder="Paste your spreadsheet content here..."
      ></textarea>
    </div>

    <button
        @click="formatText"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
    >
      Format Text
    </button>

    <div v-if="formattedText" class="mb-4">
      <label class="block text-gray-700 mb-2">Formatted Result:</label>
      <textarea
          ref="outputArea"
          :value="formattedText"
          readonly
          class="w-full h-48 p-2 border rounded bg-gray-50"
          :style="{
          fontFamily: 'Consolas, Monaco, Courier New, monospace',
      whiteSpace: 'pre',
      wordWrap: 'normal',
      overflowX: 'auto'
      }"
      ></textarea>
    </div>

    <button
        v-if="formattedText"
        @click="copyToClipboard"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    >
      Copy to Clipboard
    </button>
  </div>
</template>
