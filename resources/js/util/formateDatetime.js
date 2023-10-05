const formateDatetime = (timestamp) => {
  const d = new Date(timestamp);
  // console.log(d);

  return d.toLocaleString();
};

export default formateDatetime;
