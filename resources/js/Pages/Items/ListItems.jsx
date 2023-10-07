/* eslint-disable import/no-unresolved */
import {
  Head, Link, router, useRemember
} from '@inertiajs/react';
import {
  useCallback, useState
} from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';
import Pagination from '@/Components/Pagination';
import ListLink from '@/Components/ListLink';
import TextInput from '@/Components/Forms/TextInput';
import FormButton from '@/Components/Forms/FormButton';
import baseUrl from '@/util/baseUrl';
import sortUrl from '@/util/sortUrl';
import PageHeader from '@/Components/PageHeader';
import formateDatetime from '@/util/formateDatetime';
import addUrlFilter from '@/util/addUrlFilter';

const cols = [
  {
    key: 'selectItem', label: 'Select'
  },
  {
    key: 'brand',
    label: () => (
      <Link
        className="w-full block text-left hover:underline"
        href={sortUrl('/items', router.activeVisit?.url, 'brand')}
      >
        Brand
      </Link>
    )
  },
  {
    key: 'name',
    label: () => (
      <Link
        className="w-full block text-left hover:underline"
        href={sortUrl('/items', router.activeVisit?.url, 'name')}
      >
        Name
      </Link>
    )
  },
  {
    key: 'type',
    label: 'Type'
  },
  {
    key: 'created_at',
    label: () => (
      <Link
        className="w-full block text-left hover:underline"
        href={sortUrl('/items', router.activeVisit?.url, 'created_at')}
      >
        Created
      </Link>
    )
  },
  {
    key: 'updated_at',
    label: () => (
      <Link
        className="w-full block text-left hover:underline"
        href={sortUrl('/items', router.activeVisit?.url, 'updated_at')}
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
  brand: (item) => item.brand && (
    <ListLink href={`/brand/${item.brand.id}`}>
      {item.brand.name}
    </ListLink>
  ),
  name: (item) => (
    <ListLink href={`/item/${item.id}`}>
      {item.name}
    </ListLink>
  ),
  type: (item) => {
    if (!item.types || item.types.length === 0) return '';
    return (
      <span className="w-[170px] inline-block overflow-ellipsis whitespace-nowrap overflow-hidden">
        {item.types.map((t) => t.name).join(', ')}
      </span>
    );
  },
  created_at: (item) => {
    if (!item.created_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(item.created_at)}
      </span>
    );
  },
  updated_at: (item) => {
    if (!item.updated_at) return null;
    return (
      <span className="text-sm">
        {formateDatetime(item.updated_at)}
      </span>
    );
  },
});

/* eslint-disable no-unused-vars */
function ListItems({
  data, auth
}) {
  const [filter, setFilter] = useRemember(
    router.activeVisit?.url?.searchParams?.get('filter') || ''
  );
  const [selectedItems, setSelectedItems] = useState({});

  const colRenderers = renderers((id) => {
    if (selectedItems[id] === undefined || selectedItems[id] === false) {
      setSelectedItems({
        ...selectedItems,
        [id]: true
      });
    } else setSelectedItems({ ...selectedItems, [id]: false });
    // console.log(id);
  }, selectedItems);

  const Pgn = useCallback(() => (
    <Pagination
      current={data.current_page}
      total={data.last_page}
      baseURL={baseUrl('/items', router.activeVisit?.url) || '/items?'}
    />
  ), [data]);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>Items</PageHeader>}
    >
      <Head title="Items" />
      <Content>
        <div className="row justify-between items-center w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const f = filter.trim();
              if (f.length > 0) {
                router.get(addUrlFilter('/items', router.activeVisit.url, f));
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
          <FormButton onClick={() => router.get('/item/create')}>
            Add New Item
          </FormButton>
        </div>
        <Pgn />
        <Table cols={cols} renderers={colRenderers} rows={data.data} />
        <Pgn />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListItems;
