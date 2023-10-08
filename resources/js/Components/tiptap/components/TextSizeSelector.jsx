/* eslint-disable import/no-unresolved */
import Select from '@/Components/Forms/Select';

const options = [
  { value: 0, label: 'Normal' },
  { value: 2, label: 'Heading 2' },
  { value: 3, label: 'Heading 3' },
  { value: 4, label: 'Heading 4' },
  { value: 5, label: 'Heading 5' },
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
