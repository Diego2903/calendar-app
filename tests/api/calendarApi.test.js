import calendarApi from "../../src/api/calenderApi"


describe('Pruebas en el CalendarApi', () => { 


    test('Debe de tener la configuracion por defecto', () => { 
        // console.log(process.env);
        expect(calendarApi.defaults.baseURL).toBe(  process.env.VITE_API_URL )

     });

     test('Debe de tener el x-token en el header de todas las peticiones', async() => { 

        localStorage.setItem('token', 'ABC-123-XYZ');

        const res =  await calendarApi.get('/auth')
        expect(res.config.headers['x-token']).toBe('ABC-123-XYZ')
     });


 })

