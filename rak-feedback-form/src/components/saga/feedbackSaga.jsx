import { call, put, takeEvery } from 'redux-saga/effects';
import { getFeedbackQuestionsSuccess, resetFeedback, saveFeedbackResultSuccess } from '../store/feedbackSlice';
import { axiosInstance } from '../../utility/axiosInstance';

export function* watchPutResult() {
    yield takeEvery('PUT_FEEDBACK_RESULT', putFeedbackResult);
    // yield takeEvery('feedback/saveFeedbackResult', putFeedbackResult);
}

export function* watchGetQuestions() {
    yield takeEvery('GET_FEEDBACK_QUESTION', getFeedbackQuestions);
}

function* getFeedbackQuestions() {
    try {
        const res = yield call(
            axiosInstance.get,
            "/feedbackQuestions.json"
        );
        yield put(getFeedbackQuestionsSuccess(res.data));
    } catch (e) {
        console.log('error', e)
    }
}

function* putFeedbackResult(action) {
    try {
        const data = action.payload;
        const res = yield call(
            axiosInstance.post,
            "/feedbackResult.json",
            data
        );
        yield put(saveFeedbackResultSuccess(JSON.parse(res.config.data)));
    } catch (e) {
        console.log('error', e)
    } finally {
        yield put(resetFeedback())
    }
}
