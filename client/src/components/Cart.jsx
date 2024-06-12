import {
  Banknote,
  CircleDollarSign,
  FileText,
  MapPin,
  Pencil,
  Trash2,
} from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { DELETE_TRANSACTION } from '../graphql/mutations/transaction.query';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import { formatDate } from '../utlis/formatDate';
const Cart = ({ data, authUser }) => {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: ['GetTransactions', 'GetTransactionStatistics'],
  });
  const handleDelete = async () => {
    try {
      await deleteTransaction({
        variables: { transactionId: data._id },
      });
      toast.success('Transaction deleted successfully');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="">
      <div
        className={`max-w-sm mx-auto w-full p-6  ${
          data?.category == 'saving'
            ? 'bg-green-500'
            : data?.category == 'expense'
            ? 'bg-red-500'
            : 'bg-indigo-500'
        } border-gray-190 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-white font-semibold text-lg">{data?.category}</h2>
          <div className="flex items-center gap-2">
            <Trash2 size={19} color="white" onClick={handleDelete} />
            <Link to={`/transaction/${data._id}`}>
              <Pencil size={19} color="white" />
            </Link>
          </div>
        </div>
        <div className="mb-3 ">
          <div className="flex items-center gap-2 text-white">
            <FileText size={19} color="white" />
            <p>Discription:</p>
            <p>{data?.description}</p>
          </div>
        </div>
        <div className="mb-3 ">
          <div className="flex items-center gap-2 text-white">
            <Banknote size={19} color="white" />
            <p>PaymentType:</p>
            <p>{data?.paymentType}</p>
          </div>
        </div>
        <div className="mb-3 ">
          <div className="flex items-center gap-2 text-white">
            <CircleDollarSign size={19} color="white" />
            <p>Ammoun:</p>
            <p>{data?.amount}</p>
          </div>
        </div>
        <div className="mb-3 ">
          <div className="flex items-center gap-2 text-white">
            <MapPin size={19} color="white" />
            <p>Location:</p>
            <p>{data?.location}</p>
          </div>
        </div>
        <div className="mb-3 ">
          <div className="flex items-center justify-between text-white">
            <p className="text-black font-medium">{formatDate(data?.date)}</p>
            <img
              src={authUser.profilePicture}
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
