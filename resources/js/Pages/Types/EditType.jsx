/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import PageHeader from '@/Components/PageHeader';

function EditItem({
  auth, type
}) {
  const [state, setState] = useState({
    name: type.name || '',
  });

  const formHandler = (e) => {
    e.preventDefault();
    router.put(`/type/${type.id}`, state);
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Editing {type.name}</PageHeader>}
    >
      <Head title={`Editing ${type.name}`} />
      <Content>
        {/* {item.brand && item.brand.id && (
          <h2>
            <Link href={`/brand/${item.brand.id}`}>
              {item.brand.name || `Brand ${item.brand.id}`}
            </Link>
          </h2>
        )} */}
        <form className="col all-center" onSubmit={formHandler}>
          <TextInput
            className="w-96"
            label="Type Name:"
            value={state.name || ''}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <div className="row all-center">
            <FormButton submits>
              Save
            </FormButton>
            <FormButton
              onClick={() => router.get(`/type/${type.id}`)}
            >
              Cancel
            </FormButton>
          </div>
        </form>
      </Content>
    </AuthenticatedLayout>
  );
}

export default EditItem;
