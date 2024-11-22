<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";
import CreateHouseholdComponent from "../Household/CreateHouseholdComponent.vue";
// import AddVisitComponent from "./AddVisitComponent.vue";
import HouseholdComponent from "./HouseholdComponent.vue";
import ResetVisitsModal from "./ResetVisitsModal.vue";
import SearchHouseholdsForm from "./SearchHouseholdsForm.vue";

const showCreateComponent = ref<boolean>(false);
const showResetModal = ref<boolean>(false);
const empty = ref<boolean>(false);
const loaded = ref(false);
const households = ref<Array<any>>([]);
const allLanguages = computed(() => [...new Set(households.value.map((household) => household.preferredLanguage).filter((lang) => lang.length !== 0))]);
const allDiets = computed(() => [...new Set(households.value.flatMap((household) => household.dietaryRestrictions))]);

let searchId = ref("");
const { selectedOrg } = storeToRefs(useOrganizationStore());

async function getHouseholds(query?: string) {
  let results;
  loaded.value = false;
  try {
    if (query && /\d/.test(query)) {
      results = [await fetchy(`/api/profile/one/${query}`, "GET")];
      searchId.value = query;
    } else if (query && selectedOrg.value) {
      const allHouseholds = await fetchy(`/api/profile/org/${selectedOrg.value.id}`, "GET");
      const patronHousehold = allHouseholds.filter((household) => household.members.some((member) => member.name.toLowerCase().includes(query.toLowerCase())));
      results = await Promise.all(patronHousehold.map((household) => fetchy(`/api/profile/one/${household._id}`, "GET")));
      searchId.value = query;
    } else if (selectedOrg.value) {
      results = await fetchy(`/api/profile/org/${selectedOrg.value.id}`, "GET");
      searchId.value = "";
    } else {
      results = [];
    }
  } catch (_) {
    return;
  }
  loaded.value = true;
  households.value = results;
}

async function refreshHouseholdById(id: string) {
  try {
    const idx = households.value.findIndex((household) => household._id === id);
    if (idx !== -1) {
      households.value[idx] = await fetchy(`/api/profile/one/${id}`, "GET");
    }
  } catch (error) {
    return;
  }
}

async function clearForm() {
  empty.value = true;
  await getHouseholds();
}

async function resetClear() {
  empty.value = false;
}

onBeforeMount(async () => {
  await getHouseholds();
  loaded.value = true;
});
</script>

<template>
  <div class="right" v-if="!showCreateComponent">
    <SearchHouseholdsForm :empty="empty" @search="getHouseholds" @resetEmpty="resetClear" />
    <div>
      <button class="success-btn" @click.prevent="showCreateComponent = true">Create New Household</button>
      <button class="info-btn reset" @click.prevent="showResetModal = true">Reset All Visits</button>
    </div>
  </div>
  <CreateHouseholdComponent :show="showCreateComponent" :allLanguages="allLanguages" :allDiets="allDiets" @close="showCreateComponent = false" @refreshHouseholds="getHouseholds" />
  <ResetVisitsModal :show="showResetModal" @close="showResetModal = false" @refreshHouseholds="getHouseholds" />
  <div v-if="!showCreateComponent">
    <div class="row">
      <div v-if="searchId" style="display: flex; align-items: center">
        <button class="icon" @click="clearForm">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
        </button>
        <h2>Back</h2>
      </div>
    </div>
    <section class="posts" v-if="loaded && households.length !== 0">
      <article v-for="household in households" :key="household">
        <HouseholdComponent :household="household" :allDiets="allDiets" :allLanguages="allLanguages" @refreshHouseholds="getHouseholds" @refreshById="refreshHouseholdById" />
      </article>
    </section>
    <p class="no-household" v-else-if="loaded"><i>No households yet!</i></p>
    <img v-else class="loader" src="../../assets/images/logo.svg" />
  </div>
</template>

<style scoped>
.no-household {
  margin-top: 4em;
  color: var(--faded);
  font-size: 36px;
}
section {
  display: flex;
  flex-direction: column;
  gap: 1em;
}
h2 {
  font-weight: 100;
}
section,
p,
.row {
  margin: 0 auto;
  max-width: 55em;
}

article {
  /* background-color: #cfeaeda0; */
  background-color: white;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 1em 2em;
  box-shadow: 20px 20px 30px -20px rgba(5, 5, 5, 0.24);
}

.posts {
  padding: 2em;
  display: flex;
  flex-direction: column;
  gap: 3em;
}

.row {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

/* .household {
  margin-left: 4em;
} */

.reset {
  margin-left: 1em;
  margin-right: 6em;
}
.right {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;
  margin-right: 15em;
  margin-left: 15em;
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
