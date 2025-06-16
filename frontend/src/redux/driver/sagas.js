import { all, call, put, takeEvery } from "redux-saga/effects";
import { fetchDriversFailure, fetchDriversRequest, fetchDriversSuccess } from "./driverSlice";
import axios from "axios";



const getDrivers = function* () {
    try {
        const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IlUyRnNkR1ZrWDElMkZabXJLQ1JlMDYxSkUlMkJueDJkRGRPQTVXeWZWbmRTZDlZJTNEIiwicm9sZSI6ImFkbWluIiwibmFtZSI6IlN1cGVyIEFkbWluIiwiaWF0IjoxNzQ1MzI1MTExfQ._ir42No1EdHaMcspn8AFO1OKUSWjJImgvWekw8Ld_J4"
        const response = yield call(axios.get, `https://milk-api.praathee.in/api/v1/order/getdriver`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response);
          
        yield put(fetchDriversSuccess(response.data.data));
    } catch (error) {
        console.error("Error fetching drivers:", error);
        yield put(fetchDriversFailure(error.message));
    }
}



const driverSaga = function* () {
    yield all([
        yield takeEvery(fetchDriversRequest.type, getDrivers)

    ])}

export default driverSaga;