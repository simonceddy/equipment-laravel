/* eslint-disable no-unused-vars */
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
import itemDataFields from '@/util/itemDataFields';
// import Textarea from '@/Components/Forms/Textarea';
import Tiptap from '@/Components/tiptap/Tiptap';

const keys = Object.keys(itemDataFields);

function EditItem({
  auth, item, brands, types
}) {
  const [state, setState] = useState({
    name: item.name || '',
    url: item.url || '',
  });

  const [data, setData] = useState(item.data ? {
    ...item.data,
  } : {
    ...itemDataFields
  });

  const [brandId, setBrandId] = useState(item?.brand_id || 0);
  // console.log(item.refId || null);

  const formHandler = (e) => {
    e.preventDefault();
    router.put(`/item/${item.id}`, { ...state, brandId, data });
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
        <form className="col all-center w-11/12 mx-auto" onSubmit={formHandler}>
          <label htmlFor="brand-selector" className="row w-full justify-center items-center">
            <span className="mr-2 text-lg">
              Brand:
            </span>
            <Select
              className="sm:w-96 w-1/2 md:w-[30rem]"
              options={brands}
              value={brandId}
              onChange={(e) => {
                setBrandId(Number(e.target.value));
              }}
            />
          </label>
          <TextInput
            className="sm:w-96 w-1/2 md:w-[30rem]"
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
            className="sm:w-96 w-1/2 md:w-[30rem]"
            label="Item URL:"
            value={state.url || ''}
          />

          {/* Data fields */}
          <div className="w-11/12 mx-auto">
            {keys.map((key) => {
              //
              if (key === 'description') {
                return (
                  <div
                    key="data-field-description"
                    className="min-h-[300px]"
                  >
                    <Tiptap
                      content={data.description || ''}
                      setContent={(html) => {
                        setData({ ...data, description: html });
                      }}
                      label="Description"
                    />
                  </div>
                  // <Textarea
                  //   outerClassName="my-3 rounded bg-blue-200/30 p-2"
                  //   asCol
                  //   label="Description"
                  //   key="data-field-description"
                  //   onChange={(e) => {
                  //     setData({ ...data, description: e.target.value });
                  //   }}
                  //   value={data.description}
                  // />
                );
              }
              const val = itemDataFields[key];
              if (val !== null && typeof val === 'object') {
                const subKeys = Object.keys(val);

                return (
                  <div key={`data-subgroup-${key}`} className="px-2 py-1 bg-gray-300/30 rounded m-1">
                    <span className="capitalize font-bold mb-1 border-b border-b-black dark:border-b-white">{key}</span>
                    {subKeys.map((subKey) => (
                      <TextInput
                        className="sm:w-96 w-1/2 md:w-[30rem]"
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
                  className="sm:w-96 w-1/2 md:w-[30rem]"
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
