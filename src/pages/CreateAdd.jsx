import { app } from '../firebase/firebase';

export default function CreateAdd() {
  console.log(app);
  return (
    <div className='container'>
      <h1 className='text-3xl mb-4 pt-4'>CreateAdd</h1>
      <p>your new add</p>
    </div>
  );
}
