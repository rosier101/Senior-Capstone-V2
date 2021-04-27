import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
import '../styles/Graphs.css';
import axios from 'axios';
import PostData from '../data/posts.json';

const Graphs = () => {
  const handle = PostData.handle; 
    axios.get('http://localhost:5000/celebs/' + handle)
    .then(response => {
      console.log(response)
      this.setState({ celeb: response.data })
    })
    .catch((error) => {
      console.log(error);
    })

  const data = [
    { name: "Positive", users: 2000000000 },
    { name: "Negative", users: 1500000000 },
    
  ];
  
  return (
    <div style={{ textAlign: "center" }}>
      <div class = "Graph">
        <PieChart width={600} height={600}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={179}
            fill="#ff38f5"
            label
          />
          <Tooltip />
        </PieChart>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
    
      </div>
    </div>
  );
};

export default Graphs;