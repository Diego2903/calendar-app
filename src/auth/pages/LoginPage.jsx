
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm , useAuthStore } from '../../hooks';
import './loginPage.css';

const loginFormfields = {
    loginEmail: '',
    loginPassword: '',
}
const registerFormField = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword1: '',

}

export const LoginPage = () => {

    const {startLogin, errorMessage, startRegister} = useAuthStore()

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormfields);
    const { registerName,registerEmail, registerPassword, registerPassword1,onInputChange: onRegiterInputChange } = useForm(registerFormField);

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password : loginPassword});
        
    }
    const registerSubmit = (event) => {
        event.preventDefault();
        if (registerPassword !== registerPassword1) {
            Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error');
            return;
        }

        startRegister({name : registerName, email : registerEmail, password : registerPassword , registerPassword1});
        console.log({ registerName, registerEmail, registerPassword, registerPassword1});
    }

    useEffect(() => {
      
    if (errorMessage !== undefined) {
        Swal.fire('error en la autenticacion', errorMessage, 'error');
    }
     
    }, [errorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ loginSubmit }>
                        <div className="form-group mb-2">
                            <input

                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2 ">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Ingresar"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegiterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegiterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegiterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword1'
                                value={registerPassword1}
                                onChange={onRegiterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
