import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/registrationPage';
function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
