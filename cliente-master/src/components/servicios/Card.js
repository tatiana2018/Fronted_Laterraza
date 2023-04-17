import React from 'react'
import { Fragment } from 'react';
import '../../index.css'

function Card({title, text, time, url}){
    return(
        <Fragment>
        <div className="tarjetas text-center">
            <div className = "tarjetas-body text-dark">
                <h4 className = "tarjetas-title">{title}</h4>
                <p className = "tarjetas-text text-secondary">{text}</p>
                <span className="body-tarjetas-text">{time}</span><span className="text-time"> Minutos</span><br></br>
                <span className="subtext-time">El precio y tiempo pueden variar</span>
                <a href="/contacto" className="link-servicio btn btn-outline-secondary">
                    Contáctanos para mayor información
                </a>    
            </div>
        </div>
        </Fragment >
    )
}
export default Card