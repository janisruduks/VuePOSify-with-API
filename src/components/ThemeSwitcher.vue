<template>
        <v-btn @click="toggleTheme" icon="mdi-theme-light-dark" variant="text"></v-btn>
</template>

<script lang="ts" setup>
import { useTheme } from 'vuetify';
import { onMounted } from 'vue';
const theme = useTheme();

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
  localStorage.setItem('themeDark', JSON.stringify(theme.global.current.value.dark));
}

onMounted(() => {
  const themeDark: boolean = JSON.parse(localStorage.getItem('themeDark') || 'true');
  if (themeDark !== null) {
    theme.global.name.value = themeDark ? 'dark' : 'light';
  }
});
</script>