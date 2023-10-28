<template>
  <v-app>
    <default-bar>
      <default-view />
    </default-bar>
    <App-footer />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import AppFooter from "./AppFooter.vue";
</script>
