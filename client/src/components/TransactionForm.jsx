import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_TRANSACTION } from '../graphql/mutations/transaction.query';
import toast from 'react-hot-toast';

const TransactionForm = () => {
  const [transactionData, setTransactionDate] = useState({});
  const handleChangeInput = (e) => {
    setTransactionDate({ ...transactionData, [e.target.id]: e.target.value });
  };
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: ['GetTransactions', 'GetTransactionStatistics'],
  });

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction({
        variables: {
          input: {
            ...transactionData,
            amount: parseFloat(transactionData?.amount),
          },
        },
      });

      setTransactionDate({});
      toast.success('Transaction created successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <form
      onSubmit={handleSumbit}
      className="max-w-sm md:max-w-sm lg:max-w-xl md:mx-0 mx-auto order-1 md:order-none self-start  bg-gray-50 w-full p-6   rounded-md border border-gray-200"
    >
      <div className="mb-5">
        <h2 className="text-center text-2xl font-semibold">
          Create a transaction
        </h2>
      </div>
      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Transactions
        </label>
        <input
          type="text"
          id="description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="description"
          onChange={handleChangeInput}
          value={transactionData?.description || ''}
        />
      </div>
      <div className="grid gap-3 mb-5 md:grid-cols-3">
        <div>
          <label
            htmlFor="paymentType"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Payment type
          </label>
          <select
            onChange={handleChangeInput}
            id="paymentType"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transactionData?.paymentType || ''}
          >
            <option defaultValue>Choose a Payment</option>
            <option value="card">Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          <select
            id="category"
            onChange={handleChangeInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={transactionData?.category || ''}
          >
            <option defaultValue>Choose a category</option>
            <option value="saving">Saving</option>
            <option value="expense">Expense</option>
            <option value="investment">investment</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount($)
          </label>
          <input
            type="number"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="150$"
            onChange={handleChangeInput}
            value={transactionData?.amount || ''}
          />
        </div>
      </div>
      <div className="grid gap-3 mb-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="location"
            onChange={handleChangeInput}
            value={transactionData?.location || ''}
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChangeInput}
            value={transactionData?.date || ''}
          />
        </div>
      </div>
      <button
        disabled={loading}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {loading ? 'Loading...' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
