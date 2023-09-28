/* eslint-disable import/no-unresolved */
import { Head, router, useRemember } from '@inertiajs/react';
import { useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import ListLink from '@/Components/ListLink';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';

const cols = [
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

/* eslint-disable no-unused-vars */
function ListItems({
  data, auth
}) {
  const [filter, setFilter] = useRemember('');
  const Pgn = useCallback(() => (
    <Pagination current={data.current_page} total={data.last_page} baseURL="/items" />
  ), [data]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">items</h2>}
    >
      <Head title="Items" />
      <Content>
        <div className="row justify-between items-center w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (filter.trim().length > 0) {
                router.get(`/items?filter=${filter}`);
              }
            }}
            className="row all-center m-2 p-2"
          >
            <TextInput
              label="Filter:"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormButton submits>
              Go
            </FormButton>
          </form>
          <FormButton onClick={() => router.get('/brand/create')}>
            Add New Brand
          </FormButton>
        </div>
        <Pgn />
        <Table cols={cols} renderers={renderers} rows={data.data} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListItems;
