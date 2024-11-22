<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import Multiselect from "@vueform/multiselect";
import { ref } from "vue";

const props = defineProps(["show", "id", "allLanguages", "oldLanguage", "oldAudioLink", "oldTranslation"]);
const emit = defineEmits(["close", "update"]);

const language = ref<string>(props.oldLanguage);
const audioLink = ref<string>(props.oldAudioLink);
const translation = ref<string>(props.oldTranslation);

async function updateAudioFile() {
  try {
    const body = { audio: props.id, update: { language: language.value, audio: audioLink.value, translation: translation.value } };
    await fetchy("/api/languageAudio", "PATCH", { body: body });
    emit("update", props.id, props.oldLanguage !== language.value);
  } catch (_) {
    return;
  }
}
</script>

<template>
  <transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <h3>Update Language Audio File</h3>
        <div class="form">
          <div class="item">
            <div class="form-input">
              Language
              <div><Multiselect class="multiselect" v-model="language" :createTag="true" :options="allLanguages" :searchable="true" required /></div>
            </div>
            <div class="form-input">Audio Link:<input v-model="audioLink" /></div>
            <div class="form-input">Translation: <input v-model="translation" /></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Cancel</button>
          <button class="success-btn" @click="updateAudioFile">Update</button>
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
.modal-footer {
  display: flex;
  justify-content: space-between;
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

.form-input {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.multiselect {
  width: 11em;
  height: fit-content;
}

.item {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

input {
  height: 2.2em;
  width: 22em;

  border: solid;
  border-width: 1px;
  border-color: rgb(188, 188, 188);
  border-radius: 3px;
  margin-bottom: 0px;
  padding: 5px;
}
</style>
