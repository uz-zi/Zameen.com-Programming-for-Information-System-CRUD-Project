//https://getbootstrap.com/docs/4.0/components/forms/
import React, { useState } from 'react';
import axios from '../axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
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
      FirstName: formData.firstName,
      LastName: formData.lastName,
      PhoneNumber: formData.phoneNumber,
      Email: formData.email,
      Password: formData.password,
    };

    const response = await axios.post(
      '/user/signUpUser',
      payload,
    );

    if (response.status === 200 || response.status === 201) {
      console.log('Signed up successfully:', response.data);
    } else {
      console.error('Error:', response.statusText);
    }
  } catch (error) {
      console.error('Error:', error.message);
  }
};

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
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
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      
    </div>
  );
};

export default SignUpForm;
