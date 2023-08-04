<template>
    <div :class="formClass">
        <div class="select-wrapper" v-if="showUserDropdown">
            <select class="form-select" v-model="formData.user">
                <option v-for="user in userStore.users" :key="user.id" :value="user.id">{{ user.name }}</option>
            </select>
        </div>
        <div class="select-wrapper" v-if="showMaingoalDropdown">
            <select class="form-select" v-model="formData.coursegoal">
                <option v-for="coursegoal in coursegoals" :key="coursegoal.id" :value="coursegoal.id">{{ coursegoal.name }}</option>
            </select>
        </div>
        <div class="select-wrapper" v-if="showMaingoalDropdown">
            <select class="form-select" v-model="formData.maingoal">
                <option v-for="maingoal in maingoalStore.maingoals" :key="maingoal.id" :value="maingoal.id">{{ maingoal.name }}</option>
            </select>
        </div>
        <div class="buttons">
            <IconButton :icon="'✔'" @click.stop="confirmForm" class="icons" />
            <IconButton :icon="'✘'" @click.stop="cancelForm" class="icons" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, watch, onMounted } from 'vue';
import IconButton from '../atoms/IconButton.vue';
import { useUserStore } from '../../stores/userStore.js';
import { useMaingoalStore } from '../../stores/maingoalStore.js';
import axios from 'axios';

const userStore = useUserStore();
const maingoalStore = useMaingoalStore();

onMounted(async () => {
    await userStore.loadUsers();
    await maingoalStore.loadMaingoals();
});

const props = defineProps({
    view: {
        type: String,
        required: true,
    },
    courseId: {
        type: Number,
        required: true,
    },
    coursegoals: {
        type: Array,
    },
});

const showUserDropdown = props.view === 'users';
const showMaingoalDropdown = props.view === 'maingoals';
const formData = ref({ ...props.existingData });

const confirmForm = async () => {
    if (props.view === 'users') {
        try {
            const courseId = props.courseId;
            const userId = formData.value.user;

            const response = await axios.post(`http://localhost:8080/api/courses/${courseId}/users/${userId}`);

            if (response.status === 200) {
                console.log('Course linked to the user successfully');
                emit('confirm');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Failed to link course and user:', error);
        }
    } else if (props.view === 'maingoals') {
        try {
            const coursegoalId = formData.value.coursegoal;
            const maingoalId = formData.value.maingoal;

            const response = await axios.post(`http://localhost:8080/api/coursegoal/${coursegoalId}/maingoals/${maingoalId}`);

            if (response.status === 200) {
                console.log('Coursegoal linked to the maingoal successfully');
                emit('confirm');
            } else {
                console.log('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Failed to link course and maingoal:', error);
        }
    }
};

const cancelForm = () => {
    emit('cancel');
};

const formClass = {
    'user-form': showUserDropdown,
    'maingoal-form': showMaingoalDropdown,
};


const emit = defineEmits(['confirm', 'cancel']);

watch(() => props.existingData, (newValue) => {
    formData.value = { ...newValue };
});

</script>
  
<style lang="scss">
.course-form,
.maingoal-form,
.coursegoal-form,
.lessongoal-form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border: 1px solid #152F4F;
    border-radius: 20px;
    width: 70vw;
    height: 70px;
}

.course-form input,
.maingoal-form input,
.coursegoal-form input,
.lessongoal-form input {
    margin-right: 10px;
    flex: 1;
    height: 100%;
    border: none;
    border-radius: 20px;
}

.form-input:focus {
    outline: none;
}

.icons {
    margin-right: 10px;
}

.select-wrapper {
    height: 100%;
    width: 100%;
}

.form-select {
    border: none;
    height: 100%;
    width: 100%;
    border-radius: 20px;

}
</style>