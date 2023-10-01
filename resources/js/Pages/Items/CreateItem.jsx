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

function CreateItem({ auth, brands, types }) {
  const [formState, setFormState] = useState({
    name: '',
    url: '',
    brandId: 0,
  });

  const [itemTypes, setItemTypes] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    router.post('/item/store', { ...formState, itemTypes });
  };

  console.log(brands, types);

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
        <FormButton onClick={onSubmit}>Save</FormButton>
      </Content>
    </AuthenticatedLayout>
  );
}

export default CreateItem;
