import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button, Image } from '@nextui-org/react';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex justify-center">
          <h1 className="text-4xl font-bold text-center">Добро пожаловать в ПлатежОк</h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center space-y-6">
          <Image
            src="../../../public/rubble_paw_patrol_canine_patrol_icon_263827.png"
            alt="SOLO_SUB Logo"
            width={200}
            height={200}
          />
          <p className="text-xl text-center">
            Управляйте всеми вашими регулярными тратами в одном месте. Экономьте время и деньги с ПлатежОк!
          </p>
          <div className="flex space-x-4">
            <Button color="primary" onClick={() => navigate('/login')}>
              Войти
            </Button>
            <Button color="secondary" onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default MainPage;