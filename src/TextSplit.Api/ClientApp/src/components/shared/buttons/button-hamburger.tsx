import classNames from 'classnames';
import React from 'react';

interface ButtonHamburgerProps {
  className?: string
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  active?: boolean
  color: 'dark' | 'light'
}

const ButtonHamburger: React.FC<ButtonHamburgerProps> = ({ className, onClick, active, color, ...rest }) => {

  const classes = classNames({
    'btn-hamburger': true,
    'btn-hamburger-active': active,
    [`btn-hamburger-${color}`]: true,
    [className!]: className !== undefined
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (onClick) onClick(e);
  }

  return (
    <div onClick={handleClick} className={classes} {...rest}>
      <div className='hamburger-box'>
        <div className='hamburger-inner' />
      </div>
    </div>
  );
}

export default ButtonHamburger;