<script setup lang="ts">
import { ref } from "vue";
import { fetchy } from "../../utils/fetchy";
import AddPatronModal from "./AddPatronModal.vue";
import DeleteHouseholdModal from "./DeleteHouseholdModal.vue";
import DeletePatronModal from "./DeletePatronModal.vue";
import HouseholdInfoComponent from "./HouseholdInfoComponent.vue";
import PatronCardComponent from "./PatronCardComponent.vue";
const showDeleteModal = ref<boolean>(false);
const showPatronDeleteModal = ref<boolean>(false);
const showPatronAddModal = ref<boolean>(false);

const props = defineProps(["household", "allLanguages", "allDiets"]);
const emit = defineEmits(["refreshHouseholds", "refreshById"]);
const members = ref<Array<any>>(props.household.members);

const deleteHousehold = async () => {
  try {
    await fetchy(`/api/profile/${props.household._id}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshHouseholds");
};

async function refreshPatron(patronId: string) {
  const idx = members.value.findIndex((patron) => patron._id === patronId);
  if (idx !== -1) {
    try {
      members.value[idx] = await fetchy(`/api/patron/${patronId}`, "GET");
    } catch (error) {
      return;
    }
  }
}

async function deletePatrons(patrons: Array<string>) {
  try {
    const body = { patrons: patrons, household: props.household._id };

    await fetchy(`/api/profile/removePatron`, "PATCH", { body: body });
    showPatronDeleteModal.value = false;

    emit("refreshById", props.household._id);
  } catch (error) {
    return;
  }
}
</script>

<template>
  <main style="margin: 10px 0px">
    <div class="row">
      <div>
        <HouseholdInfoComponent :allDiets="allDiets" :allLanguages="allLanguages" :household="household" @refreshHouseholds="emit('refreshHouseholds')" />
      </div>
      <div class="row">
        <div class="column">
          <p>
            Members of Household:
            <button @click="showPatronAddModal = true" class="icon" title="Add Members">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4" />
              </svg>
            </button>
            <button @click="showPatronDeleteModal = true" class="icon" title="Delete Members">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-fill-x" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4" />
                <path
                  d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m-.646-4.854.646.647.646-.647a.5.5 0 0 1 .708.708l-.647.646.647.646a.5.5 0 0 1-.708.708l-.646-.647-.646.647a.5.5 0 0 1-.708-.708l.647-.646-.647-.646a.5.5 0 0 1 .708-.708"
                />
              </svg>
            </button>
          </p>
          <div class="row" v-for="patron in members" :key="patron">
            <PatronCardComponent :patron="patron" :householdId="household._id" @update="refreshPatron" />
          </div>
        </div>
        <div class="modify">
          <button class="icon" @click.prevent="showDeleteModal = true" title="Delete household">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
              />
            </svg>
          </button>
        </div>
      </div>
      <teleport to="body">
        <DeleteHouseholdModal :show="showDeleteModal" :household="household" @close="showDeleteModal = false" @delete="deleteHousehold(), (showDeleteModal = false)" />
        <DeletePatronModal :show="showPatronDeleteModal" :members="members" :householdId="household._id" @close="showPatronDeleteModal = false" @delete="deletePatrons" />
        <AddPatronModal :show="showPatronAddModal" :householdId="household._id" @close="showPatronAddModal = false" @add="emit('refreshById', props.household._id)" />
      </teleport>
    </div>
  </main>
</template>

<style scoped>
.column {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding-right: 2em;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 3.5em;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

main {
  padding: 0;
}

p {
  display: flex;
  align-items: center;
  gap: 3em;
}
</style>
