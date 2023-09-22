import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TypeList from '@/Components/Types/TypeList';
import TypeListItem from '@/Components/Types/TypeListItem';

function ShowItem({ auth, item }) {
  // console.log(item);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{item.name}</h2>}
    >
      <Head title={`${item.brand?.name} - ${item.name}`} />
      <Content>
        {item.brand && item.brand.id && (
          <h2>
            <Link href={`/brand/${item.brand.id}`}>
              {item.brand.name || `Brand ${item.brand.id}`}
            </Link>
          </h2>
        )}
        {item.url && item.url.length > 0 && (
          <a
            className="italic hover:underline"
            rel="noreferrer"
            target="_blank"
            href={item.url}
          >
            {item.url}
          </a>
        )}
        <div>
          {item.types && (
          <TypeList>
            {item.types.map((type) => (
              <TypeListItem key={`item-${item.id}-type-${type.id}`}>
                <Link href={`/type/${type.id}`}>
                  {type.name}
                </Link>
              </TypeListItem>
            ))}
          </TypeList>
          )}
        </div>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowItem;
