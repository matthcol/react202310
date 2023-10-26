import { useState } from "react";

export function useValues(n) {
  const [values, setValues] = useState([...Array(n).keys()].map((i) => i + 1));

  function toggleUse(v) {
    console.log(`toggle value ${v}`);
    if (values.indexOf(v) === -1) {
      let newValues = [...values, v];
      newValues.sort();
      setValues(newValues);
    } else {
      setValues(values.filter((nb) => nb !== v));
    }
  }

  return [values, toggleUse];
}
