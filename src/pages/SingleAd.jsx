import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function SingleAd() {
  const { adID } = useParams();
  const [filteredDbData, setFilteredDbData] = useState([]);
  const [commentsArr, setCommentsArr] = useState([]);
  useEffect(() => {
    queryDataFn();
    queryComments();
  }, []);
  async function queryDataFn() {
    const docRef = doc(db, 'ads-collection', adID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setFilteredDbData(docSnap.data());
    }
  }
  async function queryComments() {
    const querySnapshot = await getDocs(
      collection(db, 'ads-collection', adID, 'comments')
    );
    const comments = [];
    querySnapshot.forEach((doc) => {
      //   console.log('doc ===', doc.data().date.toDate());
      const formattedDate = doc.data().date.toDate();
      const date2 = formattedDate.toLocaleDateString();
      comments.push({
        id: doc.id,
        ...doc.data(),
        // username: doc.data().username,
        // comment: doc.data().comment,
        date: date2,
      });
    });
    setCommentsArr(comments);
  }

  return (
    <div className='flex w-[800px] ml-auto mr-auto mt-12 gap-5'>
      <div className='flex flex-col  h-[440px] w-[280px]'>
        <img
          className='h-full object-cover mb-5 rounded-xl'
          src={filteredDbData.photoURL}
          alt={filteredDbData.title}
        />
        <div className='flex justify-between items-center'>
          <div>
            <h3 className='font-bold text-xs'>{filteredDbData.title}</h3>
            <p className='text-xs text-gray-800'>{filteredDbData.brand}</p>
          </div>
          <p className='bg-gray-100 text-sm py-2 px-4 rounded-md'>
            ${filteredDbData.price}.00
          </p>
        </div>
      </div>
      <div>
        <ul className='flex flex-col gap-5 w-full'>
          {commentsArr.map((cObj) => (
            <li key={cObj.id} className='bg-gray-100 p-2 min-w-[500px]'>
              <div className='bg-gray-200 p-1 flex justify-between'>
                <h4 className='text-xl pl-2 text-sky-800'>{cObj.username}</h4>
                <p className='text-lg pr-2 text-sky-800'>{cObj.date}</p>
              </div>
              <p className='bg-white text-sm py-2 px-1 mt-1'>{cObj.comment}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
