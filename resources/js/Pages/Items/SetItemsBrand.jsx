function SetItemsBrand({ items = [], brands = [] }) {
  return (
    <div>
      {items.map((item) => (
        <div key={`item-container-${item.id}`}>
          {item.name || ''}
        </div>
      ))}
      {brands.length}
    </div>
  );
}

export default SetItemsBrand;
