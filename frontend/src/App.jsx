import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Completion from './components/payment/Completion.jsx';
import { AuthProvider } from './contexts/AuthContext';
// Pages
import EditTheaterPage from './pages/EditTheaterPage.jsx';
import LandingPage from './pages/LandingPage';
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import NewPerformancePage from './pages/NewPerformancePage.jsx';
import OwnUserPage from './pages/OwnUserPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PerformancesPage from './pages/PerformancesPage';
import RegistrationPage from './pages/RegistrationPage';
import SeasonTicketsPage from './pages/SeasonTicketsPage.jsx';
import SelectedUser from './pages/SelectedUser.jsx';
import SinglePerformancePage from './pages/SinglePerformancePage';
import TheaterAdminPage from './pages/TheaterAdminPage.jsx';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <main className="bg-c-background">
          <div className="w-full min-h-screen">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/signedIn" element={<SignedInPage />} />
              <Route path="/theater-admin" element={<TheaterAdminPage />} />
              <Route path="/edit-theater/:id" element={<EditTheaterPage />} />
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="/new-performance" element={<NewPerformancePage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
              <Route path="/ownuser" element={<OwnUserPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment/completion" element={<Completion />} />
              <Route path="/userhandler" element={<SelectedUser />} />
              <Route path="/season-tickets" element={<SeasonTicketsPage />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
