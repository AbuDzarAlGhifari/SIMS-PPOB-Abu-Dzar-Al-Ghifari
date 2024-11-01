import Layout from '@/components/Layout';
import Modal from '@/components/modals/Modal';
import { topUpApi } from '@/services/transactionServices';
import {
  resetTopUp,
  setError,
  setInputAmount,
  setInvoiceNumber,
  setTopUpAmount,
  toggleModal,
} from '@/store/transaction/topUpSlice';
import { Button } from '@material-tailwind/react';
import toast from 'react-hot-toast';
import { MdOutlineMoney } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MIN_AMOUNT = 10000;
const MAX_AMOUNT = 1000000;
const formatNumber = (num) => new Intl.NumberFormat('id-ID').format(num);

const TopUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { inputAmount, topUpAmount, error, isModalOpen } = useSelector(
    (state) => state.topUp
  );

  const handleInputChange = (event) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    dispatch(setInputAmount(rawValue));
    dispatch(setTopUpAmount(Number(rawValue)));
    dispatch(setError(''));
  };

  const handleAmountSelection = (amount) => {
    dispatch(setInputAmount(formatNumber(amount)));
    dispatch(setTopUpAmount(amount));
    dispatch(setError(''));
  };

  const initiateTopUp = () => {
    if (topUpAmount < MIN_AMOUNT || topUpAmount > MAX_AMOUNT) {
      dispatch(
        setError(`Amount must be between Rp${MIN_AMOUNT} and Rp${MAX_AMOUNT}`)
      );
      return;
    }
    dispatch(toggleModal());
  };

  const confirmPayment = async () => {
    try {
      const { invoiceNumber } = await topUpApi(topUpAmount);
      dispatch(setInvoiceNumber(invoiceNumber));
      dispatch(toggleModal());
      toast.success('Top up Berhasil');
      navigate('/transaction-histori');
      dispatch(resetTopUp());
    } catch (err) {
      dispatch(
        setError(
          err.response?.data?.message || 'Top-up failed. Please try again.'
        )
      );
      dispatch(toggleModal());
    }
  };

  return (
    <>
      <Layout />
      <div className="px-6 mx-auto max-w-7xl md:px-20">
        <div className="my-10">
          <h2 className="mt-6 text-lg font-bold text-gray-700">
            Silakan masukan
          </h2>
          <h2 className="text-2xl font-bold sm:text-3xl">Nominal Top Up</h2>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full sm:col-span-7">
            <div className="relative flex items-center">
              <MdOutlineMoney
                className="absolute text-gray-400 left-3"
                size={24}
              />
              <input
                type="text"
                placeholder="Masukkan nominal top up"
                className="w-full py-2 pl-10 pr-4 border rounded focus:outline-none"
                value={inputAmount}
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
            <Button
              color="gray"
              type="button"
              className="mt-4 capitalize"
              fullWidth
              onClick={initiateTopUp}
              disabled={
                !inputAmount ||
                topUpAmount < MIN_AMOUNT ||
                topUpAmount > MAX_AMOUNT
              }
            >
              Top Up
            </Button>
          </div>
          <div className="pb-4 col-span-full sm:col-span-5">
            <div className="grid grid-cols-3 col-span-1 gap-4">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelection(amount)}
                  className={`border rounded py-2 w-full flex justify-center items-center ${
                    topUpAmount === amount
                      ? 'bg-gray-500 text-white'
                      : 'text-gray-500'
                  } hover:bg-gray-100 overflow-hidden`}
                  style={{ maxWidth: '120px' }}
                >
                  Rp{formatNumber(amount)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => dispatch(toggleModal())}
        type="warn"
        description="Are you sure you want to top up?"
        cancelLabel="No, cancel"
        acceptLabel="Yes, I'm sure"
        onAccept={confirmPayment}
      />
    </>
  );
};

export default TopUp;
