import { Fragment } from 'react';
import styled from 'styled-components';
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
const StyledToolbar = styled.div`
   border-left-color: #dedede;
   border-left-width: 2px;
   border-radius: 10px 10px 0 0;
   border-right-color: #dedede;
   border-right-width: 2px;
   border-style: solid;
   border-top-color: #dedede;
   border-top-width: 2px;
   display: flex;
   flex-wrap: wrap;
   gap: 5px;
   padding: 5px;
   & .tool-group {
      display: flex;
      gap: 2px;
      position: relative;
      &:not(:last-child):before {
         background-color: #dedede;
         content: '';
         height: calc(100% - 4px);
         position: absolute;
         right: -3px;
         top: 2px;
         width: 1px;
      }
      & .editor-toolbar-btn {
         background-color: transparent;
         border: none;
         border-radius: 12px;
         cursor: pointer;
         width: 32px;
         height: 32px;
         outline: none;
         display: flex;
         align-items: center;
         justify-content: center;
         &[data-active='true'] {
            background-color: #e2e2e2;
         }
         &:hover:not(:disabled) {
            background-color: #f1f1f1;
         }
         &:disabled {
            cursor: default;
         }
      }
   }
`;
const Toolbar = ({ editor, isDisabled = false }) => {
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
               component: <Heading editor={editor} isDisabled={isDisabled} />,
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
      <StyledToolbar>
         {toolGroups.map((group, index) => (
            <div key={index} className='tool-group'>
               {group?.buttons?.map((btn, subIndex) => {
                  return btn?.type === 'heading' ? (
                     <Fragment key={`${index}_${subIndex}`}>
                        {btn?.component}
                     </Fragment>
                  ) : (
                     <Tooltip
                        isDisabled={isDisabled}
                        key={`${index}_${subIndex}`}
                        title={btn?.title}
                     >
                        <button
                           disabled={isDisabled}
                           type='button'
                           className='editor-toolbar-btn'
                           data-active={
                              !!(btn.active && editor.isActive(btn.active))
                           }
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
      </StyledToolbar>
   );
};
export default Toolbar;
