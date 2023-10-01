/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TypeList from '@/Components/Types/TypeList';
import TypeListItem from '@/Components/Types/TypeListItem';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import Select from '@/Components/Forms/Select';
import PageHeader from '@/Components/PageHeader';

function EditItem({
  auth, item, brands, types
}) {
  const [state, setState] = useState({
    name: item.name || '',
    url: item.url || '',
  });
  const [brandId, setBrandId] = useState(item?.brand_id || 0);
  console.log(brands, types);

  const formHandler = (e) => {
    e.preventDefault();
    router.put(`/item/${item.id}`, { ...state, brandId });
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Editing {item.name}</PageHeader>}
    >
      <Head title={`Editing ${item.brand?.name} - ${item.name}`} />
      <Content>
        {/* {item.brand && item.brand.id && (
          <h2>
            <Link href={`/brand/${item.brand.id}`}>
              {item.brand.name || `Brand ${item.brand.id}`}
            </Link>
          </h2>
        )} */}
        <form className="col all-center" onSubmit={formHandler}>
          <label htmlFor="brand-selector" className="row w-full justify-between items-center">
            <span>
              Brand:
            </span>
            <Select
              className="w-96"
              options={brands}
              value={brandId}
              onChange={(e) => {
                setBrandId(Number(e.target.value));
              }}
            />
          </label>
          <TextInput
            className="w-96"
            label="Item Name:"
            value={state.name || ''}
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <TextInput
            onChange={(e) => {
              setState({ ...state, url: e.target.value });
            }}
            className="w-96"
            label="Item URL:"
            value={state.url || ''}
          />
          <div>
            {item.types && (
              <>
                <span>{item.types.length} types:</span>
                <TypeList>
                  {item.types.map((type) => (
                    <TypeListItem key={`item-${item.id}-type-${type.id}`}>
                      <Link href={`/type/${type.id}`}>
                        {type.name}
                      </Link>
                    </TypeListItem>
                  ))}
                </TypeList>
              </>
            )}
          </div>
          <div className="row all-center">
            <FormButton submits>
              Save
            </FormButton>
            <FormButton
              onClick={() => router.get(`/item/${item.id}`)}
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
