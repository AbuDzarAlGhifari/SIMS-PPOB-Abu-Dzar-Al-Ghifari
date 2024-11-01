import { getBalanceApi } from '@/services/informationServices';
import { getProfileApi } from '@/services/profileServices';
import { profile_photo } from '@assets/image';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Header = () => {
  const [profileData, setProfileData] = useState(null);
  const [balance, setBalance] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchBalance = async () => {
    try {
      const response = await getBalanceApi();
      const fetchedBalance = response?.data?.data?.balance;
      if (fetchedBalance !== undefined) {
        setBalance(fetchedBalance);
      }
    } catch {
      console.error('Failed to get balance. Please try again.');
    }
  };

  const fetchProfile = async () => {
    try {
      const data = await getProfileApi();
      setProfileData(data.data);
    } catch {
      console.error('Token tidak valid atau kadaluwarsa.');
    }
  };

  useEffect(() => {
    fetchBalance();
    fetchProfile();
  }, []);

  return (
    <div className="px-6 mx-auto max-w-7xl md:px-20">
      <div className="grid grid-cols-12 gap-6 mt-6">
        <section className="col-span-12 gap-3 md:col-span-5 md:items-start">
          <div className="flex items-center justify-center gap-4 sm:block">
            <img
              src={
                profileData?.profile_image &&
                !profileData.profile_image.endsWith('/null')
                  ? profileData.profile_image
                  : profile_photo
              }
              alt="Profile"
              className="object-cover w-20 h-20 rounded-full"
            />

            <div>
              <h2 className="mt-6 text-lg font-bold text-gray-700">
                Selamat datang,
              </h2>
              {profileData && (
                <h2 className="text-2xl font-bold sm:text-3xl">
                  {profileData.first_name} {profileData.last_name}
                </h2>
              )}
            </div>
          </div>
        </section>

        <section className="col-span-12 md:col-span-7">
          <div className="flex flex-col justify-between w-full gap-2 p-6 text-white rounded-2xl bg-[url('/assets/image/Background_Saldo.png')] bg-cover h-full bg-center">
            <p className="text-sm">Saldo anda</p>
            <div className="flex items-center gap-1">
              <p className="text-4xl font-semibold">
                Rp {isVisible ? balance?.toLocaleString() : '●●●●●●●'}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm bg-[#F13B2F] w-fit">
              <span>{isVisible ? 'Tutup Saldo' : 'Lihat Saldo'}</span>
              <button
                onClick={() => setIsVisible(!isVisible)}
                className="text-center"
              >
                {isVisible ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Header;
