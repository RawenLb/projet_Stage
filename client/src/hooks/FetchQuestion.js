import { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import * as Action from '../redux/question_reducer';

export const useFetchQestion = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState({ isLoading: true, apiData: [], serverError: null });

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const response = await axios.get('http://localhost:5000/api/questions'); // Assurez-vous que l'URL est correcte
                setData({ isLoading: false, apiData: response.data, serverError: null });
                dispatch(Action.startExamAction({ question: response.data }));
            } catch (error) {
                setData({ isLoading: false, apiData: [], serverError: error });
            }
        }

        fetchQuestions();
    }, [dispatch]);

    return [data];
};


/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.moveNextAction()); /** increase trace by 1 */
    } catch (error) {
        console.log(error)
    }
}

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
    try {
        dispatch(Action.movePrevAction()); /** decrease trace by 1 */
    } catch (error) {
        console.log(error)
    }
}