<script setup>
import HeaderText from '../components/atoms/HeaderText.vue';
import AHeader from '../components/organisms/AHeader.vue';
import BackGround from '../components/organisms/BackGround.vue';
import BodyTable from '../components/organisms/BodyTable.vue';

</script>

<template>
  <AHeader />
  <div class="contents">
    <HeaderText :title="'Didactisch tool voor leerdoelstellingen'"
      :subtitle="'Zie hier een lijst van alle vakken, klik door om de doelen te bekijken'"></HeaderText>
    <BodyTable :view="'courses'" />
  </div>
  <BackGround />
</template>

<style lang="scss">
.contents {
  position: relative;
  z-index: 1;
  margin-left: auto;
  margin-left: auto;
}
</style>