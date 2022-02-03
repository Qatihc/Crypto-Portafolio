import styled from "styled-components";

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
const TableHeader = styled.th`
  width: 150px;
  background-color: var(--clr-gray-3);
  color: var(--clr-gray-7);
  text-transform: lowercase;
  font-variant: small-caps;
`
const TableData = styled.td`
  height: 45px;
  width: 150px;
  color: var(--clr-gray-8);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: all .3s ease-in-out;
  overflow: hidden;
`
const TableActions = styled.div`
  display: flex;
  right: 0;
  justify-content: space-between;
  margin: var(--size-2) var(--size-5);
`
const ScrollableContainer = styled('div')`
  overflow: auto;
`

export { TableRow, TableHeader, TableData, TableActions, ScrollableContainer }