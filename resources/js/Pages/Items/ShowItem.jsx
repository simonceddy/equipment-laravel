import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';

function ShowItem({ auth, item }) {
  console.log(item);
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
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowItem;
