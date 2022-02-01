import React from 'react';
import { AiOutlineDoubleRight as RightDoubleArrow, AiOutlineRight as RightArrow } from "react-icons/ai";
import styled from 'styled-components';

const LeftDoubleArrow = styled(RightDoubleArrow)`
  transform: rotate(180deg);
`

const LeftArrow = styled(RightArrow)`
  transform: rotate(180deg);
`

const PaginationButton = styled.button`
  background-color: transparent;
  width: var(--size-6);
  height: var(--size-6);
  border: none;
  font-size: var(--size-6);
  cursor: pointer;
`
const CurrentPage = styled.span`
  font-size: var(--size-6);
`

const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`

const PageSelector = ({ currentPage, setCurrentPage, pageSize, elementCount }) => {
  const firstPage = 1;
  const lastPage = Math.ceil(elementCount / pageSize);
  const canPreviousPage = currentPage > firstPage;
  const canNextPage = currentPage < lastPage;

  return (
    <PaginationContainer>
      <div>
        <PaginationButton onClick={() => setCurrentPage(firstPage)} disabled={!canPreviousPage}>
          <LeftDoubleArrow />
        </PaginationButton>
        <PaginationButton onClick={() => setCurrentPage(currentPage - 1)} disabled={!canPreviousPage}>
          <LeftArrow />
        </PaginationButton>
      </div>
      <CurrentPage>{currentPage}</CurrentPage>
      <div>
        <PaginationButton onClick={() => setCurrentPage(currentPage + 1)} disabled={!canNextPage}>
          <RightArrow />
        </PaginationButton>
        <PaginationButton onClick={() => setCurrentPage(lastPage)} disabled={!canNextPage}>
          <RightDoubleArrow />
        </PaginationButton>
      </div>
    </PaginationContainer>
  )
}

export default PageSelector;
