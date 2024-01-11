import axios from "axios";

export const baseURL = "https://feedback-form-4261a-default-rtdb.firebaseio.com"

export const axiosInstance = axios.create({
    baseURL: baseURL
})

// https://feedback-form-4261a-default-rtdb.firebaseio.com/feedbackResult.json
//https://feedback-form-4261a-default-rtdb.firebaseio.com/feedbackQuestions.json