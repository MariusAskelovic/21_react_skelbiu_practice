import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [adsDbArr, setAdsDbArr] = useState([]);

  useEffect(() => {
    getAds();
  }, []);

  async function getAds() {
    const querySnapshot = await getDocs(collection(db, 'ads-collection'));
    const newArr = [];
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id);
      //   console.log(doc.data());
      const id = doc.id;
      const data = doc.data();
      newArr.push({ ...data, id: id });
    });
    setAdsDbArr(newArr);
  }

  return (
    <div className='container mb-10'>
      <h1 className='text-3xl mb-4 pt-4'>HomePage</h1>
      <ul className='flex gap-x-8 gap-y-16 flex-wrap justify-between'>
        {adsDbArr.map((adObj) => (
          <li
            className='flex flex-col justify-between h-[440px] w-[280px]'
            key={adObj.id}
          >
            <img
              loading='lazy'
              className='h-full object-cover mb-5 rounded-xl'
              src={adObj.photoURL}
              alt={adObj.title}
            />
            <div className='flex justify-between items-center'>
              <div>
                <h3 className='font-bold text-xs'>{adObj.title}</h3>
                <p className='text-xs text-gray-800'>{adObj.brand}</p>
              </div>
              <p className='bg-gray-100 text-sm py-2 px-4 rounded-md'>
                ${adObj.price}.00
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
