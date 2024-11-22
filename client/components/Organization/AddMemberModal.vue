<script setup lang="ts">
import { fetchy } from "@/utils/fetchy";
import Multiselect from "@vueform/multiselect";
import { computed, onBeforeMount, ref } from "vue";

const props = defineProps(["show", "organization"]);
const allUsers = ref<Array<{ label: string; value: string }>>([]);
const emit = defineEmits(["close", "add"]);
const usersToAdd = ref<Array<string>>([]);
const nonTeamMembers = computed(() => {
  const adminsAndMembers = props.organization.admins.concat(props.organization.members);
  return allUsers.value.filter((user) => !adminsAndMembers.includes(user.label));
});

onBeforeMount(async () => {
  try {
    const users = await fetchy(`/api/users`, "GET");
    allUsers.value = users.map((user: any) => {
      return { label: user.username, value: user._id };
    });
  } catch {
    return;
  }
});
</script>

<template>
  <transition name="modal">
    <div v-if="props.show" class="modal-mask">
      <div class="modal-container">
        <h3>Add Members for {{ props.organization.name }}</h3>
        <div class="column">
          <Multiselect class="multiselect" v-model="usersToAdd" mode="tags" :options="nonTeamMembers" :searchable="true" :closeOnSelect="false" placeholder="Select members to add" required />
        </div>
        <div class="modal-footer">
          <button class="close-btn" @click="emit('close')">Cancel</button>
          <button class="success-btn" @click="emit('add', usersToAdd)">Add</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-footer {
  display: flex;
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
  width: 400px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  margin-top: 0;
  color: var(--primary);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.multiselect {
  margin-bottom: 2em;
}

span {
  color: black;
}
</style>
