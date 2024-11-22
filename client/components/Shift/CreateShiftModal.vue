<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const props = defineProps(["shift", "show"]);
const emit = defineEmits(["refreshShifts", "close", "create"]);
const { selectedOrg } = storeToRefs(useOrganizationStore());
const capacity = ref<number>(0);

async function createShift() {
  try {
    if (selectedOrg.value) {
      const body = { orgId: selectedOrg.value.id, start: props.shift.start, end: props.shift.end, capacity: capacity.value };
      await fetchy("api/shift", "POST", {
        body: body,
      });
    }
  } catch (_) {
    emit("close");
    return;
  }
  capacity.value = 0;
  emit("refreshShifts");
}

function resetForm() {
  capacity.value = 0;
  emit("close");
}
</script>

<template>
  <transition name="modal fade">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <form @submit.prevent="createShift">
          <h3>Create Shift</h3>
          <div class="form">
            <div class="item">
              <div class="form-input">Max number of volunteers: <input class="number-input" type="number" v-model="capacity" min="0" required /></div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="close-btn" @click.prevent="resetForm">Cancel</button>
            <button class="success-btn" type="submit">Add</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.show {
  display: flex;
  flex-direction: column;
  transition: 0.3 ease-in;
}
.hide {
  display: none;
}
.red:hover {
  color: rgb(163, 3, 3);
}
.shift {
  background-color: #fff;
  border: solid;
  border-width: 1px;
  border-color: rgb(186, 185, 185);
  padding: 1em 1em;
  max-height: 15em;
  border-radius: 0.4rem;
  overflow-y: scroll;
  transition: 0.2s;
}

.modify {
  display: flex;
  gap: 3em;
  width: 26em;
  padding-top: 0.5em;
  justify-content: center;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.75em;
  flex-wrap: wrap;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  width: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25em;
  padding: 0.5em;
  font-weight: 400;
  font-size: small;
}

img {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
}
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
}

.edit-btn {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 18em;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  max-height: 17em;
}
h4 {
  margin-top: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

span {
  color: black;
}

input {
  height: 1em;
  width: 3em;
  border: solid;
  border-width: 1px;
  border-color: rgb(188, 188, 188);
  border-radius: 3px;
  margin-bottom: 0px;
  padding: 5px;
}
</style>
