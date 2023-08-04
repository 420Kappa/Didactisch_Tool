<template>
    <div>
        <div class="titleDetail">{{ title }}:</div>
        <ul class="goals">
            <li v-for="goal in goals" :key="goal.id" class="goal-item">
                {{ goal.name }}
                <div class="buttons">
                    <div v-if="title == 'Beheerders'">
                        <AButton :text="'unlink'" @click="unlink(goal.id)" />
                    </div>
                    <div v-else>
                        <IconButton :icon="'✏️'" @click.stop="editData(goal)" />
                        <IconButton :icon="'❌'" @click.stop="confirmDelete(goal.id, props.type)" />
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
  
<script setup>
import IconButton from '../atoms/IconButton.vue';
import AButton from '../atoms/AButton.vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    goals: {
        required: true,
    },
});
const emit = defineEmits('confirm-delete', 'unlink', 'edit');

const confirmDelete = (itemId) => {
    const updatedGoals = props.goals.filter((goal) => goal.id !== itemId);
    emit('confirm-delete', itemId, props.type, updatedGoals);
};

const editData = (goal) => {
    emit('edit', goal, props.type,);
};

const unlink = (itemId) => {
    emit('unlink', itemId, props.type);
};
</script>