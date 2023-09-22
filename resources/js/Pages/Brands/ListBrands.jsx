import { Head, Link } from '@inertiajs/react';
import BrandList from '@/Components/Brands/BrandList';
import BrandListItem from '@/Components/Brands/BrandListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';

/* eslint-disable no-unused-vars */
function ListBrands({ brands = [], page = 1, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Brands</h2>}
    >
      <Head title="Brands" />
      <Content>
        <BrandList>
          {brands.map((brand, id) => (
            <BrandListItem key={`brand-list-item-${id}`}>
              <Link href={`/brand/${brand.id}`}>
                {brand.name ? brand.name : `Brand ${id}`}
              </Link>
            </BrandListItem>
          ))}
        </BrandList>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ListBrands;
