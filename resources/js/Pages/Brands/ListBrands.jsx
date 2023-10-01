/* eslint-disable import/no-unresolved */
import {
  Head, Link, router, useRemember
} from '@inertiajs/react';
import { useCallback } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import FormButton from '@/Components/Forms/FormButton';
import TextInput from '@/Components/Forms/TextInput';
import baseUrl from '@/util/baseUrl';
import sortUrl from '@/util/sortUrl';
import PageHeader from '@/Components/PageHeader';

const cols = [
  {
    key: 'name',
    label: () => (
      <Link href={sortUrl(router.activeVisit?.url, 'name')}>
        Name
      </Link>
    )
  },
  {
    key: 'items_count',
    label: () => (
      <Link href={sortUrl(router.activeVisit?.url, 'items_count')}>
        Items
      </Link>
    )
  }
];

const renderers = {
  name: (brand) => (
    <Link preserveState className="w-full block text-left hover:underline" href={`/brand/${brand.id}`}>
      {brand.name}
    </Link>
  )
};

/* eslint-disable no-unused-vars */
function ListBrands({ data, auth }) {
  // console.log(data);
  const [filter, setFilter] = useRemember(router.activeVisit?.url?.searchParams?.get('filter') || '');
  const Pgn = useCallback(() => (
    <Pagination
      current={data.current_page}
      total={data.last_page}
      baseURL={baseUrl(router.activeVisit?.url) || '/brands?'}
    />
  ), [data]);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Brands</PageHeader>}
    >
      <Head title="Brands" />
      <Content>
        <div className="row justify-between items-center w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (filter.trim().length > 0) {
                router.get(`/brands?filter=${filter}`);
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
        <Table rows={data.data} cols={cols} renderers={renderers} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListBrands;
