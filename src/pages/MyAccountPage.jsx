import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyAccountPage() {
  const [filteredDbData, setFilteredDbData] = useState([]);
  const ctx = useAuth();
  useEffect(() => {
    queryDataFn();
  }, []);

  async function queryDataFn() {
    const adDbRef = collection(db, 'ads-collection');
    const queryData = query(adDbRef, where('userId', '==', ctx.userUid));
    const querySnapshot = await getDocs(queryData);
    const newArr = [];
    querySnapshot.forEach((doc) => {
      const tempData = doc.data();
      const id = doc.id;
      newArr.push({
        ...tempData,
        id: id,
      });
    });
    setFilteredDbData(newArr);
  }

  // console.log('filteredDbData ===', filteredDbData);

  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>MyAccountPage</h1>
      <p>your adds here</p>
      <br />
      <ul className='flex gap-x-8 gap-y-16 flex-wrap justify-between'>
        {filteredDbData.map((adObj) => (
          <li
            className='flex flex-col justify-between h-[440px] w-[280px]'
            key={adObj.id}
          >
            <Link to={`/my-ads/${adObj.id}`}>
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
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
