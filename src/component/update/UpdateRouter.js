import React from 'react';
import FruitsUpdate  from './FruitsUpdate';
import BookstoreUpdate from './BookstoreUpdate';
import NoodleUpdate from './NoodleUpdate';
import { useParams } from 'react-router-dom';

export default function UpadteRouter(props){
  const { t_name } = useParams();

  if (t_name === "fruits") return <FruitsUpdate />;
  if (t_name === "bookstore") return <BookstoreUpdate />;
  if (t_name === "noodle") return <NoodleUpdate />
  return <div>잘못된 접근입니다: {t_name}</div>;
};