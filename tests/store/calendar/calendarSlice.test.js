import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadingEvent, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventState, events, initialState } from "../../fixtures/calendarState";

describe('Pruebas en calendarSlice', () => { 

    test('Debe de regresar el estado por defecto', () => { 

        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );

    });

    test('onSetActiveEvent debe de activar el evento ', () => { 

        const state = calendarSlice.reducer( calendarWithActiveEventState, onSetActiveEvent( events[0]) );
        expect( state.activeEvent)
    });

    test('onAddNewEvent debe de agregar el evento', () => { 

        const newEvent = {
            id: 3,
            title: "Apenas empezando con react ",
            notes: "Hay que estudiar bastante",
            start: new Date('2022-06-30 21:00:00'),
            end: new Date('2022-06-30 23:00:00'),
        }

        const state = calendarSlice.reducer( calendarWithEventState, onAddNewEvent( newEvent ));
        expect( state.events).toEqual( [...events, newEvent] );

     });

    test('onUpdateEvent debe de actualizar el evento ', () => { 

        const upDateEvent = {
            id: 1,
            title: "Apenas empezando con react, actualizado ",
            notes: "Hay que estudiar",
            start: new Date('2022-06-30 21:00:00'),
            end: new Date('2022-06-30 23:00:00'),
        }

        const state = calendarSlice.reducer( calendarWithEventState, onUpdateEvent( upDateEvent ));
        expect( state.events).toContain(upDateEvent);


    });

    test('onDeleteEvent debe de borrar el evento activo', () => { 

        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent());
        expect( state.activeEvent).toBe(null);
        expect( state.events ).not.toContain( events[0]);

    });

    test('onLoadingEvents debe de establecer los eventos', () => { 

       

        const state = calendarSlice.reducer( initialState, onLoadingEvent(events));
        expect( state.isLoadingEvents).toBeFalsy();
        expect( state.events).toEqual( events );

    });

    test('onLogoutCalendar debe de limpiar el estado', () => { 

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar( ));
        expect( state ).toEqual( initialState);

    })

 })