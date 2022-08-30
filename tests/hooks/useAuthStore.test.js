import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { authSlice } from "../../src/store";
import { initialState, notAuthenticatedState } from "../fixtures/authState";
import { testUserCredential } from "../fixtures/testUser";
import calendarApi from "../../src/api/calenderApi";



const getMockStore = (initialState) => {

    return configureStore({
        reducer: {
            // ui: uiSlice.reducer,
            auth: authSlice.reducer

        },
        preloadedState: {
            // ui: { ...initialState }
            auth: { ...initialState }
        }
    })
}

describe('Pruebas en el useAuthStore', () => {

    test('Debe de regresar los valores por defecto', () => {

        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        expect(result.current).toEqual({
            status: 'checking',
            user: {},
            errorMessage: undefined,
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            checkAuthToken: expect.any(Function),
            startLogout: expect.any(Function)
        })

    });

    test('startLogin debe de realizar el login correctamente', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredential)
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: "authenticated",
            user: {
                name: "pruebas",
                uid: "630e5fdcead255ce2666790a"
            }
        });
        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    test('startLogin debe de fallar la autenticacion', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        await act(async () => {
            await result.current.startLogin({ email: '121312@google.com', password: '123123312' })
        });

        const { errorMessage, status, user } = result.current;

        expect(localStorage.getItem('token')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'credenciales incorrectas',
            status: 'not-authenticated',
            user: {}
        });

        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        );

    });

    test('startRegister debe de crear un usuario correctamente', async() => { 
        
        const newUser = { email: '121312@google.com', password: '123123312', name : 'Test user' }

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        const spy = jest.spyOn( calendarApi, 'post').mockReturnValue({
            data : {
                ok: true,
                uid: "AlgunToken",
                name: "pruebas",
                token: "AlgunToken"
            }
        });

        await act(async () => {
            await result.current.startRegister(newUser);
        });

        const { errorMessage, status , user } = result.current;
        expect({errorMessage, status , user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'pruebas', uid: 'AlgunToken' }
        });

        spy.mockRestore();
       
     });

    test('startRegister debe de fallar el registro', async() => { 

        const mockStore = getMockStore({ ...notAuthenticatedState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        await act(async () => {
            await result.current.startRegister(testUserCredential);
        });

        const { errorMessage, status , user } = result.current;
        expect({errorMessage, status , user}).toEqual({
            errorMessage: 'Ya existe un usuario con ese correo',
            status: 'not-authenticated',
            user: {}
        });
    });

    test('checkAuthToken debe de fallar si no hay token', async() => { 

        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status , user } = result.current;
        expect({ errorMessage, status , user }).toEqual({
            errorMessage : undefined,
            status : 'not-authenticated',
            user : {}
        });
    })

    test('Debe de auntenticar el usuario si hay un token', async() => { 

        const {data} =  await calendarApi.post('/auth/new', testUserCredential);
        localStorage.setItem( 'token', data.token);
    
        const mockStore = getMockStore({ ...initialState })
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children} </Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });
    
        const { errorMessage, status , user } = result.current;
        expect({ errorMessage, status , user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'pruebas', uid: '630e5fdcead255ce2666790a' }
          });
    });

});