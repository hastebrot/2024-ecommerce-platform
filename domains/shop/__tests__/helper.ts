import { dom } from "./deps.ts";

export const defaultTenantTest = "test";

export type Params = Record<string, string>;
export type FetchGetParams = {
  url: string;
  urlParams?: Params;
  headers?: Record<string, string>;
};
export type FetchPostParams = {
  url: string;
  urlParams?: Params;
  bodyParams?: Record<string, unknown>;
  headers?: Record<string, string>;
};

export const fetchGet = ({ url, urlParams, headers }: FetchGetParams) => {
  const urlWithParams = new URL(url);
  urlWithParams.search = new URLSearchParams(urlParams).toString();
  return fetch(urlWithParams, {
    method: "GET",
    headers: {
      "x-tenant": defaultTenantTest,
      "cache-control": "no-transform",
      ...headers,
    },
  });
};

export const fetchPost = ({ url, urlParams, bodyParams, headers }: FetchPostParams) => {
  const urlWithParams = new URL(url);
  urlWithParams.search = new URLSearchParams(urlParams).toString();
  return fetch(urlWithParams, {
    method: "POST",
    body: JSON.stringify(bodyParams),
    headers: {
      "x-tenant": defaultTenantTest,
      "cache-control": "no-transform",
      ...headers,
    },
  });
};

export const consumeJson = async <T>(response: Response | Promise<Response>): Promise<T> => {
  response = await response;
  if (response.status >= 400) {
    throw Error(`http error, code='${response.status}'`);
  }
  return await response.json();
};

export const dropResponse = async (response: Response | Promise<Response>) => {
  response = await response;
  if (response.status >= 400) {
    throw Error(`http error, code='${response.status}'`);
  }
  return await response.body?.cancel();
};

export const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((index) => start + index);
};

export const parseDocument = async (html: string): Promise<dom.Window["document"]> => {
  const window = new dom.Window();
  window.happyDOM.abort();
  window.document.write(html);
  await window.happyDOM.waitUntilComplete();
  return window.document;
};

export const $ = (element: dom.Element, selector: string): dom.Element => {
  const result = element.querySelector(selector);
  if (result === null) throwError(`node not found for selector '${selector}'`);
  return result;
};

export const $$ = (element: dom.Element, selector: string): dom.Element[] => {
  const results = element.querySelectorAll(selector);
  if (results.length === 0) throwError(`nodes not found for selector '${selector}'`);
  return results;
};

export const throwError = (message: string): never => {
  throw new Error(message);
};
