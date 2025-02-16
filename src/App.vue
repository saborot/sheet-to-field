<script setup lang="ts">
import SheetToField from './components/SheetToField.vue'
</script>

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-toolbar-title>Mel's Content Formatter</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <SheetToField />
    </v-main>
  </v-app>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
