import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
import ComingSoonPage from './pages/ComingSoonPage';
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import NewPerformancePage from './pages/NewPerformancePage';
import RegistrationPage from './pages/RegistrationPage';
import SignedInPage from './pages/SignedIn';
import SinglePerformancePage from './pages/SinglePerformancePage';

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
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
            <Route path="comingsoon" element={<ComingSoonPage />} />
           
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
