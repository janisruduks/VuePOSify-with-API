<template>
  <v-card style="padding-top: 4rem">
    <v-layout>
      <v-navigation-drawer
        v-model="isDrawerOpen"
        temporary
        expand-on-hover
        rail
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://pbs.twimg.com/media/FnIO3ocWQAIuGv2?format=jpg&name=900x900"
            title="Floofy Bun"
            subtitle="not_fat_manul@floofy.com"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item
            prepend-icon="mdi-home"
            title="Start Menu"
            href="/"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-shape"
            title="Items"
            href="/items"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-package-variant-closed-check"
            title="Orders"
            href="/orders"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-room-service"
            title="Tables"
            href="/tables"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main
        style="
          height: 100%;
          padding-top: 5%;
          padding-bottom: 5%;
        "
      >
        <slot></slot>
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps(["drawer"]);
const emit = defineEmits(["update:drawer"]);
const isDrawerOpen = computed({
  get: () => props.drawer,
  set: (newValue: boolean) => emit("update:drawer", newValue),
});
</script>
