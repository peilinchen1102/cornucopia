<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import moment from "moment";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import VueCal from "vue-cal";
import CreateShiftModal from "../components/Shift/CreateShiftModal.vue";
import DeleteShiftModal from "../components/Shift/DeleteShiftModal.vue";
import ShiftModal from "../components/Shift/ShiftModal.vue";
let hidePastShifts = ref(true);
let showOnlyMyShifts = ref(false);
let shifts = ref<Array<Record<string, string>>>([]);
let myShifts = ref<Array<Record<string, string>>>([]);

const { getCurrentOrganization } = useOrganizationStore();
const { selectedOrg } = storeToRefs(useOrganizationStore());
const { currentUsername } = storeToRefs(useUserStore());

const showShiftModal = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const showCreateModal = ref<boolean>(false);

const shift = ref<any>(undefined);
const today = new Date();
const loaded = ref(false);

async function getOrgShifts() {
  let results;
  try {
    if (selectedOrg.value) {
      results = await fetchy(`/api/shift/org/${selectedOrg.value.id}/${hidePastShifts.value}`, "GET");
    }
  } catch (_) {
    return;
  }
  shifts.value = results;
}

async function getMyShifts() {
  let results;
  try {
    results = await fetchy(`/api/shift/user/${hidePastShifts.value}`, "GET");
  } catch (_) {
    return;
  }
  myShifts.value = results;
}

async function getAllShifts() {
  await getOrgShifts();
  await getMyShifts();
}

async function toggleFuturePref() {
  hidePastShifts.value = !hidePastShifts.value;
  await getAllShifts();
}

async function toggleMyShiftsPref() {
  showOnlyMyShifts.value = !showOnlyMyShifts.value;
  await getAllShifts();
}

function convertDates(shifts: Record<string, string>[]) {
  if (selectedOrg.value) {
    const org = selectedOrg.value.name;
    return shifts.map((s) => {
      const start = moment(s.start).format("YYYY-MM-DD, HH:mm");
      const end = moment(s.end).format("YYYY-MM-DD, HH:mm");
      let cls;
      if (showOnlyMyShifts.value) {
        cls = s.owner === org ? "currentOrg" : "otherOrg";
      } else {
        cls = s.volunteers.includes(currentUsername.value) ? "claimedShift" : "unclaimedShift";
      }
      return {
        start: start,
        end: end,
        capacity: s.capacity,
        volunteers: s.volunteers.length,
        shift: s,
        class: cls,
      };
    });
  }
}

onBeforeMount(async () => {
  try {
    await getAllShifts();
    await getCurrentOrganization();
    loaded.value = true;
  } catch {
    return;
  }
});

async function updateShift(event: any) {
  try {
    if (selectedOrg.value) {
      const body = { id: event.event.shift._id, start: event.event.start, end: event.event.end, event: event.event };
      await fetchy("api/shift", "PATCH", {
        body: body,
      });
    }
  } catch (_) {
    await getAllShifts();
    return;
  }
  await getAllShifts();
  return;
}

const deleteShift = async (shift: any) => {
  try {
    await fetchy(`api/shift/${shift._id}`, "DELETE");
  } catch {
    return;
  }
  await getAllShifts();
  showDeleteModal.value = false;
};

const triggerModal = async (event: any) => {
  shift.value = event.shift;
  showShiftModal.value = true;
};

const triggerCreateModal = async (event: any) => {
  shift.value = { start: event.start, end: event.end };
  showCreateModal.value = true;
};

const triggerCreateModalDblClick = async (event: any) => {
  const start = event;
  const startTime = new Date(start).getTime();
  const end = new Date(startTime + 2 * 60 * 60 * 1000).toISOString();
  shift.value = { start: start, end: end };
  showCreateModal.value = true;
};
</script>

<template>
  <main>
    <div class="shifts">
      <h1>Timesheet</h1>
      <div class="row">
        <div class="toggletext">Show only future shifts:</div>
        <label class="switch" style="margin-right: 3em">
          <input type="checkbox" @click="toggleFuturePref" checked />
          <span class="slider round"></span>
        </label>
        <div class="toggletext">Show all my claimed shifts:</div>
        <label class="switch">
          <input type="checkbox" @click="toggleMyShiftsPref" />
          <span class="slider round"></span>
        </label>
      </div>
      <teleport to="body">
        <article v-for="s in shifts" :key="s._id">
          <ShiftModal
            :show="showShiftModal && shift._id === s._id"
            :shift="s"
            @close="showShiftModal = false"
            @delete="showDeleteModal = true"
            @refreshShifts="getAllShifts(), (showShiftModal = false)"
            @updateCapacity="getAllShifts"
          />
        </article>
        <DeleteShiftModal :show="showDeleteModal" :shift="shift" @close="showDeleteModal = false" @delete="deleteShift" />
        <CreateShiftModal :show="showCreateModal" :shift="shift" @close="showCreateModal = false" @refreshShifts="getAllShifts(), (showCreateModal = false)" />
      </teleport>
    </div>
    <div v-if="loaded" class="cal" :title="selectedOrg?.isAdmin ? 'Click and drag or double click to create shifts!' : ''">
      <vue-cal
        ref="vuecal"
        :time-from="7 * 60"
        :time-to="22 * 60"
        :snap-to-time="15"
        :disable-views="['years', 'year', 'day']"
        :editable-events="{ title: false, drag: selectedOrg?.isAdmin, resize: selectedOrg?.isAdmin, delete: false, create: selectedOrg?.isAdmin }"
        :drag-to-create-threshold="15"
        style="height: 100%"
        :events="convertDates(showOnlyMyShifts ? myShifts : shifts)"
        today-button
        :on-event-click="triggerModal"
        @event-drag-create="triggerCreateModal"
        :min-date="today"
        @event-duration-change="updateShift"
        @event-drop="updateShift"
        @cell-dblclick="triggerCreateModalDblClick"
      >
        <template #event="{ event }">
          <div>{{ moment(event.start).format("HH:mm") }} - {{ moment(event.end).format("HH:mm") }}</div>
          <small>
            Volunteers: {{ event.volunteers }} <br />
            Capacity: {{ event.capacity }}
          </small>
        </template>
      </vue-cal>
    </div>
    <div class="no-shifts" v-else>
      <img class="loader" src="../assets/images/logo.svg" />
    </div>
  </main>
</template>

<style scoped>
h2,
.no-shifts {
  margin-top: 1em;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--faded);
  font-weight: lighter;
  font-size: 36px;
}
.cal {
  margin: 0 7em 3em 7em;
}

.shifts {
  margin: 0em;
}

.row {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  max-width: 60em;
  padding: 0em;
}

h1 {
  text-align: center;
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

.toggletext {
  font-weight: lighter;
  margin-top: 15px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 10px;
  z-index: 50;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--secondary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--secondary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.vuecal--month-view {
  min-height: 800px;
}

.loader {
  margin-top: 6em;
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
