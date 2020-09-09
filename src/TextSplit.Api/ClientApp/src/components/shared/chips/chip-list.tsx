import React from "react";
import classNames from "classnames";
import Chip, { ChipProps } from "./chip";

export interface ChipListProps {
  className?: string
  chips: ChipProps[]
  smallOverride?: boolean
}

const ChipList: React.FC<ChipListProps> = (props) => {

  const { className, chips, smallOverride, ...rest } = props;

  const classes = classNames({
    'chip-list': true,
    [className!]: className !== undefined,
  });

  const renderChip = (chip: ChipProps) => {
    const { small, label, ...rest } = chip;
    const hasSmall = smallOverride !== null && smallOverride !== undefined;
    const compiledSmall = hasSmall ? smallOverride : small;
    return <Chip {...rest} small={compiledSmall} label={label} key={label} />
  };

  return (
    <div className={classes} {...rest}>
      {chips.map(renderChip)}
    </div>
  )
};

export default ChipList;