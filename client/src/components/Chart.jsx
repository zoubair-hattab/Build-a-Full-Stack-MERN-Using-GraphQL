import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = ({ info }) => {
  console.log(info);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '$',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  });

  useEffect(() => {
    if (info?.categoryStatistics) {
      const categories = info.categoryStatistics.map((stat) => stat.category);
      const totalAmounts = info.categoryStatistics.map(
        (stat) => stat.totalAmount
      );

      const backgroundColors = [];
      const borderColors = [];

      categories.forEach((category) => {
        if (category === 'saving') {
          backgroundColors.push('rgba(75, 192, 192)');
          borderColors.push('rgba(75, 192, 192)');
        } else if (category === 'expense') {
          backgroundColors.push('rgba(255, 99, 132)');
          borderColors.push('rgba(255, 99, 132)');
        } else if (category === 'investment') {
          backgroundColors.push('rgba(54, 162, 235)');
          borderColors.push('rgba(54, 162, 235)');
        }
      });

      setChartData((prev) => ({
        labels: categories,
        datasets: [
          {
            ...prev.datasets[0],
            data: totalAmounts,
            backgroundColor: backgroundColors,
            borderColor: borderColors,
          },
        ],
      }));
    }
  }, [info]);

  return (
    <div className="mx-auto  order-2 lg:order-none ">
      <Doughnut data={chartData} width={326} />
    </div>
  );
};

export default Chart;
