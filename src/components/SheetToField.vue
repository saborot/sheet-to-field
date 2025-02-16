<template>
  <v-container class="main-container w-100 mx-auto p-4">
    <v-row class="mb-4">
      <v-col cols="12" md="5">
        <textarea
          v-model="inputText"
          rows="10"
          class="w-100 pa-2 border rounded"
          @input="formatText"
          :style="{
            fontFamily: 'Consolas, Monaco, Courier New, monospace',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            overflowX: 'auto',
            height: '70vh',
          }"
          placeholder="Paste your spreadsheet content here..."
        ></textarea>
      </v-col>

      <v-col cols="12" md="2">
        <v-btn
            class="mb-6 pa-2 w-100"
            @click="formattedText = inputText = ''"
        >
          Start Over
        </v-btn>
        <v-btn
            class="pa-2 w-100"
            @click="copyToClipboard"
            :disabled="!formattedText"
        >
          Copy
        </v-btn>
      </v-col>

      <v-col cols="12" md="5">
        <textarea
          ref="outputArea"
          rows="10"
          :value="formattedText"
          readonly
          class="w-100 h-100 pa-2 border rounded"
          :style="{
            fontFamily: 'Consolas, Monaco, Courier New, monospace',
            whiteSpace: 'pre',
            wordWrap: 'normal',
            overflowX: 'auto',
            height: '70vh',
          }"
          placeholder="Formatted text will show here..."
        ></textarea>
      </v-col>
    </v-row>
  </v-container>
</template>

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

<style scoped>
.main-container {
  max-width: 100%;
  margin: 0 auto;
}
</style>
