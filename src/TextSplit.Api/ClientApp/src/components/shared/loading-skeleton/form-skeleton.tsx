import React from "react";
import Skeleton from 'react-loading-skeleton';
import { Row, Col } from "reactstrap";
import CardSimple from "../card/card-simple";
import { FormInputSkeleton } from "..";

export interface FormSkeletonRow {
  columns: FormSkeletonColumn[]
}

export interface FormSkeletonColumn {
  extraSmallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  smallSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  mediumSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  largeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  extraLargeSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
}

export interface BaseFormSkeletonProps {
  hasHeader?: boolean
  wrapInCard?: boolean
  footerButtonCount?: number
}

interface FormSkeletonProps extends BaseFormSkeletonProps {
  rows: FormSkeletonRow[]
}

const FormSkeleton: React.FC<FormSkeletonProps> = ({ footerButtonCount, hasHeader, rows, wrapInCard }) => {

  if (!rows) return null;
  const footerButtons: string[] = [];
  if (footerButtonCount) {
    for (let i = 0; i < footerButtonCount; i++) {
      footerButtons.push("");
    }
  }

  const render = () => {
    return (
      <div className='form-skeleton'>
        {hasHeader && (
          <Row>
            <Col xs={4}>
              <h3><Skeleton /></h3>
            </Col>
          </Row>
        )}
        {rows.map((row, ri) => (
          <Row key={ri}>
            {row.columns.map((column, ci) => (
              <Col key={ci}
                xs={column.extraSmallSize}
                sm={column.smallSize}
                md={column.mediumSize}
                lg={column.largeSize}
                xl={column.extraLargeSize}
              >
                <FormInputSkeleton hasLabel />
              </Col>
            ))}
          </Row>
        ))}
        {footerButtons.map((e, i) => (
          <Skeleton key={i} height={46} />
        ))}
      </div>
    );
  }

  return wrapInCard ? <CardSimple>{render()}</CardSimple> : render();
}

export default FormSkeleton;