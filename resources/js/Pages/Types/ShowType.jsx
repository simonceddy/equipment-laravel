/* eslint-disable import/no-unresolved */
import { Head, router } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import FormButton from '@/Components/Forms/FormButton';
import Table from '@/Components/Tables/Table';
import ListLink from '@/Components/ListLink';
import PageHeader from '@/Components/PageHeader';

const itemsCols = [
  { key: 'brand', label: 'Brand' },
  { key: 'name', label: 'Name' },
];

const renderers = {
  brand: (item) => item.brand && (
    <ListLink href={`/brand/${item.brand.id}`}>
      {item.brand.name}
    </ListLink>
  ),
  name: (item) => (
    <ListLink href={`/item/${item.id}`}>
      {item.name}
    </ListLink>
  )
};

function ShowType({ auth, type, totalItems }) {
  // console.log(type);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>{type.name}</PageHeader>}
    >
      <Head title={`${type.name}`} />
      <Content>

        <FormButton onClick={() => router.get(`/type/${type.id}/edit`)}>
          Edit
        </FormButton>
        {totalItems && (
        <span className="mt-2 mx-2 bg-slate-500/30 p-2 text-lg font-bold">
          {totalItems} total items with type {type.name}
        </span>
        )}
        <div className="col w-full h-auto bg-green-500/30 rounded-lg">
          <div className="p-2 col justify-start items-start whitespace-pre-wrap overflow-y-scroll h-[480px] w-full">
            <Table cols={itemsCols} rows={type.items} renderers={renderers} />
          </div>
        </div>
        <FormButton
          onClick={() => {
            confirmAlert({
              overlayClassName: 'absolute bg-black text-white p-8 border-2 border-slate-400 rounded-lg bottom-4 left-[45%]',
              buttons: [
                {
                  className: 'm-2 p-2 font-bold border-2 rounded-lg bg-green-900 text-white hover:underline active:bg-green-600',
                  label: 'Yes',
                  onClick: () => {
                    router.delete(`/type/${type.id}`);
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

export default ShowType;
