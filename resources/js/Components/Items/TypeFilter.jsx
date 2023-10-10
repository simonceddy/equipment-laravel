import { useRemember } from '@inertiajs/react';
import Select from '../Forms/Select';
import FormButton from '../Forms/FormButton';

function TypeFilter({
  types = [], onSubmit, filters = {}, submitOnClear = true
}) {
  const [fltrs, setFltrs] = useRemember({
    filter1: filters && filters.filter1 ? filters.filter1 : 0,
    filter2: filters && filters.filter2 ? filters.filter2 : 0,
  });

  const t = [{ id: 0, name: '-- Type ---' }, ...types];
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(fltrs);
      }}
    >
      <Select
        opts={t}
        value={fltrs.filter1}
        onChange={(e) => {
          setFltrs({
            ...fltrs,
            filter1: Number(e.target.value)
          });
        }}
      />
      <Select
        opts={t}
        value={fltrs.filter2}
        onChange={(e) => {
          setFltrs({
            ...fltrs,
            filter2: Number(e.target.value)
          });
        }}
      />
      <FormButton submits>
        Go
      </FormButton>
      <FormButton
        onClick={() => {
          setFltrs({ filter1: 0, filter2: 0 });
          if (submitOnClear && onSubmit) onSubmit(fltrs);
        }}
      >
        Clear
      </FormButton>
    </form>
  );
}

export default TypeFilter;
