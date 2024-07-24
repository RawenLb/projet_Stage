import axios from 'axios';
import * as Action from '../redux/result_reducer';

export const PushAnswer = (result) => async (dispatch) => {
    try {
        await dispatch(Action.pushResultAction(result));
    } catch (error) {
        console.log(error);
    }
}

export const updateResult = (index) => async (dispatch) => {
    try {
        dispatch(Action.updateResultAction(index));
    } catch (error) {
        console.log(error);
    }
}

/** insert user data */
export const publishResult = async (resultData) => {
    const { result, username } = resultData;
    try {
        if (result.length === 0 || !username) throw new Error("Couldn't get Result");

        // Make API call to store results
        const response = await axios.post(`http://localhost:5000/api/result`, resultData);
        console.log('Data saved successfully:', response.data);
    } catch (error) {
        console.error('Failed to store results:', error);
    }
};
