<script setup lang="ts">
import AllocateItemsModal from "@/components/Patron/AllocateItemsModal.vue";
import { formatDate } from "@/utils/formatDate";
import Multiselect from "@vueform/multiselect";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import { LANGUAGES, TAG_COLORS, onCreate } from "../../../server/framework/utils";
import { useOrganizationStore } from "../../stores/organization";
import { fetchy } from "../../utils/fetchy";

const props = defineProps(["household", "allLanguages", "allDiets"]);
const emit = defineEmits(["refreshVisits", "refreshHouseholds"]);

const { selectedOrg } = storeToRefs(useOrganizationStore());
const language = ref<string>(props.household.preferredLanguage);
const requests = ref<string>(props.household.specialRequests);
const dietRestrictions = ref<Array<string>>(props.household.dietaryRestrictions);
const allAudios = ref<Array<any>>([]);
const editMode = ref<boolean>(false);
const showAudio = ref<boolean>(false);
const showAllocateModal = ref<boolean>(false);
const allocation = ref<Array<any>>([]);

const languageOptions = computed(() => [...new Set([...props.allLanguages, ...LANGUAGES])]);
// const dietOptions = computed(() => [...new Set([...props.allDiets, ...DIETARY_RESTRICTIONS])]);
// const multiselectDietTags = dietOptions.value.map((tag) => {
//   return { label: tag, value: tag };
// });
const dietOptions = [
  { group: "Vegetarian", foods: ["Fish", "Shellfish", "Chicken", "Beef", "Pork", "Meat"] },
  { group: "All nuts", foods: ["Tree Nuts", "Peanuts"] },
  { group: "Dairy", foods: ["Milk", "Eggs"] },
  { group: "Other common allergens", foods: ["Gluten", "Soy", "Sesame"] },
];
const multiselectDietTags = dietOptions.map((i) => {
  return {
    foodGroup: i.group,
    foods: i.foods.map((food) => {
      return { name: food, value: food };
    }),
  };
});

function resetUpdate() {
  editMode.value = false;
  language.value = props.household.preferredLanguage;
  requests.value = props.household.specialRequests;
  dietRestrictions.value = props.household.dietaryRestrictions;
}

async function updateOverview() {
  try {
    if (selectedOrg.value) {
      const body = { id: props.household._id, update: { dietaryRestrictions: dietRestrictions.value, preferredLanguage: language.value, specialRequests: requests.value } };
      await fetchy(`/api/profile`, "PATCH", { body: body });

      emit("refreshHouseholds");
      editMode.value = false;
    }
  } catch (error) {
    return;
  }
}

async function getAudioForLanguage() {
  try {
    if (selectedOrg.value && language.value.length) {
      const languageAudio = await fetchy(`/api/languageAudio/owner/${selectedOrg.value.id}/${language.value}`, "GET");
      allAudios.value = languageAudio.audios;
    }
  } catch (_) {
    return;
  }
}

async function getAllocation() {
  try {
    allocation.value = await fetchy(`/api/profile/allocate/${props.household._id}`, "GET");
  } catch {
    return;
  }
}

onBeforeMount(async () => {
  try {
    await getAudioForLanguage();
    await getAllocation();
  } catch (error) {
    return;
  }
});
</script>

