import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../store/AuthProvider';

export default function CreateAd() {
  const ctx = useAuth();

  const formik = useFormik({
    initialValues: {
      title: '',
      price: '',
      stock: '',
      brand: '',
      category: '',
      photoURL: '',
      tags: '',
      description: '',
      userId: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Title must have at least 3 symbols')
        .max(20, 'Title can be up to 20 symbols lenght')
        .required('This field is required'),
      price: Yup.number()
        .min(0.01, 'Enter price')
        .max(10000, 'We cannot handle prices higher than 10.000€')
        .required('This field is required'),
      stock: Yup.number()
        .min(1, 'Only in stock ADs accepted')
        .max(999, 'In case you have unlimited stock, enter 999')
        .required('This field is required'),
      brand: Yup.string()
        .max(20, 'Max 20 symbols')
        .required('This field is required'),
      category: Yup.string(),
      photoURL: Yup.string(),
      tags: Yup.string(),
      description: Yup.string().max(200, 'Max 200 symbols'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const newObj = {
        ...values,
        userId: ctx.userUid,
      };
      sendAd(newObj);
    },
  });

  async function sendAd(dataToSend) {
    console.log('e ===', dataToSend);
    try {
      const docRef = await addDoc(collection(db, 'ads-collection'), dataToSend);
      console.log('New Ad Made: ', docRef.id);
    } catch (error) {
      console.log('Error while creating an Ad :', error);
    }
  }

  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4 ml-20'>CreateAd</h1>
      <form
        className='flex flex-col max-w-3xl ml-20 shadow-lg'
        onSubmit={formik.handleSubmit}
      >
        <div className='bg-gradient-to-l from-slate-700 from-30% to-white p-4 grid grid-cols-2 gap-4'>
          <div className='flex flex-col justify-between align-middle gap-2'>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='title'>
                Title
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='title'
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='price'>
                Price
              </label>
              <input
                className='w-full pl-2 rounded-r-lg text-'
                type='text'
                id='price'
                onChange={formik.handleChange}
                value={formik.values.price}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='stock'>
                Stock
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='stock'
                onChange={formik.handleChange}
                value={formik.values.stock}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='brand'>
                Brand
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='brand'
                onChange={formik.handleChange}
                value={formik.values.brand}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='category'>
                Category
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='category'
                onChange={formik.handleChange}
                value={formik.values.category}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='photoURL'>
                Photo URL
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='photoURL'
                onChange={formik.handleChange}
                value={formik.values.photoURL}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className='flex w-full'>
              <label className='w-32 pl-2 uppercase text-sm' htmlFor='tags'>
                Tags
              </label>
              <input
                className='w-full pl-2 rounded-r-lg'
                type='text'
                id='tags'
                onChange={formik.handleChange}
                value={formik.values.tags}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>
          <textarea
            className='resize-none rounded-md ml-3 p-3 text-lg'
            placeholder='Enter Ad description here'
            name='description'
            id='description'
            cols='20'
            rows='6'
            onChange={formik.handleChange}
            value={formik.values.description}
            onBlur={formik.handleBlur}
          ></textarea>
        </div>
        <div className='flex items-center'>
          <button
            type='submit'
            className='bg-slate-700 pb-[0.7rem] p-2  text-white border-4 border-white w-full'
          >
            {`<<< Add an AD >>>`}
          </button>
          <button
            onClick={formik.handleReset}
            className='bg-slate-500 mr-1 p-2 text-white border-4 border-slate-500 w-20 uppercase text-sm'
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
