// import '../styles/App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

/** import components */
import Main from './Main';
import Quiz from './Quiz';
import Result from './Result';
import Dashboard from './Dashbord';
import { CheckUserExist } from '../helper/helper';
import Admin from './Admin';
import QuestionsList from './QuestionsList';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const fetchQuestions = async () => {
  try {
    const response = await axios.get('/api/questions'); // Adjust the URL as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

const QuestionsPage = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    };
    getQuestions();
  }, []);

  return <QuestionsList questions={questions} />;
};
/** react routes */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz /></CheckUserExist>
  },
  {
    path : '/result',
    element : <CheckUserExist><Result /></CheckUserExist>
  },
  {
    path : '/dash',
    element : <Dashboard />
  },
  {
    path: '/questions',
    element: <QuestionsPage />,
  },
  {
    path : '/admin',
    element : <Admin />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;