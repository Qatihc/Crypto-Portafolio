import React from 'react';

const childrenByType = (children, type) => 
  React.Children.toArray(children).filter(child => (child.type === type || child.type?.target === type));

const firstChildByType = (children, type) =>
  childrenByType(children, type)[0];

export { childrenByType, firstChildByType };
