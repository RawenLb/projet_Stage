import { createContext, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';

// Import components
import Main from './Main';
import Quiz from './Quiz';
import Login from './Login';
import Result from './Result';
import Dashboard from './Dashbord';
import { CheckUserExist } from '../helper/helper';
import Admin from './Admin';
import QuestionsList from './QuestionsList';
import ResultsList from './ResultList';
import Signup from './signUp';
import OTPInput from "./OTPInput";
import Recovered from "./Recovered";
import Reset from "./Reset";

export const RecoveryContext = createContext();

const fetchQuestions = async () => {
  try {
    const response = await axios.get('/api/questions');
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

/** React routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/main/quiz',
    element: <CheckUserExist><Quiz /></CheckUserExist>,
  },
  {
    path: '/result',
    element: <CheckUserExist><Result /></CheckUserExist>,
  },
  {
    path: '/dash',
    element: <Dashboard />,
  },
  {
    path: '/questions',
    element: <QuestionsPage />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
  {
    path: '/results',
    element: <ResultsList />,
  },
  {
    path: '/otp',
    element: <OTPInput />,
  },
  {
    path: '/reset',
    element: <Reset />,
  },
  {
    path: '/recovered',
    element: <Recovered />,
  },
]);

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <RouterProvider router={router} />
    </RecoveryContext.Provider>
  );
}

export default App;
