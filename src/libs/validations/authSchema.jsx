import * as yup from 'yup';

const authSchema = yup.object().shape({
  email: yup.string().email().required().label('email'),
  nama_depan: yup.string().required().label('nama_depan'),
  nama_belakang: yup.string().required().label('nama_belakang'),
  password: yup.string().required().label('password'),
  conf_password: yup
    .string()
    .required('Konfirmasi password dibutuhkan')
    .oneOf([yup.ref('password'), null], 'Password tidak cocok'),
});

export default authSchema;
