/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import {
  FaBold as BoldIcon,
  FaItalic as ItalicIcon,
  // FaStrikethrough as StrikeIcon,
  // FaCode as CodeIcon,
  FaAlignCenter as AlignCenterIcon,
  FaAlignLeft as AlignLeftIcon,
  FaAlignRight as AlignRightIcon,
  FaAlignJustify as AlignJustifyIcon,
  // FaParagraph as ParagraphIcon,
  FaListUl as BulletListIcon,
  FaListOl as OrderedListIcon,
  FaQuoteLeft as BlockquoteIcon,
  FaUndo as UndoIcon,
  FaRedo as RedoIcon,
  FaFileImage as ImageIcon,
  FaLink as LinkIcon,
} from 'react-icons/fa';
// import {
//   // RiH1 as H1Icon,
//   RiH2 as H2Icon,
//   RiH3 as H3Icon,
//   RiH4 as H4Icon,
//   RiH5 as H5Icon,
//   // RiH6 as H6Icon,
// } from 'react-icons/ri';
import {
  GoHorizontalRule as LineIcon
} from 'react-icons/go';
import { useCallback } from 'react';
import TiptapMenuBtn from './components/TiptapMenuBtn';
import TextSizeSelector from './components/TextSizeSelector';
import FontSelector from './components/FontSelector';
import ColourSelector from './components/ColourSelector';

/**
 * @typedef {object} props
 * @property {import('@tiptap/react').Editor} editor
 * @property {Function} setImage
 */

/**
 * @param {props} props
 */
function MenuBar({
  editor,
  setImage,
  toggleImgForm
}) {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    // eslint-disable-next-line no-alert
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run();
  }, [editor]);
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap flex-row justify-start items-center border-b-2 border-slate-400">
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <BoldIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'is-active' : ''}
      >
        <ItalicIcon size={18} />
      </TiptapMenuBtn>
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <StrikeIcon size={18} />
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? 'is-active' : ''}
      >
        <CodeIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        clear marks
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().clearNodes().run()}
      >
        clear nodes
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
      >
        <H1Icon size={18} />
      </TiptapMenuBtn> */}
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
      >
        <H2Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
      >
        <H3Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
      >
        <H4Icon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
      >
        <H5Icon size={18} />
      </TiptapMenuBtn> */}
      <ColourSelector editor={editor} />
      <TextSizeSelector editor={editor} />
      <FontSelector editor={editor} />
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
      >
        <H6Icon size={18} />
      </TiptapMenuBtn> */}
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
      >
        <AlignLeftIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
      >
        <AlignCenterIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
      >
        <AlignRightIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
      >
        <AlignJustifyIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <BulletListIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <OrderedListIcon size={18} />
      </TiptapMenuBtn>
      {/* <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <CodeIcon size={18} />
      </TiptapMenuBtn> */}
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
      >
        <BlockquoteIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <LineIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().setHardBreak().run()}
      >
        hard break
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().undo().run()}
      >
        <UndoIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => editor.chain().focus().redo().run()}
      >
        <RedoIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={() => {
          const img = editor.getAttributes('image');
          if (img.src) {
            setImage(img);
          } else if (toggleImgForm) toggleImgForm();
        }}
      >
        <ImageIcon size={18} />
      </TiptapMenuBtn>
      <TiptapMenuBtn
        onClick={setLink}
      >
        <LinkIcon size={18} />
      </TiptapMenuBtn>
    </div>
  );
}

export default MenuBar;
