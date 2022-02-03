import React from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/src/common';
import styled from 'styled-components';

const PageContainer = styled.div`
  display: flex;
  grid-column: 1/-1;
  flex-direction: column;
  align-items: center;
`

const UserFormContainer = styled.div`
  margin-top: var(--size-8);
  width: min(90vw, var(--size-15));
`

const LandingPage = ({ form }) => {
  const currentUser = useSelector(selectCurrentUser);
  if (currentUser) return <Navigate to="/portfolio" />
  return (
    <PageContainer>
      <UserFormContainer>
        {form}
      </UserFormContainer>
    </PageContainer>
  )
}

export default LandingPage;