<script setup lang="ts">
import Multiselect from "@vueform/multiselect";
import { computed, ref } from "vue";
import { DIETARY_RESTRICTIONS, onCreate } from "../../../server/framework/utils";
const props = defineProps(["show", "stock", "allDiets"]);
const emit = defineEmits(["close", "update"]);

const dietOptions = computed(() => [...new Set([...props.allDiets, ...DIETARY_RESTRICTIONS])]);
const multiselectDietTags = dietOptions.value.map((tag) => {
  return { label: tag, value: tag };
});

const name = ref<string>(props.stock.item);
const imgLink = ref<string>(props.stock.image);
const units = ref<number>(props.stock.count);
const purchaseLink = ref<string>(props.stock.supplyLink);
const diet = ref<Array<string>>(props.stock.diet);
const maxPerPerson = ref<number>(props.stock.maxPerPerson);

function resetForm() {
  name.value = props.stock.item;
  imgLink.value = props.stock.image;
  units.value = props.stock.count;
  purchaseLink.value = props.stock.supplyLink;
  diet.value = props.stock.diet;
  maxPerPerson.value = props.stock.maxPerPerson;
  emit("close");
}
//test link https://drive.google.com/uc?export=view&id=1K3GKKH13ZdvlpePlfIx62OFRsfjMxwoE
</script>

<template>
  <transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <form @submit.prevent="emit('update', name, imgLink, purchaseLink, units, diet, maxPerPerson)">
          <h1>Update Inventory</h1>
          <div class="form">
            <img v-if="!imgLink.length" src="../../assets/images/image.svg" />
            <img v-else :src="imgLink" alt="Having Trouble uploading item picture" />
            <div class="item">
              <div class="form-input">Name<input style="color: black" v-model="name" required /></div>
              <div class="form-input">
                Contains
                <div><Multiselect class="multiselect" v-model="diet" mode="tags" :options="multiselectDietTags" @create="onCreate" :createTag="true" :searchable="true" :closeOnSelect="false" /></div>
              </div>
              <div class="form-input">Image Link<input v-model="imgLink" /></div>
              <div class="form-input">Purchase Link<input v-model="purchaseLink" /></div>
              <div class="form-input">
                Units <input class="number-input" type="number" v-model="units" min="0" />
                <div style="display: flex; align-items: center; gap: 0.5em">
                  Max Per Household
                  <div class="tooltip">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path
                        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"
                      />
                    </svg>
                    <span class="tooltiptext">Set a suggested allocation limit for households, ensuring fair distribution and preventing resource abuse.</span>
                  </div>
                </div>
                <input class="number-input" type="number" v-model="maxPerPerson" min="0" />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="close-btn" @click.prevent="resetForm">Cancel</button>
            <button class="success-btn" type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.item {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
}

.multiselect {
  --ms-radius: 32px;
  --ms-ring-color: #eb721630;
  padding-left: 8px;
  --ms-py: 0;
  --ms-tag-bg: var(--primary);
  width: 20.75em;
}

.multiselect.is-open {
  --ms-radius: 16px;
}

.form {
  height: fit-content;
  margin-bottom: 1.5em;
}

input {
  padding-left: 0.5em;
  padding-left: 0.5em;
  margin-left: 1em;
  border-radius: 64px;
  border: solid;
  border-color: rgb(216, 216, 216);
  border-width: 1px;
  height: 25px;
  color: black;
  width: 20em;
}

.number-input {
  border-radius: 4px;
  width: 4em;
}

img {
  height: 125px;
  width: 125px;
  margin-right: 2.5em;
}
.form-input {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
  gap: 1em;
  align-items: center;
}

.form {
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  width: fit-content;
  height: fit-content;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

span {
  color: black;
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
