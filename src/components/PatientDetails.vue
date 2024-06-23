<template>
  <div>
    <div class="titleContainer">
      <h1>Patient Details</h1>
    </div>
 
    <div v-if="patient">
      <form class="formContainer" @submit.prevent="handleSubmit">

        <div class="inputContainer">
        <label>Name:</label>
          <input v-model="formData.name" :disabled="!isEditing" />
        </div>

        <div class="inputContainer">
        <label>Status: </label>
          <select v-model="formData.status" :disabled="!isEditing">
            <option value="0">New</option>
            <option value="1">Pending</option>
            <option value="2">Disqualified</option>
            <option value="3">Qualified</option>
          </select>
        </div>

        <div class="inputContainer">
        <label>Weight:</label>
          <input type="number" v-model="formData.weight" :disabled="!isEditing" />
        </div>

        <div class="inputContainer">
        <label>Height:</label>
          <input type="number" v-model="formData.height" :disabled="!isEditing" />
        </div>

        <div class="inputContainer">
        <label>Address:</label>
          <input v-model="formData.address" :disabled="!isEditing" />
        </div>

        <div class="inputContainer">
        <label>Phone Number:</label>
          <input v-model="formData.phoneNumber" :disabled="!isEditing" />
       </div>

        <div v-if="isEditing">
          <button class="editButton" type="submit">Save</button>
          <button class="cancelButton" type="button" @click="cancelEdit">Cancel</button>
        </div>

        <button class="editButton" v-else @click="editPatientDetails">Edit</button>
        <div></div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

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
  name: 'PatientDetails',
  setup() {
    const route = useRoute();
    const patient = ref<Patient | null>(null);
    const formData = ref<Patient>({
      id: 0,
      name: '',
      status: 0,
      weight: 0,
      height: 0,
      address: '',
      phoneNumber: ''
    });
    const isEditing = ref(false);

    onMounted(async () => {
      try {
        const id = route.params.id;
        const response = await axios.get(`https://patiro-developer.azurewebsites.net/api/Member/${id}`);
        patient.value = response.data;
        if (patient.value) {
          formData.value = {
            id: patient.value.id,
            name: patient.value.name || '',
            status: patient.value.status || 0,
            weight: patient.value.weight || 0,
            height: patient.value.height || 0,
            address: patient.value.address || '',
            phoneNumber: patient.value.phoneNumber || ''
          };
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    });

    const editPatientDetails = () => {
      isEditing.value = true;
    };

    const handleSubmit = async () => {
      try {
        const id = route.params.id;
        const response = await axios.post(`https://patiro-developer.azurewebsites.net/api/Member/${id}`, formData.value);
        patient.value = response.data;
        isEditing.value = false;
      } catch (error) {
        console.error("Error updating patient details:", error);
      }
    };

    const cancelEdit = () => {
      isEditing.value = false;
      if (patient.value) {
        formData.value = {
          id: patient.value.id,
          name: patient.value.name,
          status: patient.value.status,
          weight: patient.value.weight,
          height: patient.value.height,
          address: patient.value.address,
          phoneNumber: patient.value.phoneNumber
        };
      }
    };

    return {
      patient,
      formData,
      isEditing,
      editPatientDetails,
      handleSubmit,
      cancelEdit
    };
  }
});
</script>

<style scoped>

.titleContainer{
  display: flex;
  justify-content: center;
  margin-bottom: 5%;
}

.formContainer{
  display: flex;
  flex-direction: column;
  width: 450px;
  
}

.inputContainer{
  display: flex;
  margin-bottom: 3%;
  height: 35px;
  border-bottom: 1px solid grey;

}

label{
flex:1;


}

input, select{
flex: 2;
border-left: 1px solid grey;
border: none;
background-color: #dddddd5e;

}

input:focus, select:focus{
  outline: none;


}

input:disabled, select:disabled {
  opacity: 0.7;
  cursor: not-allowed;
 
}

.editButton{
  width: 100px;
    background-color: hsla(160, 100%, 37%, 1);
    border: none;
    height: 30px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
}

.cancelButton{
  width: 100px;
    background-color: lightcoral;
    border: none;
    height: 30px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    margin-left: 10px;
}

</style>