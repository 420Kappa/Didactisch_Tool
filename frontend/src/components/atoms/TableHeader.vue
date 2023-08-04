<template>
  <div>
    <table class="data-table">
      <tr v-if="props.view == 'course'" class="header">
        <td class="data-code">Code:</td>
        <td class="data-name">Naam:</td>
        <td class="data-actions">Actions:</td>
      </tr>

      <tr v-else class="data-row">
        <td class="data-name">Naam:</td>
        <td class="data-actions">Actions:</td>
      </tr>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  view: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss">
.data-table {
  width: 70vw;
  border-collapse: collapse;
  border-radius: 20px;
}

.header {
  background-color: #152F4F; 
  color: white; 
  display: flex;
  justify-content: space-between;
  align-items: center; 
  border-radius: 20px;
  width: 70vw;
  height: 70px;
}

.header .data-code {
  font-size: 24px; 
  font-weight: bold; 
  margin-left: 20px;
}

.header .data-name {
  font-size: 24px;
  font-weight: bold; 
}

.header .data-actions {
  font-size: 24px;
  font-weight: bold; 
  margin-right: 20px;
}
</style>