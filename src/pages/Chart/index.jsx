import { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import reportApiCalls from '~/networking/reportApiCalls';
import './Chart.css'; // Import file CSS

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export const barOptions = {
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

export const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'SỐ LƯỢNG SẢN PHẨM TỒN KHO',
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
  const [products, setProducts] = useState([]);
  const [year, setYear] = useState(2023);
  const [barData, setBarData] = useState({
    labels,
    datasets: [
      {
        label: 'Doanh thu tháng',
        data: revenue,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Số lượng tồn kho',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const date = new Date();

  useEffect(() => {
    // Fetch revenue of 12 months
    const fetchRevenue = async () => {
      const data = await reportApiCalls.getRevenue(year);

      if (data.status === 200) {
        setRevenue(data.result.map((object) => Number(object.tong)));
      }
    };

    // Fetch product inventory data
    const fetchProducts = async () => {
      const data = await reportApiCalls.getMostProducts(year);

      if (data.status === 200) {
        setProducts(data.result);
      }
    };

    fetchRevenue();
    fetchProducts();
  }, [year]);

  useEffect(() => {
    setBarData({
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

  useEffect(() => {
    const productLabels = products.map((product) => product.tenSanPham);
    const productData = products.map((product) => Number(product.tongSoLuong));
    const productColors = products.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255,
        )}, 0.5)`,
    );

    setPieData({
      labels: productLabels,
      datasets: [
        {
          label: 'Số lượng tồn kho',
          data: productData,
          backgroundColor: productColors,
        },
      ],
    });
  }, [products]);

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
      <Bar options={barOptions} data={barData} />
      <div className="small-pie-container">
        <Pie options={pieOptions} data={pieData} />
      </div>
    </div>
  );
}
