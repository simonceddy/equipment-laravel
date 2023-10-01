/* eslint-disable import/no-unresolved */
import { Head, Link, router } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import FormButton from '@/Components/Forms/FormButton';
import ItemTypes from '@/Components/Items/ItemTypes';
import ExternalLink from '@/Components/ExternalLink';
import PageHeader from '@/Components/PageHeader';
import ItemSize from '@/Components/Items/ItemSize';

function ShowItem({ auth, item, types }) {
  console.log(item.data);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>{item.name}</PageHeader>}
    >
      <Head title={`${item.brand?.name} - ${item.name}`} />
      <Content>
        <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 p-2 row justify-between items-start">
          {item.data?.size && (<ItemSize item={item} />)}
          <div className="col all-center">
            {item.brand && item.brand.id && (
              <h2 className="text-lg font-bold m1">
                <Link href={`/brand/${item.brand.id}`}>
                  {item.brand.name || `Brand ${item.brand.id}`}
                </Link>
              </h2>
            )}
            {item.url && item.url.length > 0 && (<ExternalLink url={item.url} />)}
          </div>
        </div>
        <div className="m-1 p-1">
          {item.data?.description}
        </div>
        <ItemTypes
          itemTypes={item.types}
          types={types}
          onAdd={(id) => {
            router.put(`/item/${item.id}/addType/${id}`);
          }}
          onRemove={(id) => {
            router.put(`/item/${item.id}/removeType/${id}`);
          }}
        />
        <FormButton onClick={() => router.get(`/item/${item.id}/edit`)}>
          Edit
        </FormButton>
        <FormButton
          onClick={() => {
            confirmAlert({
              overlayClassName: 'absolute bg-black text-white p-8 border-2 border-slate-400 rounded-lg bottom-4 left-[45%]',
              buttons: [
                {
                  className: 'm-2 p-2 font-bold border-2 rounded-lg bg-green-900 text-white hover:underline active:bg-green-600',
                  label: 'Yes',
                  onClick: () => {
                    router.delete(`/item/${item.id}`);
                  }
                },
                {
                  className: 'm-2 p-2 font-bold border-2 rounded-lg bg-red-900 text-white hover:underline active:bg-red-600',
                  label: 'No',
                },
              ]
            });
          }}
        >
          Delete
        </FormButton>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowItem;
