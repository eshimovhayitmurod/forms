import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import clsx from 'clsx';
import { bool, func, string } from 'prop-types';
import sanitizeHtml from './sanitizeHtml';
import Toolbar from './Toolbar';
const Editor = ({
   'data-cy': dataCY,
   isDisabled = false,
   error = 'djnewo',
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
         if (!isDisabled) {
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
         editable: () => !isDisabled,
         attributes: { 'data-cy': dataCY, 'data-error': !!error },
         transformPastedHTML(html) {
            const cleanHtml = sanitizeHtml(html);
            return cleanHtml;
         },
      },
   });
   return (
      <div
         className={clsx(
            // ELEMENT STYLES
            'rounded-[10px] overflow-hidden w-full',
            // PROSE MIRROR STYLES
            '[&_.ProseMirror]:p-2.5 [&_.ProseMirror]:border-2 [&_.ProseMirror]:rounded-b-[10px] [&_.ProseMirror]:field-sizing:content [&_.ProseMirror]:max-h-125 [&_.ProseMirror]:min-h-23.5 [&_.ProseMirror]:outline-none [&_.ProseMirror]:overflow-y-auto [&_.ProseMirror_*]:[all:revert] [&_.ProseMirror_*]:isolate',
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
            <Toolbar isDisabled={!!isDisabled} editor={editor} />
         </div>
         <EditorContent editor={editor} />
      </div>
   );
};
Editor.propTypes = {
   'data-cy': string,
   isDisabled: bool,
   isError: bool,
   onBlur: func,
   onChange: func,
   placeholder: string,
   value: string,
};
export default Editor;
