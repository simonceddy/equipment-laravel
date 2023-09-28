/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import ItemList from '@/Components/Items/ItemList';
import ItemListItem from '@/Components/Items/ItemListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import ListLink from '@/Components/ListLink';
import FormButton from '@/Components/Forms/FormButton';

function ShowBrand({ auth, brand }) {
  // console.log(brand);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{brand.name}</h2>}
    >
      <Head title={brand.name} />
      <Content>

        {brand.url && brand.url.length > 0 && (
        <a
          className="italic hover:underline"
          rel="noreferrer"
          target="_blank"
          href={brand.url}
        >
          {brand.url}
        </a>
        )}
        <div className="m-2 border-2 p-2 border-slate-500 col justify-start items-start whitespace-pre-wrap overflow-y-scroll h-[500px] w-[500px]">
          <span className="row all-center w-full">
            There are
            <span className="text-xl mx-1.5 italic font-mono font-bold">{brand.items?.length || 0}</span>
            {brand.name} Items in the database
          </span>
          <ItemList>
            {brand.items.map((item, id) => (
              <ItemListItem key={`item-list-item-${id}`}>
                <ListLink href={`/item/${item.id}`}>
                  {item.name ? item.name : `Item ${id}`}
                </ListLink>
              </ItemListItem>
            ))}
          </ItemList>
        </div>
        <FormButton onClick={() => router.get(`/brand/${brand.id}/edit`)}>
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
                    router.delete(`/brand/${brand.id}`);
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

export default ShowBrand;
