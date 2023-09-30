/* eslint-disable no-unused-vars */
import { useMemo, useState } from 'react';
import FormButton from '../Forms/FormButton';
import Select from '../Forms/Select';
import ListLink from '../ListLink';
import TypeList from '../Types/TypeList';
import TypeListItem from '../Types/TypeListItem';

function ItemTypes({
  itemTypes = [], types = [], onRemove, onAdd
}) {
  const [selectedType, setSelectedType] = useState(null);

  const selectorTypes = useMemo(
    () => {
      const filteredTypes = types.filter(({ id }) => !itemTypes.find((v) => v.id === id));
      filteredTypes.unshift({ id: 0, name: '-- Choose types here ---' });
      return filteredTypes;
    },
    [itemTypes]
  );

  // console.log(selectorTypes);
  return (
    <div className="w-5/6 col bg-green-500/30 rounded-lg">
      <span
        className="text-lg rounded-t-lg font-bold underline p-1 w-full text-left bg-slate-500/30"
      >
        Associated Types
      </span>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedType && onAdd) onAdd(selectedType);
        }}
        className="row items-center justify-around m-2"
      >
        <Select
          onChange={(e) => {
            setSelectedType(Number(e.target.value));
          }}
          value={selectedType || 0}
          options={selectorTypes || []}
        />
        <FormButton submits>
          Add Type to Item
        </FormButton>
      </form>

      {itemTypes && (
      <TypeList>
        {itemTypes.map((type) => (
          <TypeListItem className="hover:bg-green-400/30 justify-between items-center px-4" key={`item-type-${type.id}`}>
            <span>
              {type.name}
            </span>
            <span className="row all-center p-1">
              <ListLink href={`/type/${type.id}`}>
                View
              </ListLink>
              <FormButton
                onClick={() => {
                  if (onRemove) onRemove(type.id);
                }}
              >
                Remove
              </FormButton>
            </span>
          </TypeListItem>
        ))}
      </TypeList>
      )}
    </div>
  );
}

export default ItemTypes;
