import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import driverReducer from "./driver/driverSlice";



const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        driver: driverReducer,
    },
    middleware:  (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),

})

sagaMiddleware.run(rootSaga);

export default store;