/* eslint-disable import/no-unresolved */
import { Head, Link, router } from '@inertiajs/react';
import { FaLink } from 'react-icons/fa';
import { confirmAlert } from 'react-confirm-alert';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import TypeList from '@/Components/Types/TypeList';
import TypeListItem from '@/Components/Types/TypeListItem';
import ListLink from '@/Components/ListLink';
import FormButton from '@/Components/Forms/FormButton';

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
            className="italic row all-center m-2 hover:underline"
            rel="noreferrer"
            target="_blank"
            href={item.url}
          >
            <FaLink size={18} className="mr-1" />
            {item.url}
          </a>
        )}
        <div className="w-5/6 col bg-green-500/30 rounded-lg">
          <span
            className="text-lg rounded-t-lg font-bold underline p-1 w-full text-left bg-slate-500/30"
          >
            Associated Types
          </span>
          {item.types && (
          <TypeList>
            {item.types.map((type) => (
              <TypeListItem key={`item-${item.id}-type-${type.id}`}>
                <ListLink href={`/type/${type.id}`}>
                  {type.name}
                </ListLink>
              </TypeListItem>
            ))}
          </TypeList>
          )}
        </div>
        <FormButton onClick={() => router.get(`/item/${item.id}/edit`)}>
          Edit
        </FormButton>
        <FormButton
          onClick={() => {
            confirmAlert({
              overlayClassName: 'absolute bg-black text-white p-8 border-2 border-slate-400 rounded-lg bottom-4 left-[45%]',
              buttons: [
                {
                  className: 'm-2 p-2 font-bold border-2 rounded-lg bg-green-900 text-white hover:underline active:bg-green-600',
                  label: 'Yes',
                  onClick: () => {
                    router.delete(`/item/${item.id}`);
                  }
                },
                {
                  className: 'm-2 p-2 font-bold border-2 rounded-lg bg-red-900 text-white hover:underline active:bg-red-600',
                  label: 'No',
                },
              ]
            });
          }}
        >
          Delete
        </FormButton>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowItem;
