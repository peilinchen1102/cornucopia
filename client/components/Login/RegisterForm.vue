<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { useOrganizationStore } from "../../stores/organization";

const username = ref("");
const password = ref("");
const { registerUser, loginUser, updateSession } = useUserStore();
const { setOrganization } = useOrganizationStore();

async function register() {
  await registerUser(username.value, password.value);
  await setOrganization(undefined); // reset organization each login to force user selection
  await loginUser(username.value, password.value);
  void updateSession();
  void router.push({ name: "Home" });
}
</script>

<template>
  <form class="pure-form pure-form-aligned" @submit.prevent="register">
    <h3>Create Account</h3>
    <fieldset>
      <div class="pure-control-group">
        <label for="aligned-name">username</label>
        <input v-model.trim="username" type="text" id="aligned-name" required />
      </div>
      <div class="pure-control-group">
        <label for="aligned-password">password</label>
        <input type="password" v-model.trim="password" id="aligned-password" required />
      </div>
      <div class="pure-controls">
        <button type="submit" class="success-btn">Create Account</button>
      </div>
    </fieldset>
  </form>
</template>

<style scoped>
h3 {
  display: flex;
  justify-content: center;
}
</style>
