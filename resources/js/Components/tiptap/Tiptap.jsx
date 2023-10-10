/* eslint-disable no-unused-vars */
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CharacterCount from '@tiptap/extension-character-count';
import Link from '@tiptap/extension-link';
import { useState } from 'react';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import MenuBar from './MenuBar';
import CustomHeading from './ext/CustomHeadings';
import CustomAlign from './ext/CustomAlign';
import { TipTapCustomImage } from './Image';
import ImageProps from './components/ImageProps';
import { upload } from './upload';
import CustomFontFamily from './ext/CustomFontFamily';
import ImageForm from './components/ImageForm';
import TiptapContainer from './components/TiptapContainer';
import './Tiptap.scss';

// EditorView.prototype.updateState = function updateState(state) {
//   if (!this.docView) return; // This prevents the matchesNode error on hot reloads
//   this.updateStateInner(state, this.state.plugins !== state.plugins);
// };

function Tiptap({
  content, label, setContent, tabIndex, saveData, onClose
}) {
  // const [file, setFile] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);
  const [modified, setModified] = useState(false);
  const [showImgUpload, setShowImgUpload] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: {
          HTMLAttributes: {
            // TODO update colour classes
            class: 'h-px my-8 bg-black border-0'
          }
        },
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc list-outside'
          }
        }
      }),
      TextStyle,
      Link.configure({
        HTMLAttributes: {
          class: 'hover:underline cursor-pointer'
        }
      }),
      CustomHeading,
      CustomAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      // Image,
      TipTapCustomImage(upload),
      CharacterCount,
      CustomFontFamily,
      Color,
    ],
    editorProps: {
      attributes: {
        name: 'body',
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none whitespace-pre-wrap overflow-y-scroll bg-slate-500/20 w-full page-content',
        style: 'max-height: 450px;'
      },
    },
    content: content || '',
    onUpdate: ({ editor: e }) => {
      if (!modified) setModified(true);
      if (setContent) setContent(e.getHTML());
    },
    // onBeforeCreate: ({ editor: e }) => {
    //   console.log(e.getJSON(), 'before create event');
    // },
    // onCreate: ({ editor: e }) => {
    //   // console.log('create event');
    //   // e.setOptions({ content: content || '' });
    // },
    // onSelectionUpdate: () => {
    //   // console.log('selection update event');
    // },
    // onTransaction: ({ editor: e, transaction }) => {
    //   const img = e.getAttributes('image');
    //   if (img.src) {
    //     // console.log('transaction event', img, transaction);
    //     setSelectedImg(img);
    //   }
    // },
  });

  const setImageAtrr = (attr = {}) => {
    const newImgNode = editor.schema.nodes.image.create(attr);
    const transaction = editor.view.state.tr.replaceSelectionWith(newImgNode);
    editor.view.dispatch(transaction);
  };

  if (!editor) return <div>An issue prevented the editor from starting</div>;

  return (
    <>
      {label && (
      <div className="text-lg py-2 font-bold">
        {label}
      </div>
      )}
      {showImgUpload && (
        <ImageForm
          upload={upload}
          editor={editor}
          onInput={(file) => {
            // console.log(file);
          }}
          onClose={() => {
            setShowImgUpload(false);
          }}
        />
      )}
      {selectedImg && (
        <ImageProps
          setImage={({ width, height, float }) => {
            setImageAtrr({
              ...selectedImg,
              width,
              height,
              float
            });
            const img = editor.getAttributes('image');
            if (img.src) {
              setSelectedImg(img);
            }
          }}
          onClose={() => setSelectedImg(null)}
          image={selectedImg}
        />
      )}
      <TiptapContainer>
        <div className="col w-full p-2">
          <MenuBar
            setImage={(i) => {
              setSelectedImg(i);
            }}
            editor={editor}
            toggleImgForm={() => setShowImgUpload(true)}
          />
          <EditorContent
            tabIndex={tabIndex}
            editor={editor}
          />
        </div>
        <div className="row w-full mt-3 justify-start items-center border-t">
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.characters()} characters
          </span>
          <span className="border-r ml-2 p-1">
            {editor.storage.characterCount.words()} words
          </span>
        </div>
        {/* <div className="row w-full mt-2">
          <Button
            disabled={!modified}
            onClick={() => {
              if (saveData) {
                saveData();
                setModified(false);
              }
            }}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              if (onClose) onClose();
            }}
          >
            Cancel
          </Button>
        </div> */}
      </TiptapContainer>
    </>
  );
}

export default Tiptap;
