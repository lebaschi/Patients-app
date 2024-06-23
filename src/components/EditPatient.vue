<template>
    <div>
      <h1>Edit Patient</h1>
      <div v-if="patient">
        <form @submit.prevent="updatePatient">
          <label>
            Name:
            <input v-model="patient.name" />
          </label>
          <label>
            Status:
            <select v-model="patient.status">
              <option value="0">New</option>
              <option value="1">Pending</option>
              <option value="2">Disqualified</option>
              <option value="3">Qualified</option>
            </select>
          </label>
          <label>
            Weight:
            <input type="number" v-model="patient.weight" />
          </label>
          <label>
            Height:
            <input type="number" v-model="patient.height" />
          </label>
          <label>
            Address:
            <input v-model="patient.address" />
          </label>
          <label>
            Phone Number:
            <input v-model="patient.phoneNumber" />
          </label>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  
  interface Patient {
    id: number;
    name: string;
    status: number;
    weight: number;
    height: number;
    address: string;
    phoneNumber: string;
  }
  
  export default defineComponent({
    name: 'EditPatient',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const patient = ref<Patient | null>(null);
  
      onMounted(async () => {
        const response = await axios.get(`https://patiro-developer.azurewebsites.net/api/Member/${route.params.id}`);
        patient.value = response.data;
      });
  
      const updatePatient = async () => {
        if (patient.value) {
          const response = await axios.post(`https://patiro-developer.azurewebsites.net/api/Member/${route.params.id}`, patient.value);
          patient.value = response.data;
          router.push(`/patient/${route.params.id}`);
        }
      };
  
      return {
        patient,
        updatePatient
      };
    }
  });
  </script>