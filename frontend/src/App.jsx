import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
// Pages
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import OwnUserPage from './pages/OwnUserPage.jsx';
import PerformancesPage from './pages/PerformancesPage';
import RegistrationPage from './pages/RegistrationPage';
import SignedInPage from './pages/SignedIn';
import SinglePerformancePage from './pages/SinglePerformancePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="bg-c-background">
          <div className="w-full ">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/signedIn" element={<SignedInPage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="ownuser" element={<OwnUserPage />} />
          </Routes>
          </div>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
