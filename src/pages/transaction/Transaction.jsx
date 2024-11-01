import Layout from '@/components/Layout';
import Modal from '@/components/modals/Modal';
import { TransactionApi } from '@/services/transactionServices';
import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineMoney } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

const Transaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedService } = location.state || {};

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const doTransaction = async () => {
    if (!selectedService) {
      setErrorMessage('No service selected.');
      return;
    }

    const transactionData = {
      service_code: selectedService.service_code,
    };

    try {
      const response = await TransactionApi(transactionData);
      if (response.status === 0) {
        setSuccessMessage(response.message);
        setErrorMessage('');
        setIsModalOpen(false);
        toast.success('Pembayaran Berhasil');
        navigate('/transaction-histori');
      }
    } catch (error) {
      setErrorMessage(error.message || 'Transaction failed.');
    }
  };

  const confirmPayment = async () => {
    await doTransaction();
  };

  return (
    <>
      <Layout />
      <div className="px-6 mx-auto mt-10 max-w-7xl md:px-20">
        <div className="my-10">
          <h1 className="mb-2 text-lg font-bold text-gray-700">PemBayaran</h1>
          <div className="flex items-center">
            {selectedService && (
              <img
                src={selectedService.service_icon}
                alt={`${selectedService.service_name} Icon`}
                className="w-8 h-8 mr-2 rounded-md"
              />
            )}
            <h1 className="text-xl font-bold">
              Tarif {selectedService?.service_name}
            </h1>
          </div>
        </div>
        <form
          className="flex flex-col w-full gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex items-center">
            <MdOutlineMoney
              className="absolute text-gray-400 left-3"
              size={24}
            />
            <input
              type="number"
              name="service_code"
              placeholder="Total Nominal"
              className="w-full py-2 pl-10 pr-4 border rounded focus:outline-none"
              value={selectedService ? selectedService.service_tariff : ''}
              readOnly
            />
          </div>

          <Button
            color="red"
            type="button"
            className="mt-4 capitalize"
            fullWidth
            onClick={() => setIsModalOpen(true)}
          >
            Bayar
          </Button>
        </form>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type="warn"
        description="Apakah Anda yakin ingin melakukan pembayaran?"
        cancelLabel="Tidak, batalkan"
        acceptLabel="Ya, saya yakin"
        onAccept={confirmPayment}
      />
    </>
  );
};

export default Transaction;
