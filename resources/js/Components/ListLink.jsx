import { Link } from '@inertiajs/react';

function ListLink({ children, href }) {
  return (
    <Link className="hover:underline not-italic active:italic w-full block text-left" href={href}>
      {children}
    </Link>
  );
}

export default ListLink;
