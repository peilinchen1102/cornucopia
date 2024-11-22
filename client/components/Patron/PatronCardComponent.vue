<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["patron", "householdId"]);
const emit = defineEmits(["update", "delete"]);
const today = new Date().toISOString().split("T")[0];

const isEditing = ref<boolean>(false);
const name = ref<string>(props.patron.name);
const img = ref<string>(props.patron.image);
const birthday = ref<any>(props.patron.birthday);

async function updatePatrons() {
  const body = { household: props.householdId, patron: props.patron._id, update: { name: name.value, birthday: birthday.value, image: img.value } };
  await fetchy(`/api/profile/updatePatron`, "PATCH", { body: body });
  isEditing.value = false;
  emit("update", props.patron._id);
}
</script>

<template>
  <main>
    <div v-if="patron">
      <div class="column" v-if="isEditing">
        <form class="patron-card" @submit.prevent="updatePatrons">
          <div class="title">
            <img class="circle" v-if="!img.length" src="../../assets/images/image.svg" />
            <img class="circle" v-else :src="img" alt="Having Trouble uploading item picture" />
          </div>
          <div class="form-input">
            <span>Name:</span>
            <input v-model="name" required />
          </div>
          <div class="form-input"><span>Birthdate:</span> <input type="date" :max="today" v-model="birthday" required /></div>
          <div class="form-input"><span>Photo Link:</span> <input v-model="img" /></div>
          <button class="success-btn" type="submit">Update</button>
        </form>
      </div>
      <div class="row" v-else>
        <div class="box">
          <div style="display: flex; flex-direction: row">
            <img v-if="!patron.image.length" class="circle" src="../../assets/images/image.svg" width="60" />
            <img v-else :src="patron.image" width="60" height="60" class="circle" />
            <div class="column">
              <h3 class="name">{{ patron.name }}</h3>
              <div class="content">Date of Birth: {{ patron.birthday }}</div>
            </div>
          </div>
          <button class="icon" @click.prevent="isEditing = true" title="Edit Patron">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
              <path
                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
              />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.row {
  display: flex;
}

.name {
  color: rgb(79, 78, 78);
}

.content {
  color: rgb(117, 117, 117);
  font-weight: 300;
}

h3 {
  margin: 0;
}

.box {
  background-color: white;
  border: solid;
  border-color: rgb(214, 214, 214);
  display: flex;
  border-radius: 1em;
  flex-direction: row;
  padding: 1.5em 1.5em;
  font-weight: 400;
  font-size: small;
  gap: 2.5em;
  width: 23em;
  justify-content: space-between;
  overflow: auto;
  align-content: center;
}

.column {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.circle {
  border-radius: 10em;
}

.patron-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  border-radius: 10px;
  border: solid;
  border-color: rgb(213, 213, 213);
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
  margin-right: 2em;
}

.circle {
  border-radius: 10em;
}
</style>
