/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';

function CreateBrand({ auth }) {
  const [formState, setFormState] = useState({
    name: '',
    url: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post('/brand/store', formState);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Add New Brand</h2>}
    >
      <Head title="Add New Brand" />
      <Content>
        <form onSubmit={onSubmit} className="col all-center">
          <TextInput
            value={formState.name}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            label="Brand Name:"
          />
          <TextInput
            value={formState.url}
            onChange={(e) => {
              setFormState({ ...formState, url: e.target.value });
            }}
            label="Brand URL:"
          />
          <FormButton submits>Save</FormButton>
        </form>
      </Content>
    </AuthenticatedLayout>
  );
}

export default CreateBrand;
