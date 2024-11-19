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

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', formData);
      console.log(response);
      console.log('Регистрация успешна:', response.data);
      localStorage.setItem('token', response.data.token);
      setSuccess('Регистрация успешна. Перенаправление на главную страницу...');
      setTimeout(() => {
        setSuccess('');
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      if (error.response) {
        if (error.response.status === 409) {
          setErrors({ ...errors, email: 'Пользователь с таким email уже существует' });
        } else if (error.response.data.errors) {
          const serverErrors = {};
          error.response.data.errors.forEach((err) => {
            serverErrors[err.param] = err.msg;
          });
          setErrors(serverErrors);
        } else if (error.response.data.error) {
          setErrors({ ...errors, general: error.response.data.error });
        } else {
          setErrors({ ...errors, general: 'Произошла ошибка при регистрации' });
        }
      } else {
        setErrors({ ...errors, general: 'Ошибка соединения с сервером' });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h2 className="text-2xl font-bold text-center text-primary">Регистрация</h2>
        </CardHeader>
        <CardBody>
          {success && <p className="text-success">{success}</p>}
          {errors.general && <p className="text-danger">{errors.general}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Имя"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              type="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <Input
              type="password"
              label="Пароль"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <div className="flex justify-center">
              <Button color="primary" type="submit">
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default RegisterPage;