<script setup lang="ts">
import { computed } from "vue";
import { TAG_COLORS } from "../../../server/framework/utils";

const props = defineProps(["household", "stock", "idx"]);
const emit = defineEmits(["updateAllocation"]);
const diet = computed(() => props.stock.diet);

function update(event: any) {
  emit("updateAllocation", props.idx, event.target.value);
}
</script>

<template>
  <div v-if="props.stock" class="item-card">
    <img v-if="props.stock.image.length" :src="props.stock.image" />
    <img v-else src="../../assets/images/image.svg" />
    <div class="item">
      <div class="row" style="align-items: center; font-size: x-small">
        <div style="display: flex; width: 100%; justify-content: space-between">
          <div style="display: flex; flex-direction: column">
            <h2 class="title">
              {{ props.stock.item }}
            </h2>
            <div class="subtext">
              <p class="maxp">Remaining Amount: {{ props.stock.count }}</p>
            </div>
            <div class="subtext">
              <p class="maxp">Max for household: {{ props.stock.maxPerPerson }}</p>
            </div>
            <div>
              <p class="maxp">Max per Day: {{ props.stock.maxPerDay }}</p>
            </div>
          </div>
          <div style="display: flex; flex-direction: column">
            <h4 class="units">Units:</h4>
            <input @input.prevent="update" class="number-input" type="number" :value="props.stock.allocation" min="0" required />
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
    </div>
  </div>
</template>

<style scoped>
.units {
  margin-top: 0;
  margin-bottom: 0em;
}
.title {
  display: flex;
  width: 100%;
  align-items: center;
}
.modify {
  display: flex;
  height: fit-content;
}
.item-card {
  display: flex;
  flex-direction: row;
  padding: 1em;
  align-items: center;
}
.subtext {
  display: flex;
  flex-direction: row;
  margin-bottom: 0.25em;
}
.item {
  display: flex;
  flex-direction: row;
  height: max-content;
  width: 100%;
  align-items: center;
}

input {
  padding-left: 0.5em;

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
  width: 2.5em;
  font-size: larger;
  text-align: center;
  margin: 0;
}

.tag {
  border: 1px solid rgba(0, 0, 0, 0.296);
  font-size: 8px;
  padding: 3px;
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
  margin-bottom: 0.25em;
  margin-top: 0.25em;
}

h2 {
  margin-bottom: 0.25em;
  font-weight: lighter;
  margin-top: 0px;
}

.maxp {
  margin: 0;
  margin-left: 0em;
  padding-right: 0em;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 20px;
  border: 1px solid var(--primary);
  margin-right: 2em;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
  flex-wrap: wrap;
  row-gap: 0.5em;
  width: 100%;
}

p {
  margin: 0px;
}

a {
  margin: 0px;
  padding: 0;
  text-decoration: none;
}
</style>
