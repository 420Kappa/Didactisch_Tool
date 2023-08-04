<template>
    <div class="confirmation-popup">
        <p>{{ message }}</p>
        <div class="buttons">
            <IconButton :icon="'✔'" @click.stop="confirm" />
            <IconButton :icon="'✘'" @click.stop="cancel" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import IconButton from '../atoms/IconButton.vue';

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    message: {
        type: String,
        required: true,
    },
},
);

const emit = defineEmits(["someEvent"])
const isOpen = ref(true);

const confirm = () => {
    emit('confirmed');
    isOpen.value = false;
};

const cancel = () => {
    emit('canceled');
    isOpen.value = false;
};
</script>
  
<style lang="scss">
.confirmation-popup {
    background-color: white;
    border: 1px solid #152F4F;
    color: #152F4F;
    justify-content: space-between;
    border-radius: 20px;
    width: 70vw;
    height: 150px;
    padding-top: 10px;
    font-size: 30px;
}

.buttons {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    margin-right: 30px;
}
</style>