import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SignedInPage from './pages/SignedIn';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="bg-c-background">
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegistrationPage />} />
            <Route path="/signedIn" element={<SignedInPage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
