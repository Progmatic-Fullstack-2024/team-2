import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
// Pages
import LandingPage from './pages/LandingPage';
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import NewPerformancePage from './pages/NewPerformancePage';
import OwnUserPage from './pages/OwnUserPage.jsx';
import PerformancesPage from './pages/PerformancesPage';
import RegistrationPage from './pages/RegistrationPage';
import SelectedUser from "./pages/SelectedUser.jsx";
import SignedInPage from './pages/SignedIn';
import ComingSoonPage from './pages/ComingSoonPage.jsx'
import SinglePerformancePage from './pages/SinglePerformancePage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="bg-c-background">
          <div className="w-full ">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/signedIn" element={<SignedInPage />} />
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="/new-performance" element={<NewPerformancePage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
              <Route path="/comingsoon" element={<ComingSoonPage />} />
              <Route path="ownuser" element={<OwnUserPage />} />
              <Route path="/userhandler" element={<SelectedUser />} />

            </Routes>
          </div>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
