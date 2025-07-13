import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignInEmail.css';
import { sendEmailCode, verifyEmailCode } from './authApi';

const SignInEmail = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('enterEmail');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await sendEmailCode(email);
      setStep('verifyCode');
      setMessage('Code sent successfully. Check your email.');
    } catch (error) {
      console.error(error);
      setMessage('Failed to send code. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await verifyEmailCode(email, code);

    const user = response.data.user;
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userRole', user.role); // 👈 lưu quyền
    localStorage.setItem('userName', user.name || '');

    setMessage('Verification successful!');
    navigate('/dashboard');
  } catch (error) {
    console.error(error);
    setMessage('Invalid code or email.');
  }
};

  return (
    <div className="verify-container">
      <div className="verify-card">
        <div className="back" onClick={() => navigate(-1)}>&larr; Back</div>
        <h2>Email verification</h2>
        <p className="sub">Please enter your code that was sent<br />to your email address</p>
        
        {step === 'enterEmail' ? (
          <><>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required />
            <button onClick={handleSendCode}>Send Code</button>
          </><p className="note">passwordless authentication methods.</p><p className="signup">
              Don’t having account? <a href="#">Sign up</a>
            </p></>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Your code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        )}

        {step === 'verifyCode' && (
          <p className="resend">
            Code not received? <span onClick={handleSendCode} style={{ color: '#007bff', cursor: 'pointer' }}>Send again</span>
          </p>
        )}

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default SignInEmail;
