import styled from "styled-components";
import { devices } from "../constants";


const TableRow = styled.tr`
  display: flex;
  width: fit-content;
  border: 1px solid var(--clr-gray-2);
  &:nth-child(2n) {
    background-color: var(--clr-accent-1);
  }
  &:nth-child(2n + 1) {
    background-color: var(--clr-gray-1);
  }
  &:hover td:not(.empty) {
    background-color: var(--clr-gray-3);
    color: var(--clr-gray-11);
  }

`

export default TableRow;