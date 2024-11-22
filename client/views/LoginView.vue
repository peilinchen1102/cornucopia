<script setup lang="ts">
import LoginForm from "@/components/Login/LoginForm.vue";
import RegisterForm from "@/components/Login/RegisterForm.vue";
</script>

<template>
  <main class="row">
    <div class="column">
      <RegisterForm />
    </div>
    <div class="column">
      <LoginForm />
    </div>
  </main>
</template>

<style scoped>
.row {
  display: flex;
  padding: 10%;
}

.column {
  flex: 50%;
  padding: 10px;
}
</style>
