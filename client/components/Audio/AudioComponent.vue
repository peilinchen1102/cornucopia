<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useOrganizationStore } from "../../stores/organization";
import { fetchy } from "../../utils/fetchy";
import DeleteAudioModal from "../Audio/DeleteAudioModal.vue";
import UpdateAudioModal from "./UpdateAudioModal.vue";

const { selectedOrg } = storeToRefs(useOrganizationStore());
const props = defineProps(["language", "audios", "allLanguages"]);
const emit = defineEmits(["refresh"]);
const loaded = ref<boolean>(true);
const allAudios = ref<Array<any>>(props.audios);
const showDeleteModal = ref<boolean>(false);
const showUpdateModal = ref<boolean>(false);
const selectedToDelete = ref<number | undefined>(undefined);
const selectedToUpdate = ref<number | undefined>(undefined);

async function getAudioForLanguage() {
  closeDeleteModal();
  try {
    if (selectedOrg.value) {
      const languageAudio = await fetchy(`/api/languageAudio/owner/${selectedOrg.value.id}/${props.language}`, "GET");
      allAudios.value = languageAudio.audios;
      if (!languageAudio.length) {
        emit("refresh");
      }
    }
  } catch (_) {
    return;
  }
}

async function deleteRefresh() {
  closeDeleteModal();
  await getAudioForLanguage();
}

async function updateRefresh(id: string, refresh: boolean) {
  closeUpdateModal();
  try {
    const languageAudio = await fetchy(`/api/languageAudio/${id}`, "GET");
    const idx = allAudios.value.findIndex((audio) => audio._id === id);
    if (idx !== -1) {
      allAudios.value[idx] = languageAudio;
    }
    if (refresh) {
      emit("refresh");
    }
  } catch (_) {
    return;
  }
}

function closeDeleteModal() {
  showDeleteModal.value = false;
  selectedToDelete.value = undefined;
}

function closeUpdateModal() {
  showUpdateModal.value = false;
  selectedToUpdate.value = undefined;
}

//test link "https://drive.google.com/uc?id=1VtInAa-BG3uaxU26zqQLazd3afQL213C"
</script>

<template>
  <main>
    <div v-if="loaded && allAudios">
      <div class="column">
        <h2>{{ props.language }}</h2>
        <div v-for="(audio, idx) in allAudios" :key="audio">
          <p style="margin-left: 0.5em; margin-bottom: 10px; width: 50em; line-height: 1.25em">{{ audio.translation }}</p>
          <div class="row">
            <audio controls preload="auto">
              <source :src="audio.audio" type="audio/mp3" />
              <source :src="audio.audio" type="audio/ogg" />
              <source :src="audio.audio" type="audio/wav" />
              Your browser does not support the audio tag.
            </audio>

            <button class="icon" title="Update Audio" @click="(showUpdateModal = true), (selectedToUpdate = idx)">
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
            <button class="icon" title="Delete Audio" @click="(showDeleteModal = true), (selectedToDelete = idx)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
                />
              </svg>
            </button>
          </div>
        </div>
        <teleport to="body">
          <DeleteAudioModal
            v-if="selectedToDelete !== undefined && allAudios"
            :show="showDeleteModal"
            :id="audios[selectedToDelete]._id"
            :translation="audios[selectedToDelete].translation"
            :language="props.language"
            @close="closeDeleteModal"
            @delete="deleteRefresh"
          />
          <UpdateAudioModal
            v-if="selectedToUpdate !== undefined && allAudios"
            :allLanguages="props.allLanguages"
            :show="showUpdateModal"
            :id="audios[selectedToUpdate]._id"
            :oldLanguage="props.language"
            :oldAudioLink="audios[selectedToUpdate].audio"
            :oldTranslation="audios[selectedToUpdate].translation"
            @update="updateRefresh"
            @close="closeUpdateModal"
          />
        </teleport>
      </div>
    </div>
    <p v-else-if="loaded">No Audio found</p>
    <p v-else><img class="loader" src="../../assets/images/logo.svg" /></p>
  </main>
</template>

<style scoped>
.name {
  color: rgb(79, 78, 78);
}

.content {
  color: rgb(117, 117, 117);
  font-weight: 300;
}

h2 {
  margin: 0;
}

.column {
  align-items: flex-start;
  display: flex;
  gap: 1.25em;
}

.circle {
  border-radius: 10em;
}

.audio {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 0.5em;
}

audio {
  height: 2em;
}

.row {
  display: flex;
  align-content: center;
  transform-origin: top left;
  transform: scale(1.25);
}
.loader {
  width: 50px;
  height: 50px;
  animation-name: spin;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
audio::-webkit-media-controls-panel {
  background-color: rgb(222, 222, 222);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
