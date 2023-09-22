import { Head, Link } from '@inertiajs/react';
import BrandList from '@/Components/Brands/BrandList';
import BrandListItem from '@/Components/Brands/BrandListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import Table from '@/Components/Tables/Table';

const cols = [
  { key: 'name', label: 'Name' },
];

const renderers = {
  name: (brand) => <Link href={`/brand/${brand.id}`}>{brand.name}</Link>
};

/* eslint-disable no-unused-vars */
function ListBrands({ brands = [], page = 1, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Brands</h2>}
    >
      <Head title="Brands" />
      <Content>
        <Table rows={brands} cols={cols} renderers={renderers} />
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListBrands;
