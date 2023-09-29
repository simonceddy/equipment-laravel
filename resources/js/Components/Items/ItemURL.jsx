import { FaLink } from 'react-icons/fa';

function ItemURL({ url }) {
  return (
    <a
      className="italic row all-center m-2 hover:underline"
      rel="noreferrer"
      target="_blank"
      href={url}
    >
      <FaLink size={18} className="mr-1" />
      {url}
    </a>
  );
}

export default ItemURL;
