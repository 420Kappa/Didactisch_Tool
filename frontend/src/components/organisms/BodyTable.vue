<template>
  <div>
    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="🔍 Search...">
    </div>
    <table class="data-table">
      <tbody>
        <tr v-if="!hasSearchResults" class="data-row">
          <td colspan="4" class="data-message">Nothing found</td>
        </tr>
        <template v-if="view === 'courses'">
          <TableHeader :view="'course'" />
          <tr v-for="item in data" :key="item.id" @click="goToDetailPage(item.id)" class="data-row">
            <td class="data-code">{{ item.code }}</td>
            <td class="data-name">{{ item.name }}</td>
            <td class="data-icon">
              <IconButton :icon="'✏️'" @click.stop="editData(item)" />
              <IconButton :icon="'❌'" @click.stop="showConfirmationPopup(item.id)" />
            </td>
          </tr>
        </template>
        <template v-else>
          <tr v-for="item in data" :key="item.id" class="data-row">
            <td class="data-code">{{ item.code }}</td>
            <td class="data-name">{{ item.name }}</td>
            <td class="data-icon">
              <IconButton :icon="'✏️'" @click.stop="editData(item)" />
              <IconButton :icon="'❌'" @click.stop="showConfirmationPopup(item.id)" />
            </td>
          </tr>
        </template>
      </tbody>
      <FormRow v-if="showFormRow" :view="view" :existingData="selectedItem" @confirm="handleConfirm" @cancel="cancelNewData" />
    </table>

    <AButton :text="'+'" @click="addNewRow" />

    <ConfirmationPopup v-if="showConfirmPopup" message="Are you sure you want to delete this item?"
      @confirmed="deleteData(itemToDelete)" @canceled="hideConfirmationPopup" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import IconButton from '../atoms/IconButton.vue';
import ConfirmationPopup from '../atoms/ConfirmationPopup.vue';
import AButton from '../atoms/AButton.vue';
import FormRow from '../molecules/FormRow.vue';
import { useCourseStore } from '../../stores/courseStore.js';
import { useMaingoalStore } from '../../stores/maingoalStore.js';
import TableHeader from '../atoms/TableHeader.vue';

const props = defineProps({
  view: {
    type: String,
    required: true,
  },
},
);

const data = ref([]);
const router = useRouter();
const showConfirmPopup = ref(false);
const showFormRow = ref(false);
const itemToDelete = ref(null);
const routeQuery = new URLSearchParams(window.location.search);
const initialSearchQuery = routeQuery.get('search') || '';
const searchQuery = ref(initialSearchQuery);
const newItem = ref({
  name: '',
  code: '',
});
const selectedItem = ref({ name: '', code: '' });

onMounted(() => {
  loadData();
});

const courseStore = useCourseStore();
const maingoalStore = useMaingoalStore();

const loadData = () => {
  if (props.view === 'courses') {
    courseStore.loadCourses().then(() => {
      data.value = courseStore.courses;
    });
  } else {
    maingoalStore.loadMaingoals().then(() => {
      data.value = maingoalStore.maingoals;
    });
  }
};

watch(data, (newData) => {
  data.value = newData;
});

const goToDetailPage = (itemId) => {
  router.push({ name: 'course', params: { id: itemId } });
};

const showConfirmationPopup = (itemId) => {
  showConfirmPopup.value = true;
  itemToDelete.value = itemId;
};

const hideConfirmationPopup = () => {
  showConfirmPopup.value = false;
  itemToDelete.value = null;
};

const deleteData = (itemId) => {
  console.log('Deleting item:', itemId);

  const endpoint = props.view === 'courses' ? 'courses' : 'maingoals';

  fetch(`http://localhost:8080/api/${endpoint}/${itemId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        data.value = data.value.filter((item) => item.id !== itemId);
        hideConfirmationPopup();
      } else {
        console.error(`Failed to delete ${endpoint.slice(0, -1)}:`, response.status);
      }
    })
    .catch((error) => {
      console.error(`Error deleting ${endpoint.slice(0, -1)}:`, error);
    });
};

const addNewRow = () => {
  showFormRow.value = true;
};

const editData = (item) => {
  showFormRow.value = true;
  selectedItem.value = { ...item }; 
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
  newItem.value = { name: '', code: ''};
  selectedItem.value = { name: '', code: ''};
}

const currentURL = computed(() => {
  const query = searchQuery.value ? `?search=${encodeURIComponent(searchQuery.value)}` : '';
  return window.location.pathname + query;
});

const searchData = () => {
  if (props.view === 'courses') {
    data.value = courseStore.courses.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      const codeMatch = item.code.toLowerCase().includes(searchQuery.value.toLowerCase());
      return nameMatch || codeMatch;
    });
  } else {
    data.value = maingoalStore.maingoals.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase());
      return nameMatch;
    });  }

  window.history.replaceState(null, '', currentURL.value);
};

watch(searchQuery, () => {
  searchData();
});

const hasSearchResults = computed(() => {
  return data.value.length > 0;
});
</script>

<style lang="scss">
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-row {
  cursor: pointer;
  background-color: white;
  border: 1px solid #152F4F;
  color: #152F4F;
  display: flex;
  justify-content: space-between;
  border-radius: 20px;
  width: 70vw;
  height: 70px;
  align-items: center; 
}

.data-code {
  font-size: 20px;
  margin-left: 20px;
}

.data-name {
  font-size: 30px;
}

.data-type {
  font-size: 20px;
}

.data-icon {
  margin-right: 20px;
}

.search-container {
  background-color: #152F4F;
  padding: 10px 20px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  width: 20%;
}

.search-container input {
  color: white;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 18px;
  width: 100%;
  padding: 5px;
}
.search-container ::placeholder {
  color: white;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 18px;
  width: 100%;
  padding: 5px;
}
.search-container {
  align-self: flex-start;
  margin-bottom: 10px;
}

.data-message {
  font-size: 24px;
  text-align: center;
}
</style>