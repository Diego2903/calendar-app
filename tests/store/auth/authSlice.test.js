import { authSlice, onClearErrorMessage, onLogin, onLogout } from "../../../src/store";
import { authenticatedState, initialState, NotAuthenticatedState } from "../../fixtures/authState";

import { testUserCredential } from "../../fixtures/testUser";

describe('Pruebas en el componente authSlice', () => {

    test('Debe de regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState);

    })

    test('Debe de regresar Login', () => { 

        const state = authSlice.reducer( initialState, onLogin(testUserCredential))
        expect(state).toEqual({
            status : 'authenticated',
            user : testUserCredential,
            errorMessage : undefined,
        })

     });

     test('Debe de regresar el logout', () => { 

        const state = authSlice.reducer( authenticatedState, onLogout());

        expect(state).toEqual({
            status : 'not-authenticated',
            user : {},
            errorMessage : undefined,
        })

      })
     test('Debe de regresar el logout', () => { 
        const errorMessage = "Credenciales invalidas"
        const state = authSlice.reducer( NotAuthenticatedState, onLogout(errorMessage));

        expect(state).toEqual({
            status : 'not-authenticated',
            user : {},
            errorMessage : errorMessage,
        });

      });

      test('Debe de limpiar el errorMessage', () => { 

        const errorMessage = "Credenciales invalidas"
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage));

        const newState = authSlice.reducer( state , onClearErrorMessage());
        expect( newState.errorMessage).toBe( undefined );

       })
})