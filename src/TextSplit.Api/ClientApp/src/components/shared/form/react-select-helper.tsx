import { SelectComponents } from "react-select/src/components";
import { OptionTypeBase } from "react-select";

interface GetComponentsOptions {
  hideDropdown?: boolean
}

const getComponents = (components: SelectComponents<OptionTypeBase>, options?: GetComponentsOptions) => {

  const returnComponents = { ...components };
  if (options?.hideDropdown) {
    returnComponents.DropdownIndicator = null;
  }

  return returnComponents;
}

export default {
  getComponents
}