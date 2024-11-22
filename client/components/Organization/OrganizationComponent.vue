<script setup lang="ts">
import AddMemberComponent from "@/components/Organization/AddMemberModal.vue";
import DeleteOrganizationComponent from "@/components/Organization/DeleteOrganizationModal.vue";
import EditSettingsComponent from "@/components/Organization/EditSettingsModal.vue";
import LeaveOrganizationComponent from "@/components/Organization/LeaveOrganizationModal.vue";
import ManageMemberComponent from "@/components/Organization/ManageMembersModal.vue";
import { useOrganizationStore } from "@/stores/organization";
import { useUserStore } from "@/stores/user";
import { fetchy } from "@/utils/fetchy";
import { storeToRefs } from "pinia";
import { onBeforeMount, ref } from "vue";
import { WEEK } from "../../../server/framework/utils";
const { currentUsername } = storeToRefs(useUserStore());
const { setOrganization } = useOrganizationStore();
const { selectedOrg } = storeToRefs(useOrganizationStore());

const props = defineProps(["orgId", "isSelected"]);
const emit = defineEmits(["updateName", "leaveOrg", "select"]);

const showAddModal = ref<boolean>(false);
const showManageModal = ref<boolean>(false);
const showDeleteModal = ref<boolean>(false);
const showLeaveModal = ref<boolean>(false);
const showEditModal = ref<boolean>(false);
const organization = ref<any>(undefined);
const isEditingName = ref<boolean>(false);
const orgName = ref<string>("");

async function addMembers(members: any) {
  const body = { orgId: props.orgId, newMembers: members };
  showAddModal.value = false;
  try {
    await fetchy(`/api/organization/addMember`, "PATCH", { body: body });
    organization.value = await fetchy(`/api/organization/${props.orgId}`, "GET");
  } catch (_) {
    return;
  }
}

async function updateOrgName() {
  isEditingName.value = false;
  try {
    const body = { orgId: props.orgId, orgName: orgName.value };
    await fetchy("/api/organization", "PATCH", { body: body });
    organization.value = await fetchy(`/api/organization/${props.orgId}`, "GET");
    orgName.value = organization.value.name;
    if (selectedOrg.value && selectedOrg.value.id === props.orgId) {
      await setOrganization({ id: props.orgId, name: orgName.value, isAdmin: selectedOrg.value.isAdmin });
    }
    emit("updateName");
  } catch (_) {
    return;
  }
}

async function manageMember(member: any, action: any) {
  showManageModal.value = false;
  if (action === "remove") {
    try {
      const memberId = (await fetchy(`/api/users/${member}`, "GET"))._id;
      const body = { orgId: props.orgId, member: memberId };
      await fetchy(`/api/organization/removeMember`, "PATCH", { body: body });
      organization.value = await fetchy(`/api/organization/${props.orgId}`, "GET");
    } catch (_) {
      return;
    }
  } else {
    try {
      const memberId = (await fetchy(`/api/users/${member}`, "GET"))._id;
      const isPromoting = action === "promote";
      const body = { orgId: props.orgId, member: memberId, isPromoting };
      await fetchy(`/api/organization/updateMember`, "PATCH", { body: body });
      organization.value = await fetchy(`/api/organization/${props.orgId}`, "GET");
    } catch (_) {
      return;
    }
  }
}

async function deleteOrg() {
  try {
    await fetchy(`/api/organization/${props.orgId}`, "DELETE");
    emit("leaveOrg", organization.value.id);
  } catch (_) {
    return;
  }
}

async function leaveOrg() {
  try {
    const body = { orgId: props.orgId };
    await fetchy("/api/organization/leaveOrganization", "PATCH", { body: body });
    emit("leaveOrg", organization.value.id);
  } catch (_) {
    return;
  }
}

async function editDays(openDays: Array<string>, restockDay: string) {
  const m = new Map<string, number>([
    ["Sunday", 0],
    ["Monday", 1],
    ["Tuesday", 2],
    ["Wednesday", 3],
    ["Thursday", 4],
    ["Friday", 5],
    ["Saturday", 6],
  ]);
  const k = new Array<number>();
  openDays.forEach((day) => {
    const name = m.get(day);
    if (name) k.push(name);
  });
  const l = m.get(restockDay);
  try {
    await fetchy(`/api/organization/days/open/${props.orgId}`, "PATCH", { body: { days: k } });
    if (l) await fetchy(`/api/organization/days/restock/${props.orgId}`, "PATCH", { body: { day: l } });
  } catch (error) {
    return;
  }
  await getOrganization();
}

async function getOrganization() {
  try {
    organization.value = await fetchy(`/api/organization/${props.orgId}`, "GET");
    orgName.value = organization.value.name;
  } catch (error) {
    return;
  }
}

onBeforeMount(async () => {
  await getOrganization();
});
</script>

