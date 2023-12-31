/* eslint-disable import/no-unresolved */
import parse from 'html-react-parser';
import { Head, Link, router } from '@inertiajs/react';
import { confirmAlert } from 'react-confirm-alert';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Content from '@/Components/Content';
import FormButton from '@/Components/Forms/FormButton';
import ItemTypes from '@/Components/Items/ItemTypes';
import ExternalLink from '@/Components/ExternalLink';
import PageHeader from '@/Components/PageHeader';
import ItemSize from '@/Components/Items/ItemSize';
import MGLink from '@/Components/MGLink';
import PELink from '@/Components/PELink';
import Modal from '@/Components/Modal';

function ShowItem({ auth, item, types }) {
  // console.log(item.data);
  const [viewImage, setViewImage] = useState(false);
  useEffect(() => {
    const els = document.getElementsByClassName('clickable-image');
    if (els.length > 0) {
      Array.from(els).forEach((el) => {
        el.addEventListener('click', () => {
          setViewImage(el.src);
        });
        // console.log(el.src);
      });
    }
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<PageHeader>{item.name}</PageHeader>}
    >
      <Head title={`${item.brand?.name} - ${item.name}`} />
      {viewImage && (
        <Modal
          show
          onClose={() => {
            setViewImage(false);
          }}
        >
          <img src={viewImage} alt={`${item.name}-${viewImage}`} />
        </Modal>
      )}
      <Content>
        <div className="w-full sm:w-11/12 md:w-5/6 lg:w-4/5 p-2 row justify-between items-start">
          <div className="col all-center">
            {item.data?.size && (<ItemSize item={item} />)}
            {item.data?.price && (
            <div className="col all-center m-1 p-1 border rounded border-slate-500">
              {item.data.price.aud && (
                <span>AUD - ${item.data.price.aud}</span>
              )}
              {item.data.price.eur && (
                <span>EUR - €{item.data.price.eur}</span>
              )}
              {item.data.price.usd && (
                <span>USD - ${item.data.price.usd}</span>
              )}
            </div>
            )}
          </div>
          <div className="col all-center">
            {item.brand && item.brand.id && (
              <h2 className="text-lg font-bold m1">
                <Link href={`/brand/${item.brand.id}`}>
                  {item.brand.name || `Brand ${item.brand.id}`}
                </Link>
              </h2>
            )}
            {item.url && item.url.length > 0 && (<ExternalLink url={item.url} />)}
            {(item.data && (item.data.modulargrid_slug || item.data.modulargrid_url)) && (
              <MGLink url={item.data.modulargrid_url} slug={item.data.modulargrid_slug} />
            )}
            {(item.data && (item.data.pedalempire_url)) && (
              <PELink url={item.data.pedalempire_url} />
            )}
          </div>
        </div>
        {item.data?.description && (
          <div className="my-2 item-description w-auto sm:w-5/6 md:w-4/5 lg:w-3/4 mx-4 p-2 rounded bg-green-200/30">
            {parse(item.data.description)}
          </div>
        )}
        <ItemTypes
          itemTypes={item.types}
          types={types}
          onAdd={(id) => {
            router.put(`/item/${item.id}/addType/${id}`);
          }}
          onRemove={(id) => {
            router.put(`/item/${item.id}/removeType/${id}`);
          }}
        />
        <div className="row justify-around items-center w-full">
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
        </div>
      </Content>
    </AuthenticatedLayout>
  );
}

export default ShowItem;
