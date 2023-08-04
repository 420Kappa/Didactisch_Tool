<script setup>
import AHeader from '../components/organisms/AHeader.vue';
import BackGround from '../components/organisms/BackGround.vue';
import DetailList from '../components/organisms/DetailList.vue';

</script>

<template>
  <AHeader />
  <main>
    <div class="contents"> 
      <DetailList />
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