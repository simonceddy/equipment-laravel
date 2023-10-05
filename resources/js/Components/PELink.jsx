import ExternalLink from './ExternalLink';

const baseURL = 'https://www.pedalempire.com.au';

function PELink({ slug, url, }) {
  if (!url && !slug) return null;
  const u = `${baseURL}${url || `e/${slug}`}`;

  return (
    <ExternalLink url={u} />
  );
}

export default PELink;
