import React from "react";
import classNames from "classnames";
import ListItem, { ListAction } from "./list-item";
import { faSync, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, BlockUi } from "..";
import ListItemSkeleton from "../loading-skeleton/list-item-skeleton";

export interface ListProps<T = any> {
  id?: string
  disabled?: boolean
  listItemBorderLeft?: boolean
  items: T[]
  className?: string
  loadingSkeleton?: boolean
  loading?: boolean
  loadingMessage?: string
  noItemsMessage?: string
  primaryTextFunc?: (item: T, index?: number) => any
  secondaryTextFunc?: (item: T, index?: number) => any
  valueFunc?: (item: T) => any
  listItemsActionsFunc?: (item: T) => ListAction[]
  divider?: boolean
  listActions?: ListAction[]
  onReload?: () => void
  onAdd?: () => void
  addTooltip?: string
  listItemKey?: keyof T
}

function List<T = any>(props: ListProps<T>) {

  const { noItemsMessage, items, loadingSkeleton, loading, primaryTextFunc, secondaryTextFunc,
    valueFunc, listItemsActionsFunc, divider, listActions, onReload, onAdd, loadingMessage,
    className, listItemBorderLeft, addTooltip, disabled, listItemKey, ...rest } = props;

  const classes = classNames({
    'list': true,
    [className!]: className !== undefined
  });

  const noItemsCompiledMessage = noItemsMessage || 'No Items';
  const hasItems = items && items.length ? true : false;

  const compiledActions: ListAction[] = !listActions || !listActions.length ? [] : [...listActions];
  if (onReload) {
    compiledActions.push({ icon: faSync, toolTip: 'Reload', onClick: onReload });
  }
  if (onAdd) {
    compiledActions.push({ icon: faPlus, toolTip: addTooltip ?? 'Add', onClick: onAdd });
  }

  if (disabled && compiledActions.length) {
    compiledActions.forEach(ca => ca.disabled = true);
  }

  const hasActions = compiledActions && compiledActions.length ? true : false;
  const isLoading = loadingSkeleton || loading
  return (
    <div className={classes} {...rest}>
      {hasActions && (
        <React.Fragment>
          <div className='list-action-container'>
            {compiledActions.map((a, i) => (
              <Button key={i} showLoadingSkeleton={loadingSkeleton} {...a} />
            ))}
          </div>
          <hr />
        </React.Fragment>
      )}
      {loadingSkeleton && (
        <React.Fragment>
          <ListItemSkeleton />
          <hr />
          <ListItemSkeleton />
          <hr />
          <ListItemSkeleton />
        </React.Fragment>
      )}
      {!isLoading && !hasItems && <ListItem primaryText={noItemsCompiledMessage} />}
      {!loadingSkeleton && hasItems && (
        <BlockUi blocking={loading} text={loadingMessage} >
          {items.map((item, i) => (
            <React.Fragment key={!listItemKey ? i : (item[listItemKey]) as any}>
              <ListItem
                disabled={disabled}
                borderLeft={listItemBorderLeft}
                primaryText={!primaryTextFunc ? undefined : primaryTextFunc(item, i)}
                secondaryText={!secondaryTextFunc ? undefined : secondaryTextFunc(item, i)}
                value={!valueFunc ? undefined : valueFunc(item)}
                actions={!listItemsActionsFunc ? undefined : listItemsActionsFunc(item)}
              ></ListItem>
              {divider && (i + 1 < items.length) && <hr />}
            </React.Fragment>
          ))}
        </BlockUi>
      )}
    </div>
  );
}

export default List;