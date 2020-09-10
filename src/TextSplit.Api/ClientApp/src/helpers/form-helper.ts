import { FormColumn, FormField, Form, FormValidation } from "../types/form-types";
import { capitaliseWords } from "./string-helper";
import { required, maxCharLength, minCharLength } from "../components/shared/form/validators";
import { AutoFormColumn, AutoFormValidator, AutoFormRow } from "../components/shared/form/auto-form/auto-form-types";

export interface MfaFormDto {
  rows: AutoFormRow[];
  initialValues: any;
}

export const getFormDto = (form: Form) => {
  const dto: MfaFormDto = {
    rows: [],
    initialValues: {}
  };

  if (form.rows) {
    form.rows.forEach(r => {
      if (r.columns) {
        const tempColumns: AutoFormColumn[] = [];
        r.columns.forEach(c => {
          if (c.field) {
            tempColumns.push(getColumn(c, c.field));
            dto.rows.push({ columns: tempColumns });
            if (c.field.subElements) {
              const innerColumns: AutoFormColumn[] = [];
              c.field.subElements.forEach(sf => {
                innerColumns.push(getColumn(c, sf));
              });
              dto.rows.push({ columns: innerColumns });
            }
            if (c.field.value) {
              dto.initialValues[c.field.name] = c.field.value;
            }
          }
        });
      }
    });
  }
  return dto;
};

const getColumn = (c: FormColumn, field: FormField): AutoFormColumn => {
  return {
    extraSmallSize: c.extraSmallSize,
    smallSize: c.smallSize,
    mediumSize: c.mediumSize,
    largeSize: c.largeSize,
    extraLargeSize: c.extraLargeSize,
    field: {
      name: field.name,
      display: capitaliseWords(field.label!),
      type: field.type as any,
      options: {
        validators: toAutoFormValidators(field.validations),
        options: field.options,
        imageData: field.imageData,
        htmlAttr: field.htmlAttr
      }
    }
  };
};

const toAutoFormValidators = (validators?: FormValidation[]) => {
  const autoFormvalidators: AutoFormValidator[] = [];
  if (!validators) return validators;
  validators!.forEach(v => {
    switch (v.type) {
      case "Required":
        autoFormvalidators.push(required(v.overriddedErrorMessage));
        break;
      case "MaxCharLength":
        if (v.numberParam1)
          autoFormvalidators.push(
            maxCharLength(v.numberParam1, v.overriddedErrorMessage)
          );
        break;
      case "MinCharLength":
        if (v.numberParam1)
          autoFormvalidators.push(
            minCharLength(v.numberParam1, v.overriddedErrorMessage)
          );
        break;
    }
  });
  return autoFormvalidators;
};
