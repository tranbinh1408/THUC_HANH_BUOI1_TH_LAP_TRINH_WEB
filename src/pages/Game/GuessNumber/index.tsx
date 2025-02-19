import { Card, Input, Button, message as antMessage, Typography, Space } from 'antd';
import { useState, useEffect } from 'react';
import { GameConsole } from '@ant-design/icons';

const { Title, Text } = Typography;

const GuessNumber = () => {    
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [guess, setGuess] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(10);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameMessage, setGameMessage] = useState<string>('');
  console.log(randomNumber);

  // Khởi tạo game mới
  const initGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setAttempts(10);
    setGameOver(false);
    setGameMessage('Hãy đoán một số từ 1 đến 100');
    setGuess('');
  };

  // Khởi tạo game khi component mount
  useEffect(() => {
    initGame();
  }, []);

  // Xử lý đoán số
  const handleGuess = () => {
    const guessNum = Number(guess);
    
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      antMessage.error('Vui lòng nhập số từ 1 đến 100');
      return;
    }

    const newAttempts = attempts - 1;
    setAttempts(newAttempts);

    if (guessNum === randomNumber) {
      setGameMessage('Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
    } else if (newAttempts === 0) {
      setGameMessage(`Bạn đã hết lượt! Số đúng là ${randomNumber}.`);
      setGameOver(true);
    } else if (guessNum < randomNumber) {
      setGameMessage('Bạn đoán quá thấp rồi!');
    } else {
      setGameMessage('Bạn đoán quá cao!');
    }

    setGuess('');
  };

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2}>Trò chơi đoán số</Title>
        
        <Text>Số lượt còn lại: {attempts}</Text>
        
        <Text>{gameMessage}</Text>

        <Space>
          <Input 
            placeholder="Nhập số của bạn" 
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            style={{ width: 200 }}
            disabled={gameOver}
            onPressEnter={handleGuess}
          />
          
          <Button 
            type="primary"
            onClick={handleGuess}
            disabled={gameOver}
          >
            Đoán
          </Button>

          {gameOver && (
            <Button type="primary" onClick={initGame}>
              Chơi lại
            </Button>
          )}
        </Space>
      </Space>
    </Card>
  );
};

export default GuessNumber; 