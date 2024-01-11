export const GetAction = () => {
    return {
        type: 'GET_FEEDBACK_QUESTION'
    }
}

export const AddAction = (feedbackResult) => {
    return {
        type: 'PUT_FEEDBACK_RESULT',
        payload: feedbackResult
    }
}