<template>
  <button @click="handleClick" class="icon-button">
    <span class="icon-button-text">{{ icon }}</span>
  </button>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
    icon: {
      type: String,
      required: true,
    },
  },
);
// eslint-disable-next-line no-unused-vars
const emit = defineEmits([ "someEvent" ])

</script>

<style>
.icon-button{
    background-color: white;
    color: #152F4F;
    padding: 0.6rem;
    border-radius: 100%;
}
</style>

