<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { formatDate } from "@/utils/formatDate";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const showDeleteModal = ref<boolean>(false);
const { currentUsername } = storeToRefs(useUserStore());

const props = defineProps(["shift", "show"]);
const emit = defineEmits(["refreshShifts", "close", "delete", "updateCapacity"]);
const { selectedOrg } = storeToRefs(useOrganizationStore());
const today = new Date().toISOString();
const isEditingCapacity = ref<boolean>(false);
const capacity = ref<number>(props.shift === undefined ? 0 : props.shift.capacity); //computed(() => props.shift.capacity);

const claimShift = async () => {
  isEditingCapacity.value = false;
  try {
    await fetchy(`api/shift/claim/${props.shift._id}`, "PATCH");
  } catch {
    emit("close");
    return;
  }
  emit("refreshShifts");
};

const unclaimShift = async () => {
  isEditingCapacity.value = false;
  try {
    await fetchy(`api/shift/unclaim/${props.shift._id}`, "PATCH");
  } catch {
    emit("close");
    return;
  }
  emit("refreshShifts");
};

async function updateCapacity() {
  isEditingCapacity.value = false;
  try {
    const body = { id: props.shift._id, capacity: capacity.value };
    await fetchy("/api/shift/capacity", "PATCH", { body: body });
    emit("updateCapacity");
  } catch (_) {
    capacity.value = props.shift.capacity;
    return;
  }
}
</script>

<template>
  <transition name="modal fade">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <h2>Shift Information</h2>
        <div :class="showDeleteModal ? 'hide' : ''">
          <p>Start: {{ formatDate(shift.start) }}</p>
          <p>End: {{ formatDate(shift.end) }}</p>
          <div class="shift">
            <h4 v-if="!isEditingCapacity">
              Max volunteers: {{ shift.capacity }}
              <button v-if="selectedOrg?.isAdmin" class="icon" @click="isEditingCapacity = true" title="Edit Organization Name">
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
            </h4>
            <h4 v-else>
              Max volunteers:
              <input style="padding: 0.5em; border-radius: 0.5em; border-color: rgb(197, 197, 197); border-width: 0.5px" type="number" v-model="capacity" :min="shift.volunteers.length" />
              <button class="icon" @click="updateCapacity" title="Update Name">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                  <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                  />
                </svg>
              </button>
            </h4>
            <div v-if="shift.volunteers.length !== 0" class="row">
              <article v-for="volunteer in shift.volunteers" :key="volunteer" style="background-color: #cdb9a29c">{{ volunteer }}</article>
            </div>
            <p v-else>No volunteers yet!</p>
          </div>

          <div v-if="shift.volunteers.includes(currentUsername)" class="btn-group">
            <div class="modify">
              <button class="close-btn" @click="emit('close')">Close</button>
              <button v-if="shift.end > today" class="info-btn" @click.prevent="unclaimShift">Unclaim</button>
              <button v-if="selectedOrg?.isAdmin && shift.end > today" class="delete-btn" @click.prevent="emit('close'), emit('delete')">Delete</button>
            </div>
          </div>
          <div v-else style="margin-top: 1em">
            <div class="modify">
              <button class="close-btn" @click="emit('close')">Close</button>
              <button v-if="shift.end > today && shift.volunteers.length < shift.capacity" class="success-btn" @click.prevent="claimShift">Claim</button>
              <button v-if="selectedOrg?.isAdmin && shift.end > today" class="delete-btn" @click.prevent="emit('close'), emit('delete')">Delete</button>
            </div>
          </div>
        </div>
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

p {
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
  width: 26em;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  max-height: 20em;
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
</style>
