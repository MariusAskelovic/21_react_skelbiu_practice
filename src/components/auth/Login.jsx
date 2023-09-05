import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const auth = getAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('invalid email address')
        .required('email is required'),
      password: Yup.string().required('password is required'),
    }),
    onSubmit: async (values) => {
      //   console.log(values);
      await signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log('user ===', user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ' ' + errorMessage);
        });
    },
  });

  return (
    <div className=''>
      <form
        className='w-[500px] bg-slate-100 p-3'
        onSubmit={formik.handleSubmit}
      >
        <div className='flex gap-2 mb-2'>
          <div className='flex flex-col'>
            <input
              className='border shadow-lg p-1 w-full'
              type='email'
              placeholder='email'
              id='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <p className='text-md text-red-500'>{formik.errors.email}</p>
            )}
          </div>
          <div className='flex flex-col'>
            <input
              className='border shadow-lg p-1 w-full'
              type='password'
              placeholder='password'
              id='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <p className='text-md text-red-500'>{formik.errors.password}</p>
            )}
          </div>
        </div>
        <div className='flex gap-2'>
          <button
            className='bg-slate-500 text-white m-1 py-1 px-3 w-full uppercase text-xs font-bold'
            type='submit'
          >
            Log In
          </button>
          <button
            className='bg-slate-500 text-white m-1 py-1 px-3 w-full uppercase text-xs font-bold'
            onClick={formik.handleReset}
          >
            Restore
          </button>
        </div>
      </form>
    </div>
  );
}
