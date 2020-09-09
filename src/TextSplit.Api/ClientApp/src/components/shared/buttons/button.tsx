import classNames from 'classnames';
import React, { useState, memo } from 'react';
import { v4 } from 'uuid';
import { Button as BootStrapButton, UncontrolledTooltip } from 'reactstrap';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonVariant, BootstrapButtonVariant } from './shared';
import Skeleton from 'react-loading-skeleton';

export interface ButtonProps {
  key?: any
  id?: string
  icon?: IconProp
  className?: string
  toolTip?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  rounded?: boolean
  bsVariant?: BootstrapButtonVariant
  variant?: ButtonVariant
  disabled?: boolean
  text?: string
  iconStyle?: any
  style?: any
  noHover?: boolean
  iconVariant?: 'primary' | 'secondary'
  iconSize?: SizeProp
  showLoadingSkeleton?: boolean
  iconInverse?: boolean
  children?: any
  type?: 'button' | 'submit'
  small?: boolean
}

const Button: React.FC<ButtonProps> = ({ iconStyle, noHover, iconVariant, iconSize, id,
  rounded, variant, bsVariant, icon, className, children, toolTip, text,
  showLoadingSkeleton, onClick, iconInverse, type = 'button', small = false, ...rest }) => {

  const [compiledId] = useState(id || `a${v4()}`);

  const classes = classNames({
    'btn-icon-only': icon && !text && !children,
    'btn-rounded': rounded,
    'btn-no-hover': noHover,
    [`btn-${variant}`]: variant !== undefined,
    [className!]: className !== undefined
  });

  const iconClasses = classNames({
    'mr-2': text !== undefined || children !== undefined,
    [`icon-${iconVariant}`]: iconVariant !== undefined,
  });

  if (showLoadingSkeleton) {
    return (
      <BootStrapButton className={classes} style={{ pointerEvents: 'none' }} {...rest}>
        {showLoadingSkeleton && <Skeleton />}
      </BootStrapButton>
    );
  }

  return (
    <React.Fragment>
      <BootStrapButton size={small ? 'sm' : undefined} id={compiledId} className={classes} color={bsVariant} onClick={onClick} type={type} {...rest}>
        {icon && <FontAwesomeIcon inverse={iconInverse} style={iconStyle} size={iconSize || 'sm'} icon={icon} className={iconClasses} />}
        {text}
        {children}
      </BootStrapButton>
      {toolTip && <UncontrolledTooltip placement="top" target={compiledId}>{toolTip}</UncontrolledTooltip>}
    </React.Fragment>
  );
}

export default memo(Button);