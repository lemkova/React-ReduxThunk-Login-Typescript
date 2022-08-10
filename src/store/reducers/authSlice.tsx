import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

export interface AuthState {
    isLoginPending: boolean,
    isLoginSuccess: boolean,
    errorMessage: string | undefined,
    user: any,
}

const initialState = {
    isLoginPending: false, 
    isLoginSuccess: false,
    errorMessage: '',
    user: {}
} as AuthState

interface DataPayload {
    token: string,
    email: string
}

interface LoginResponse {
    responseCode: 200 | 403,
    responseDescription: string,
    data: DataPayload | null
}

interface login {
    email: string,
    password: string
}

const callLoginApi = (email: string, password: string): Promise<LoginResponse> => {
    return new Promise<LoginResponse>(function(resolve, reject){
        const user = {
            email: 'admin@mail.com',
            password: '12345678'
        }
        setTimeout(() => {
            if (email === user.email && password === user.password){
                resolve({
                    responseCode: 200,
                    responseDescription: 'OK',
                    data: {
                        token: 'i23hja8sdnmt36dc',
                        email: email,
                    }
                });
            } else {
                reject(({
                    responseCode: 403,
                    responseDescription: 'Invalid user',
                    data: null,
                }) as LoginResponse);
            }
        }, 1000);
    })
}

export const authLoginApi = createAsyncThunk<LoginResponse,login,{ rejectValue: LoginResponse }>(
    'auth/login',
    async ({email, password} : login, {rejectWithValue}) =>{
        try {
            const response = await callLoginApi(email, password)
            return (response) as LoginResponse
        } catch(err: any) {
            return rejectWithValue((err) as LoginResponse)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder){
        builder.addCase(authLoginApi.pending, (state: AuthState) => {
            state.isLoginPending = true
        })
        .addCase(authLoginApi.fulfilled, (state: AuthState, action) =>{
            state.isLoginPending = false
            state.isLoginSuccess = true
            const { data } = action.payload
            state.user = { data }
        })
        .addCase(authLoginApi.rejected, (state: AuthState, action) => {
            state.isLoginPending = false
            state.isLoginSuccess = false
            state.errorMessage = action.payload?.responseDescription
        })
    }
})

export default authSlice.reducer