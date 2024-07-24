import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface RegisterResponse {
  token: string;
}

interface RegisterData {
  email: string;
  password: string;
  username:string
}

const registerUser = async (userData: RegisterData): Promise<RegisterResponse> => {
  const response = await axios.post<RegisterResponse>('/api/register/', userData);
  return response.data;
};

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<string>('');

  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const mutation = useMutation<RegisterResponse, unknown, RegisterData>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // Store the returned token in local storage
      localStorage.setItem('token', data.token);
      alert('Registration successful!');
    },
    onError: (error: any) => {
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    mutation.mutate({ email, password,username:user });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div>
        <label>User:</label>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