<template>
  <div v-if="organization">
    <div class="org" :class="isSelected ? 'selectedOrg' : 'nonSelected'" @click="emit('select', props.orgId)">
      <div class="">
        <div v-if="organization.admins.includes(currentUsername) && isSelected">
          <h3 v-if="!isEditingName">
            {{ orgName }}
            <button class="icon" @click="isEditingName = true" title="Edit Organization Name">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                />
              </svg>
            </button>
          </h3>
          <div v-else class="update-name">
            <input style="padding: 0.5em; border-radius: 0.5em; border-color: rgb(197, 197, 197); border-width: 0.5px" v-model.trim="orgName" />
            <button class="icon" @click="updateOrgName" title="Update Name">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path
                  d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022"
                />
              </svg>
            </button>
          </div>
        </div>
        <div v-else>
          <h3>{{ orgName }}</h3>
        </div>
        <h5 class="days">
          Open Days:
          <div class="week">
            <div v-for="day in organization.openDays" :key="day">{{ WEEK[day] }}</div>
          </div>
        </h5>
        <h5 class="tag-title">Admins</h5>
        <div class="row">
          <article v-for="admin in organization.admins" :key="admin" style="background-color: #a0e0eb">{{ admin }}</article>
        </div>
        <h5 class="tag-title">Members</h5>
        <div class="row">
          <article v-for="member in organization.members" :key="member" style="background-color: #b1d69f84">{{ member }}</article>
        </div>
      </div>
      <div v-if="organization.admins.includes(currentUsername)" style="display: flex; justify-content: center">
        <div class="btn-group row" v-if="isSelected">
          <button class="icon" @click.prevent="showAddModal = true" title="Add Member">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-person-fill-add" viewBox="0 0 16 16">
              <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4" />
            </svg>
          </button>
          <button class="icon" @click.prevent="showManageModal = true" title="Manage Organization">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-person-fill-gear" viewBox="0 0 16 16">
              <path
                d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"
              />
            </svg>
          </button>
          <button class="icon" @click.prevent="showEditModal = true" title="Edit Days Open">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
              />
            </svg>
          </button>
          <button v-if="organization.admins.length > 1" class="icon" @click.prevent="showLeaveModal = true" title="Leave Organization">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
          </button>
          <button class="icon" @click.prevent="showDeleteModal = true" title="Delete Organization">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path
                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
              />
            </svg>
          </button>
        </div>
        <teleport to="body">
          <AddMemberComponent :show="showAddModal" :organization="organization" @close="showAddModal = false" @add="addMembers" />
          <ManageMemberComponent :show="showManageModal" :organization="organization" @close="showManageModal = false" @manage="manageMember" />
          <DeleteOrganizationComponent :show="showDeleteModal" :organization="organization" @close="showDeleteModal = false" @delete="deleteOrg(), (showDeleteModal = false)" />
          <EditSettingsComponent :show="showEditModal" :organization="organization" @close="showEditModal = false" @edit="editDays" />
          <div v-if="organization.admins.length > 1">
            <LeaveOrganizationComponent :show="showLeaveModal" :organization="organization" @close="showLeaveModal = false" @leave="leaveOrg(), (showLeaveModal = false)" />
          </div>
        </teleport>
      </div>
      <div v-else style="display: flex; justify-content: center">
        <div v-if="isSelected" style="display: flex; justify-content: center">
          <button class="icon" @click.prevent="showLeaveModal = true" title="Leave Organization">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path
                fill-rule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
              />
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
            </svg>
          </button>
        </div>

        <teleport to="body">
          <LeaveOrganizationComponent :show="showLeaveModal" :organization="organization" @close="showLeaveModal = false" @leave="leaveOrg(), (showLeaveModal = false)" />
        </teleport>
      </div>
    </div>
  </div>

  <section></section>
</template>

<style scoped>
.update-name {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5em;
  margin-top: 2em;
}
input {
  width: fit-content;
  margin-left: 2em;
}
.btn-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.days {
  margin-top: 0;
  display: flex;
  gap: 0.25em;
  justify-content: center;
}
.tag-title {
  margin-bottom: 0.5em;
}
.org {
  /* background: linear-gradient(90deg, rgba(255, 140, 84, 0.5) 100%, rgba(255, 194, 0, 0.5) 100%); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border: none;
  border-width: 1px;
  border-color: rgb(186, 185, 185);
  padding: 1em 1em;
  width: 20em;
  height: 20em;
  border-radius: 0.4rem;
  transition: 0.2s;
  box-shadow: 10px 20px 30px -20px rgba(5, 5, 5, 0.24);
}

.nonSelected:hover {
  box-shadow: 0px 0px 1em 2px var(--primary);
}

.selectedOrg {
  border: none;
  box-shadow: 0px 0px 0px 2px var(--primary);
  transition: box-shadow 0.3s ease;
}

.modify {
  display: flex;
  gap: auto;
  width: 26em;
  padding-top: 2em;
  margin-bottom: 0em;
  justify-content: space-around;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.75em;
  flex-wrap: wrap;
}

article {
  background-color: var(--base-bg);
  border-radius: 1em;
  display: flex;
  width: fit-content;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25em;
  padding: 0.5em;
  font-weight: 400;
  font-size: x-small;
}

h3 {
  text-align: center;
  margin-top: 2em;
}
h5 {
  text-align: center;
  font-weight: 300;
}

summary {
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin-right: 1em;
}
summary::after {
  margin-left: 1ch;
  display: inline-block;
  transition: 0.2s;
  color: var(--primary);
}

.week {
  display: flex;
  gap: 0.25em;
  flex-direction: row;
}
</style>
