import styled from "styled-components";
import { devices } from "../constants";


const TableRow = styled.tr`
  box-sizing: border-box;
  width: fit-content;
  border: 2px solid var(--clr-gray-2);
  &:nth-child(2n) {
    background-color: var(--clr-accent-1);
  }
  &:hover td {
    background-color: var(--clr-gray-3);
    color: var(--clr-gray-11);
  }
`

export default TableRow;