import { all } from "redux-saga/effects";
import { watchGetQuestions, watchPutResult } from "./feedbackSaga";

export default function* rootSaga() {
    yield all([
        watchPutResult(),
        watchGetQuestions()
    ])
}