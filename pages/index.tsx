import type { NextPage } from 'next';
import { Header, Footer, Wrapper } from '../components';
import { useGetAllOrdersQuery, OrderStatus } from '../src/generated/graphql';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const Home: NextPage = () => {
  const { data, loading, error } = useGetAllOrdersQuery({
    variables: {
      limit: 9999999,
      page: 0,
    },
  });
  const labels = [
    'Checked',
    'Impression Evaluation',
    'Modeled',
    'Modelling',
    'Mounting',
    'Placed',
    'Printed',
    'Printing',
    'Shipped',
  ];

  const allOrders = data?.getAllOrders?.orders;

  const CheckedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Checked
  ).length;

  const ImpressionEvaluationOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.ImpressionEvaluation
  ).length;

  const ModeledOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Modeled
  ).length;

  const ModellingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Modelling
  ).length;

  const MountingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Mounted
  ).length;

  const PlacedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Placed
  ).length;

  const PrintedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Printed
  ).length;

  const PrintingOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Printing
  ).length;
  const ShippedOrders = allOrders?.filter(
    (item) => item?.status === OrderStatus.Shipped
  ).length;

  const pieData = {
    labels,
    datasets: [
      {
        data: [
          CheckedOrders,
          ImpressionEvaluationOrders,
          ModeledOrders,
          ModellingOrders,
          MountingOrders,
          PlacedOrders,
          PrintedOrders,
          PrintingOrders,
          ShippedOrders,
        ],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
          'rgb(65,105,225)',
          'rgb(144,238,144)',
          'rgb(238,130,238)',
          'rgb(255,127,80)',
          'rgb(139,0,139)',
          'rgb(244,164,96)',
        ],
        hoverOffset: 4,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        // position: 'bottom' as const,
        display: false,
      },
      title: {
        display: false,
        text: 'Orders Per Status',
      },
    },
  };

  return (
    <div>
      <Header />
      <Wrapper
        loading={loading}
        classes="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl pb-20 lg:max-w-7xl"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-1">
            <h1 className="text-2xl font-semibold text-gray-700 text-center py-4">
              Orders Per Status
            </h1>
            <Bar options={options} data={pieData} className={'rounded-lg '} />
          </div>
          <div className="col-span-1"></div>
        </div>
      </Wrapper>
      <Footer />
    </div>
  );
};

export default Home;
