<template>
  <v-main>
    <div class="text-center">
      <v-overlay v-model="value">
        <v-responsive class="align-center text-center">
          <v-container>
            <v-row>
              <v-col v-for="(item, i) in items" :key="i" cols="12" md="3">
                <v-card
                  v-click-outside="(value = !value)"
                  :title="item.title"
                  :text="item.desc"
                  class="rounded-shape pa-3 ma-3"
                >
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-responsive>
      </v-overlay>
    </div>
  </v-main>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const props = defineProps(["overlay", "items"]);
const emit = defineEmits(["update:overlay", "update:items"]);
const value = computed({
  get() {
    return props.overlay;
  },
  set(value: boolean) {
    emit("update:overlay", value);
  },
});
</script>
