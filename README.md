# Vue.js Patient Information Management

This project is a Vue.js application that fetches patient data from an API and allows users to view and edit patient details. It integrates with a backend API to retrieve patient information and update patient records.

## Features

- Display a list of patients with basic information.
- View detailed information of each patient.
- Edit patient details including name, status, weight, height, address, and phone number.
- Handle API requests to fetch and update patient data.

## Technologies Used

- Vue.js 3
- TypeScript
- Axios for API requests
- Vue Router for navigation
- Vite for fast development and bundling

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone (https://github.com/lebaschi/Patients-app/)
   cd patients-app
   
2. **Install dependencies:**
- npm install

   
3. **Run the development server:**

- npm run dev

4. **Open the application:**

- Visit http://localhost:xxxx in your web browser to view the application.

**Project Structure**

- components/: Vue components used in the application.
- views/: Main views of the application (e.g., PatientList.vue, PatientDetails.vue).
- router/: Vue Router configuration.
- services/: API service for making HTTP requests.
- App.vue: Root Vue component.
- main.ts: Entry point of the application.

**Usage**

- Navigate through the patient list by clicking on patients.
- View detailed information of each patient.
- Click the "Edit" button to enter edit mode and update patient details.
- Save or cancel edits using the corresponding buttons.
