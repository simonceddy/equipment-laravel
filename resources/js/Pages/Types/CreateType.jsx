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

function CreateType({ auth }) {
  const [formState, setFormState] = useState({
    name: ''
  });

  const onSubmit = (e) => {
    e.preventDefault();
    router.post('/type/store', formState);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Add New Type</PageHeader>}
    >
      <Head title="Add New Type" />
      <Content>
        <form onSubmit={onSubmit} className="col all-center">
          <TextInput
            value={formState.name}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
            }}
            label="Name:"
          />

          <FormButton submits>Save</FormButton>
        </form>
      </Content>
    </AuthenticatedLayout>
  );
}

export default CreateType;
