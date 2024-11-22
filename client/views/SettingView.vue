<script setup lang="ts">
import router from "@/router";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import DeleteUserModal from "../components/Setting/DeleteUserModal.vue";
import UpdateUserForm from "../components/Setting/UpdateUserForm.vue";

const { currentUsername } = storeToRefs(useUserStore());
const { logoutUser, deleteUser } = useUserStore();
const showDeleteModal = ref<boolean>(false);

async function logout() {
  await logoutUser();
  void router.push({ name: "Home" });
}

async function delete_() {
  await deleteUser();
  void router.push({ name: "Home" });
}
</script>

<template>
  <main class="column">
    <h1>Settings for {{ currentUsername }}</h1>
    <div class="row">
      <div class="column">
        <button class="close-btn" @click="logout">Logout</button>
      </div>
      <div class="column">
        <button class="delete-btn" @click="showDeleteModal = true">Delete</button>
      </div>
    </div>
    <UpdateUserForm />
  </main>
  <teleport to="body">
    <DeleteUserModal :show="showDeleteModal" @close="showDeleteModal = false" @delete="delete_(), (showDeleteModal = false)" />
  </teleport>
</template>

<style scoped>
.row {
  display: flex;
  margin-bottom: 5%;
}

.column {
  flex: 50%;
  padding: 10px;
}
</style>
