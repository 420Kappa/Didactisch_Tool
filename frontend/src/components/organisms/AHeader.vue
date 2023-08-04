<template>
  <header>
    <div class="wrapper">
      <div class="button-wrapper">
        <AtomicButton :text="'Maingoals'" @click="goMaingoalPage">
          <i class="fa-regular fa-rectangle-list"></i>
        </AtomicButton>
        <AtomicButton :text="'Login'" @click="goLoginPage">
          <i class="fa-regular fa-user"></i>
        </AtomicButton>
      </div>
    </div>
  </header>
</template>

<script setup>
import AtomicButton from '../atoms/AButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const goLoginPage = () => {
  router.push({ name: 'login' });
};

const goMaingoalPage = () => {
  router.push({ name: 'maingoals' });
};
</script>

<style lang="scss">
header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  background-color: white;
  z-index: 1;
  box-shadow: 0 2.5px 20px grey;
  height: 7.5%;
}

.wrapper {
  margin: 0 auto;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

i {
  margin-right: 5px;
}
</style>