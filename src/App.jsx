import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import UserListScreen from './screens/UserListScreen';
import AddUserScreen from './screens/AddUserScreen';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/users" element={<UserListScreen />} />
        <Route path="/add-user" element={<AddUserScreen />} />
      </Routes>
    </Router>
  );
}
