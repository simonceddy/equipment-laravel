/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import ItemList from '@/Components/Items/ItemList';
import ItemListItem from '@/Components/Items/ItemListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import ListLink from '@/Components/ListLink';
import FormButton from '@/Components/Forms/FormButton';
import PageHeader from '@/Components/PageHeader';
import ExternalLink from '@/Components/ExternalLink';

function ShowBrand({ auth, brand }) {
  // console.log(brand);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>{brand.name}</PageHeader>}
    >
      <Head title={brand.name} />
      <Content>

        {brand.url && brand.url.length > 0 && (<ExternalLink url={brand.url} />)}
        <div className="m-2 border-2 p-2 border-slate-500 col justify-start items-start whitespace-pre-wrap overflow-y-scroll h-[500px] w-[500px]">
          <span className="row all-center w-full">
            There {brand.items?.length === 1 ? 'is' : 'are'}
            <span className="text-xl mx-1.5 italic font-mono font-bold">{brand.items?.length || 0}</span>
            {brand.name} item{brand.items?.length === 1 ? '' : 's'} in the database
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
        <div className="row w-full justify-around items-center">
          <FormButton onClick={() => router.get(`/item/create?brandId=${brand.id}`)}>
            Add Brand Item
          </FormButton>
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
        </div>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowBrand;
