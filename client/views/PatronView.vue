<script setup lang="ts">
import { useOrganizationStore } from "@/stores/organization";
import { storeToRefs } from "pinia";
import AllHouseholdsComponent from "../components/Patron/AllHouseholdsComponent.vue";
const { selectedOrg } = storeToRefs(useOrganizationStore());
</script>

<template>
  <div class="patron-view">
    <h1>Patron Households</h1>
    <div class="household" v-if="selectedOrg">
      <AllHouseholdsComponent />
    </div>
  </div>
</template>
<style scoped>
.patron-view {
  text-align: center;
  background-color: rgb(246, 246, 246);
  padding-top: 2em;
  padding-bottom: 10em;
  height: 100%;
}
</style>
