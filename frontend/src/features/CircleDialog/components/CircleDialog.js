import React, { useState  } from 'react';
import styled from 'styled-components';
import PlusIcon from './PlusIcon';

const AnimatedPlusIcon = styled(PlusIcon)`
  cursor: pointer;
  position: relative;
  z-index: 2;
  transition: 
    transform .3s linear,
    background-color .3s ease-in-out;
  
  ${
    ({ active }) => active ?
    `
      transform: rotate(45deg);
    ` :
    ' color: black;'
  }
`

const Dialog = styled.div`
  position: absolute;
  ${({ buttonPosition, iconSize }) =>
    `${buttonPosition}: ${iconSize};`
  }

  right: 0;
  transition: all .3s ease-in-out;
  ${
    ({ active, iconSize, topOffset }) => active ?
    `
      clip-path: circle(100% at 50% 50%);
    ` :
    `
      clip-path: circle(0% at calc(100% - ${iconSize}) ${topOffset});
    `
  }
`

const CircleDialog = ({ className, children, size = '1rem', buttonPosition = 'top', color, backgroundColor }) => {
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  }
  const topOffset = (buttonPosition === 'top') ? '0' : '100%' 
  return (
    <div className={className}>
      <AnimatedPlusIcon size={size} active={active} onClick={toggleActive} color={color} backgroundColor={backgroundColor} />
      <Dialog active={active} iconSize={size} buttonPosition={buttonPosition} topOffset={topOffset}>{children}</Dialog>
    </div>
  )
}

export default styled(CircleDialog)`
  position: relative;
  text-align: right;
`;