<template>
  <div v-if="props.household" class="item-card">
    <div class="item">
      <div>
        <h3 class="id">ID: {{ props.household._id }}</h3>
        <div class="info">
          <div style="display: flex; justify-content: center">
            <button @click="editMode = true" title="Edit Overview" class="icon"></button>
          </div>
          <p>
            Past visits: {{ props.household.pastVisits.length }}
            <button class="icon" @click="showAllocateModal = true" title="Add visit">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </button>
          </p>
          <ul v-if="props.household.pastVisits.length > 0">
            <div v-for="visit in props.household.pastVisits" :key="visit" class="date">{{ formatDate(visit) }}</div>
          </ul>
        </div>
        <div class="box">
          <div v-if="editMode" class="row">
            <p class="label">Avoid:</p>
            <Multiselect
              v-model="dietRestrictions"
              mode="tags"
              :options="multiselectDietTags"
              :multiple="true"
              :groups="true"
              group-options="foods"
              group-values="foods"
              group-label="foodGroup"
              :group-select="true"
              placeholder="No dietary restrictions"
              track-by="name"
              label="name"
              :closeOnSelect="false"
              :searchable="true"
              :createOption="true"
              @create="onCreate"
              required
            />
          </div>
          <div class="info" v-else>
            <div class="overview-header">
              <h3 class="overview-title">Overview:</h3>
              <button @click="editMode = true" title="Edit Overview" class="icon">
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
            </div>
            <p class="diet-title">Avoid:</p>
            <div v-if="$props.household.dietaryRestrictions.length !== 0" style="display: flex; gap: 0.5em; width: 20em; flex-wrap: wrap">
              <div v-for="(tag, idx) in props.household.dietaryRestrictions" :key="tag">
                <p class="tag" v-bind:style="{ backgroundColor: TAG_COLORS[idx % TAG_COLORS.length] }">{{ tag }}</p>
              </div>
            </div>
            <div v-else>
              <p class="tag" v-bind:style="{ backgroundColor: TAG_COLORS[2] }">No dietary restrictions</p>
            </div>
          </div>
          <div class="">
            <div v-if="editMode" class="row">
              <p class="label">Language:</p>
              <Multiselect
                class="multiselect language-multiselect"
                style="height: 2em"
                v-model="language"
                @create="onCreate"
                :createTag="true"
                :options="languageOptions"
                placeholder="Select or Enter a New Language"
                :searchable="true"
              />
            </div>
            <div v-else class="language">
              <p>Language: {{ props.household.preferredLanguage }}</p>
              <div v-if="allAudios.length !== 0" class="language-audio">
                <button v-if="!showAudio" @click="showAudio = true" class="icon" style="color: var(--primary); text-decoration: underline">Show Audio</button>
                <button v-else @click="showAudio = false" class="icon" style="color: var(--primary); text-decoration: underline">Hide Audio</button>
                <div v-if="showAudio" style="margin-top: 1em; display: flex; gap: 2em; flex-direction: column">
                  <div v-for="audio in allAudios" :key="audio" class="audio">
                    <p style="margin-left: 0.5em; margin-bottom: 0px">{{ audio.translation }}</p>
                    <audio controls preload="auto">
                      <source :src="audio.audio" type="audio/mp3" />
                      <source :src="audio.audio" type="audio/ogg" />
                      <source :src="audio.audio" type="audio/wav" />
                      Your browser does not support the audio tag.
                    </audio>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div v-if="editMode" class="row">
              <p class="label">Notes:</p>
              <input v-model="requests" />
            </div>
            <p v-else-if="household.specialRequests">Notes: {{ props.household.specialRequests }}</p>
          </div>
        </div>
        <div class="btn-group">
          <button class="close-btn" v-if="editMode" @click="resetUpdate">Cancel</button>
          <button class="success-btn" v-if="editMode" @click="updateOverview">Update</button>
        </div>
      </div>
    </div>
    <teleport to="body">
      <AllocateItemsModal
        :show="showAllocateModal"
        :household="household"
        :allocation="allocation"
        @close="showAllocateModal = false"
        @refreshHouseholds="emit('refreshHouseholds'), (showAllocateModal = false)"
      />
    </teleport>
  </div>
</template>

<style scoped>
.language-audio {
  text-align: start;
}
.id {
  text-align: start;
}
h3 {
  font-weight: lighter;
}
.overview-title {
  margin-right: 10em;
}
.overview-header {
  display: flex;
  align-items: center;
}

.btn-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 1em;
}

.modify {
  display: flex;
  height: fit-content;
}

.label {
  margin-right: 1em;
}
.item-card {
  display: flex;
  flex-direction: row;
  padding: 0em;
}
.multiselect {
  padding-right: 1em;
  margin: 0;
  margin-left: 1em;
  width: 18em;
  --ms-ring-color: #eb721630;
  padding-left: 8px;
  --ms-py: 0;
  --ms-px: 0;
  --ms-tag-bg: var(--primary);
  border-color: rgb(188, 188, 188);
  height: fit-content;
  font-weight: lighter;
  font-size: small;
}

.edit-row {
  display: flex;
  width: 100%;
}

.item {
  display: flex;
  flex-direction: row;
  height: max-content;
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
.language-row {
  display: flex;
  flex-direction: row;
  gap: 0.25em;
  row-gap: 0.5em;
  width: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
  row-gap: 0.5em;
  justify-content: space-between;
}

p {
  margin: 0px;
  display: flex;
  align-content: center;
  gap: 1em;
}

.date {
  font-weight: 400;
}

.language {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.5em;
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

input {
  height: 6em;
  width: 14.3em;

  border: solid;
  border-width: 1px;
  border-color: rgb(188, 188, 188);
  border-radius: 3px;
  margin-bottom: 0px;
}
.box {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-bottom: 2em;
  padding-right: 1em;
}

ul {
  text-align: left;
}
</style>
