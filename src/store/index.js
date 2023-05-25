import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "../sagas";
import skillsReducer from "../features/skillsSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(saga);

export default store;
