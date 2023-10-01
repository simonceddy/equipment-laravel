function ItemSize({ item = {} }) {
  // console.log(item.data?.size);
  if (!item.data || !item.data.size) return null;
  return (
    <div className="col m-1 border rounded border-slate-500 p-1">
      {item.data.size.hp && (
        <span className="m-1">{item.data.size.hp}HP</span>
      )}
      {item.data.size['1u'] && (
        <span className="m-1">1u</span>
      )}
      {item.data.size.depth && (
        <span className="m-1">Depth: {item.data.size.depth}mm</span>
      )}
      {item.data.size.width && (
        <span className="m-1">Width: {item.data.size.width}mm</span>
      )}
      {item.data.size.height && (
        <span className="m-1">Height: {item.data.size.height}mm</span>
      )}
    </div>
  );
}

export default ItemSize;
