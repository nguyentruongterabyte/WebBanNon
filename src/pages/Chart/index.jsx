import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import reportApiCalls from '~/networking/reportApiCalls';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'DOANH THU THEO NĂM',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Chart() {
  const [revenue, setRevenue] = useState(labels.map(() => Math.random(100)));
  const [year, setYear] = useState(2023);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Doanh thu tháng',
        data: revenue,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  // console.log( revenue );

  const date = new Date();

  useEffect(() => {
    // fetch revenue of 12 month
    const fetchData = async () => {
      const data = await reportApiCalls.getRevenue(year);

      console.log(data);
      if (data.status === 200) {
        setRevenue(data.result.map((object) => Number(object.tong)));
      }
    };
    fetchData();
  }, [year]);

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Doanh thu tháng',
          data: revenue,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
  }, [revenue]);

  const renderYears = () => {
    const render = [];
    const currentYear = date.getFullYear();
    for (let i = 5; i >= 0; i--) {
      render.push(
        <option key={i} value={currentYear - i}>
          {currentYear - i}
        </option>,
      );
    }
    return render;
  };

  return (
    <div>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {renderYears()}
      </select>
      <Bar options={options} data={data} />
    </div>
  );
}
