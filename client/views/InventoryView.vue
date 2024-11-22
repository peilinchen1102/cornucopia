<script setup lang="ts">
import CreateStockModal from "@/components/Inventory/CreateStockModal.vue";
import StockComponent from "@/components/Inventory/StockComponent.vue";
import { useOrganizationStore } from "@/stores/organization";
import { fetchy } from "@/utils/fetchy";
import Multiselect from "@vueform/multiselect";
import { storeToRefs } from "pinia";
import { computed, onBeforeMount, ref } from "vue";

const { selectedOrg } = storeToRefs(useOrganizationStore());

const inventories = ref<Array<any>>([]);
const inventory = ref<Array<any>>([]);
const showCreateModal = ref<boolean>(false);
const item = ref("");
const allDiets = computed(() => [...new Set(inventories.value.flatMap((inventory) => inventory.diet))]);
const loaded = ref(false);

async function getInventory() {
  try {
    if (selectedOrg.value) {
      let name = item.value;
      let query: Record<string, string> = name !== undefined ? { name } : {};
      inventory.value = [await fetchy(`/api/inventory/${selectedOrg.value.id}`, "GET", { query })];
    }
  } catch (error) {
    return;
  }
}

async function getAllInventories() {
  try {
    if (selectedOrg.value) {
      inventory.value = await fetchy(`/api/inventory/${selectedOrg.value.id}`, "GET");
    }
  } catch (error) {
    return;
  }
}
async function getInventories() {
  try {
    if (selectedOrg.value) {
      inventories.value = await fetchy(`/api/inventory/${selectedOrg.value.id}`, "GET");
    }
  } catch (error) {
    return;
  }
}

async function addItem(name: string, imgLink: string, purchaseLink: string, units: number, diet: Array<string>, maxPerPerson: number) {
  const body = { owner: selectedOrg.value ? selectedOrg.value.id : "", item: name, count: units, link: purchaseLink, img: imgLink, diet: diet, maxp: maxPerPerson };
  showCreateModal.value = false;
  try {
    await fetchy(`/api/inventory`, "POST", { body: body });
    await getAllInventories();
    await getInventories();
  } catch (_) {
    return;
  }
}
async function getMaxAllocation() {
  try {
    if (selectedOrg.value) {
      await fetchy(`/api/inventories/${selectedOrg.value.id}`, "GET");
    }
  } catch (error) {
    return;
  }
  await getAllInventories();
  await getInventories();
}

onBeforeMount(async () => {
  await getAllInventories();
  await getInventories();
  loaded.value = true;
});
</script>

<template>
  <div class="inventory" v-if="selectedOrg">
    <h1>Inventory</h1>
    <!-- <form class="pure-form pure-form-aligned" @submit.prevent="search"> -->
    <div class="top-header">
      <div class="search-dropdown">
        <Multiselect
          v-model="item"
          class="search"
          :searchable="true"
          :options="inventories.map((item) => item.item)"
          @clear="getAllInventories"
          @select="getInventory"
          placeholder="Search for an item"
        ></Multiselect>
      </div>
      <div class="btn-group">
        <button class="success-btn" @click.prevent="showCreateModal = true">Create New Item</button>
        <button class="info-btn align" @click.prevent="getMaxAllocation()">
          Update Daily Allocation
          <div class="tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path
                d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
              />
            </svg>
            <span class="tooltiptext"
              >Click here at the start of each day to recalculate and update max per day allocation. Ensures optimal distribution to make your supplies last throughout the rest of the week.
            </span>
          </div>
        </button>
      </div>
    </div>

    <teleport to="body">
      <CreateStockModal :allDiets="allDiets" :show="showCreateModal" @close="showCreateModal = false" @add="addItem" />
    </teleport>
    <div class="allStocks" v-if="loaded && inventory.length">
      <div v-for="stock in inventory" :key="stock" class="stocks">
        <StockComponent :allDiets="allDiets" @refreshStocks="getAllInventories(), getInventories()" :stockId="stock._id" />
      </div>
    </div>
    <div class="no-file" v-else-if="!loaded">
      <img class="loader" src="../assets/images/logo.svg" />
    </div>
    <div class="no-file" v-else>
      <h2><i>No Items in Inventory Yet</i></h2>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 0;
}
.no-file,
h2 {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: var(--faded);
  font-weight: lighter;
  font-size: 36px;
  margin: 0;
  margin-top: 4em;
}
h2 {
  margin-right: 0;
}
.btn-group {
  display: flex;
  gap: 1em;
  margin-right: 0em;
}
.inventory {
  text-align: center;
}
.allStocks {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  font-weight: 100;
  margin: 0;
}

.top-header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-left: 10%;
  margin-right: 10%;
  padding-top: 2em;
  padding-left: 4em;
  padding-bottom: 1em;
  padding-right: 4em;
  margin-bottom: 2em;
  font-weight: 300;
}

.search-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  width: 24em;
}
.stocks {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.right {
  margin-top: 1em;
  margin-right: 11em;
  margin-bottom: 1em;
  display: flex;
  justify-content: flex-end;
}
.reset {
  background-color: var(--secondary);
  color: black;
  margin-right: 5em;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 160px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 100;
  top: 150%;
  left: 50%;
  margin-left: -65px;
  font-size: x-small;
  line-height: normal;
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent black transparent;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

.align {
  display: flex;
  align-content: center;
  gap: 0.5em;
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
