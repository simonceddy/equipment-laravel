import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';

const typesCols = [
  { label: 'Name', key: 'name' },
];

const renderers = {
  name: (type) => (
    <Link href={`/type/${type.id}`}>
      {type.name}
    </Link>
  )
};

/* eslint-disable no-unused-vars */
function ListTypes({ types = [], page = 1, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Types</h2>}
    >
      <Head title="Types" />
      <Content>
        <Table rows={types} cols={typesCols} renderers={renderers} />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListTypes;
