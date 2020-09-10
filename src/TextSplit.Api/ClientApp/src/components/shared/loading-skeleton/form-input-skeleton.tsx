import React from "react";
import Skeleton from 'react-loading-skeleton';
import { v4 } from 'uuid';
import { Row, Col } from "reactstrap";
import FormControlWrapper from "../form/form-control-wrapper";

export interface FormInputSkeletonProps {
  hasLabel?: boolean
  className?: string
}

const FormInputSkeleton: React.FC<FormInputSkeletonProps> = ({ hasLabel, ...rest }) => {

  return (
    <FormControlWrapper name={v4()} {...rest}>
      {hasLabel && <Row><Col xs={4} style={{ marginBottom: 2 }}><Skeleton height={24} /></Col></Row>}
      <Row><Col xs={12}><Skeleton height={36} /></Col></Row>
    </FormControlWrapper>
  );
}

export default FormInputSkeleton;