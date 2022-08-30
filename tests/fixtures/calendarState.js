

export const events = [

    {
        id: 1,
        title: "Parciales de Digital",
        notes: "Hay que estudiar bastante",
        start: new Date('2022-08-30 18:00:00'),
        end: new Date('2022-08-30 20:00:00'),

    },
    {
        id: 2,
        title: "Termine  bien todos los parciales ",
        notes: "Hay que estudiar bastante",
        start: new Date('2022-08-30 21:00:00'),
        end: new Date('2022-08-30 23:00:00'),

    }

];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
}

export const calendarWithEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
}

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0]},
}
