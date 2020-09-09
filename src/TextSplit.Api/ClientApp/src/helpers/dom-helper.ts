export const findByName = (name: string) => {
  try {
    let dom = document.getElementById(name);
    if (dom === null) document.querySelector(`[name='${name}']`);
    if (dom === null) document.querySelector(`[id^='${name}']`);
    if (dom === null) dom = document.querySelector(`[name^='${name}']`);
    return dom as HTMLElement;
  }
  catch {
    //If the queryselector fails it will throw an error we want it to fail gracefully
    return null;
  }
  
}

export const findByNameInForm = (formId: string, name: string) => {
  try {
    let dom = document.querySelector(`[id='${formId}'] [name='${name}']`);
    if (dom === null) document.querySelector(`[id='${formId}'] [id^='${name}']`);
    if (dom === null) dom = document.querySelector(`[id='${formId}'] [name^='${name}']`);
    return dom as HTMLElement;
  }
  catch {
    //If the queryselector fails it will throw an error we want it to fail gracefully
    return null;
  }
}