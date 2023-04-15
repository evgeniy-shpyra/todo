import { configureStore } from "@reduxjs/toolkit"
import itemsSlice from "./features/itemsSlice"

const store = configureStore({
    reducer: {
        items: itemsSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
