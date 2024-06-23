<template>
    <div class="listContainer">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id">
            <td>{{ patient.id }}</td>
            <td>{{ patient.name }}</td>
            <td>{{ getStatusText(patient.status) }}</td>
            <td><router-link :to="`/patient/${patient.id}`">View Details</router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import axios from 'axios';
  
  interface Patient {
    id: number;
    name: string;
    status: number;
  }
  
  export default defineComponent({
    name: 'PatientList',
    setup() {
      const patients = ref<Patient[]>([]);
  
      onMounted(async () => {
        const response = await axios.get('https://patiro-developer.azurewebsites.net/api/Member');
        patients.value = response.data;
      });
  
      const getStatusText = (status: number) => {
        switch (status) {
          case 0: return 'New';
          case 1: return 'Pending';
          case 2: return 'Disqualified';
          case 3: return 'Qualified';
          default: return 'Unknown';
        }
      };
  
      return {
        patients,
        getStatusText
      };
    }
  });
  </script>

<style>

table{
    min-width: 800px;
    border-collapse: collapse;
}

td, th {
    border: 1px solid #ddd;
}

th{
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  padding-left: 3px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  font-weight: bold;
}

tr:nth-child(even){
background-color: #f2f2f2;
}

tr:hover {
   background-color: #ddd;
}

</style>