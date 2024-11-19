import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
} from '@nextui-org/react';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userName', response.data.name);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Произошла ошибка при входе');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-bold text-center text-primary">Вход</h2>
        </CardHeader>
        <CardBody>
          {error && <p className="text-danger">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              label="Пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <div className="flex justify-center">
              <Button color="primary" type="submit">
                Войти
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default LoginPage;
