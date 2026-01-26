import { createContext, useState } from 'react';

export const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [questionCount, setQuestionCount] = useState(0);
  const [fruitsCount, setFruitsCount] = useState(0);
  const [goodsCount, setGoodsCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  return (
    <AlertContext.Provider value={{ questionCount, setQuestionCount, fruitsCount, setFruitsCount, goodsCount, setGoodsCount, userCount, setUserCount }}>
      {children}
    </AlertContext.Provider>
  );
}