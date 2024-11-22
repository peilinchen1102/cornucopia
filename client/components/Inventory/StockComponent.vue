<script setup lang="ts">
import { BodyT, fetchy } from "@/utils/fetchy";
import { computed, onBeforeMount, ref } from "vue";
import { TAG_COLORS } from "../../../server/framework/utils";
import DeleteStockModal from "./DeleteStockModal.vue";
import EditStockModal from "./EditStockModal.vue";

const props = defineProps(["stockId", "allDiets"]);

const emit = defineEmits(["refreshStocks"]);
const item = ref<any>();
const diet = computed(() => item.value.diet);
const showDeleteModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);

async function getItem() {
  try {
    item.value = await fetchy(`/api/inventory/stocks/${props.stockId}`, "GET");
  } catch (error) {
    return;
  }
}

const deleteStock = async () => {
  try {
    await fetchy(`/api/inventory/${props.stockId}`, "DELETE");
  } catch {
    return;
  }
  emit("refreshStocks");
};

async function editStock(name: string, imgLink: string, purchaseLink: string, units: number, diet: Array<string>, maxPerPerson: number) {
  const update: BodyT = { item: name, count: units, supplyLink: purchaseLink, image: imgLink, diet: diet, maxPerPerson: maxPerPerson };
  showEditModal.value = false;
  try {
    await fetchy(`/api/inventory/${props.stockId}`, "PATCH", { body: { update: update } });
    await getItem();
  } catch (e) {
    return;
  }
}

onBeforeMount(async () => {
  await getItem();
});
</script>

<template>
  <div v-if="item" class="item-card">
    <img v-if="item.image.length" :src="item.image" />
    <img v-else src="../../assets/images/image.svg" />
    <div class="item">
      <div style="width: 100%">
        <div class="header">
          <h2>{{ item.item }}</h2>
          <h3 v-if="item.count <= 5" class="low-label">Low in stock!</h3>
        </div>
        <div class="subtext">
          <p class="count">{{ item.count }} Units</p>
          <p class="maxp">Max per Household: {{ item.maxPerPerson }}</p>
          <div style="display: flex; gap: 0.5em">
            <p class="maxp">Max per Day: {{ item.maxPerDay }}</p>
            <div class="tooltip">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path
                  d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                />
              </svg>
              <span class="tooltiptext">A suggested limit of units to distribute today to ensure that supplys last throughout the rest of the week.</span>
            </div>
          </div>
        </div>
        <div class="diet">
          <p class="diet-title">Contains:</p>
          <div v-if="diet.length !== 0" class="row">
            <div v-for="(tag, idx) in diet" :key="tag">
              <p class="tag" v-bind:style="{ backgroundColor: TAG_COLORS[idx % TAG_COLORS.length] }">{{ tag }}</p>
            </div>
          </div>
          <div v-else>
            <p class="tag" v-bind:style="{ backgroundColor: TAG_COLORS[2] }">No allergens</p>
          </div>
        </div>
      </div>
      <teleport to="body">
        <DeleteStockModal :show="showDeleteModal" :stock="item" @close="showDeleteModal = false" @delete="deleteStock(), (showDeleteModal = false)" />
        <EditStockModal :allDiets="allDiets" :show="showEditModal" :stock="item" @close="showEditModal = false" @update="editStock" />
      </teleport>
    </div>
    <div class="row" style="gap: 1em; padding-left: 1.5em">
      <div>
        <button class="icon" @click.prevent="showEditModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
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
      <div class="link">
        <a :href="item.supplyLink" target="_blank" v-if="item.supplyLink"
          ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-cart-fill" viewBox="0 0 16 16">
            <path
              d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
            />
          </svg>
        </a>
      </div>
      <div class="modify">
        <button class="icon" @click.prevent="showDeleteModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-trash3-fill" viewBox="0 0 16 16">
            <path
              d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.low-label {
  color: rgb(203, 1, 1);
  font-weight: bold;
}
.header {
  display: flex;
  width: 100%;
  justify-content: space-between;
}
.modify {
  display: flex;
  height: fit-content;
}
.item-card {
  display: flex;
  flex-direction: row;
  padding: 1em;
  width: 60em;
  display: flex;
  margin-bottom: 2em;
  justify-content: space-between;
  background-color: #fff;
  border: none;
  border-width: 1px;
  border-color: rgb(186, 185, 185);
  padding: 1em 1em;
  border-radius: 0.4rem;
  transition: 0.2s;
  box-shadow: 10px 20px 30px -20px rgba(5, 5, 5, 0.24);
}

.subtext {
  display: flex;
  flex-direction: row;
}
.item {
  display: flex;
  flex-direction: row;
  height: max-content;
  width: 33em;
  justify-content: space-between;
}

.tag {
  border: 1px solid rgba(0, 0, 0, 0.296);
  font-size: smaller;
  padding: 5px;
  border-radius: 64px;
  width: fit-content;
}
.diet {
  padding: 0;
  padding-left: 0em;
  border-radius: 16px;
  height: 50%;
}
.diet-title {
  margin-bottom: 1em;
  margin-top: 1em;
  text-align: left;
}

h2 {
  margin-bottom: 1;
  font-weight: lighter;
}

.count {
  margin: 0;
}

.link {
  padding: 0;
}
.maxp {
  margin: 0;
  margin-left: 1em;
}

img {
  width: 200px;
  height: 200px;
  border-radius: 20px;
  /* border: 1px solid var(--primary); */
  margin-right: 4em;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
  row-gap: 0.5em;
  align-items: flex-start;
  align-content: flex-start;
}

p {
  margin: 0px;
}

a {
  margin: 0px;
  padding: 0;
  text-decoration: none;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 130px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: 150%;
  left: 50%;
  margin-left: -65px;
  font-size: x-small;
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
</style>
