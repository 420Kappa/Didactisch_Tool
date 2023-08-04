<script setup>
import AHeader from '../components/organisms/AHeader.vue';
import BackGround from '../components/organisms/BackGround.vue';
import BodyTable from '../components/organisms/BodyTable.vue';

</script>

<template>
  <AHeader />
  <main>
    <div class="contents">
      <BodyTable :view="'maingoals'" />
    </div>
    <BackGround />


  </main>
</template>

<style lang="scss">

.contents{
  position: relative;
  z-index: 1;
}
</style>