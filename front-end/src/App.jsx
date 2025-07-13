import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPhone from './features/auth/SignInPhone';
import VerifyCode from './features/auth/VerifyCode';
import SignInEmail from './features/auth/SignInEmail';
import DashboardPage from './pages/DashboardPage'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPhone />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/signin-email" element={<SignInEmail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
