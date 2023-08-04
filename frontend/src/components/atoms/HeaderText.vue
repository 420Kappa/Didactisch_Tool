<template>
    <div class="headerText">
        <h1 class="title">{{ props.title }}</h1>
        <h3 class="subtitle">{{ props.subtitle }}</h3>
    </div>
</template>
  
<script setup>
const props = defineProps({
    title: {
        type: String,
    },
    subtitle: {
        type: String,
    }
},
);


</script>
  
<style>
.title {
    color: #152F4F;
    padding: 10px 20px;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    width: 50vw;

}

.subtitle {
    color: #152F4F;
    padding: 10px 20px;
    border-bottom-right-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 50vw;
}

.headerText {
position: absolute;
bottom: 100%;
left: 10%;    
}
</style>