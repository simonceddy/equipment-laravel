/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import itemDataFields from '@/util/itemDataFields';
import TextInput from './TextInput';

const keys = Object.keys(itemDataFields);

function SubFields({
  fields = {}, title, data, onChange
}) {
  if (!fields) return null;

  const subKeys = Object.keys(fields);

  return (
    <div className="px-2 py-1 bg-gray-300/30 rounded m-1">
      {title && <span className="capitalize font-bold mb-1 border-b border-b-black dark:border-b-white">{title}</span>}
      {subKeys.map((key) => (
        <TextInput
          key={`data-input-${key}`}
          label={key}
          value={data[key] || ''}
          onChange={(e) => {
            if (onChange) onChange({ key: e.target.value });
          }}
        />
      ))}
    </div>
  );
}

function DataFields({ data, onChange }) {
  return (
    <div>
      {keys.map((key) => {
        //
        const val = itemDataFields[key];
        if (val !== null && typeof val === 'object') {
          return (
            <SubFields
              title={key}
              key={`data-input-fields-${key}`}
              fields={itemDataFields[key]}
              data={data || {}}
              onChange={onChange}
            />
          );
        }
        return (
          <TextInput
            key={`data-input-${key}`}
            label={key}
            value={(data && data[key]) ? data[key] : ''}
            onChange={(e) => {
              if (onChange) onChange({ key: e.target.value });
            }}
          />
        );
      })}
    </div>
  );
}

export default DataFields;
