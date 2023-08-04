<template>
  <div class="course-detail">
    <div class="course-name">{{ course.name }}</div>
    <div class="titleDetail">Kerndoelen:</div>
    <div v-for="goal in course.coursegoals" :key="goal.id">
      <ul class="goals">
        <li v-for="mainGoal in goal.maingoals" :key="mainGoal.id" class="goal-item">
          {{ mainGoal.name }}
          <div class="buttons">
            <AButton :text="'unlink'" @click="unlinkMaingoal" />
          </div>
        </li>
      </ul>
    </div>
    <AButton :text="'Link'" @click="link(type = 'maingoals')" class="add" />

    <GoalList title="OPO-doelen" :goals="course.coursegoals" type="coursegoal" @confirm-delete="showConfirmationPopup"
      @edit="edit(goal, 'coursegoals')" />
    <AButton :text="'+'" @click="add(type = 'coursegoals')" class="add" />
    <GoalList title="Lesdoelen" :goals="course.lessongoals" type="lessongoal" @confirm-delete="showConfirmationPopup"
      @edit="edit(goal, 'lessongoals')" />
    <AButton :text="'+'" @click="add(type = 'lessongoals')" class="add" />
    <GoalList title="Beheerders" :goals="course.users" type="user" @unlink="unlinkUser" />
    <AButton :text="'+'" @click="link(type = 'users')" class="add" />
  </div>
  <FormRow v-if="showFormRow" :view="view" :courseId="parseInt(route.params.id)" :existingData="existingData"
    @confirm="handleConfirm" @cancel="cancelNewData" />

  <LinkForm v-if="showLinkForm" :view="view" :coursegoals="course.coursegoals" :courseId="parseInt(route.params.id)"
    @confirm="confirmLink" @cancel="cancelLink" />

  <ConfirmationPopup v-if="showConfirmPopup" message="Are you sure you want to delete this item?"
    @confirmed="deleteData(itemToDelete)" @canceled="hideConfirmationPopup" />
</template>
  
<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCourseStore } from '../../stores/courseStore.js';
import ConfirmationPopup from '../atoms/ConfirmationPopup.vue';
import AButton from '../atoms/AButton.vue';
import GoalList from '../molecules/GoalList.vue';
import FormRow from '../molecules/FormRow.vue';
import LinkForm from '../molecules/LinkForm.vue';

const courseStore = useCourseStore();
const course = ref({});
const route = useRoute();
const data = ref([]);
const showConfirmPopup = ref(false);
const itemToDelete = ref(null);
const itemType = ref('');
const view = ref('');
const showFormRow = ref(false);
const showLinkForm = ref(false);
const newItem = ref({
  name: '',
  code: '',
  type: ''
});
const existingData = ref({ name: '', code: '', type: '' });

onMounted(() => {
  courseStore.loadCourses();
});

watch(() => courseStore.courses, (newCourses) => {
  const courseId = parseInt(route.params.id);
  course.value = newCourses.find((c) => c.id === courseId) || {};
});

const showConfirmationPopup = (itemId, goalType) => {
  showConfirmPopup.value = true;
  itemToDelete.value = itemId;
  itemType.value = goalType;
};

const hideConfirmationPopup = () => {
  showConfirmPopup.value = false;
  itemToDelete.value = null;
  itemType.value = '';
};

const deleteData = (itemId) => {
  if (!itemType.value) {
    console.error("Goal type not specified.");
    return;
  }

  console.log('Deleting item:', itemToDelete.value, 'of type:', itemType.value);

  let endpoint = "";
  switch (itemType.value) {
    case "maingoal":
      endpoint = "maingoals";
      break;
    case "coursegoal":
      endpoint = "coursegoals";
      break;
    case "lessongoal":
      endpoint = "lessongoals";
      break;
    default:
      console.error("Invalid goal type:", itemType.value);
      return;
  }

  fetch(`http://localhost:8080/api/${endpoint}/${itemId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        data.value = data.value.filter((item) => item.id !== itemId);
        if (endpoint == 'coursegoals') {
          course.value.coursegoals = course.value.coursegoals.filter(
            (goal) => goal.id !== itemId
          );
        }
        if (endpoint == 'lessongoals') {
          course.value.lessongoals = course.value.lessongoals.filter(
            (goal) => goal.id !== itemId
          );
        }
        hideConfirmationPopup();
      } else {
        console.error(`Failed to delete ${endpoint.slice(0, -1)}:`, response.status);
      }
    })
    .catch((error) => {
      console.error(`Error deleting ${endpoint.slice(0, -1)}:`, error);
    });
};

const unlinkUser = (itemId) => {
  const courseId = parseInt(route.params.id);

  const endpoint = `http://localhost:8080/api/courses/${courseId}/users/${itemId}`;

  fetch(endpoint, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        course.value.users = course.value.users.filter((user) => user.id !== itemId);
        hideConfirmationPopup();
      } else {
        console.error(`Failed to unlink user from course:`, response.status);
      }
    })
    .catch((error) => {
      console.error(`Error unlinking user from course:`, error);
    });
};

const add = (type) => {
  showFormRow.value = true;
  view.value = type;
};

const edit = (goal, type) => {
  showFormRow.value = true;
  view.value = type;
  existingData.value = { ...goal };
};

const handleConfirm = (updatedItem) => {
  if (updatedItem.id) {
    const index = data.value.findIndex((item) => item.id === updatedItem.id);
    if (index !== -1) {
      data.value.splice(index, 1, updatedItem);
    }
  } else {
    data.value.push(updatedItem);
  }
  showFormRow.value = false;
};

const cancelNewData = () => {
  showFormRow.value = false;
  newItem.value = { name: '', code: '' };
  existingData.value = { name: '', code: '' };
}

const link = (type) => {
  showLinkForm.value = true;
  view.value = type;
};

const confirmLink = () => {
  showFormRow.value = false;
};

const cancelLink = () => {
  showLinkForm.value = false;
}
</script>
  
<style lang="scss">
.course-detail {
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #152F4F;
  border-radius: 10px;
  padding: 20px;
  width: 70vw;
  justify-content: space-between;
  margin-top: 50px;
}

.course-name {
  font-size: 36px;
  color: #152F4F;
  text-decoration: underline;
  margin-bottom: 10px;
}

.titleDetail {
  font-size: 24px;
  margin-bottom: 10px;
  color: #152F4F;
  display: flex;
  justify-content: space-between;
}

.goal-item {
  display: flex;
  justify-content: left;
  font-size: 18px;
  margin-bottom: 5px;
  color: #152F4F;
}

.buttons {
  margin-left: auto;
}

.buttons>* {
  margin-left: 10px;
}

.add {
  width: 5%;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
</style>