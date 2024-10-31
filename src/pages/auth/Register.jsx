import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-tailwind/react';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import { FaRegUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { registerUser } from '@/services/authService';
import { authSchema } from '@/libs/validations/auth';
import Input from '@/components/Inputs/Input';
import { updateForm } from '@/store/registerSlice';
import { logo } from '@assets/image';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const dispatch = useDispatch();
  const registerData = useSelector((state) => state.register);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
    defaultValues: registerData,
  });

  const handleChange = (name, value) => dispatch(updateForm({ name, value }));

  const onSubmit = async (data) => {
    try {
      const requestData = {
        email: data.email,
        first_name: data.nama_depan,
        last_name: data.nama_belakang,
        password: data.password,
      };
      const result = await registerUser(requestData);

      toast.success(result.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen md:flex font-inter">
      <Toaster position="top-center" reverseOrder={false} />
      <section className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-white md:px-12 lg:px-24 md:w-1/2">
        <header className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Logo SIMS PPOB" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </header>
        <h2 className="mb-8 text-2xl font-bold text-center sm:px-14">
          Lengkapi data untuk membuat akun
        </h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="masukkan email anda"
                icon={MdAlternateEmail}
                errorMessage={errors.email?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange('email', e.target.value);
                }}
              />
            )}
          />

          <Controller
            name="nama_depan"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="nama depan"
                icon={FaRegUser}
                errorMessage={errors.nama_depan?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange('nama_depan', e.target.value);
                }}
              />
            )}
          />

          <Controller
            name="nama_belakang"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="nama belakang"
                icon={FaRegUser}
                errorMessage={errors.nama_belakang?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange('nama_belakang', e.target.value);
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="buat password"
                icon={MdLockOutline}
                errorMessage={errors.password?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange('password', e.target.value);
                }}
              />
            )}
          />

          <Controller
            name="conf_password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="konfirmasi password"
                icon={MdLockOutline}
                errorMessage={errors.conf_password?.message}
                onChange={(e) => {
                  field.onChange(e);
                  handleChange('conf_password', e.target.value);
                }}
              />
            )}
          />

          <Button color="red" type="submit" className="capitalize" fullWidth>
            Registrasi
          </Button>

          <p className="text-center">
            sudah punya akun? login{' '}
            <Link to="/" className="font-semibold text-red-500">
              di sini
            </Link>
          </p>
        </form>
      </section>
      <section className="hidden min-h-screen md:block md:w-1/2">
        <div className="flex flex-col justify-center h-full bg-[url('/assets/image/Illustrasi_Login.png')] bg-center bg-no-repeat md:bg-cover bg-contain" />
      </section>
    </main>
  );
};

export default Register;
