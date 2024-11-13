import { createSlice } from '@reduxjs/toolkit';

interface appState {
    isAuth: boolean;
    userId: number | null;
    role: string;
    token: string;
}

const initialState: appState = {
    isAuth: false,
    userId: null,
    role: '',
    token: '',
};

export const appSlice = createSlice({
    name: 'general',
    initialState,
    reducers: {
        changeUserId(state, action) {
            state.userId = action.payload;
            if (action.payload) {
                state.isAuth = true;
            } else {
                state.isAuth = initialState.isAuth;
                state.userId = initialState.userId;
                state.token = initialState.token;
                state.role = initialState.role;
            }
        },
        changeUserRole(state, action) {
            state.role = action.payload;
        },
        changeToken(state, action) {
            state.token = action.payload;
        },
        unauthenticated(state) {
            state.isAuth = initialState.isAuth;
            state.userId = initialState.userId;
            state.token = initialState.token;
            state.role = initialState.role;
        }
    },
});

export const { changeUserId, changeUserRole, changeToken, unauthenticated } = appSlice.actions;

export default appSlice.reducer;
