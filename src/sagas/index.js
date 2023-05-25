import { put, spawn, retry, debounce, takeLatest } from "redux-saga/effects";
import searchSkills from "../api/searchSkills";
import {
  fetchSkills,
  changeSearch,
  searchSkillsSuccess,
  searchSkillsFailure,
} from "../features/skillsSlice";

function* watchChangeSearchSaga() {
  yield debounce(100, filterChangeSearchAction, debounceChangeSearchSaga);
}

function filterChangeSearchAction(action) {
  return action.type === changeSearch.type && action.payload.trim() !== "";
}

function* debounceChangeSearchSaga(action) {
  yield put(fetchSkills(action.payload));
}

function* watchSearchSkillsSaga() {
  yield takeLatest(fetchSkills.type, handleSearchSkillsSaga);
}

function* handleSearchSkillsSaga(action) {
  try {
    const retryCount = 3;
    const retryDelay = 1000;
    const data = yield retry(
      retryCount,
      retryDelay,
      searchSkills,
      action.payload
    );
    yield put(searchSkillsSuccess(data));
  } catch (error) {
    yield put(searchSkillsFailure(error.message));
  }
}

export default function* saga() {
  yield spawn(watchChangeSearchSaga);
  yield spawn(watchSearchSkillsSaga);
}
