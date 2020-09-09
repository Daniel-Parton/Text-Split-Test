import React from "react";
import classNames from "classnames";
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export interface ChipProps {
  className?: string
  icon?: IconDefinition
  variant?: 'primary' | 'success' | 'danger' | 'warning' | 'info'
  small?: boolean
  label: string
  onDelete?: (label: string) => void
}

export function toChipProps<T = any>(array: T[], predicate?: (data: T) => string): ChipProps[] {
  if (!array) return [] as ChipProps[]

  return array.map<ChipProps>(x => {
    const chip: ChipProps = { label: x as any };
    if (predicate) chip.label = predicate(x);
    return chip
  });

}

const Chip: React.FC<ChipProps> = (props) => {

  const { className, icon, label, onDelete, small, variant, ...rest } = props;

  const classes = classNames({
    'chip': true,
    'chip-small': small,
    'chip-danger': variant === 'danger',
    'chip-info': variant === 'info',
    'chip-warning': variant === 'warning',
    'chip-success': variant === 'success',
    [className!]: className !== undefined,
  });

  return (
    <div className={classes} {...rest}>
      {icon && <FontAwesomeIcon icon={icon} className='chip-icon' />}
      <span className='chip-icon-label'>{label}</span>
      {onDelete && <FontAwesomeIcon icon={faTimes} className='chip-delete-icon' onClick={() => onDelete(label)} />}
    </div>
  )
};

export default Chip;