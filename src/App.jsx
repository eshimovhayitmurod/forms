import { Fragment, useState } from 'react';
import {
   ColorInput,
   DateInput,
   Editor,
   FileUploader,
   Label,
   MaskInput,
   NumberInput,
   OTPInput,
   PasswordInput,
   PhoneInput,
   Select,
   StarsInput,
   Textarea,
   TextInput,
   TimeInput,
} from './components';
import './components/forms.css';
import './index.css';
import './style.css';
const options = [
   { label: 'Label 1', value: 1 },
   { label: 'Label 2', value: 2 },
   { label: 'Label 3', value: 3 },
];
const App = () => {
   const [clear, setClear] = useState(false);
   const [color, setColor] = useState('');
   const [count, setCount] = useState('');
   const [date, setDate] = useState('');
   const [disabled, setDisabled] = useState(false);
   const [editor, setEditor] = useState('');
   const [files, setFiles] = useState([]);
   const [loading, setLoading] = useState(false);
   const [mask, setMask] = useState('');
   const [otp, setOTP] = useState('');
   const [password, setPassword] = useState('');
   const [phone, setPhone] = useState('');
   const [select, setSelect] = useState(null);
   const [size, setSize] = useState('md');
   const [stars, setStars] = useState(0);
   const [text, setText] = useState('');
   const [textarea, setTextarea] = useState('');
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
               <div>
                  <span>Size: </span>
                  <select
                     value={size}
                     onChange={e => setSize(e?.target?.value)}
                  >
                     <option value='sm'>Small</option>
                     <option selected value='md'>
                        Medium
                     </option>
                     <option value='lg'>Large</option>
                  </select>
               </div>
            </div>
            <div className='py-2 w-75'>
               <div>
                  <span>Loading: </span>
                  <input
                     onChange={e => setLoading(e.target.checked)}
                     type='checkbox'
                     value={loading}
                  />
               </div>
            </div>
            <div className='py-2 w-75'>
               <div>
                  <span>Clear button: </span>
                  <input
                     onChange={e => setClear(e.target.checked)}
                     type='checkbox'
                     value={clear}
                  />
               </div>
            </div>
            <div className='py-2 w-75'>
               <div>
                  <span>Disabled: </span>
                  <input
                     onChange={e => setDisabled(e.target.checked)}
                     type='checkbox'
                     value={disabled}
                  />
               </div>
            </div>
            <div className='py-2 w-75'>
               <Label>Text input</Label>
               <TextInput
                  clearable={clear}
                  disabled={disabled}
                  loading={loading}
                  onChange={setText}
                  size={size}
                  value={text}
               />
            </div>
            <div className='py-2 w-75'>
               <Label>Phone input</Label>
               <PhoneInput
                  clearable={clear}
                  disabled={disabled}
                  loading={loading}
                  onChange={setPhone}
                  size={size}
                  value={phone}
               />
            </div>
            <div className='py-2 w-75'>
               <Label>Number input</Label>
               <NumberInput
                  clearable={clear}
                  disabled={disabled}
                  loading={loading}
                  onChange={setCount}
                  size={size}
                  value={count}
               />
            </div>
            <div className='py-2 w-75'>
               <Label>Mask input</Label>
               <MaskInput
                  clearable={clear}
                  disabled={disabled}
                  loading={loading}
                  onChange={setMask}
                  size={size}
                  value={mask}
               />
            </div>
            <div className='py-2 w-75'>
               <Label>Date input</Label>
               <DateInput onChange={setDate} value={date} />
            </div>
            <div className='py-2 w-75'>
               <Label>Color input</Label>
               <ColorInput onChange={setColor} value={color} />
            </div>
            <div className='py-2 w-75'>
               <Label>Password input</Label>
               <PasswordInput onChange={setPassword} value={password} />
            </div>
            <div className='py-2 w-75'>
               <Label>Time input</Label>
               <TimeInput onChange={setTime} value={time} />
            </div>
            <div className='py-2 w-75'>
               <Label>Select</Label>
               <Select onChange={setSelect} value={select} options={options} />
            </div>
            <div className='py-2 w-75'>
               <Label>Stars input</Label>
               <StarsInput onChange={setStars} value={stars} />
            </div>
            <div className='py-2 w-75'>
               <Label>OTP input</Label>
               <OTPInput onChange={setOTP} value={otp} />
            </div>
            <div className='py-2 w-75'>
               <Label>Textarea input</Label>
               <Textarea onChange={setTextarea} value={textarea} />
            </div>
            <div className='py-2 w-180'>
               <Label>Editor</Label>
               <Editor onChange={setEditor} value={editor} />
            </div>
            <div className='py-2 w-120'>
               <Label>File uploader</Label>
               <FileUploader onChange={setFiles} value={files} />
            </div>
         </div>
      </Fragment>
   );
};
export default App;
