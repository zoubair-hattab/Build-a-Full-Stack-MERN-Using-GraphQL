import { useQuery } from '@apollo/client';
import Cart from '../components/Cart';
import Chart from '../components/Chart';
import TransactionForm from '../components/TransactionForm';
import {
  GET_TRANSACTIONS,
  GET_TRANSACTION_STATISTICS,
} from '../graphql/queries/transaction.query';
import {
  GET_AUTHENTICATED_USER,
  GET_USER_AND_TRANSACTIONS,
} from '../graphql/queries/user.query';

const HomePage = () => {
  const { data, loading } = useQuery(GET_TRANSACTIONS);
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
    variables: {
      userId: authUser?.authUser?._id,
    },
  });
  const { data: statisticsTransaction } = useQuery(GET_TRANSACTION_STATISTICS);
  console.log(statisticsTransaction);
  return (
    <div className="container">
      <div className="mx-auto flex  flex-wrap gap-4">
        <Chart info={statisticsTransaction} />
        <TransactionForm />
      </div>
      <div className="mt-5 mx-auto">
        <h2 className="text-3xl mb-6 font-bold text-center">History</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {data?.transactions?.map((item) => (
            <>
              <Cart key={item._id} data={item} authUser={authUser.authUser} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
