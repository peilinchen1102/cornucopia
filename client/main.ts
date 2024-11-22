import "@/assets/main.css";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import "purecss";
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(pinia);
app.use(router);

app.mount("#app");
