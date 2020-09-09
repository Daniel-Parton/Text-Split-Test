import React from "react";
import classNames from "classnames";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
import { Button } from "..";
import { ButtonVariant } from "../buttons/shared";

export interface ListAction {
  toolTip: string
  onClick: () => void
  icon: IconDefinition
  variant?: ButtonVariant
  small?: boolean
  disabled?: boolean
}

interface ListItemProps {
  disabled?: boolean
  borderLeft?: boolean
  className?: string
  icon?: IconDefinition
  iconSize?: SizeProp
  primaryText?: string
  secondaryText?: string
  value?: any
  actions?: ListAction[]
}

export const listItemClasses = {
  main: 'list-item',
  iconContainer: 'list-item-icon-container',
  contentContainer: 'list-item-content-container',
  textContainer: 'list-item-text-container',
  primaryText: 'list-item-primary-text',
  secondaryText: 'list-item-secondary-text',
  valueContainer: 'list-item-value-container',
}
const ListItem: React.FC<ListItemProps> = (props) => {

  const { className, icon, primaryText, secondaryText, iconSize, value, actions,
    borderLeft, children, disabled, ...rest } = props;

  const classes = classNames({
    [listItemClasses.main]: true,
    'list-item-border-left': borderLeft !== undefined,
    [className!]: className !== undefined
  });

  const hasActions = actions && actions.length ? true : false;

  return (
    <div className={classes} {...rest}>
      {icon && (
        <div className={listItemClasses.iconContainer}><FontAwesomeIcon size='lg' icon={icon} /></div>
      )}
      <div className={listItemClasses.contentContainer}>
        <div className={listItemClasses.textContainer}>
          {primaryText && <div className={listItemClasses.primaryText}>{primaryText}</div>}
          {secondaryText && <div className={listItemClasses.secondaryText}>{secondaryText}</div>}
        </div>
        {value && (<div className={listItemClasses.valueContainer}>{value}</div>)}
      </div>
      {hasActions && actions!.map((a, i) => {
        const { disabled, ...rest } = a;
        let compiledDisabled = disabled;
        if (!compiledDisabled && props.disabled) compiledDisabled = true;
        return <Button key={i} {...rest} disabled={compiledDisabled} />;
      })}
      {children}
    </div>
  );
}

export default ListItem;