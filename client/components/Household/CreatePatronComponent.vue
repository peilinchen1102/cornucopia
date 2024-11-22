<script setup lang="ts">
const props = defineProps(["idx", "name", "birthday", "image"]);
const emit = defineEmits(["updateName", "updateBirthday", "updateImage", "delete"]);
const today = new Date().toISOString().split("T")[0];
function updateName(event: any) {
  emit("updateName", props.idx, event.target.value);
}

function updateBirthday(event: any) {
  emit("updateBirthday", props.idx, event.target.value);
}

function updateImage(event: any) {
  emit("updateImage", props.idx, event.target.value);
}
</script>

<template>
  <div class="patron-card">
    <div class="title">
      <img class="circle" v-if="!props.image.length" src="../../assets/images/image.svg" />
      <img class="circle" v-else :src="props.image" alt="Having Trouble uploading item picture" />
      <button class="icon" @click="emit('delete', props.idx)">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
          />
        </svg>
      </button>
    </div>
    <div class="form-input">
      <span>Name:</span>
      <input @input="updateName" :value="props.name" required />
    </div>

    <div class="form-input"><span>Birthdate:</span> <input type="date" :max="today" :value="props.birthday" @input="updateBirthday" required /></div>
    <div class="form-input"><span>Photo Link:</span> <input @input="updateImage" :value="props.image" /></div>
  </div>
</template>

<style scoped>
.patron-card {
  display: flex;
  flex-direction: column;
  background-color: rgb(240, 240, 240);
  padding: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 5px;
}

.title {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-bottom: 0.5em;
}
.form-input {
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

input {
  padding-left: 0.5em;
  padding-left: 0.5em;
  margin-left: 1em;
  border-radius: 5px;
  height: 35px;
  border-color: rgb(219, 219, 219);
  border: solid;
  width: 10em;
  border-width: 1px;
}

span {
  margin-right: 1em;
}

img {
  height: 50px;
  width: 50px;
  margin-right: 15em;
  margin-bottom: 1em;
}

.circle {
  border-radius: 10em;
}
</style>
