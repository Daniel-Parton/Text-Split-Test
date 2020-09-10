import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";

export type PageImageType = 'Logo' | 'Oops'
interface StandardPageProps {
  title?: string
  description?: string
  noHeight?: boolean
  image?: PageImageType
}

const StandardPage: React.FC<StandardPageProps> = ({ image, title, description, noHeight, children }) => {

  const classes = classNames({
    'standard-page': true,
    'h-auto': noHeight,
  });

  const resolveImage = (type: PageImageType) => {
    switch (type) {
      case 'Oops': return '/images/oops.png';
      default: return '/images/logo192.png';
    }
  }

  return (
    <div className={classes}>
      <Container>
        <div className='standard-page-inner-container'>
          {image && (
            <div className='standard-page-logo-container'><img alt='logo' src={resolveImage(image)} /></div>
          )}
          <div className='standard-page-title-container'>
            {title && <h3 className='standard-page-header'>{title}</h3>}
            {description && <p className='standard-page-header'>{description}</p>}
          </div>
          <div className='standard-page-content'>
            {children}
          </div>
        </div>
      </Container>

    </div>
  );
};

export default StandardPage;
