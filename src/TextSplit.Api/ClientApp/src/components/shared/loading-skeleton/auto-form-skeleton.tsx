import React from "react";
import FormSkeleton, { BaseFormSkeletonProps, FormSkeletonRow, FormSkeletonColumn } from "./form-skeleton";
import { AutoFormRow } from "../form/auto-form/auto-form-types";

interface AutoFormSkeletonProps extends BaseFormSkeletonProps {
  autoformRows: AutoFormRow[]
}

const AutoFormSkeleton: React.FC<AutoFormSkeletonProps> = ({ autoformRows, ...rest }) => {

  if (!autoformRows) return null;

  const getFormSkeletonProps = () => {
    const skeletonRows: FormSkeletonRow[] = [];
    autoformRows.forEach((row) => {
      const tempColumns: FormSkeletonColumn[] = [];
      row.columns.forEach((column) => {
        tempColumns.push({
          extraSmallSize: column.extraSmallSize,
          smallSize: column.smallSize,
          mediumSize: column.mediumSize,
          largeSize: column.largeSize,
          extraLargeSize: column.extraLargeSize,
        });
      });
      skeletonRows.push({ columns: tempColumns });
    });
    return skeletonRows;
  };

  return <FormSkeleton rows={getFormSkeletonProps()} {...rest} />
}

export default AutoFormSkeleton;