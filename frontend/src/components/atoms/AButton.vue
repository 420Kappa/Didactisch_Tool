<template>
  <button @click="handleClick" class="atomic-button">
    <slot></slot>
    <span class="atomic-button-text">{{ text }}</span>
  </button>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  text: {
    type: String,
  },
  icon: {
    type: String,
  }
},
);
// eslint-disable-next-line no-unused-vars
const emit = defineEmits(["someEvent"])

</script>

<style>
.atomic-button {
  background-color: #152F4F;
  color: white;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
  border-radius: 50px / 50px;
}
</style>