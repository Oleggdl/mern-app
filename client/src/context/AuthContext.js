import {createContext} from "react";

function nullFunc() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: nullFunc(),
    logout: nullFunc(),
    isAuthenticated: false
})