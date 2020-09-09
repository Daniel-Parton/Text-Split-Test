import React from 'react';
import classNames from 'classnames';
import { Card, CardBody, CardTitle, CardSubtitle, Container } from 'reactstrap';

interface CardSimpleProps {
  extraPadding?: boolean
  className?: string
  header?: string
  subHeader?: string
  container?: boolean
};


const CardSimple: React.SFC<CardSimpleProps> = (props) => {

  const { className, header, subHeader, children, container, extraPadding, ...rest } = props;

  const classes = classNames({
    [className!]: className !== undefined,
    'p-4': extraPadding
  });
  const renderCard = () => (
    <Card className={classes} {...rest}>
      <CardBody>
        {header && (<CardTitle tag='h4'>{header}</CardTitle>)}
        {subHeader && (<CardSubtitle tag='h5'>{subHeader}</CardSubtitle>)}
        <div className='card-content'>
          {children}
        </div>
      </CardBody>
    </Card>
  );

  if (container) return <Container>{renderCard()}</Container>;
  return renderCard();
}

export default CardSimple;