import React, { Component } from 'react';
import { XAxis, YAxis, LineChart, Line, Tooltip, Legend, PieChart, Pie } from 'recharts';

class BookingCharts extends Component {
  constructor(props) {
    super(props);
    this.data = [];
  }
  getRandomNumber() {
    if (this.data && this.data.length && this.data.length > 0) {
      return this.data;
    }

    for (let i = 0; i < 10; i++) {
      this.data.push({
        name: i, 'Zone A': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000, 'Zone B': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000, 'Zone C': Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000,
      });
    }
    return this.data;
  }

  render() {
    const data001 = [
      { name: 'Zone A', value: 400 }, { name: 'Zone B', value: 300 },
      { name: 'Zone C', value: 300 }, { name: 'Zone D', value: 200 },
      { name: 'Zone E', value: 278 }, { name: 'Zone F', value: 189 }];

    return (
      <div >
        <div className="lineChart" >
          <h3 className="BookingGraphHeading">Booking per day</h3>
          <LineChart
            width={730}
            height={300}
            data={this.getRandomNumber()}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" label={{ value: 'Days', position: 'insideBottom' }} />
            <YAxis label={{ value: 'Patient Treated', angle: -90, position: 'insideBottomLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Zone A" stroke="red" />
            <Line type="monotone" dataKey="Zone B" stroke="blue" />
            <Line type="monotone" dataKey="Zone C" stroke="green" />
          </LineChart>
        </div>
        <div className="vl" />
        <div className="lineChart" >
          <h3 className="BookingGraphHeading">Monthly Booking</h3>
          <PieChart
            width={350}
            height={300}
            margin={{
 top: -50, right: 0, left: -20, bottom: 5,
}}
          >
            <Pie isAnimationActive={false} data={data001} cx={200} cy={200} outerRadius={80} fill="#0D5BD5" label />
            {/* <Pie data={data002} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" /> */}
            <Tooltip />
          </PieChart>
        </div>
      </div >
    );
  }
}

export default BookingCharts;
