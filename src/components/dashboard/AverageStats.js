import React, { Component } from 'react';
import { AreaChart } from 'react-chartkick';

class AverageStats extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="flex-container">
          <div>
            <AreaChart
              curve
              height="60px"
              width="121px"
              data={{
                '2017-01-01': 20,
                '2017-01-02': 10,
                '2017-01-03': 40,
                '2017-01-04': 30,
                '2017-01-05': 70,
              }}
            />
          </div>
          <div className="avg-label">
            5 mins 45 sec<span className="avg-span">Avg Ambulance Arrival</span>
          </div>
        </div>
        <div className="flex-container">
          <div>
            <AreaChart
              curve
              height="60px"
              width="121px"
              data={{
                '2017-01-01': 5,
                '2017-01-02': 100,
                '2017-01-03': 20,
                '2017-01-04': 50,
                '2017-01-05': 60,
              }}
            />
          </div>
          <div className="avg-label">
            15 days<span className="avg-span">Avg. Patient Recovery</span>
          </div>
        </div>
        <div className="flex-container">
          <div>
            <AreaChart
              curve
              height="60px"
              width="121px"
              data={{
                '2017-01-01': 30,
                '2017-01-02': 60,
                '2017-01-03': 30,
                '2017-01-04': 60,
                '2017-01-05': 80,
              }}
            />
          </div>
          <div className="avg-label">
            2 hours<span className="avg-span">Avg. Operate Time</span>
          </div>
        </div>
      </div>
    );
  }
}

export default AverageStats;
