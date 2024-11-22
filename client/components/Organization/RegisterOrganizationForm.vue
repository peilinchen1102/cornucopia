<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import { ref } from "vue";

const emit = defineEmits(["addOrg"]);

const orgName = ref<string>("");
async function register() {
  try {
    const body = { name: orgName.value };
    await fetchy("/api/organization", "POST", { body: body });
    orgName.value = "";
    emit("addOrg");
  } catch (_) {
    return;
  }
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Register New Organization</h3>
    <fieldset>
      <div class="pure-control-group align">
        <input v-model.trim="orgName" type="text" id="aligned-name" placeholder="Organization Name" required />
        <button class="success-btn">Register</button>
      </div>
    </fieldset>
  </form>
</template>
<style scoped>
h3 {
  font-weight: lighter;
  margin-left: 0;
  margin: 0;
}
input {
  margin: 0em;
}
.align {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  gap: 1em;
}
</style>
