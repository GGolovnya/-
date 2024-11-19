import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';

function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex justify-center">
          <h1 className="text-4xl font-bold text-center">Добро пожаловать</h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center space-y-6">
          <p className="text-xl text-center">
            Это шаблон главной страницы приложения.
          </p>
        </CardBody>
      </Card>
    </div>
  );
}

export default MainPage;