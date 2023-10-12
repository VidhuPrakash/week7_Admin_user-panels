import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from './admin/adminpanel'; // Import your AdminPage component
import UserPage from './user/index'; // Import your UserPage component
import ShowOrder from './admin/showOrder';
import UserDashBoard from "./user/dashbord/userDashBord";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<UserPage />} />
        <Route path="/admin/orders" element={<ShowOrder />}/>
        <Route path="/userdashboard" element={ <UserDashBoard/> }/>
      </Routes>
    </Router>
  );
}

export default App;

