import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';

function ShowType({ auth, type }) {
  // console.log(type);
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{type.name}</h2>}
    >
      <Head title={`${type.name}`} />
      <Content>
        {type.items && type.items.map((item, id) => (
          <Link
            key={`type-${type.id}-item-${id}-link`}
            className="italic hover:underline"
            href={`/item/${item.id}`}
          >
            {item.brand?.name} {item.name}
          </Link>
        ))}
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowType;
