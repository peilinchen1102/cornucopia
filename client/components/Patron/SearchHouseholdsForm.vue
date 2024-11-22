<script setup lang="ts">
import { defineProps, ref, watch } from "vue";

const searchId = ref<string>("");
const props = defineProps(["empty"]);
const emit = defineEmits(["search", "resetEmpty"]);

watch(
  () => props.empty,
  (val) => {
    if (val === true) {
      searchId.value = "";
      emit("resetEmpty");
    }
  },
);
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="emit('search', searchId)">
    <fieldset>
      <div class="pure-control-group">
        <input v-model.trim="searchId" type="text" id="aligned-name" placeholder="Search by id or name" style="border-radius: 2em; width: 25em" />
        <button class="icon search">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-search" viewBox="0 0 16 16">
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            />
          </svg>
        </button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
form {
  margin-top: 0.4em;
}
.search {
  margin-left: -2em;
  margin-top: 8px;
}
form {
  display: flex;
  gap: 0.5em;
  padding: 1em;
  align-items: center;
}

input {
  width: 22em;
  margin-left: 4em;
}
</style>
