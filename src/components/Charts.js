import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import axios from "axios";

const Charts = () => {
  const [chartData, setChartData] = useState({});
  const [handle, setHandle] = useState([]);
 

  const chart = () => {
    let empSal = [];
    let empAge = [];
    axios
      .get("http://dummy.restapiexample.com/api/v1/employees")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data.data) {
          empSal.push(parseInt(dataObj.employee_salary));
          empAge.push(parseInt(dataObj.employee_age));
        }
        setChartData({
          labels: empAge,
          datasets: [
            {
              label: "percentage",
              data: empSal,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  return (
    <div className="App">
      <h1>Users</h1>
      <div>
        <Line
          data={chartData}
          width={500}
	          height={500}
              options={{
                maintainAspectRatio: false,
            responsive: true,
            title: { text: "SCALE", display: true },
            
                
              
            
          }}
        />
      </div>
    </div>
  );
};

export default Charts;