import * as tokenService from './tokenService'
const BASE_URL = '/api/auth/'

function getUser() {
    return tokenService.getUserFromToken()
}

// function signup(user) {
//     console.log("USER", user)
//     return fetch(`${BASE_URL}signup`, {
//         method: 'POST',
//         headers: new Headers({ 'Content-Type': 'application/json' }),
//         body: JSON.stringify(user),
//     })
//     .then(res => {
//         console.log("res.json()", res.json())
//         return res.json()
//     })
//     .then(json => {
//         if (json.token) return json.token
//         throw new Error(json.err)
//     })
//     .catch(err => {
//         console.log(err)
//     })
// }

const signup = async (user) => {
    console.log(user)
    try {
        const res = await fetch(`${BASE_URL}signup`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(user)
        })
        const data = await res.json()
        console.log("DATA", data)
        if (data.token) {
            tokenService.setToken(data.token)
        } else {
            throw Error(data.err)
        }
    } catch (error) {
        throw Error(error)
    }
}

const login = async (creds) => {
    const res = await fetch(`${BASE_URL}login`, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(creds)
    })
    if (res.ok) {
        const data = await res.json()
        tokenService.setToken(data.token)
    } else {
        throw new Error()
    }
}

function logout() {
    tokenService.removeToken()
}

export {
    signup,
    getUser,
    login,
    logout,
}