<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";

const props = defineProps(["show"]);
const emit = defineEmits(["close", "refreshHouseholds"]);
const { selectedOrg } = storeToRefs(useOrganizationStore());

async function resetVisits() {
  try {
    if (selectedOrg.value) {
      await fetchy(`/api/organization/reset/${selectedOrg.value.id}`, "PATCH");
    }
  } catch (error) {
    return;
  }
  emit("close");
  emit("refreshHouseholds");
}
</script>

<template>
  <transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <div>Reset visits to 0 for all households in this organization</div>
        <p style="font-weight: 400">This action will lose the past visits permanently. Are you sure?</p>
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Close</button>
          <button class="delete-btn" @click="resetVisits">Reset</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
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
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
  color: var(--primary);
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
