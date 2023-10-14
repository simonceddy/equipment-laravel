/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PageHeader from '@/Components/PageHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Select from '@/Components/Forms/Select';
import FormButton from '@/Components/Forms/FormButton';

function SetItemsBrand({ items = [], brands = [], auth }) {
  const [brandId, setBrandId] = useState(null);
  const [selectedItems, setSelectedItems] = useState(null);

  const updateItems = () => {
    router.post(
      '/items/updateBrand',
      {
        brandId,
        selectedItems: Object.keys(selectedItems).filter((key) => selectedItems[key] === true)
      }
    );
  };

  useEffect(() => {
    setSelectedItems(Object.fromEntries(items.map((i) => [i.id, true])));
  }, [items]);
  // console.log(selectedItems);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Edit brand for items</PageHeader>}
    >
      <Head title="Set brand for items" />
      <Content>
        {selectedItems && (
        <div className="w-11/12 mx-auto col all-center">
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
          {items.map((item) => (
            <div key={`item-container-${item.id}`} className="w-full row justify-start items-center">
              <input
                className="m-2"
                type="checkbox"
                onChange={() => {
                  setSelectedItems({
                    ...selectedItems,
                    [item.id]: !selectedItems[item.id]
                  });
                }}
                checked={selectedItems[item.id]}
              />
              {item.brand && item.brand.name && (
                <span className="mr-2">{item.brand.name}</span>
              )}
              <span>
                {item.name || ''}
              </span>
            </div>
          ))}
          {/* {brands.length} */}
          <FormButton onClick={updateItems}>
            Update Items
          </FormButton>
        </div>
        )}
      </Content>
    </AuthenticatedLayout>
  );
}

export default SetItemsBrand;
