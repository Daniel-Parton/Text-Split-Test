import React from "react";
import { Row, Col } from "reactstrap";
import { useToasts } from "react-toast-notifications";
import { Formik, FormikHelpers } from "formik";

import { BlockUi, FormValidator, Button, Form, FormikSideEffects } from "../..";
import * as Helper from "./auto-form-helper";
import { AutoFormProps } from "./auto-form-types";
import ToastHelper from "../../../../helpers/toast-helper";
import AutoFormSkeleton from "../../loading-skeleton/auto-form-skeleton";


function AutoForm<TData = any, TSuccessResponse = any>(props: AutoFormProps<TData, TSuccessResponse>) {

  const { initialValues, onSubmitPromise, onSubmitSuccess, onSubmitError, toastOnError, rows,
    onBack, header, submitButtonText, inititalising, hideBack, additionalButtonsFunc,
    debug, formId, submittingMessage, className, variant, headerCentre, topContent, onChange } = props;
  const initial: any = initialValues || {};

  const toastHelper = new ToastHelper(useToasts());
  const validator = new FormValidator<any, any>({
    fields: []
  });

  rows.forEach(r => {
    r.columns.forEach(c => {
      if (initial[c.field.name] === undefined && c.field.options) {
        initial[c.field.name] = c.field.options.defaultValue ? c.field.options.defaultValue() : undefined;
      }
      const validators = !c.field.options ? undefined : c.field.options.validators;
      validator.fields.push({ name: c.field.name as any, validators: validators });
    });
  })

  const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
    return onSubmitPromise(values)
      .then(e => onSubmitSuccess(e))
      .catch(e => {
        if (toastOnError) toastHelper.error('An error occured');
        if (onSubmitError) onSubmitError(e);
        return e;
      })
      .finally(() => formikHelpers.setSubmitting(false))
  }

  if (inititalising) {
    return <AutoFormSkeleton autoformRows={props.rows} />
  }

  return (
    <Formik<TData>
      initialValues={validator.getInitial(initial)}
      validate={(values) => validator.validate(values, props)}
      onSubmit={handleSubmit}
      render={(formikProps) => {
        return (
          <BlockUi blocking={formikProps.isSubmitting} text={submittingMessage}>
            <Form variant={variant} id={formId} onSubmit={formikProps.handleSubmit} className={className}>
              {header && <h5 className={headerCentre ? 'text-center' : undefined}>{header}</h5>}
              {topContent}
              {rows.map((row, ri) => (
                <Row key={ri}>
                  {row.columns.filter(e => e.field.type !== 'Script').map((column, ci) => (
                    <Col key={ci}
                      xs={column.extraSmallSize}
                      sm={column.smallSize}
                      md={column.mediumSize}
                      lg={column.largeSize}
                      xl={column.extraLargeSize}
                    >
                      {Helper.renderInputComponent(column.field, formikProps)}
                    </Col>
                  ))}
                </Row>
              ))}
              <div>
                <Button className='w-100 mb-2' type='submit' bsVariant='primary'>{submitButtonText || 'Save'}</Button>
                {!hideBack && <Button className='w-100' bsVariant='secondary' data-test='auto-form-back-button' onClick={onBack}>Back</Button>}
                {additionalButtonsFunc && additionalButtonsFunc(formikProps).map((p) => <Button {...p} />)}
              </div>
            </Form>
            <FormikSideEffects focusInputOnSubmitFail logOnChange={debug} onChange={onChange} />
          </BlockUi>
        )
      }}
    >
    </Formik>
  )
}

export default AutoForm;