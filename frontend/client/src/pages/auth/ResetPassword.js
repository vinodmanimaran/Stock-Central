import React, {useState} from 'react';
import axios from './utils/axios.js'; // import your axios instance

function ResetPasswordForm () {
  const [email, setEmail] = useState ('');
  const [message, setMessage] = useState ('');

  const handleSubmit = async event => {
    event.preventDefault ();

    try {
      const response = await axios.post ('/reset', {email});
      setMessage (response.data);
    } catch (error) {
      console.log (error);
      setMessage ('An error occurred');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={event => setEmail (event.target.value)}
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ResetPasswordForm;
