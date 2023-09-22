import DropdownMenu from '../../admin/components/Forms/DropdownMenu';

const options = [
  { value: 'Sen', label: 'Select font...', className: 'font-sans' },
  { value: 'Sen', label: 'Sen', className: 'font-sans' },
  { value: 'Moon Dance', label: 'Moon Dance', className: '' },
  { value: 'Quintessential', label: 'Quintessential', className: '' },
  { value: 'monospace', label: 'monospace', className: 'font-mono' },
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
      <DropdownMenu
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
