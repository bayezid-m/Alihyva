import { act } from "react-dom/test-utils";

import { User } from "../../types/User";
import productsReducer from "./productReducer";
import axios, { AxiosError } from "axios";
import { UserCredential } from "../../types/UserCredential";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewUser } from "../../types/NewUser";

const initialState: {
  user: User,
  newUser: NewUser,
  users: User[],
  checkemail: boolean,
  loading: boolean,
  error: string
} = {
  user: {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    avater: ''
  },
  users: [],
  checkemail: false,
  loading: false,
  error: "",
  newUser:
  {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    avater: ''
  },
}
export const fetchAllUser = createAsyncThunk(
  'fetchAllUser',
  async () => {
    try {
      const result = await axios.get<User[]>('https://alihyva.azurewebsites.net/api/v1/users');
      return result.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
)
export const createSingleUser = createAsyncThunk(
  'createAUser',
  async ({ userData }: { userData: NewUser }) => {
    try {
      const result = await axios.post<NewUser>("https://alihyva.azurewebsites.net/api/v1/users", userData);
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

export const login = createAsyncThunk(
  "login",
  async ({ email, password }: UserCredential, { dispatch }) => {
    try {
      const result = await axios.post<{ access_token: string }>("https://alihyva.azurewebsites.net/api/v1/auth", { email, password })
      const accessToken = result.data.access_token
      console.log("I am here");
      localStorage.setItem("token", accessToken)
      const authentication = await dispatch(authenticate(email))
      return authentication.payload as User
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
export const authenticate = createAsyncThunk(
  "authenticate",
  async (email: string) => {
    try {
      const authentication = await axios.get<User>(`https://alihyva.azurewebsites.net/api/v1/users/profile/${email}`,
        // {
        //   headers: {
        //     "Authorization": `Bearer ${accessToken}`
        //   }
        // }
      )
      return authentication.data
    }
    catch (e) {
      const error = e as AxiosError
      return error
    }
  }
)
export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ userData, userId }: { userData: User, userId: number }) => {
    try {
      const result = await axios.put<User>(`https://alihyva.azurewebsites.net/api/v1/users/${userId}`, userData);
      return result.data; // The returned result will be inside action.payload
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAllUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.users = action.payload;
        }
        state.loading = false
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload
        }
        state.loading = false
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload
        }
        state.loading = false
      })
      .addCase(createSingleUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.newUser = action.payload;
        }
        state.loading = false
      })
      .addCase(createSingleUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createSingleUser.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message
        } else {
          state.user = action.payload;
        }
        state.loading = false
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = "Cannot fetch data"
      })
  }
})

const userReducer = usersSlice.reducer
export default userReducer
