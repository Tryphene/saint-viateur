import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [{
          data: [300, 50, 100],
          backgroundColor: ['red', 'blue', 'yellow']
        }]
    };
    
    return (
        <>
          <div>
              <h2>Graphique en camembert</h2>
                <Pie data={data} />
            </div>
        </>
    )
}

export default PieChartComponent;