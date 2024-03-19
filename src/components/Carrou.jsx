import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../img/banniere1.png'

class PhotoSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };

  render() {
    return (
      <Carousel
        activeIndex={this.state.index}
        direction={this.state.direction}
        onSelect={this.handleSelect}
        interval={5000} // Changement automatique toutes les 5 secondes
      >
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt=""
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt=""
          />
        </Carousel.Item>
        {/* Ajoutez d'autres diapositives ici */}
      </Carousel>
    );
  }
}

export default PhotoSlider;
