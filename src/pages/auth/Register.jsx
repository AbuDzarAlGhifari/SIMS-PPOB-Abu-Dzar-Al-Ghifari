import Input from '@/components/Inputs/Input';
import { authSchema } from '@/libs/validations';
import { registerUser } from '@/store/auth/authSlice';
import { updateForm } from '@/store/auth/registerSlice';
import { logo } from '@assets/image';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-tailwind/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaRegUser } from 'react-icons/fa';
import { MdAlternateEmail, MdLockOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(authSchema),
  });

  const handleChange = (name, value) => dispatch(updateForm({ name, value }));

  const onSubmit = async (data) => {
    const requestData = {
      email: data.email,
      first_name: data.nama_depan,
      last_name: data.nama_belakang,
      password: data.password,
    };

    try {
      await dispatch(registerUser(requestData)).unwrap();
      toast.success(message || 'Registration successful');
      navigate('/');
    } catch (err) {
      toast.error(err?.message || error || 'Registration failed');
    }
  };

  return (
    <main className="min-h-screen md:flex font-inter">
      <section className="flex flex-col items-center justify-center w-full min-h-screen p-4 bg-white md:px-12 lg:px-24 md:w-1/2">
        <header className="flex items-center justify-center gap-2 mb-8">
          <img src={logo} alt="Logo SIMS PPOB" />
          <h1 className="text-xl font-bold">SIMS PPOB</h1>
        </header>
        <h2 className="mb-8 text-2xl font-bold text-center sm:px-14">
          Lengkapi data untuk membuat akun
        </h2>

        <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="email"
            control={control}
            type="email"
            placeholder="masukkan email anda"
            icon={MdAlternateEmail}
            errorMessage={errors.email?.message}
            onChange={handleChange}
          />
          <Input
            name="nama_depan"
            control={control}
            type="text"
            placeholder="nama depan"
            icon={FaRegUser}
            errorMessage={errors.nama_depan?.message}
            onChange={handleChange}
          />
          <Input
            name="nama_belakang"
            control={control}
            type="text"
            placeholder="nama belakang"
            icon={FaRegUser}
            errorMessage={errors.nama_belakang?.message}
            onChange={handleChange}
          />
          <Input
            name="password"
            control={control}
            type="password"
            placeholder="buat password"
            icon={MdLockOutline}
            errorMessage={errors.password?.message}
            onChange={handleChange}
          />
          <Input
            name="conf_password"
            control={control}
            type="password"
            placeholder="konfirmasi password"
            icon={MdLockOutline}
            errorMessage={errors.conf_password?.message}
            onChange={handleChange}
          />

          <Button
            color="red"
            type="submit"
            className="capitalize"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Registrasi'}
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
