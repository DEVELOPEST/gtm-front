import React from "react";
import {isValidToken, getUsernameFromToken, logout, hasAnyRole} from './Auth'
import {ADMIN, LECTURER, TEST_TOKEN, USER} from "./constants";

const EXPIRED_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTg0MTM4NTcsImV4cCI6MTYxODQwMDE1NywidXNlciI6MjIsInVzZXJuYW1lIjoiTWFydGVuSnVyZyIsInJvbGVzIjpbIlVTRVIiXX0.NDIyhrYC3aCBy2UYIFE2DlU_xcoZvJAn2z3bLkBUcJM'
describe("Auth tests", () => {
    beforeEach(() => {
        localStorage.setItem('token', TEST_TOKEN)
    });

    test('isValidToken', async() => {
        expect(isValidToken(TEST_TOKEN)).toBe(true)
        expect(isValidToken(EXPIRED_TOKEN)).toBe(false)
        expect(isValidToken(null)).toBe(false)
        expect(isValidToken('token')).toBe(false)
    })

    test('getUsernameFromToken', async() => {
        expect(getUsernameFromToken()).toBe("MartenJurg")
    })

    test('logout', async() => {
        logout()
        expect(localStorage.getItem('token')).toBe(null)
    })

    test('hasAnyRole', async() => {
        expect(hasAnyRole([USER])).toBe(true)
        expect(hasAnyRole([LECTURER])).toBe(false)
        expect(hasAnyRole([ADMIN])).toBe(false)
    })
})



