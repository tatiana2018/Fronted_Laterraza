import React from 'react';
import{Carousel} from 'react-bootstrap';
import image1 from '../../images/servicio1.png';
import image2 from '../../images/servicio2.png';
import image3 from '../../images/servicio3.png';
import image4 from '../../images/servicio4.png';
import { Link } from 'react-router-dom';

const CarouselContainer = () =>{
    return (
        <Carousel fade={true} pause={false} indicators={true}>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image1}
              alt="Manicure Terraza de Frida"
             />
             
            <Carousel.Caption>
              <p>Aquí encontrarás información respecto al servicio de manicure.</p>
              <Link className="btns" href="/servicio-cliente">Ver más Información</Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image2}
              alt="Pedicure Terraza de Frida"
            />
            <Carousel.Caption>
              <p>Aquí encontraras información respecto a nuestra ubicación.</p>
              <a className="btns" href="/contacto">Ver más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image3}
              alt="Tinturas Terraza de Frida"
            />
            <Carousel.Caption>
              <p>Aquí encontraras información respecto al servicio de manicure.</p>
              <a className="btns" href="/servicio-cliente">Ver más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={5000}>
            <img
              className="d-block w-100"
              src={image4}
              alt="Cejas Terraza de Frida"
            />
            <Carousel.Caption>
              <p>Aquí encontraras información respecto al servicio de Tintura.</p>
              <a className="btns" href="/servicio-cliente">Ver más Información</a>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      )
}

export default CarouselContainer;
