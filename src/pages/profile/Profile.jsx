import InputProfile from '@/components/Inputs/InputProfile';
import Navbar from '@/components/Navbar';
import {
  getProfileApi,
  updateProfileApi,
  updateProfileImageApi,
} from '@/services/profileServices';
import { profile_photo } from '@assets/image';
import { Button } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiEdit2 } from 'react-icons/fi';
import { MdEmail } from 'react-icons/md';

const Profile = () => {
  const inputRef = useRef(null);

  const handleIconClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const DEFAULT_IMAGE = profile_photo;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await getProfileApi();
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);

        const isValidImage =
          data.profile_image && !data.profile_image.endsWith('/null');
        setProfileImage(isValidImage ? data.profile_image : DEFAULT_IMAGE);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };
    fetchProfile();
  }, []);

  const onSubmit = async () => {
    if (!isEditMode) {
      setIsEditMode(true);
      return;
    }

    try {
      const updatedData = {
        first_name: firstName,
        last_name: lastName,
      };
      const response = await updateProfileApi(updatedData);
      toast.success(response.message || 'Profile updated successfully!');
      setIsEditMode(false);
    } catch (error) {
      toast.error(error.message || 'Failed to update profile');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    toast.success('logout sucsess');
    window.location.reload();
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.size > 100 * 1024) {
      toast.error('Ukuran gambar maksimal 100 KB');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await updateProfileImageApi(formData);
      setProfileImage(response.data.profile_image);
      toast.success(response.message || 'Profile image updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Failed to update profile image');
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen">
        <div className="mt-12">
          <div className="relative w-24 h-24">
            <img
              src={profileImage || DEFAULT_IMAGE}
              alt="Profile"
              className="w-full h-full border-2 border-gray-300 rounded-full"
            />

            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              ref={inputRef}
              className="absolute bottom-0 right-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div
              className="absolute bottom-0 right-0 p-1 bg-white border rounded-full"
              onClick={handleIconClick}
            >
              <FiEdit2 size={14} className="text-gray-600" />
            </div>
          </div>
        </div>

        <h1 className="mt-4 text-2xl font-semibold text-gray-800">
          {`${firstName} ${lastName}`}
        </h1>

        <form
          className="w-full px-4 mt-8 sm:px-0 sm:max-w-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputProfile
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            icon={MdEmail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            errorMessage={errors.email?.message}
            readOnly
          />
          <InputProfile
            name="firstName"
            type="text"
            label="Nama Depan"
            placeholder="Nama Depan"
            icon={MdEmail}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            errorMessage={errors.firstName?.message}
            readOnly={!isEditMode}
          />
          <InputProfile
            name="lastName"
            type="text"
            label="Nama Belakang"
            placeholder="Nama Belakang"
            icon={MdEmail}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            errorMessage={errors.lastName?.message}
            readOnly={!isEditMode}
          />

          <div className="w-full mt-6">
            <Button
              type="submit"
              variant={isEditMode ? 'contained' : 'outlined'}
              className={`w-full py-2 mb-3 rounded-md ${
                isEditMode
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'text-red-500 border border-red-500 hover:bg-red-100'
              }`}
            >
              {isEditMode ? 'Simpan' : 'Edit Profile'}
            </Button>

            {!isEditMode && (
              <Button
                type="button"
                className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
