 
import { ResetApiState } from "@/store/store.util";
import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { LoginPayload, LoginResponse, User, UserStateTypes, getSavedUser, mockLogin } from "./user.util";
  
  const name = "user";
  const extraActions = createExtraActions();
  
  const UserInitialState: UserStateTypes = {
    login: ResetApiState({}),
    user: null
  };
  
  function createExtraActions() {
    const login = createAsyncThunk<LoginResponse, LoginPayload>(
      `${name}/login`,
      async (payload: LoginPayload, thunkApi) => {
        return mockLogin(payload)
            .then((res) => {
                return res;
            })
            .catch((error) => thunkApi.rejectWithValue(error))
      }
    );

    const getUser = createAction(`${name}/signed-in-user`);
    const logout = createAction(`${name}/logout`)
  
    return {
      login,
      getUser,
      logout
    };
  }
  
  function createExtraReducers(builder: ActionReducerMapBuilder<UserStateTypes>) {
    return {
      ...loginReducer(),
      ...logoutReducer(),
      ...getUserReducer(),
    };
  
    function loginReducer() {
      return {
        ...builder.addCase(extraActions.login.pending, (state) => {
          state.login = {
            loading: true,
            payload: null,
            successful: false,
            error: null,
          };
        }),
        ...builder.addCase(extraActions.login.fulfilled, (state, action) => {
          state.login = {
            loading: false,
            payload: action.payload,
            successful: true,
            error: null,
          };
        }),
        ...builder.addCase(extraActions.login.rejected, (state, action) => {
          state.login = {
            loading: false,
            payload: null,
            successful: false,
            error: action.payload,
          };
        }),
      };
    }

    function logoutReducer() {
      return builder.addCase(extraActions.logout, (state) => {
        state.login = {
          loading: false,
          payload: null,
          successful: false,
          error: null
        }
      })
    }

    function getUserReducer() {
      return builder.addCase(extraActions.getUser, (state) => {
        if (state.login.payload?.data) {
          state.user = state.login.payload?.data
          return;
        }
        const savedUser = getSavedUser();
        if (savedUser) {
          state.user = JSON.parse(savedUser) as User;
          return
        }
        state.user = null;
      })
    }
  }
  
  const UserSlice = createSlice({
    name,
    initialState: UserInitialState,
    reducers: {},
    extraReducers: (builder) => createExtraReducers(builder),
  });
  
  export const userActions = {
    ...UserSlice.actions,
    ...extraActions,
  };
  export const userReducer = UserSlice.reducer;
  