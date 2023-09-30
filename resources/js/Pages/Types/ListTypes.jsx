/* eslint-disable import/no-unresolved */
import {
  Head, Link, router, useRemember
} from '@inertiajs/react';
import { useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import baseUrl from '@/util/baseUrl';

const typesCols = [
  { label: 'Name', key: 'name' },
  { label: 'Items', key: 'items_count' },
];

const renderers = {
  name: (type) => (
    <Link className="w-full block text-left hover:underline" href={`/type/${type.id}`}>
      {type.name}
    </Link>
  )
};

/* eslint-disable no-unused-vars */
function ListTypes({ data, auth }) {
  // console.log(types);
  const [filter, setFilter] = useRemember('');

  const Pgn = useCallback(() => (
    <Pagination
      current={data.current_page}
      total={data.last_page}
      baseURL={baseUrl(router.activeVisit?.url) || '/types?'}
    />
  ), [data]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Types</h2>}
    >
      <Head title="Types" />
      <Content>
        <div
          className="row justify-between items-center w-full"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (filter.trim().length > 0) {
                router.get(`/types?filter=${filter}`);
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
        <Table rows={data.data} cols={typesCols} renderers={renderers} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListTypes;
