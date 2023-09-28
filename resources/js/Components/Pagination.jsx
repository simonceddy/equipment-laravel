import { Link } from '@inertiajs/react';

function PaginationButton({ children, href, disabled = false }) {
  // console.log(disabled);
  return (
    <Link
      as="button"
      className="m-1 p-1 border-2 hover:underline bg-black text-white hover:text-yellow-400 active:text-green-400 border-slate-500 hover:border-yellow-500 active:border-green-500"
      disabled={disabled}
      href={href}
    >
      {children}
    </Link>
  );
}

function Pagination({ current, total, baseURL }) {
  if (!current || !total || !baseURL) {
    console.log('missing or no pagination data');
    return null;
  }
  return (
    <div className="row items-center justify-around p-2 w-full">
      <span className="mx-2 text-lg">
        Page {current} of {total}
      </span>
      {total > 1 && (
        <div className="row all-center mx-2">
          <PaginationButton href={`${baseURL}?page=1`} disabled={current <= 1}>
            First
          </PaginationButton>
          <PaginationButton href={`${baseURL}?page=${current - 1}`} disabled={current <= 1}>
            Previous
          </PaginationButton>
          <PaginationButton href={`${baseURL}?page=${current + 1}`} disabled={current >= total}>
            Next
          </PaginationButton>
          <PaginationButton href={`${baseURL}?page=${total}`} disabled={current >= total}>
            Last
          </PaginationButton>
        </div>
      )}
    </div>
  );
}

export default Pagination;
