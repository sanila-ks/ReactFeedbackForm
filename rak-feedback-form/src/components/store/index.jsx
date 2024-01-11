import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from "@redux-saga/core";
import feedbackReducer from './feedbackSlice';
import rootSaga from '../saga/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: feedbackReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;