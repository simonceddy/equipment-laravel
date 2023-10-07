/* eslint-disable import/no-unresolved */
import {
  Head, Link, router, useRemember
} from '@inertiajs/react';
import { useCallback, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import baseUrl from '@/util/baseUrl';
import PageHeader from '@/Components/PageHeader';
import sortUrl from '@/util/sortUrl';
import formateDatetime from '@/util/formateDatetime';

const typesCols = [
  {
    key: 'selectItem', label: 'Select'
  },
  {
    key: 'name',
    label: () => (
      <Link
        className="w-full block text-left hover:underline"
        href={sortUrl('/types', router.activeVisit?.url, 'name')}
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
        href={sortUrl('/types', router.activeVisit?.url, 'items_count')}
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
        href={sortUrl('/types', router.activeVisit?.url, 'created_at')}
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
        href={sortUrl('/types', router.activeVisit?.url, 'updated_at')}
      >
        Updated
      </Link>
    )
  },
];

const renderers = (handleSelect, selectedItems) => ({
  selectItem: (type) => (
    <input
      type="checkbox"
      className="mx-2"
      checked={selectedItems[type.id] || false}
      onChange={() => handleSelect(type.id)}
    />
  ),
  name: (type) => (
    <Link className="w-full block text-left hover:underline" href={`/type/${type.id}`}>
      {type.name}
    </Link>
  ),
  created_at: (type) => {
    if (!type.created_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(type.created_at)}
      </span>
    );
  },
  updated_at: (type) => {
    if (!type.updated_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(type.updated_at)}
      </span>
    );
  },
});

/* eslint-disable no-unused-vars */
function ListTypes({ data, auth }) {
  // console.log(types);
  const [filter, setFilter] = useRemember('');

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
      baseURL={baseUrl('/types', router.activeVisit?.url) || '/types?'}
    />
  ), [data]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Types</PageHeader>}
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
              value={typeof filter === 'string' ? filter : ''}
              onChange={(e) => setFilter(e.target.value)}
            />
            <FormButton submits>
              Go
            </FormButton>
          </form>
          <FormButton onClick={() => router.get('/type/create')}>
            Add New Type
          </FormButton>
        </div>
        <Pgn />
        <Table rows={data.data} cols={typesCols} renderers={colRenderers} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListTypes;
