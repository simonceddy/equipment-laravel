/* eslint-disable import/no-unresolved */
import {
  Head, Link, router, useRemember
} from '@inertiajs/react';
import { useCallback, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import FormButton from '@/Components/Forms/FormButton';
import TextInput from '@/Components/Forms/TextInput';
import baseUrl from '@/util/baseUrl';
import sortUrl from '@/util/sortUrl';
import PageHeader from '@/Components/PageHeader';
import formateDatetime from '@/util/formateDatetime';
import clearUrlFilter from '@/util/clearUrlFilter';
import addUrlFilter from '@/util/addUrlFilter';

const cols = [
  {
    key: 'selectItem', label: 'Select'
  },
  {
    key: 'name',
    label: () => (
      <Link
        className="w-full inline-block text-left hover:underline"
        href={sortUrl('/brands', router.activeVisit?.url, 'name')}
      >
        Name
      </Link>
    )
  },
  {
    key: 'items_count',
    label: () => (
      <Link
        className="w-full inline-block text-left hover:underline"
        href={sortUrl('/brands', router.activeVisit?.url, 'items_count')}
      >
        Items
      </Link>
    )
  },
  {
    key: 'created_at',
    label: () => (
      <Link
        className="w-full inline-block text-left hover:underline"
        href={sortUrl('/brands', router.activeVisit?.url, 'created_at')}
      >
        Created
      </Link>
    )
  },
  {
    key: 'updated_at',
    label: () => (
      <Link
        className="w-full inline-block text-left hover:underline"
        href={sortUrl('/brands', router.activeVisit?.url, 'updated_at')}
      >
        Updated
      </Link>
    )
  }
];

const renderers = (handleSelect, selectedItems) => ({
  selectItem: (item) => (
    <input
      type="checkbox"
      className="mx-2"
      checked={selectedItems[item.id] || false}
      onChange={() => handleSelect(item.id)}
    />
  ),
  name: (brand) => (
    <Link preserveState className="w-full block text-left hover:underline" href={`/brand/${brand.id}`}>
      {brand.name}
    </Link>
  ),
  created_at: (brand) => {
    if (!brand.created_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(brand.created_at)}
      </span>
    );
  },
  updated_at: (brand) => {
    if (!brand.updated_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(brand.updated_at)}
      </span>
    );
  },
});

/* eslint-disable no-unused-vars */
function ListBrands({ data, auth }) {
  // console.log(data);
  const [filter, setFilter] = useRemember(router.activeVisit?.url?.searchParams?.get('filter') || '');

  const [selectedItems, setSelectedItems] = useState({});

  const colRenderers = renderers((id) => {
    if (selectedItems[id] === undefined || selectedItems[id] === false) {
      setSelectedItems({
        ...selectedItems,
        [id]: true
      });
    } else setSelectedItems({ ...selectedItems, [id]: false });
    console.log(id);
  }, selectedItems);

  const Pgn = useCallback(() => (
    <Pagination
      current={data.current_page}
      total={data.last_page}
      baseURL={baseUrl('/brands', router.activeVisit?.url) || '/brands?'}
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
              const f = filter.trim();
              if (f.length > 0) {
                router.get(addUrlFilter('/brands', router.activeVisit.url, f));
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
            <FormButton
              onClick={() => {
                router.get(clearUrlFilter('/brands', router.activeVisit.url));
              }}
            >
              Clear
            </FormButton>
          </form>
          <FormButton onClick={() => router.get('/brand/create')}>
            Add New Brand
          </FormButton>
        </div>
        <Pgn />
        <Table rows={data.data} cols={cols} renderers={colRenderers} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListBrands;
