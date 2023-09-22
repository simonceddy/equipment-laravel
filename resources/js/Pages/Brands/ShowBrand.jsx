import { Head, Link } from '@inertiajs/react';
import ItemList from '@/Components/Items/ItemList';
import ItemListItem from '@/Components/Items/ItemListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';

function ShowBrand({ auth, brand }) {
  // console.log(brand);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{brand.name}</h2>}
    >
      <Head title={brand.name} />
      <Content>

        {brand.url && brand.url.length > 0 && (
        <a
          className="italic hover:underline"
          rel="noreferrer"
          target="_blank"
          href={brand.url}
        >
          {brand.url}
        </a>
        )}
        <ItemList>
          {brand.items.map((item, id) => (
            <ItemListItem key={`item-list-item-${id}`}>
              <Link href={`/item/${item.id}`}>
                {item.name ? item.name : `Item ${id}`}
              </Link>
            </ItemListItem>
          ))}
        </ItemList>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowBrand;
