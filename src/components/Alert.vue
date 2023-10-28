<template>
  <v-alert
    v-if="isAlertVisible"
    class="alert-message"
    type="success"
    :title="title"
    :text="text"
  ></v-alert>
  <v-btn @click="timeOutAlert">trigger</v-btn>
</template>

<style>
.alert-message {
  top: 0;
  right: 0;
  position: fixed;
}
</style>

<script lang="ts">
export default {
  data() {
    return {
      isAlertVisible: false,
    };
  },
  props: {
    title: String,
    text: String,
    alert: String,
  },
  methods: {
    timeOutAlert() {
      this.isAlertVisible = true;
      setTimeout(() => {
        this.isAlertVisible = false;
      }, 3000)
    }
  }
};
</script>
