import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Service from "../services/Service";
import { } from "../services";

const { log, error } = console;


type InitialState = {
    [name: string]: Service
}

const initialState: InitialState = {
}

/**
 * Duyệt tất cả các services, start
 */
export const startAll = createAsyncThunk(
    "startAll",
    async (_, thunkAPI): Promise<any> => {
        let { services } = await thunkAPI.getState() as any
        for (const key in services) {
            const service: Service = services[key];
            service.start()
        }
    }
)
export const startService = createAsyncThunk(
    "startService",
    async (args: { [name: string]: { [param: string]: any } }, thunkAPI): Promise<any> => {
        let { services } = await thunkAPI.getState() as any
        Object.entries(args).forEach(([name, params]) => {
            const service: Service = services[name];
            service.start(params)
        })
    }
)


const servicesSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(startService.fulfilled, (state: any, action: any) => {
        })

        builder.addCase(startService.rejected, (state: any, action: any) => {
            error("services.start.rejected")
        })


        builder.addCase(startAll.fulfilled, (state: any, action: any) => {
        })
        builder.addCase(startAll.rejected, (state: any, action: any) => {
            error("services.startAll.rejected")
        })
    }
})

export const { } = servicesSlice.actions;
export default servicesSlice.reducer;