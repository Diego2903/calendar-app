import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";


jest.mock("../../src/hooks");



describe('Pruebas ene el component AppRouter', () => {

    const mockCheckAuthToken = jest.fn();
    beforeEach(() => jest.clearAllMocks());


    test('Debe de mostrar la pantalla de carga y llamar el checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken
        });

        render(<AppRouter />)
        expect(screen.getByText('Cargando ...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();

    });

})