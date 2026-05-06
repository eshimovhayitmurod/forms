import { Fragment, useState } from 'react';
import {
   Label,
   MaskInput,
   NumberInput,
   PhoneInput,
   TextInput,
   TimeInput,
} from './components';
import './index.css';
import './style.css';
const App = () => {
   const [count, setCount] = useState('');
   const [mask, setMask] = useState('');
   const [phone, setPhone] = useState('');
   const [text, setText] = useState('');
   const [time, setTime] = useState('');
   return (
      <Fragment>
         <div className='flex flex-col items-center justify-center w-full'>
            <h1 className='text-[32px] font-semibold mt-8 text-center'>
               Forms
            </h1>
            <p className='text-[18px] font-medium mt-6 text-center text-[#768695]'>
               <a
                  className='inline-flex items-center justify-center bg-[#5254f1] text-white text-[16px] px-6 py-3 rounded-[10px] no-underline mt-4'
                  href='https://github.com/eshimovhayitmurod/forms'
                  rel='noreferrer'
                  target='_blank'
               >
                  Github
               </a>
            </p>
         </div>
         <div className='flex flex-col items-center justify-center w-full'>
            <div className='text-[24px] font-semibold mt-6 mb-2 w-75'>
               Inputs
            </div>
            <div className='py-2 w-75'>
               <Label>Text input</Label>
               <TextInput onChange={setText} value={text} />
            </div>
            <div className='py-2 w-75'>
               <Label>Time input</Label>
               <TimeInput onChange={setTime} value={time} />
            </div>
            <div className='py-2 w-75'>
               <Label>Phone input</Label>
               <PhoneInput onChange={setPhone} value={phone} />
            </div>
            <div className='py-2 w-75'>
               <Label>Number input</Label>
               <NumberInput scale={12} onChange={setCount} value={count} />
            </div>
            <div className='py-2 w-75'>
               <Label>Mask input</Label>
               <MaskInput onChange={setMask} value={mask} />
            </div>
         </div>
      </Fragment>
   );
};
export default App;
