import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchy } from "../utils/fetchy";

export const useOrganizationStore = defineStore(
  "organization",
  () => {
    const selectedOrg = ref<{ id: string; name: string; isAdmin: boolean } | undefined>(undefined);

    const setOrganization = (org: { id: string; name: string; isAdmin: boolean } | undefined) => {
      selectedOrg.value = org;
    };

    async function getCurrentOrganization() {
      try {
        if (selectedOrg.value) {
          const allUserOrg = await fetchy(`/api/organization`, "GET");
          selectedOrg.value = allUserOrg.filter((org) => org.id === selectedOrg.value?.id)[0];
        }
      } catch (_) {
        return;
      }
    }

    return {
      selectedOrg,
      setOrganization,
      getCurrentOrganization,
    };
  },
  { persist: true },
);
