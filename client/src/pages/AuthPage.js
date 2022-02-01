import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {

    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}

    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Shorten link</h1>
                <div className="card grey darken-4">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input id="email" type="text" value={form.email}
                                       name="email" className="red-input" onChange={changeHandler}/>
                                    <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input id="password" type="password" value={form.password}
                                       name="password" className="red-input" onChange={changeHandler}/>
                                <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn red darken-4"
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}>Log in</button>
                        <button className="btn grey lighten-1 black-text"
                                onClick={registerHandler}
                                disabled={loading}>Log up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}