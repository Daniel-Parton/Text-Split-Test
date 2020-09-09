import React from 'react';
import classNames from 'classnames';
import ReactBlockUi from 'react-block-ui';
import Spinner from '../spinners/three-dot-spinner';

interface BlockUiProps extends React.HTMLProps<any> {
  blocking?: boolean
  tag?: string
  loader?: any
  text?: string
};


const BlockUi: React.SFC<BlockUiProps> = (props) => {

  const { className, tag, blocking, children, loader, text, ...rest } = props;

  const classes = classNames({
    [className!]: className !== undefined
  });

  return (
    <ReactBlockUi
      className={classes}
      tag={tag || 'div'}
      blocking={blocking || false}
      loader={loader || <Spinner header={text} />}
      {...rest}
    >
      {children && (
        <div className='block-ui-content'>
          {children}
        </div>
      )}
    </ReactBlockUi>
  );
}

export default BlockUi;