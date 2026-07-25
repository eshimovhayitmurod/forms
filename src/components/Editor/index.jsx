import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { bool, func, string } from 'prop-types';
import ErrorMessage from '../components/ErrorMessage';
import sanitizeHtml from '../helpers/sanitizeHtml';
import Toolbar from './Toolbar';
const Editor = ({
   'data-cy': dataCY,
   disabled = false,
   error = '',
   onBlur,
   onChange,
   onFocus,
   placeholder = '',
   value,
}) => {
   const editor = useEditor({
      content: value,
      injectCSS: false,
      onBlur,
      onFocus,
      onUpdate: ({ editor }) => {
         if (!disabled) {
            const rawHtml = editor.getHTML();
            const cleanHtml = sanitizeHtml(rawHtml);
            onChange(cleanHtml);
         }
      },
      extensions: [
         StarterKit.configure({
            bulletList: true,
            orderedList: true,
            listItem: true,
         }),
         Highlight.configure({ multicolor: true }),
         Placeholder.configure({ placeholder, showOnlyWhenEditable: true }),
         Subscript,
         Superscript,
         TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      editorProps: {
         editable: () => !disabled,
         attributes: { 'data-cy': dataCY, 'data-error': !!error },
         transformPastedHTML(html) {
            const cleanHtml = sanitizeHtml(html);
            return cleanHtml;
         },
      },
   });
   return (
      <div className={clsx('w-full')}>
         <div
            className={clsx(
               // ELEMENT STYLES
               'rounded-[10px] overflow-hidden w-full',
               // PROSE MIRROR STYLES
               '[&_.ProseMirror]:px-2.5 [&_.ProseMirror]:border-2 [&_.ProseMirror]:rounded-b-[10px] [&_.ProseMirror]:field-sizing:content [&_.ProseMirror]:max-h-125 [&_.ProseMirror]:min-h-23.5 [&_.ProseMirror]:outline-none [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror_*]:[all:revert] [&_.ProseMirror_*]:isolate',
               // PROSE MIRROR BACKGROUND
               '[&_.ProseMirror]:bg-transparent',
               `[&_.ProseMirror[contenteditable='false']]:bg-[#f4f4f4]`,
               // PROSE MIRROR COLOR
               '[&_.ProseMirror_*]:[!color:#000000]',
               // PROSE MIRROR BORDER COLOR
               '[&_.ProseMirror]:border-[#dedede]',
               `[&_.ProseMirror:focus:not([contenteditable='false'])]:border-[#3a79f3] [&_.ProseMirror:hover:not([contenteditable='false'])]:border-[#3a79f3]`,
               {
                  "[&_.ProseMirror:not([contenteditable='false'])]:border-[#e41d32]":
                     !!error,
               },
            )}
         >
            <div>
               <Toolbar disabled={!!disabled} editor={editor} />
            </div>
            <EditorContent editor={editor} />
         </div>
         <ErrorMessage size='md' error={error} />
      </div>
   );
};
Editor.propTypes = {
   'data-cy': string,
   disabled: bool,
   isError: bool,
   onBlur: func,
   onChange: func,
   placeholder: string,
   value: string,
};
export default Editor;
