import { useState } from 'react';
import './SignInPhone.css';
import { useNavigate } from 'react-router-dom';
import { sendPhoneCode, verifyPhoneCode } from "./authApi";
import { saveUser } from '../../utils/storage';

function SignInPhone() {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('enterPhone');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await sendPhoneCode(phone);
      setStep('verifyCode');
      setMessage('OTP sent. Please check your phone.');
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage('Failed to send OTP. Try again.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyPhoneCode(phone, code);
      const user = response.data.user;
      const token = response.data.token;

      if (!token) {
        setMessage('Login failed: No token returned.');
        return;
      }

      saveUser({ ...user, token });

      setMessage('Verification successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage('Invalid code.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="back" onClick={() => navigate(-1)}>&larr; Back</div>
        <h2>Sign In</h2>
        <p className="sub">
          {step === 'enterPhone'
            ? 'Please enter your phone to sign in'
            : 'Enter the OTP sent to your phone'}
        </p>

        {step === 'enterPhone' ? (
          <>
            <input
              type="tel"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <button onClick={handleSendCode}>Next</button>
          </>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Enter OTP"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Verify</button>
          </form>
        )}

        {step === 'verifyCode' && (
          <p className="resend">
            Didn't receive the code?{' '}
            <span style={{ color: '#007bff', cursor: 'pointer' }} onClick={handleSendCode}>
              Resend OTP
            </span>
          </p>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default SignInPhone;
