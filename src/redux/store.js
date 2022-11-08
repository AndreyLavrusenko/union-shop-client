import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import storage from 'redux-persist/lib/storage'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import cartSlice from "./slices/cartSlice";



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}


const rootReducer = combineReducers({ user: userSlice, cart: cartSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

window.store = store

export let persist = persistStore(store);