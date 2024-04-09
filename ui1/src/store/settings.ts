import { EventEmitter } from "events";
import { createSlice, createAsyncThunk, } from "@reduxjs/toolkit";
import { TIMEZONESType } from "../utils/Exchanges";
import localforage from "localforage";

const { log, error } = console

export type SettingsInitialType = {
    lang: string,
    timezone: TIMEZONESType,
    [name: string]: any,

}


export const importSetting = createAsyncThunk(
    "importSetting",
    async (_settings: any, thunkAPI) => {
        if (_settings && typeof _settings === 'object') {
            let Settings = await thunkAPI.getState;
            let after = { ...Settings, ..._settings }
            localforage.setItem("settings", after)
            return { before: Settings, after }
        }
    }
)

/**
 * "changed" | "loaded" | 
 */
export var settingsEvent = new EventEmitter();

/**
 * loadSettingss: Tự động lấy settings từ localforage, nếu không có thì lấy từ settings.json, nếu không có thì báo lỗi
 */
// Tự động lấy settings từ localforage, nếu không có thì lấy từ settings.json, nếu không có thì báo lỗi
async function _loadSettings() {
    let settings = await localforage.getItem("settings")
    if (settings)
        return settings
    else throw new Error("SETTING_NOT_FOUND")
}
export const loadSettings = createAsyncThunk(
    "loadSettingss",
    () => _loadSettings()
)

/**
 * change sẽ lưu cài đặt vào localforage
 */
export const change = createAsyncThunk(
    "change",
    async (args: any, thunkAPI): Promise<any> => {
        let { settings } = await thunkAPI.getState() as any
        let _settings = JSON.parse(JSON.stringify(settings));

        Object.entries(args).forEach(([key, value]) => {
            let keys = key.split('.');
            let lastkey = keys[keys.length - 1].trim();
            let obj = keys.slice(0, keys.length - 1).reduce((acc: any, key: string | number) => acc[key], _settings)
            console.warn(obj, lastkey)
            obj[lastkey] = value;
        })

        await localforage.setItem("settings", _settings)
        return { before: settings, after: _settings };
    }
)


const initialState: SettingsInitialType = {
    lang: "en",
    telegram: {
        chat1: "-chat1",
        chat2: "-chat2",
    },
    timezone: { offset: 7, name: "UTC+07:00", deviation: 25200000 },
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        reset: () => {
            localforage.removeItem("settings")
        },
    },


    extraReducers: (builder) => {
        builder.addCase(loadSettings.fulfilled, (state: any, action: any) => {
            for (const key in action.payload) {
                state[key] = action.payload[key];
            }

            setTimeout(() => {
                settingsEvent.emit("loaded", action.payload)
            }, 100);
        })
        builder.addCase(loadSettings.rejected, (state, action) => {
            settingsEvent.emit("loadFailed", action.payload)
        })

        builder.addCase(importSetting.fulfilled, (state: any, action: any) => {
            for (const key in action.payload.after) {
                if (Object.hasOwnProperty.call(action.payload.after, key))
                    state[key] = action.payload.after[key];
            }

            setTimeout(() => {
                settingsEvent.emit("imported", action.payload)
                settingsEvent.emit("loaded", action.payload)
            }, 100);
        })

        builder.addCase(change.fulfilled, (state: any, action: any) => {
            for (const key in action.payload.after) {
                state[key] = action.payload.after[key];
            }

            setTimeout(() => {
                settingsEvent.emit("changed", action.payload)
            }, 100);
        })
    },
})
export const { reset, } = settingsSlice.actions;
export default settingsSlice.reducer;