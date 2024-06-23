import { createRouter, createWebHistory } from 'vue-router';
import PatientList from '@/components/PatientList.vue';
import PatientDetails from '@/components/PatientDetails.vue';

const routes = [
  { path: '/', component: PatientList },
  { path: '/patient/:id', component: PatientDetails, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;