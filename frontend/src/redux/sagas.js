import { all } from 'redux-saga/effects';
import driverSaga from './driver/sagas';



export default function* rootSaga(){
    yield all([
        driverSaga()
    ])
} 