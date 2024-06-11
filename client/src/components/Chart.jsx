import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Saving', 'Expense', 'Investement'],
  datasets: [
    {
      label: '%',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],

      borderWidth: 1,
    },
  ],
};

const Chart = ({ type }) => {
  return (
    <div className="mx-auto  order-2 lg:order-none ">
      <Doughnut data={data} width={326} />
    </div>
  );
};

export default Chart;
