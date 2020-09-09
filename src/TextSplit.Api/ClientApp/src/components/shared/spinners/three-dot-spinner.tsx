import React from 'react';
import classNames from 'classnames';

interface ThreeDotSpinnerProps extends React.HTMLProps<HTMLDivElement> {
  header?: string
  subHeader?: string
};

const ThreeDotSpinner: React.SFC<ThreeDotSpinnerProps> = (props) => {

  const { className, header, subHeader, ...rest } = props;
  const classes = classNames({
    'three-dot-spinner': true,
    [className!]: className !== undefined
  });

  return (
    <div className='three-dot-spinner-container'>
      <div className='d-flex justify-content-center'>
        <div className={classes} {...rest}>
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </div>
      {header && <h4 className='spinner-header'>{header}</h4>}
      {subHeader && <p className='spinner-sub-header'>{subHeader}</p>}
    </div>
  );
}

export default ThreeDotSpinner;