import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from '../../commons/NavigationBar';

const Home = () => {

    let ac = localStorage.getItem('account')
    let account = JSON.parse(ac)
    //Defino estados para el uso de la API unsplash
    const [img, setImg] = useState("");
    const [res, setRes] = useState([]);

    const fetchRequest = async () => {
        const data = await fetch(
            `https://api.unsplash.com/search/photos?page=2&query=${img}&client_id=dLDtyGrNs6zznsnbY1tVxiWtVKBsBnHvkit9cfSVTwc&per_page=8`
        );
        const dataJ = await data.json();
        const result = dataJ.results;
        console.log(result);
        setRes(result);
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    const Submit = () => {
        fetchRequest();
        setImg("");
    };

    return (
        <>
            <div className='HomeContainer'>
                <div className='HomeContent'>
                    {//Llamo al componente de NavigatioBar donde incluyo el nombre del programa y el botón de salir
                    }
                    <NavigationBar text='Academo' />
                    <div className='HomeBody'>
                        <h3 className='HomeGreeting'> Hola, </h3>
                        <label className='HomeLabel'> 
                            {account.firtsName}, cómo estás? 
                        </label>
                        <label className='HomeLabel'> 
                            Espero te haya gustado esta simple aplicación web,
                        </label>
                        <label className='HomeLabel'> 
                            al utilizar la localStorage,
                            hay que tener en cuenta que si cierras tu cuenta
                            esta desaparecerá, 
                            entonces deberás crear una nueva para volver a ingresar.
                        </label>
                        <label className='HomeLabel'>
                            A continuación veras el trailer de la próxima película de AVATAR,
                        </label>
                        {//Con este iframe inserto un vídeo de YouTube
                        }
                        <div className='video'>
                            <iframe width="840" height="472" src="https://www.youtube.com/embed/jYRtFFa4hT8?autoplay=1" 
                            title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; 
                            clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                            </iframe>
                        </div>
                        <div>                     
                        <label className='HomeLabel'>
                            Ahora verás la implementación de la API de Unsplash,
                        </label>                   
                        <label className='HomeLabel'>
                            puedes ingresar tu busqueda en el input y al dar en el botón
                        </label>
                        <label className='HomeLabel'>
                            se generará una serie de imágenes.
                        </label>   
                        <section className='HomeApi'>
                            <div className='HomeApiInput'>
                                <input className='input' type='text' placeholder='Ingresa tu busqueda' value={img} onChange={(e) => setImg(e.target.value)}>
                                </input>
                            </div>
                            <button className='HomeApiButton' type='submit' onClick={Submit}>Buscar</button>
                            <div className='HomeApiGalery'>
                                {res.map((val) => {
                                    return (
                                        <div className='HomeApiGaleryCard'>
                                            <img src={val.urls.small} alt="val.alt_description"></img>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>  
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Home;