<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
const props = defineProps(["household"]);
const emit = defineEmits(["addedVisit"]);

const addVisit = async () => {
  try {
    await fetchy(`/api/profile/visit/${props.household._id}`, "PATCH");
    emit("addedVisit");
  } catch {
    return;
  }
};
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="addVisit">
    <!-- <h3>Register New Organization</h3> -->
    <fieldset>
      <div class="pure-control-group align">
        <!-- <input v-model.trim="orgName" type="text" id="aligned-name" placeholder="Organization Name" required /> -->
        <button class="button-39">add visit</button>
      </div>
    </fieldset>
  </form>
  <!-- <button class="button-39" @click="emit('add')">add visit</button> -->
</template>

<style scoped>
.modify {
  display: flex;
  height: fit-content;
}
.item-card {
  display: flex;
  flex-direction: row;
  padding: 1em;
}

.item {
  display: flex;
  flex-direction: row;
  height: max-content;
  width: 45em;
  justify-content: space-between;
}

.tag {
  border: 1px solid rgba(0, 0, 0, 0.296);
  font-size: smaller;
  padding: 5px;
  border-radius: 64px;
  width: fit-content;
}

.info {
  padding: 0;
  padding-left: 0em;
  border-radius: 16px;
  margin-bottom: 1em;
}
.diet-title {
  margin-bottom: 1em;
  margin-top: 1em;
}

h2 {
  margin-bottom: 1;
  font-weight: lighter;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
  row-gap: 0.5em;
}

p {
  margin: 0px;
}
</style>
