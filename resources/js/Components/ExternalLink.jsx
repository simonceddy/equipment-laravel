import { FaLink } from 'react-icons/fa';

function ExternalLink({ url, className = 'text-sm' }) {
  return (
    <a
      className={`italic row all-center m-2 hover:underline ${className}`}
      rel="noreferrer"
      target="_blank"
      href={url}
    >
      <FaLink size={16} className="mr-1" />
      {url}
    </a>
  );
}

export default ExternalLink;
