<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";

const props = defineProps(["show", "shift"]);
const emit = defineEmits(["close", "unclaim"]);
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">Unclaim shift from {{ formatDate(props.shift.start) }} to {{ formatDate(props.shift.end) }}</div>
        Are you sure?
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Cancel</button>
          <button class="delete-btn" @click="emit('unclaim')">Unclaim shift</button>
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
