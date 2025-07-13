import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignInPhone from './features/auth/SignInPhone';
import VerifyCode from './features/auth/VerifyCode';
import DashboardPage from './pages/DashboardPage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInPhone />} />
        <Route path="/verify" element={<VerifyCode />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
