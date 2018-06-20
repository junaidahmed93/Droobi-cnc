import React, { Component } from 'react';
// import LineChart from 'react-linechart';
// import { Doughnut } from 'react-chartjs-2';
import { XAxis, YAxis, Tooltip, PieChart, Pie, AreaChart, Area, CartesianGrid } from 'recharts';
// import { LineChart, Line } from 'recharts';
class Chart extends Component {
  render() {
    let data3 = [
      {
        name: 'Series 1',
        data: [
          { category: 'A', value: 0 },
          { category: 'B', value: Math.random() },
          { category: 'C', value: Math.random() },
        ],
      },
      {
        name: 'Series 2',
        data: [
          { category: 'B', value: 0 },
          { category: 'C', value: Math.random() },
          { category: 'D', value: Math.random() },
        ],
      },
      {
        name: 'Series 3',
        data: [
          { category: 'C', value: 0 },
          { category: 'D', value: Math.random() },
          { category: 'E', value: Math.random() },
        ],
      },
      {
        name: 'Series 4',
        data: [
          { category: 'C', value: 0 },
          { category: 'D', value: Math.random() },
          { category: 'E', value: Math.random() },
        ],
      },
      {
        name: 'Series 5',
        data: [
          { category: 'A', value: 0 },
          { category: 'B', value: Math.random() },
          { category: 'C', value: Math.random() },
        ],
      },
    ];
    // const data4 = [
    //   {
    //     name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    //   },
    //   {
    //     name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    //   },
    //   {
    //     name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    //   },
    //   {
    //     name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    //   },
    //   {
    //     name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    //   },
    //   {
    //     name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    //   },
    //   {
    //     name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    //   },
    // ];
    const data01 = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
    ];
    const data02 = [
      { name: 'A1', value: 100 },
      { name: 'A2', value: 300 },
      { name: 'B1', value: 100 },
      { name: 'B2', value: 80 },
      { name: 'B3', value: 40 },
      { name: 'B4', value: 30 },
      { name: 'B5', value: 50 },
      { name: 'C1', value: 100 },
      { name: 'C2', value: 200 },
      { name: 'D1', value: 150 },
      { name: 'D2', value: 50 }];
    const data004 = [
      { name: 'Page A', uv: 4000, pv: 9000 },
      { name: 'Page B', uv: 3000, pv: 7222 },
      { name: 'Page C', uv: 2000, pv: 6222 },
      { name: 'Page D', uv: 1223, pv: 5400 },
      { name: 'Page E', uv: 1890, pv: 3200 },
      { name: 'Page F', uv: 2390, pv: 2500 },
      { name: 'Page G', uv: 3490, pv: 1209 },
    ];

    const dataKeys = data3.map(s => s.name);
    console.log(dataKeys);
    const dataObj = data3.reduce((obj, series) => {
      series.data.forEach((d) => {
        obj[d.category] = obj[d.category] || {};
        obj[d.category][series.name] = d.value;
      });
      return obj;
    }, {});

    data3 = Object.keys(dataObj).map(key => ({ category: key, ...dataObj[key] }));
    return (
      <div >
        <div className="lineChart" >

          <AreaChart width={600} height={200} data={data004} syncId="anyId">
            {/* // margin={{ top: 10, right: 30, left: 0, bottom: 0 }}> */}
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </div>
        <div className="lineChart" >
          <PieChart width={350} height={400}>
            <Pie data={data01} cx={200} cy={200} outerRadius={60} fill="#8884d8" />
            <Pie data={data02} cx={200} cy={200} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          </PieChart>

          {/* <PieChart width={400} height={400}>
                        <Pie isAnimationActive={false} data={data01} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
                        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
                        <Tooltip />
                    </PieChart> */}
        </div>


      </div>


    );
  }
}

export default Chart;
