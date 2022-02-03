import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditableCell = ({ row, value: initialValue, column, className }) => {
  const columnName = column.id;
  if (!row.editedValues) row.editedValues = {};
  const [value, setValue] = useState(parseFloat(initialValue));
  useEffect(() => {
    /* Esta bugueado, si trato de volver al valor original con una update no actualiza y manda el valor anterior. Arreglar. */
    if (row.original[columnName] !== value) {
      row.editedValues[columnName] = value;
    }
  }, [value]);

  const type = (column.type) ? column.type : 'text';

  const handleChange = (e) => {
    console.log(row)
    setValue(e.target.value)
  }

  return <input className={className} type={type} value={value} onChange={handleChange} />
}

export default styled(EditableCell)`
  width: 60%;
  border-radius: 3px;
  border: 1px solid var(--clr-gray-4);
`;