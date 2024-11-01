import Input from '@/components/Inputs/Input';
import { loginUser } from '@/store/auth/authSlice';
import { logo } from '@assets/image';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success(result.message || 'Login Succses');
    } catch (err) {
      toast.error(err.message || 'Login Error');
    }
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
          <Input
            name="email"
            control={control}
            type="email"
            placeholder="masukkan email anda"
            icon={MdAlternateEmail}
            errorMessage={errors.email?.message}
          />
          <Input
            name="password"
            control={control}
            type="password"
            placeholder="buat password"
            icon={MdLockOutline}
            errorMessage={errors.password?.message}
          />
          <Button
            color="red"
            type="submit"
            className="capitalize"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Masuk'}
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
