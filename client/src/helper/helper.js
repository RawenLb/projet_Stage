import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import axios from 'axios';

/** check user auth  */
export function CheckUserExist({ children }) {
    const auth = useSelector(state => state.result.userId);
    return auth ? children : <Navigate to={'/'} replace={true}></Navigate>;
}

/** get server data */

export const getServerData = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
};

export const postServerData = async (url, data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Failed to post data:', error);
        throw error;
    }
};