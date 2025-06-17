import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        Email: formData.email,
        Password: formData.password,
      };

     const response = await axios.post(
        'http://localhost:3000/user/signIn',
        payload,
      );

      if (response.status === 200 || response.status === 201) {
        console.log('SignedIn successfully:', response.data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
       
    </div>
  );
};

export default SignInForm;
