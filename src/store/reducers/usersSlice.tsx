import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://randomuser.me/api/';

interface UserState {
    entities: Array<any>
}

const initialState = {
    entities: []
} as UserState

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers', async () =>{
        const response = await axios.get(USERS_URL);
        return (response.data) as any;
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            action.payload.results.forEach((element: any) => {
                state.entities.push(element)
            })
        })
    }
})

export default usersSlice.reducer