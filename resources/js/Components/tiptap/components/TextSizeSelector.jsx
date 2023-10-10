/* eslint-disable import/no-unresolved */
import Select from '@/Components/Forms/Select';

const options = [
  { id: 0, name: 'Normal' },
  { id: 2, name: 'Heading 2' },
  { id: 3, name: 'Heading 3' },
  { id: 4, name: 'Heading 4' },
  { id: 5, name: 'Heading 5' },
];

/**
 * @typedef {object} props
 * @property {import('@tiptap/react').Editor} editor
 */

/**
 * @param {props} props
 */
function TextSizeSelector({ editor }) {
  return (
    <div>
      <Select
        value={editor.isActive('heading') ? editor.getAttributes('heading').level : 0}
        onChange={(e) => {
          if (e.target.value === '0' && editor.isActive('heading')) {
            console.log('normal', editor);
            // editor.isActive('heading')
            editor.chain().focus()
              .toggleHeading({ level: editor.getAttributes('heading').level })
              .run();
          }
          editor.chain().focus().toggleHeading({ level: Number(e.target.value) }).run();
        }}
        options={options}
      />
    </div>
  );
}

export default TextSizeSelector;
