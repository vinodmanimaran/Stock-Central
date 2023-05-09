import React, {useState} from 'react';
import axios from '../../utils/axios';
import {MdPassword} from 'react-icons/md';
import Card from '../../components/card/Card';
import {Link, useParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {resetPassword} from '../../services/authService';
import styles from './auth.module.scss';

const ResetPassword = () => {
  const [email, setEmail] = useState ('');
  const [message, setMessage] = useState ('');
  const [formData, setFormData] = useState ({
    password: '',
    password2: '',
  });
  const {resetToken} = useParams ();

const handleEmailSubmit = async event => {
  event.preventDefault ();

  try {
    const response = await axios.post ('/reset', {email});
    setMessage (response.data);

    const resetUrl = `${window.location.origin}/resetpassword/${response.data.resetToken}`; // Construct the reset URL

    window.location.href = resetUrl; // Redirect to the reset URL
  } catch (error) {
    console.log (error);
    setMessage ('An error occurred');
  }
};


  const handleInputChange = event => {
    const {name, value} = event.target;
    setFormData ({...formData, [name]: value});
  };

  const handleResetSubmit = async event => {
    event.preventDefault ();

    const {password, password2} = formData;

    if (password.length < 6) {
      return toast.error ('Passwords must be up to 6 characters');
    }

    if (password !== password2) {
      return toast.error ('Passwords do not match');
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword (userData, resetToken);
      toast.success (data.message);
    } catch (error) {
      console.log (error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>

          {message
            ? <div>
                <p>{message}</p>
                <form onSubmit={handleResetSubmit}>
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    name="password2"
                    value={formData.password2}
                    onChange={handleInputChange}
                  />

                  <button
                    type="submit"
                    className="--btn --btn-primary --btn-block"
                  >
                    Reset Password
                  </button>
                  <div className={styles.links}>
                    <p>
                      <Link to="/">- Home</Link>
                    </p>
                    <p>
                      <Link to="/login">- Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            : <form onSubmit={handleEmailSubmit}>
                <label>
                  Email:
                  <input
                    type="email"
                    value={email}
                    onChange={event => setEmail (event.target.value)}
                  />
                </label>
                <button type="submit">Reset Password</button>
              </form>}
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
