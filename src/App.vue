<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView :key="$route.fullPath" />
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
