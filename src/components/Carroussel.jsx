import React from 'react'
import img1 from "../img/sv4.jpg"
import img2 from "../img/sv6.jpg"
import img3 from "../img/sv7.png"

const Carroussel = () => {
    const slideImg = [
        {img1: img1},
        {img1: img2},
        {img1: img3}
    ]
  return (
      <>
          <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>
              <div className="carousel-inner">
                  {slideImg.map((img) => {
                      return (
                        <div className="carousel-item active" data-bs-interval="10000" style={{borderRadius: 10}}>
                        <img src={img.img1} className="d-block w-100" alt="..." />
                        {/* <div className="carousel-caption d-none d-md-block">
                          <h5>First slide label</h5>
                          <p>Some representative placeholder content for the first slide.</p>
                        </div> */}
                      </div>
                      )
                  })}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
              </button>
          </div>
    </>
  )
}

export default Carroussel
