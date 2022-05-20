import React, { useState } from 'react';
import './CreateUser.css';
import Input from '../Login/components/Input';
import Item from '../Login/components/Item';
import Title from '../Login/components/Title';
import ErrorNotification from '../../commons/ErrorNotification';
import Button from '../../commons/RegularButton';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: 2,
      color: '#fff',
    },
}));

const CreateUser = () => {

    const classes = useStyles();
    //Creo estados para los inputs
    const [ username, setUsername ] = useState('');
    const [ firtsName, setFirtsName ] = useState('');
    const [ lastName, setLastName] = useState('');
    const [ password, setPassword ] = useState('');
    const [ passwordAgain, setPasswordAgain ] = useState('');
    //Creo estados para la transición de carga y creación de username
    const [ isLoading, setIsLoading ] = useState(false);
    const [ created, setCreated ] = useState(false)
    //Creo estado para la identificación de errores
    const [ errors, setErrors ] = useState({
        usernameError: false,
        firtsNameError: false,
        lastNameError: false,
        passwordError: false,
        passwordAgainError: false
    })
    //Realizo una función que recibe datos clave valor para que por medio 
    //de un switch-case se determine si los campos están vacíos
    function handleChange(name, value) {
        switch(name) {
            case 'username':
                if(value < 1) {
                    setErrors({ ...errors, usernameError: true })
                } else {
                    setErrors({ ...errors, usernameError: false })
                    setUsername(value)
                }
                break;
            case 'firtsName':
                if(value < 1) {
                    setErrors({ ...errors, firtsNameError: true })
                } else {
                    setErrors({ ...errors, firtsNameError: false })
                    setFirtsName(value)
                }
                break;
            case 'lastName':
                if(value < 1) {
                    setErrors({ ...errors, lastNameError: true })
                } else {
                    setErrors({ ...errors, lastNameError: false })
                    setLastName(value)
                }
                break;
            case 'password':
                if(value < 1) {
                    setErrors({ ...errors, passwordError: true })
                } else {
                    setErrors({ ...errors, passwordError: false })
                    setPassword(value)
                }
                break;
            case 'passwordAgain':
                if(password.length < 6) {
                    setErrors({ ...errors, passwordError: true })
                } else if( password === value ) {
                    setErrors({ ...errors, passwordError: false,
                                 passwordAgainError: false })
                    setPasswordAgain(value)
                } else {
                    setErrors({ ...errors, passwordError: false, 
                                    passwordAgainError: true })
                }
                break;
            default:
                console.log('no hay valores.')
        }
    }
    //Creo parametros condicionales
    let params =
        errors.usernameError === false &&
        errors.firtsNameError === false &&
        errors.lastNameError === false &&
        errors.passwordError === false &&
        errors.passwordAgainError === false &&
        username.length > 1 &&
        firtsName.length > 1 &&
        lastName.length > 1 &&
        password.length > 5 &&
        password === passwordAgain
    ;
    //función que permite guardar información de los inputs en el localStorage
    function handleSubmit() {
        setIsLoading(true)
        let account = { username, firtsName, lastName, password }
        if(account) {
            let ac = JSON.stringify(account)
            localStorage.setItem('account', ac)
            setTimeout(() => setCreated(true), 2000)
        }
    }

    let open = true;

    let screenWidth = window.innerWidth;

    return (
        <>
        {//Creo el username y redirijo al Home
        }
        { created && <Redirect to='/home' /> }

            { screenWidth < 1030 && <Title text='(Nuevo username)' /> }

            <div className='createUserContent'>
                <div className='formCreateUser'>
                { screenWidth > 1030 && <Title text='(Nuevo username)' /> }            
                    {//Label de username trayendo un component
                    }
                    <Item text='Usuario' />
                    {//Input de username trayendo un component
                    }
                    <Input 
                        attribute={{
                            name: 'username',
                            inputType: 'text',
                            ph: ''
                        }}
                        handleChange={handleChange}
                        param={errors.usernameError}
                    />
                    {//Validación de error, el campo debe ser llenado.
                    }
                    { errors.usernameError && 
                        <ErrorNotification text='Required.' /> }
                    <Item text='Primer nombre' />
                    <Input 
                        attribute={{
                            name: 'firtsName',
                            inputType: 'text',
                            ph: ''
                        }}
                        handleChange={handleChange}
                        param={errors.firtsNameError}
                    />
                    { errors.firtsNameError && 
                        <ErrorNotification text='Required.' /> }
                    <Item text='Apellido' />
                    <Input 
                        attribute={{
                            name: 'lastName',
                            inputType: 'text',
                            ph: ''
                        }}
                        handleChange={handleChange}
                        param={errors.lastNameError}
                    />
                    { errors.lastNameError && 
                        <ErrorNotification text='Required.' /> }
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
                    { errors.passwordError && 
                        <ErrorNotification text='min. 6 characters' /> }
                    <Item text='Repetir contraseña' />
                    <Input 
                        attribute={{
                            name: 'passwordAgain',
                            inputType: 'password',
                            ph: ''
                        }}
                        handleChange={handleChange}
                        param={errors.passwordAgainError}
                    />
                    { errors.passwordAgainError && 
                        <ErrorNotification text="La contraseña no coincide" /> }
                    <Button 
                        text='Crear usuario'
                        handleOnClick={handleSubmit}
                        param={params}
                    />
                    <div 
                    style={{ display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center' 
                    }}>
                        <Link 
                        to='/'
                        style={{ color: '#734488' }}
                        >
                            <Item 
                            text='Iniciar sesión' />
                        </Link>
                    </div>
                </div>
                { isLoading &&
                    <Backdrop open={open} className={classes.backdrop}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                }
            </div>
        </>
    )
};

export default CreateUser;