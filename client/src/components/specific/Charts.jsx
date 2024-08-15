import React from 'react'
import {Line , Doughnut} from "react-chartjs-2";
import { Chart as ChartJS , CategoryScale , Tooltip ,Filler , LinearScale , PointElement , LineElement , ArcElement , Legend, plugins, scales } from 'chart.js';
import { doughtChartFirstColor, doughtChartSecondColor, doughtHoverFirst, doughtHoverSecond, graphLightPurpleColor, graphPurpleColor } from '../../constants/color';
import { getLast7Days } from '../../lib/features';

ChartJS.register(Tooltip , CategoryScale , LinearScale , LineElement , PointElement , Filler , ArcElement , Legend);

const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins:{
        legend:{
            display:false,
        },
        title:{
            display:false,
        }
    },
    scales:{
        x:{
            grid:{display:false}
        },
        y:{
            beginAtZero:true,
            grid:{display:false}
        }
    }
};

const LineChart = ({value=[]}) => {

    const data = {
        labels,
        datasets:[{
            data:value,
            label:"Revenue",
            fill:true,
            backgroundColor:graphLightPurpleColor,
            borderColor:graphPurpleColor
        }]
    }

    return <Line data={data} options={lineChartOptions}/>
};


const doughnutChartOptions = {
    responsive:true,
    plugins:{
        legend:{display:false},
    },
    cutout:120,
}

const DoughnutChart = ({ value = [] , labels = [] }) => {

    const data = {
        labels,
        datasets:[
            {
                data:value,               
                label:"Total Chats vs Group Chats",
                backgroundColor:[doughtChartFirstColor, doughtChartSecondColor],
                borderColor:[doughtChartFirstColor, doughtChartSecondColor],
                hoverBackgroundColor:[doughtHoverFirst , doughtHoverSecond],  
                offset: 40,
            }
        ]
    }

    return <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>
};

export {LineChart , DoughnutChart}