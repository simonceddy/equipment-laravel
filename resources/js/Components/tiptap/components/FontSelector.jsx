/* eslint-disable import/no-unresolved */
import Select from '@/Components/Forms/Select';

const options = [
  { id: 'Sen', name: 'Select font...' },
  { id: 'Sen', name: 'Sen' },
  { id: 'Moon Dance', name: 'Moon Dance' },
  { id: 'Quintessential', name: 'Quintessential' },
  { id: 'monospace', name: 'monospace' },
];

/**
 * @typedef {object} props
 * @property {import('@tiptap/react').Editor} editor
 */

/**
 * @param {props} props
 */
function FontSelector({ editor }) {
  // console.log(editor.getAttributes('fontFamily'));
  return (
    <div>
      <Select
        value={0}
        onChange={(e) => {
          editor.chain().focus().setFontFamily(e.target.value).run();
        }}
        options={options}
      />
    </div>
  );
}

export default FontSelector;
