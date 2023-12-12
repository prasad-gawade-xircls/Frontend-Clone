import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Polar = () => {
    const options = {
        series: [14, 23, 21, 17, 15],
        chart: {
            type: 'polarArea',
        },
        stroke: {
            colors: ['#fff'],
        },
        fill: {
            opacity: 1,
            colors: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb']
        },
        legend: {
            position: 'bottom',
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            labels: {
                fontSize: 'px',
                fontFamily: 'Helvetica, Arial',
                fontWeight: 400,
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: ['#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb'],
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom'
                    },
                },
            },
        ],
    }

    return (
        <div>
            <ReactApexChart options={options} series={options.series} type="polarArea" height={400} />
        </div>
    )
}

export default Polar
