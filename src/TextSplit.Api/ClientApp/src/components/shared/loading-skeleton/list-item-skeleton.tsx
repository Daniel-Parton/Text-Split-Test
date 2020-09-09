import React from "react";
import Skeleton from "react-loading-skeleton";
import { listItemClasses } from '../list/list-item'

export interface ListItemSkeletonProps {
}

const ListItemSkeleton: React.FC<ListItemSkeletonProps> = () => {
  return (
    <div className={listItemClasses.main}>
      <div className={`${listItemClasses.iconContainer} mr-2`}>{<Skeleton height='3.5rem' />}</div>
      <div className={listItemClasses.contentContainer}>
        <div className={listItemClasses.textContainer}>
          <div className={listItemClasses.primaryText}><Skeleton width='70%' /></div>
          <div className={listItemClasses.secondaryText}><Skeleton width='50%' height='0.7rem' /></div>
        </div>
      </div>
      <Skeleton />
      <Skeleton />
    </div>
  );
}

export default ListItemSkeleton;