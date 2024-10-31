import { logo } from '@assets/image';
import { Button } from '@material-tailwind/react';
import React from 'react';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '@/libs/validations/auth';
import Input from '@/components/Inputs/Input';
import { Link } from 'react-router-dom';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = (data) => {
    console.log('Form Data:', data);
  };

  return (
    <main className="min-h-screen md:flex font-inter">
      <section className="flex flex-col items-center justify-center w-full h-screen p-4 bg-white md:px-12 lg:px-24 md:w-1/2">
        <header className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Logo SIMS PPOB" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </header>
        <h2 className="mb-8 text-2xl font-bold text-center sm:px-16">
          Masuk atau buat akun untuk memulai
        </h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Masukkan email anda"
                icon={MdAlternateEmail}
                errorMessage={errors.email?.message}
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
                placeholder="Buat password"
                icon={MdLockOutline}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button color="red" type="submit" className="capitalize" fullWidth>
            Masuk
          </Button>

          <p className="text-center">
            belum punya akun? registrasi{' '}
            <Link to="/register" className="font-semibold text-red-500">
              di sini
            </Link>
          </p>
        </form>
      </section>
      <section className="hidden md:block md:w-1/2">
        <div className="flex flex-col justify-center min-h-screen bg-[url('/assets/image/Illustrasi_Login.png')] bg-center bg-no-repeat md:bg-cover bg-contain" />
      </section>
    </main>
  );
};

export default Login;
