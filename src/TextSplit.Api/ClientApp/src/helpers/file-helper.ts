import Axios from "axios";

interface DownloadUrlOptions {
  url: string,
  type: 'GET' | 'POST'
  postBody?: any
  suggestedFileName?: string
}

export function downloadUrl<T = any>(options: DownloadUrlOptions) {
  return new Promise<T>((resolve, reject) => {
    if (options.type === 'GET') {
      downloadUrlViaGet(options, resolve);
    } else {
      downloadUrlViaOther(options, resolve, reject);
    }
  });
}

const downloadUrlViaGet = (options: DownloadUrlOptions, promiseResolve: () => void) => {
  const a: any = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('href', options.url);
  a.setAttribute('download', options.suggestedFileName);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  promiseResolve();
}

const downloadUrlViaOther = (options: DownloadUrlOptions, promiseResolve: (response: any) => void, promiseReject: (error?: any) => void) => {
  Axios({ url: options.url, method: options.type, data: options.postBody, responseType: 'blob' })
    .then(response => {
      const a: any = document.createElement('a');
      a.style.display = 'none';
      a.setAttribute('href', window.URL.createObjectURL(new Blob([response.data])));
      a.setAttribute('download', options.suggestedFileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return promiseResolve(response);
    })
    .catch(e => promiseReject(e));
}

export const downloadJson = (obj: any, suggestedFileNameWithoutExtension: string) => {
  const dataHref = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(obj))}`;
  const a: any = document.createElement('a');
  a.style.display = 'none';
  a.setAttribute('href', dataHref);
  a.setAttribute('download', `${suggestedFileNameWithoutExtension}.json`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export const toUploadFormData = (model: any) => {
  const data = new FormData();
  Object.keys(model).forEach(key => {
    data.append(key, model[key]);
  });
  return data;
}