import { createSlice } from '@reduxjs/toolkit';

const initialFeedbackState = {
    feedbackQuestions: [],
    feedbackDataset: [],
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: initialFeedbackState,
    reducers: {
        getFeedbackQuestionsSuccess(state, action) {
            if (action.type === "feedback/getFeedbackQuestionsSuccess") {
                let Questionnaire = []
                for (const key in action.payload) {
                    Questionnaire.push({
                        id: key,
                        question: action.payload[key].question
                    })
                }
                state.feedbackQuestions = Questionnaire
            }
        },
        saveFeedback(state, action) {
            const isExist = state.feedbackDataset.find(item => item.Id === action.payload.Id);
            if (isExist) {
                Object.assign(isExist, action.payload);
            } else {
                state.feedbackDataset = [...state.feedbackDataset, action.payload];
            }
        },
        resetFeedback: (state) => {
            state.feedbackDataset = []
        },
        saveFeedbackResult(state, action) {
            // state.feedbackDataset = action.payload
        },
        saveFeedbackResultSuccess(state, action) {
            if (action.type === "feedback/saveFeedbackResultSuccess") {
                alert("Your feedback is successfully submitted")
            }
        },
    },
});

export const {
    getFeedbackQuestionsSuccess,
    saveFeedback,
    resetFeedback,
    saveFeedbackResult,
    saveFeedbackResultSuccess } = feedbackSlice.actions;

export default feedbackSlice.reducer;