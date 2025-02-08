import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Completion from './components/payment/Completion.jsx';
import { AuthProvider } from './contexts/AuthContext';
// Pages
import BrowsingPage from './pages/BrowsingPage.jsx';
import EditPerformancePage from './pages/EditPerformancePage.jsx';
import EditTheaterPage from './pages/EditTheaterPage.jsx';
import LandingPage from './pages/LandingPage';
import ListUsers from './pages/ListUsers';

import NewFuturePerformancePage from './pages/NewFuturePerformancePage.jsx';
import NewPerformancePage from './pages/NewPerformancePage.jsx';
import OwnUserPage from './pages/OwnUserPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import PerformancesPage from './pages/PerformancesPage';
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
              <Route path="/theater-admin" element={<TheaterAdminPage />} />
              <Route path="/edit-theater/:id" element={<EditTheaterPage />} />
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="/new-performance" element={<NewPerformancePage />} />
              <Route path="/new-future-performance" element={<NewFuturePerformancePage />} />
              <Route path="/edit-performance" element={<EditPerformancePage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
              <Route path="/ownuser" element={<OwnUserPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment/completion" element={<Completion />} />
              <Route path="/userhandler" element={<SelectedUser />} />
              <Route path="/season-tickets" element={<SeasonTicketsPage />} />
              <Route path="/browse" element={<BrowsingPage />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </AuthProvider>
    </Router>
  );
}

export default App;
