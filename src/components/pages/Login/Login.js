import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './Login.css';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Title from './components/Title';
import Input from './components/Input';
import Item from './components/Item';
import Button from '../../commons/RegularButton';
import ModalError from '../../commons/ModalError';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: 2,
    color: '#fff',
  },
}));

let localstorageData = localStorage.getItem('account')

let lsd = JSON.parse(localstorageData)

const Login = () => {

    const classes = useStyles();
    //Creo constantes para guardar información sobre los estados y datos
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLogin, setIsLogin ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ hasErrors, setHasErrors ] = useState(false);

    const open = true;

    const [ errors, setErrors ] = useState({
        usernameError: false,
        passwordError: false
    })
    //esta función me permite hacer una validación, me permite saber si los inputs tienen información y si no la hay, cambia los estados de mis constantes anteriores
    function handleChange(name, value) {
        switch(name) {
            case 'username':
                setErrors({ usernameError: false, passwordError: false });
                setHasErrors(false);
                setUsername(value);
                break;
            case 'password':
                setErrors({ usernameError: false, passwordError: false });
                setHasErrors(false);
                setPassword(value);
                break;
            default: 
            console.log('no hay valores')
        }
    }
    //esta función me permite cambiar los estados de usernameError y passwordError
    function showErrors() {
        setHasErrors(true);
        setErrors({ usernameError: true, passwordError: true })
    }
    //esta función detiene la transición de cargar la siguiente página y genera el label de error utlizando la funcion showError()
    function stopIsLoading() {
        setIsLoading(false);
        showErrors();
    }
    //Con esta función valido el login con el usuario y contraseña proporcionados en el código
    function ifMatch(user, pass) {
        if((user === 'jonathanvra' && pass === '123456') ||
            (user === lsd.username && 
            pass === lsd.password )) {
            let ac = {user, pass, firtsName: 'Jonathan'}
            let account = JSON.stringify(ac)
            localStorage.setItem('account', account)
            setTimeout(() => setIsLogin(true), 2000)
        } else {
           setTimeout(() => stopIsLoading(), 2000)
        }
    }
    //creo el evento utilizado en botón ingresar y procedo a ejecutar la función de validación ifMatch()
    function handleOnClick() {
        setIsLoading(true);
        let login = { username, password }
        if(login) {
            ifMatch(username, password)
        }
    }
    //Si los datos ingresados son incorrectos, esta función limpia los inputs de usuario y contraseña
    function clearErrorModal() {
        setHasErrors(false);
        setErrors({ usernameError: false, passwordError: false })
    }

    let params = 
        errors.usernameError === false &&
        errors.passwordError === false
    ;

    return (
        <>
        
        { isLogin && <Redirect to='/home' /> }

            <div className='LoginContainer'>
                <div className='LoginContent'>
                    <div className='Login'>
                        <div className='LoginHigher' />
                        <div className='LoginLower'>
                            <Title text='(ACADEMO)' />
                            {//Si hay un cambio de estado en hasError, se utliza el component ModalError, se muestra dos etiquetas de texto y se activa la función clearErrorModal()
                            }
                            { hasErrors &&
                                <ModalError
                                    title='A ocurrido un error,'
                                    text="El usuario o la contraseña no son correctos."
                                    handleOnClick={clearErrorModal}
                                />
                            }
                                <div className='ItemUserLogin'>
                                    <Item text='Usuario' />
                                    <Input
                                        attribute={{
                                            name: 'username',
                                            inputType: 'text',
                                            ph: ''
                                        }}
                                        handleChange={handleChange}
                                        param={errors.usernameError}
                                    />
                                </div>
                                <div className='ItemPasswordLogin'>
                                    <Item text='Contraseña' />
                                    <Input
                                        attribute={{
                                            name: 'password',
                                            inputType: 'password',
                                            ph: ''
                                        }}
                                        handleChange={handleChange}
                                        param={errors.passwordError}
                                    />
                                </div>
                                <Button 
                                    text='Ingresar'
                                    handleOnClick={handleOnClick}
                                    param={params}
                                />
                                {//El siguiente div contiene el código que por medio de link me permite dirigirme a un formulario de registro de usuario
                                }
                                <div 
                                style={{ display: 'flex', 
                                justifyContent: 'center',
                                alignItems: 'center' 
                                }}>
                                    <Link 
                                    to='/createUser'
                                    style={{ color: '#734488' }}
                                    >
                                        <Item 
                                        text='Quiero registrarme.' />
                                    </Link>
                                </div>
                            {//cuando se inicia el proceso de validación de datos, se ejecuta la animación de cargar y dirigirnos a otra página
                            }
                            { isLoading &&
                                <Backdrop open={open} className={classes.backdrop}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            }
                          
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;