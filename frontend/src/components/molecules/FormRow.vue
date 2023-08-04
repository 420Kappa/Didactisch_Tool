<template>
  <div :class="formClass">
    <input v-if="showCodeInput" v-model="formData.code" :placeholder="codePlaceholder" />
    <input v-model="formData.name" :placeholder="namePlaceholder" />
    <select v-if="showTypeDropdown" v-model="formData.type">
      <option v-for="type in typeStore.types" :key="type">{{ type }}</option>
    </select>
    <IconButton :icon="'✔'" @click.stop="confirmForm" class="icons" />
    <IconButton :icon="'✘'" @click.stop="cancelForm" class="icons" />
  </div>
</template>

<script setup>
import { ref, watch, onMounted, } from 'vue';
import IconButton from '../atoms/IconButton.vue';
import { useTypeStore } from '../../stores/typeStore.js';

const typeStore = useTypeStore();
const typeStoreArray = ref([]);

onMounted(async () => {
  await typeStore.loadTypes();
  typeStoreArray.value = typeStore.types;
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
  existingData: {
    type: Object,
    default: () => ({ name: '', code: '' , type: ''}),
  },
});

const showTypeDropdown = props.view === 'lessongoals';
const formData = ref({ ...props.existingData });

const codePlaceholder = props.view === 'courses' || props.view === 'coursegoals' || props.view === 'lessongoals' ? 'Code' : '';
const namePlaceholder = 'Name';

const confirmForm = () => {
  if (formData.value.name) {
    if (props.existingData.id) {
      let apiUrl = "";
      switch (props.view) {
        case "maingoals":
          apiUrl = `http://localhost:8080/api/maingoals/${props.existingData.id}`;
          break;
        case "coursegoals":
          formData.value.course_id = props.courseId;
          apiUrl = `http://localhost:8080/api/coursegoals/${props.existingData.id}`;
          break;
        case "lessongoals":
          formData.value.course_id = props.courseId;
          apiUrl = `http://localhost:8080/api/lessongoals/${props.existingData.id}`;
          break;
        default:
          apiUrl = `http://localhost:8080/api/courses/${props.existingData.id}`;
          break;
      }

      fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Failed to update ${props.view}`);
          }
        })
        .then((data) => {
          emit('confirm', data[props.view.slice(0, -1)]);
          formData.value = { ...data };
        })
        .catch((error) => {
          console.error(`Error while updating ${props.view}:`, error);
        });
    } else {
      let apiUrl = "";
      switch (props.view) {
        case "maingoals":

          apiUrl = 'http://localhost:8080/api/maingoals';
          break;
        case "coursegoals":
          formData.value.course_id = props.courseId;
          apiUrl = 'http://localhost:8080/api/coursegoals';
          break;
        case "lessongoals":
          formData.value.course_id = props.courseId;
          apiUrl = 'http://localhost:8080/api/lessongoals';
          break;
        default:
          apiUrl = 'http://localhost:8080/api/courses';
          break;
      }

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.value),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`Failed to add ${props.view}`);
          }
        })
        .then((data) => {
          emit('confirm', data[props.view.slice(0, -1)]);
          formData.value = { code: '', name: '' };
        })
        .catch((error) => {
          console.error(`Error while adding ${props.view}:`, error);
        });
    }
  }
};

const cancelForm = () => {
  emit('cancel');
};

const formClass = {
  'course-form': props.view === 'courses',
  'maingoal-form': props.view === 'maingoals',
  'coursegoal-form': props.view === 'coursegoals',
  'lessongoal-form': props.view === 'lessongoals',
};

const showCodeInput = props.view === 'courses' || props.view === 'coursegoals' || props.view === 'lessongoals';

const emit = defineEmits(['confirm', 'cancel']);

watch(() => props.existingData, (newValue) => {
  formData.value = { ...newValue };
});

const initializeFormData = () => {
  formData.value = { ...props.existingData };
};

onMounted(() => {
  initializeFormData();
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
  background-color: #f0f0f0;
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
</style>