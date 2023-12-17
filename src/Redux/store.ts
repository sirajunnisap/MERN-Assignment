

import { configureStore } from "@reduxjs/toolkit";
import storage  from "redux-persist/lib/storage";
import { persistReducer,persistStore } from "redux-persist";
import userReducer from "./userSlice";

const userPersistConfig = {
    key : 'User',
    storage ,
    version:1
}

const persistedUserReducer = persistReducer(userPersistConfig,userReducer);

export const store = configureStore({
    reducer:{
        User:persistedUserReducer
    }
})

const persistor = persistStore(store)
export default persistor;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 