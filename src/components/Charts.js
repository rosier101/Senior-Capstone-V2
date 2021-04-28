import React, {Component} from 'react';
import {Pie, Bar} from 'react-chartjs-2'
import axios from 'axios';
import PostData from '../data/posts.json';

//const handle = PostData.handle; 

axios
      .get("https://ig-scraper-senior.herokuapp.com/search?celebhandle=@jakepaul")
      .then(res => {
        console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })

    const Charts = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        label: 'User Comments',
        backgroundColor: [
          '#36ff3c',
          '#C9DE00'
        ],
        hoverBackgroundColor: [
        '#166918',
        '#4B5000'
        ],
        data: [65, 59]
      }
    ]
  }

class Chart extends Component{
    render() {
        return (
          <div>
            <Pie
              data={Charts}
              width={500}
	          height={500}
              options={{
                maintainAspectRatio: false,
                title:{
                  display:true,
                  text:'Average Rainfall per month',
                  fontSize:20
                },
                legend:{
                  display:true,
                  position:'right'
                }
              }}
            />
          </div>
        );
      }
    }

export default Chart;