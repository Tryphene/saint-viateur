import Chart from 'chart.js/auto';
import { Colors } from 'chart.js';
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap';

const Diagramme = (props) => {
    Chart.register(Colors);
    const chartRef = useRef(null);
    
    useEffect(() => {

        let chartInstance = null;

        const plugin = {
            id: 'customCanvasBackgroundColor',
            beforeDraw: (chart, args, options) => {
              const {ctx} = chart;
              ctx.save();
              ctx.globalCompositeOperation = 'destination-over';
              ctx.fillStyle = options.color || '#99ffff';
              ctx.fillRect(0, 0, 10, 10);
              ctx.restore();
            }
        };

        if (chartRef && chartRef.current) {
            if (chartInstance) {
                chartInstance.destroy();
            }
        
            chartInstance = new Chart(chartRef.current, {
                type: props.type,
                data: props.data,
                options: {
                    plugins: {
                        customCanvasBackgroundColor: {
                            color: 'white',
                        }
                    }
                },
                plugins: [plugin],
            })
        };

        return () => {
            if (chartInstance) {
              chartInstance.destroy();
            }
          };
    }, [props])
  return (
      <div className="contain" style={{paddingBottom: 25}}>
          <p style={{ marginLeft: 10}}>{props.titre}</p>
          <center>
          <div className="pieChart mt-2" style={{width: props.size}}>
              <canvas ref={chartRef} />
          </div>
          </center>
          {props.type === "doughnut" || props.type === "pie" ? (
              <Container style={{ marginTop: 20 }}>
                  <Row>
                      <Col>
                          <ol className="list-group mt-4">
                              {props.items.map((item, index) => {
                                  return (
                                      <>
                                          <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                                              <div className="ms-2 me-auto">
                                                  {item.name}
                                              </div>
                                              <span style={{ backgroundColor: item.color }} className="badge rounded-pill">{item.nombre}</span>
                                          </li>
                                      </>
                                  )
                              })}
                          </ol>
                      </Col>
                  </Row>
              </Container>
          ) : null
          }
      </div>
  )
}

export default Diagramme
