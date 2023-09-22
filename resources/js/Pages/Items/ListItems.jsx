import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';

const cols = [
  { key: 'brand', label: 'Brand' },
  { key: 'name', label: 'Name' },
];

const renderers = {
  brand: (item) => item.brand && (
    <Link href={`/brand/${item.brand.id}`}>
      {item.brand.name}
    </Link>
  ),
  name: (item) => (
    <Link href={`/item/${item.id}`}>
      {item.name}
    </Link>
  )
};

/* eslint-disable no-unused-vars */
function ListItems({
  items = [], total, page = 1, auth
}) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">items</h2>}
    >
      <Head title="Items" />
      <Content>
        <div>{total} items in database</div>
        <Table cols={cols} renderers={renderers} rows={items} />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListItems;
