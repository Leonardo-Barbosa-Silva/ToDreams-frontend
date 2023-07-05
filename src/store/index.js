import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';


export const store = (authReducer, goalsReducer) => (
    configureStore(
        {
            reducer: {
                auth: authReducer,
                goals: goalsReducer
            },
            middleware: (getDefaultMiddleware) => (
                getDefaultMiddleware({
                    serializableCheck: {
                        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                    }
                })
            ),
            devTools: false
        }
    )
)