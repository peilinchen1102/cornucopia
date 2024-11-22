<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";

const props = defineProps(["show", "language", "translation", "id"]);
const emit = defineEmits(["close", "delete"]);

async function deleteAudioFile() {
  try {
    await fetchy(`/api/languageAudio/${props.id}`, "DELETE");
    emit("delete");
  } catch (_) {
    return;
  }
}
</script>

<template>
  <transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <h3>Are you sure you want to delete the following {{ props.language }} audio file that translates to:</h3>
        <p>{{ props.translation }}</p>
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Cancel</button>
          <button class="delete-btn" @click="deleteAudioFile">Delete</button>
        </div>
      </div>
    </div>
  </transition>
</template>
<style scoped>
.modal-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 2em;
}
h3 {
  margin-top: 0;
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
  width: 500px;
  margin: auto;
  padding: 3em;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
  color: var(--primary);
}

p {
  font-weight: 400;
}
</style>
