import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerifyCode.css';

const VerifyCode = () => {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API
    console.log('Submitted code:', code);
  };

  const handleResend = () => {
    // TODO: call API
    console.log('Resend code');
  };

  return (
    <div className="container">
      <div className="card">
        <div className="back" onClick={() => navigate(-1)}>&larr; Back</div>
        <h2>Phone verification</h2>
        <p className="sub">Please enter your code that send to your phone</p>
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
        <p className="note">
          Code not receive? <span className="signup"><a onClick={handleResend}>Send again</a></span>
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;
