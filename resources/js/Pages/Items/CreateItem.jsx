/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import PageHeader from '@/Components/PageHeader';
import Select from '@/Components/Forms/Select';
import ItemTypes from '@/Components/Items/ItemTypes';
import itemDataFields from '@/util/itemDataFields';

const keys = Object.keys(itemDataFields);

function CreateItem({
  auth, brands, types, brandId
}) {
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    brandId: brandId || 0,
  });

  const [itemTypes, setItemTypes] = useState([]);

  const [data, setData] = useState({
    ...itemDataFields
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post('/item/store', { ...formState, itemTypes, data });
  };

  // console.log(brands, types);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Add New Item</PageHeader>}
    >
      <Head title="Add New Item" />
      <Content>
        <form className="col all-center">
          <label htmlFor="brand-selector" className="row w-full justify-between items-center">
            <span>
              Brand:
            </span>
            <Select
              className="w-96"
              options={brands}
              value={formState.brandId || 0}
              onChange={(e) => {
                setFormState({ ...formState, brandId: Number(e.target.value) });
              }}
            />
          </label>
          <TextInput
            value={formState.name}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            label="Item Name:"
          />
          <TextInput
            value={formState.url}
            onChange={(e) => {
              setFormState({ ...formState, url: e.target.value });
            }}
            label="Item URL:"
          />
          {/* Data fields */}
          <div>
            {keys.map((key) => {
              //
              const val = itemDataFields[key];
              if (val !== null && typeof val === 'object') {
                const subKeys = Object.keys(val);

                return (
                  <div key={`data-subfield-group-${key}`} className="px-2 py-1 bg-gray-300/30 rounded m-1">
                    <span className="capitalize font-bold mb-1 border-b border-b-black dark:border-b-white">{key}</span>
                    {subKeys.map((subKey) => (
                      <TextInput
                        key={`data-input-${key}-${subKey}`}
                        label={subKey}
                        value={(data[key] && data[key][subKey]) ? data[key][subKey] : ''}
                        onChange={(e) => {
                          setData({
                            ...data,
                            [key]: {
                              ...data[key],
                              [subKey]: e.target.value
                            }
                          });
                        }}
                      />
                    ))}
                  </div>
                );
              }
              return (
                <TextInput
                  key={`data-input-${key}`}
                  label={key}
                  value={(data && data[key]) ? data[key] : ''}
                  onChange={(e) => {
                    setData({ ...data, [key]: e.target.value });
                  }}
                />
              );
            })}
          </div>

        </form>
        <ItemTypes
          itemTypes={itemTypes}
          types={types}
          onAdd={(id) => {
            const n = Number(id);
            setItemTypes([...itemTypes, types.find((t) => t.id === Number(n))]);
          }}
          onRemove={(id) => {
            const n = Number(id);
            setItemTypes(itemTypes.filter((t) => t.id !== Number(n)));
          }}
        />
        <div className="w-full row justify-around items-center">
          <FormButton onClick={onSubmit}>Save</FormButton>
          <FormButton
            onClick={() => {
              if (brandId) {
                router.get(`/brand/${brandId}`);
              } else router.get('/items');
            }}
          >Cancel
          </FormButton>
        </div>
      </Content>
    </AuthenticatedLayout>
  );
}

export default CreateItem;
