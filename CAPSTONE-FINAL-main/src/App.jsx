import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import WelcomePage from "./components/Auth/WelcomePage";
import RegistrationPage from "./components/Auth/RegistrationPage";
import LoginPage from "./components/Auth/LoginPage";
import VerifyEmail from "./components/Auth/VerifyEmail";

import GuardianLayout from "./components/Layout/GuardianLayout";
import PediatricianLayout from "./components/Layout/PediatricianLayout";
import AdminLayout from "./components/Layout/AdminLayout";

import Appointments from "./pages/Pediatrician/Appointments";
import Calendar from "./pages/Pediatrician/Calendar";
import RequestConsultation from "./pages/Pediatrician/RequestConsultation";
import RequestAppointment from "./pages/Pediatrician/RequestAppointment";
import PediatricianDashboard from "./pages/Pediatrician/PediatricianDashboard";
import Chat from "./pages/Pediatrician/Chat";
import Profile from "./pages/Pediatrician/Profile";
import Notifications from "./pages/Pediatrician/Notifications";
import ParentComponent from "./pages/Pediatrician/ParentComponent";
import ActivityLog from "./pages/Pediatrician/ActivityLog";
import Settings from "./pages/Pediatrician/Settings";
import AboutUs from "./pages/Pediatrician/AboutUs";
import Patients from "./pages/Pediatrician/Patients";
import ViewAppointment from "./pages/Pediatrician/ViewAppointment";
import ViewPatient from "./pages/Pediatrician/ViewPatient";

import GuardianDashboard from "./pages/Guardian/GuardianDashboard";
import GuardianAppointments from "./pages/Guardian/GuardianAppointments";
import GuardianChat from "./pages/Guardian/GuardianChat";
import GuardianNotifications from "./pages/Guardian/GuardianNotifications";
import GuardianProfile from "./pages/Guardian/GuardianProfile";
import GuardianRequestConsultation from "./pages/Guardian/GuardianRequestConsultation";
import GuardianRequestAppointment from "./pages/Guardian/GuardianRequestAppointment";
import GuardianActivityLog from "./pages/Guardian/GuardianActivityLog";
import GuardianSettings from "./pages/Guardian/GuardianSettings";
import GuardianAboutUs from "./pages/Guardian/GuardianAboutUs";  
import GuardianMyCalendar from "./pages/Guardian/GuardianCalendar";
import GuardianViewAppointment from "./pages/Guardian/GuardianViewAppointment";
import GuardianViewPatient from "./pages/Guardian/GuardianViewPatient";
import GuardianEditAppointment from "./pages/Guardian/GuardianEditAppointment";
import GuardianEditPatient from "./pages/Guardian/GuardianEditPatient";
import GuardianPatients from "./pages/Guardian/GuardianPatients";

import AdminDashboard from "./pages/Admin/Dashboard";
import AdminPrescriptions from "./pages/Admin/Prescriptions";
import AdminPatient from "./pages/Admin/Patients";
import AdminSettings from "./pages/Admin/Settings";
import AdminUsers from "./pages/Admin/Users";
import AdminProfile from "./pages/Admin/Profile";
import AdminMyCalendar from "./pages/Admin/Calendar";
import AdminViewAppoinment from "./pages/Admin/ViewAppointment";
import AdminEditAppoinment from "./pages/Admin/EditAppointment";
import AdminViewPatient from "./pages/Admin/ViewPatient";
import AdminEditPatient from "./pages/Admin/EditPatient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Define WelcomePage as the landing page */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/loginpage" element={<LoginPage />} />

        {/* Main App Layout for Guardian */}
        <Route path="/guardian" element={<GuardianLayout />}>
          <Route index element={<GuardianDashboard />} /> {/* Default page */}
          <Route path="dashboard" element={<GuardianDashboard />} />
          <Route path="appointments" element={<GuardianAppointments />} />
          <Route path="patients" element={<GuardianPatients />} />
          <Route path="chat" element={<GuardianChat />} />
          <Route path="notifications" element={<GuardianNotifications />} />
          <Route path="profile" element={<GuardianProfile />} />
          <Route path="calendar" element={<GuardianMyCalendar />} />
          <Route path="request-consultation" element={<GuardianRequestConsultation />} />
          <Route path="request-appointment" element={<GuardianRequestAppointment />} />
          <Route path="activity-log" element={<GuardianActivityLog />} />
          <Route path="settings" element={<GuardianSettings />} />
          <Route path="about-us" element={<GuardianAboutUs />} />
          <Route path="view-appointment" element={<GuardianViewAppointment />} />
          <Route path="edit-appointment" element={<GuardianEditAppointment />} />
          <Route path="view-patient" element={<GuardianViewPatient />} />
          <Route path="edit-patient" element={<GuardianEditPatient />} />
        </Route>

        {/* Main App Layout for Pediatrician */}
        <Route path="/pediatrician" element={<PediatricianLayout />}>
          <Route index element={<PediatricianDashboard />} /> {/* Default page */}
          <Route path="dashboard" element={<PediatricianDashboard />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patients" element={<Patients />} />
          <Route path="chat/:roomName" element={<ParentComponent />} />  {/* Dynamic route */}
          <Route path="chat" element={<Chat />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="request-consultation" element={<RequestConsultation />} />
          <Route path="request-appointment" element={<RequestAppointment />} />
          <Route path="activity-log" element={<ActivityLog />} />
          <Route path="settings" element={<Settings />} />
          <Route path="about-us" element={<AboutUs />} />
          <Route path="view-appointment" element={<ViewAppointment />} />
          <Route path="view-patient" element={<ViewPatient />} />
        </Route>

        {/* Main App Layout for Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} /> {/* Default page */}
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="prescriptions" element={<AdminPrescriptions />} />
          <Route path="patients" element={<AdminPatient />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="calendar" element={<AdminMyCalendar />} />
          <Route path="view-appointment" element={<AdminViewAppoinment />} />
          <Route path="edit-appointment" element={<AdminEditAppoinment />} />
          <Route path="view-patient" element={<AdminViewPatient />} />
          <Route path="edit-patient" element={<AdminEditPatient />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<WelcomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
