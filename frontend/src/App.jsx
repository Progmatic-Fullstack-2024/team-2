import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import { AuthProvider } from './contexts/AuthContext';
// Pages
import ComingSoonPage from './pages/ComingSoonPage';
import ListUsers from './pages/ListUsers';
import LoginPage from './pages/LoginPage';
import NewPerformancePage from './pages/NewPerformancePage';
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
              <Route path="/userlist" element={<ListUsers />} />
              <Route path="/new-performance" element={<NewPerformancePage />} />
              <Route path="/performances" element={<PerformancesPage />} />
              <Route path="/performances/:id" element={<SinglePerformancePage />} />
              <Route path="/comingsoon" element={<ComingSoonPage />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;