import clsx from 'clsx';
import { Fragment } from 'react';
import Heading from './Heading';
import Bold from './Icons/Bold';
import BulletList from './Icons/BulletList';
import Center from './Icons/Center';
import HighLight from './Icons/Highlight';
import Italic from './Icons/Italic';
import Justify from './Icons/Justify';
import Left from './Icons/Left';
import OrderedList from './Icons/OrderedList';
import Redo from './Icons/Redo';
import Right from './Icons/Right';
import Strike from './Icons/Strike';
import SubScript from './Icons/SubScript';
import SuperScript from './Icons/SuperScript';
import UnderLine from './Icons/Underline';
import Undo from './Icons/Undo';
import Tooltip from './Tooltip';
const Toolbar = ({ editor, disabled = false }) => {
   if (!editor) return null;
   const toolGroups = [
      {
         buttons: [
            {
               action: () => editor.chain().focus().undo().run(),
               active: false,
               icon: <Undo />,
               title: 'Undo',
            },
            {
               action: () => editor.chain().focus().redo().run(),
               active: false,
               icon: <Redo />,
               title: 'Redo',
            },
         ],
      },
      {
         buttons: [
            {
               type: 'heading',
               component: <Heading editor={editor} disabled={disabled} />,
            },
            {
               action: () => editor.chain().focus().toggleBulletList().run(),
               active: 'bulletList',
               icon: <BulletList />,
               title: 'Bullet List',
            },
            {
               action: () => editor.chain().focus().toggleOrderedList().run(),
               active: 'orderedList',
               icon: <OrderedList />,
               title: 'Ordered List',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleBold().run(),
               active: 'bold',
               icon: <Bold />,
               title: 'Bold',
            },
            {
               action: () => editor.chain().focus().toggleItalic().run(),
               active: 'italic',
               icon: <Italic />,
               title: 'Italic',
            },
            {
               action: () => editor.chain().focus().toggleUnderline().run(),
               active: 'underline',
               icon: <UnderLine />,
               title: 'Underline',
            },
            {
               action: () => editor.chain().focus().toggleStrike().run(),
               active: 'strike',
               icon: <Strike />,
               title: 'Strike',
            },
            {
               action: () => editor.chain().focus().toggleHighlight().run(),
               active: 'highlight',
               icon: <HighLight />,
               title: 'Highlight',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().toggleSubscript().run(),
               active: 'subscript',
               icon: <SubScript />,
               title: 'Subscript',
            },
            {
               action: () => editor.chain().focus().toggleSuperscript().run(),
               active: 'superscript',
               icon: <SuperScript />,
               title: 'SuperScript',
            },
         ],
      },
      {
         buttons: [
            {
               action: () => editor.chain().focus().setTextAlign('left').run(),
               active: { textAlign: 'left' },
               icon: <Left />,
               title: 'Left',
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('center').run(),
               active: { textAlign: 'center' },
               icon: <Center />,
               title: 'Center',
            },
            {
               action: () => editor.chain().focus().setTextAlign('right').run(),
               active: { textAlign: 'right' },
               icon: <Right />,
               title: 'Right',
            },
            {
               action: () =>
                  editor.chain().focus().setTextAlign('justify').run(),
               active: { textAlign: 'justify' },
               icon: <Justify />,
               title: 'Justify',
            },
         ],
      },
   ];
   return (
      <div className='flex flex-wra[ gap-1.25 p-1.25 border-solid border-[#dedede] rounded-t-[10px] border-l-2 border-r-2 border-t-2'>
         {toolGroups.map((group, index) => (
            <div
               className="flex gap-0.5 relative not-last:before:content-[''] not-last:before:absolute not-last:before:-right-0.75 not-last:before:top-0.5 not-last:before:h-[calc(100%-4px)] not-last:before:w-px not-last:before:bg-[#dedede]"
               key={index}
            >
               {group?.buttons?.map((btn, subIndex) => {
                  const isActive = !!(
                     btn.active && editor.isActive(btn.active)
                  );
                  return btn?.type === 'heading' ? (
                     <Fragment key={`${index}_${subIndex}`}>
                        {btn?.component}
                     </Fragment>
                  ) : (
                     <Tooltip
                        disabled={disabled}
                        key={`${index}_${subIndex}`}
                        title={btn?.title}
                     >
                        <button
                           disabled={disabled}
                           type='button'
                           className={clsx(
                              'cursor-pointer disabled:cursor-default border-none rounded-xl w-8 h-8 outline-none flex items-center justify-center',
                              'enabled:hover:bg-[#f1f1f1]',
                              {
                                 'bg-[#e2e2e2]': isActive,
                                 'bg-transparent': !isActive,
                              },
                           )}
                           onClick={e => {
                              e.preventDefault();
                              btn.action();
                           }}
                        >
                           {btn.icon}
                        </button>
                     </Tooltip>
                  );
               })}
            </div>
         ))}
      </div>
   );
};
export default Toolbar;
