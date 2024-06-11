import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import Chart from '../components/Chart';
import TransactionForm from '../components/TransactionForm';
import { GET_TRANSACTIONS } from '../graphql/queries/transaction.query';

const HomePage = () => {
  const { loading, data, error } = useQuery(GET_TRANSACTIONS);
  console.log(data?.transactions);
  return (
    <div className="container">
      <div className="mx-auto flex  flex-wrap gap-4">
        <Chart />
        <TransactionForm />
      </div>
      <div className="mt-5 mx-auto">
        <h2 className="text-3xl mb-6 font-bold text-center">History</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {data?.transactions?.map((item) => (
            <>
              <Cart data={item} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
