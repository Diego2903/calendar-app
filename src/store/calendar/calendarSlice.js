import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';


// const tempEvent = {
//     id: new Date().getTime(),
//     title: "Parciales de Digital",
//     notes: "Hay que estudiar bastante",
//     start: new Date(),
//     end: addHours(new Date(), 1),
//     bgColor: "#fafafa",
//     user: {
//         _id: "123456",
//         name: "Diego"
//     }

// }



export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        isLoadingEvents: true,
        events: [],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },

        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },

        onUpdateEvent: (state, { payload }) => {
            state.events = state.events.map(event => {
                if (event.id === payload.id) {
                    return payload;
                }

                return event;
            })
        },

        onDeleteEvent: (state) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event.id !== state.activeEvent.id);
                state.activeEvent = null;
            }
        },

        onLoadingEvent: (state, { payload = [] }) => {
            state.isLoadingEvents = false;
            payload.forEach(event => {
                const exists = state.events.some(dbEvent => dbEvent.id === event.id);
                if (!exists) {
                    state.events.push(event)
                }
            });
        },

        onLogoutCalendar : (state) => {
            state.isLoadingEvents = true,
            state.events = [],
            state.activeEvent =  null
        }
    },
})
// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadingEvent, onLogoutCalendar } = calendarSlice.actions