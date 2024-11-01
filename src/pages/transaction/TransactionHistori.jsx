import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getTransactionHistoryApi } from '@/services/transactionServices';

const LIMIT = 5;

const TransactionHistori = () => {
  const [histories, setHistories] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getTransactionHistoryApi(offset, LIMIT);
        setHistories((prevHistories) => [...prevHistories, ...data.records]);
      } catch (err) {
        console.error('API error:', err);
        setError('Failed to load transactions.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [offset]);

  const handleShowMore = () => setOffset((prevOffset) => prevOffset + LIMIT);

  const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num);
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return (
      date
        .toLocaleString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Asia/Jakarta',
        })
        .replace(',', '') + ' WIB'
    );
  };

  return (
    <>
      <Layout />
      <div className="px-6 mx-auto mt-10 max-w-7xl md:px-20">
        <h2 className="mt-6 text-lg font-bold text-gray-700">
          Semua Transaksi
        </h2>

        {histories.map((history) => (
          <div
            key={history.invoice_number}
            className="flex items-center justify-between p-3 my-4 mb-2 border border-gray-200 rounded-lg"
          >
            <div>
              <p
                className={`text-lg font-bold ${
                  history.transaction_type === 'TOPUP'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {history.transaction_type === 'TOPUP' ? '+' : '-'} Rp
                {formatNumber(history.total_amount)}
              </p>
              <p className="text-sm text-gray-500">
                {formatDate(history.created_on)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold">{history.description}</p>
              <p className="text-xs text-gray-500">
                {history.transaction_type === 'TOPUP'
                  ? 'Top Up Saldo'
                  : 'Pembayaran'}
              </p>
            </div>
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-center mt-6 mb-10">
          <button
            onClick={handleShowMore}
            className="px-4 py-2 font-semibold text-red-500 transition-colors duration-300 rounded-md hover:bg-red-50"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show more'}
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionHistori;
