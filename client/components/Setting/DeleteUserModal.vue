<script setup lang="ts">
const props = defineProps(["show"]);
const emit = defineEmits(["close", "delete"]);
</script>

<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <h2>Delete user</h2>
        This action will delete your account permanently. Are you sure?
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Close</button>
          <button class="delete-btn" @click="emit('delete')">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
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
