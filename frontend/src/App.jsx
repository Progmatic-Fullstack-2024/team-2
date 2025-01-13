import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import NewPerformancePage from './pages/NewPerformancePage';
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
            <Route path="userlist" element={<ListUsers />} />
            <Route path="/new-performance" element={<NewPerformancePage />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
