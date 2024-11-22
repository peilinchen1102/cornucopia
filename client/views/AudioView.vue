<script setup lang="ts">
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import AudioComponent from "../components/Audio/AudioComponent.vue";
import CreateAudioModal from "../components/Audio/CreateAudioModal.vue";
import { useOrganizationStore } from "../stores/organization";
import { fetchy } from "../utils/fetchy";

const { selectedOrg } = storeToRefs(useOrganizationStore());
const showCreateModal = ref<boolean>(false);
const allLanguageAudio = ref<Array<any>>([]);
const allLanguages = computed(() => allLanguageAudio.value.map((languageAudio) => languageAudio.language));
const loaded = ref(false);

async function refresh(language: string) {
  const idx = allLanguageAudio.value.findIndex((languageAudio) => languageAudio.language === language);
  if (selectedOrg.value) {
    if (idx !== -1) {
      allLanguageAudio.value[idx] = await fetchy(`/api/languageAudio/owner/${selectedOrg.value.id}/${language}`, "GET");
    } else {
      allLanguageAudio.value = await fetchy(`/api/languageAudio/owner/${selectedOrg.value.id}/allLanguages`, "GET");
    }
  }
}

async function getAllLanguageAudio() {
  loaded.value = false;
  try {
    if (selectedOrg.value) {
      allLanguageAudio.value = await fetchy(`/api/languageAudio/owner/${selectedOrg.value.id}/allLanguages`, "GET");
    }
  } catch {
    return;
  }
  loaded.value = true;
}

onBeforeMount(async () => {
  try {
    await getAllLanguageAudio();
    loaded.value = true;
  } catch (error) {
    return;
  }
});
</script>

<template>
  <main>
    <h1>Language Audio Files</h1>
    <div style="margin-left: 170px; margin-right: 200px">
      <div class="right">
        <button class="close-btn" @click="showCreateModal = true">
          Upload Audio File
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
          </svg>
        </button>
      </div>
      <teleport to="body">
        <CreateAudioModal @close="showCreateModal = false" :show="showCreateModal" :allLanguages="allLanguages" @add="refresh" />
      </teleport>
      <div v-if="loaded && allLanguageAudio.length !== 0" class="language">
        <AudioComponent
          v-for="languageAudio in allLanguageAudio"
          :key="languageAudio"
          :language="languageAudio.language"
          :audios="languageAudio.audios"
          :allLanguages="allLanguages"
          @refresh="refresh"
        />
      </div>
      <div class="no-file" v-else-if="!loaded">
        <img class="loader" src="../assets/images/logo.svg" />
      </div>
      <div class="no-file" v-else>
        <h2><i>No Files Yet</i></h2>
      </div>
    </div>
  </main>
</template>

<style scoped>
.no-file,
h2 {
  margin-top: 3em;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
}

h2 {
  color: var(--faded);
  font-weight: lighter;
  font-size: 36px;
}
.close-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5em;
}
select {
  height: 35px;
  padding: 5px;
  border-color: rgb(188, 188, 188);
  border-radius: 5px;
}
.grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2em 2em;
}

.right {
  display: flex;
  justify-content: flex-end;
  margin-top: 2em;
  margin-right: 0em;
}

.language {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  gap: 4em;
  margin-bottom: 75px;
}

.loader {
  width: 50px;
  height: 50px;
  animation-name: spin;
  animation-duration: 800ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  /* transform: rotate(3deg); */
  /* transform: rotate(0.3rad);/ */
  /* transform: rotate(3grad); */
  /* transform: rotate(.03turn);  */
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
