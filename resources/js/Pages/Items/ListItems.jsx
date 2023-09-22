import { Head, Link } from '@inertiajs/react';
import ItemList from '@/Components/Items/ItemList';
import ItemListItem from '@/Components/Items/ItemListItem';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';

/* eslint-disable no-unused-vars */
function ListItems({ items = [], page = 1, auth }) {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">items</h2>}
    >
      <Head title="Items" />
      <Content>

        <ItemList>
          {items.map((item, id) => (
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

export default ListItems;
