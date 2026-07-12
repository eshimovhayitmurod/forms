import sanitizeHtml from '@shared/helpers/sanitizeHtml';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import styled from 'styled-components';
import Toolbar from './Toolbar';
const StyledEditor = styled.div`
   border-radius: 10px;
   overflow: hidden;
   width: 100%;
   .ProseMirror {
      /* height: 350px; */
      background-color: transparent;
      border-radius: 0 0 10px 10px;
      border: 1px solid;
      border-color: #dedede;
      field-sizing: content;
      max-height: 500px;
      min-height: 94px;
      outline: none;
      overflow-y: auto;
      padding: 10px;
      &[data-error='true']:not([contenteditable='false']) {
         border-color: #e41d32;
      }
      &:focus:not([contenteditable='false']) {
         border-color: #11734b;
      }
      &[contenteditable='false'] {
         background-color: #f4f4f4;
      }
   }
   .dark & .ProseMirror {
      border-color: #555555;
      &[data-error='true']:not([contenteditable='false']) {
         border-color: #e41d32;
      }
      &:focus:not([contenteditable='false']) {
         border-color: #11734b;
      }
      &[contenteditable='false'] {
         background-color: #2e2d2d;
      }
   }
   .ProseMirror * {
      all: revert;
      color: #000000 !important;
      isolation: isolate;
   }
`;
const Editor = ({
   'data-cy': dataCY,
   isDisabled = false,
   isError = false,
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
         attributes: { 'data-cy': dataCY, 'data-error': !!isError },
         transformPastedHTML(html) {
            const cleanHtml = sanitizeHtml(html);
            return cleanHtml;
         },
      },
   });
   return (
      <StyledEditor>
         <div>
            <Toolbar isDisabled={!!isDisabled} editor={editor} />
         </div>
         <EditorContent editor={editor} />
      </StyledEditor>
   );
};
export default Editor;
