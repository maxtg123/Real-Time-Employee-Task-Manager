import { useState } from 'react';
import './SignInPhone.css'; 
import { useNavigate } from 'react-router-dom';
import { sendEmailCode, verifyEmailCode } from './authApi';
import { saveUser } from '../../utils/storage';

function SignInEmail() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [step, setStep] = useState('enterEmail');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await sendEmailCode(email);
      setStep('verifyCode');
      setMessage('Code sent. Please check your email.');
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage('Failed to send code. Try again.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmailCode(email, code);
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

        <h2>{step === 'enterEmail' ? 'Sign In' : 'Email Verification'}</h2>

        <p className="sub">
          {step === 'enterEmail'
            ? 'Please enter your email to sign in'
            : 'Enter the code sent to your email'}
        </p>

        {step === 'enterEmail' ? (
          <>
            <input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button onClick={handleSendCode}>Next</button>
          </>
        ) : (
          <form onSubmit={handleVerifyCode}>
            <input
              type="text"
              placeholder="Enter Code"
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
            <span
              style={{ color: '#007bff', cursor: 'pointer' }}
              onClick={handleSendCode}
            >
              Resend Code
            </span>
          </p>
        )}

        {message && <p className="message">{message}</p>}

        {step === 'enterEmail' && (
          <>
            <p className="note">Passwordless authentication method.</p>
            <p className="signup">
              Don't have an account?{' '}
              <span className="link" onClick={() => navigate('/signup')}>
                Sign up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default SignInEmail;
