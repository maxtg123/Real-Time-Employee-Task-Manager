import { useState } from 'react';
import './SignInPhone.css';
import { useNavigate } from 'react-router-dom';

function SignInPhone() {
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Phone submitted:', phone);
    // TODO: call API
  };

  return (
    <div className="container">
      <div className="card">
        <div className="back">&larr; Back</div>
        <h2>Sign In</h2>
        <p className="sub">Please enter your phone to sign in</p>

        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <button type="submit">Next</button>
        </form>

        <p className="note">passwordless authentication methods.</p>
        <p className="signup">
          Don’t having account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default SignInPhone;
