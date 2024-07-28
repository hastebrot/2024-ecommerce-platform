import { dom, nanoid } from "./deps.ts";

const defaultHeaders = {
  "cache-control": "no-transform",
};

export type FetchGetParams = {
  url: string;
  urlParams?: Record<string, string> | string[][] | string;
  headers?: Record<string, string> | Iterable<string>;
};

export const fetchGet = (params: FetchGetParams) => {
  const url = new URL(params.url);
  if (params.urlParams !== undefined) {
    url.search = new URLSearchParams(params.urlParams).toString();
  }
  return fetch(url, {
    method: "GET",
    headers: {
      ...defaultHeaders,
      ...params.headers,
    },
  });
};

export type FetchPostParams = {
  url: string;
  urlParams?: Record<string, string> | string[][] | string;
  headers?: Record<string, string> | Iterable<string>;
  bodyParams?: object;
};

export const fetchPost = (params: FetchPostParams) => {
  const url = new URL(params.url);
  if (params.urlParams !== undefined) {
    url.search = new URLSearchParams(params.urlParams).toString();
  }
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(params.bodyParams),
    headers: {
      ...defaultHeaders,
      ...params.headers,
    },
  });
};

export const consumeJson = async <T>(response: Response | Promise<Response>): Promise<T> => {
  response = await response;
  if (response.status >= 400) {
    throwError(`http error, code='${response.status}'`);
  }
  return await response.json();
};

export const dropResponse = async (response: Response | Promise<Response>) => {
  response = await response;
  if (response.status >= 400) {
    throwError(`http error, code='${response.status}'`);
  }
  return await response.body?.cancel();
};

export const parseDocument = async (html: string): Promise<dom.Window["document"]> => {
  const window = new dom.Window();
  window.happyDOM.abort();
  window.document.write(html);
  await window.happyDOM.waitUntilComplete();
  return window.document;
};

export const query = (element: dom.Element, selector: string): dom.Element => {
  element ?? throwError("query: element is null");
  const result = element.querySelector(selector);
  return result ?? throwError(`query: node not found for selector '${selector}'`);
};

export const queryAll = (element: dom.Element, selector: string): dom.Element[] => {
  element ?? throwError("queryAll: element is null");
  const results = element.querySelectorAll(selector);
  if (results.length === 0) throwError(`queryAll: nodes not found for selector '${selector}'`);
  return results;
};

export const throwError = (message: string): never => {
  throw new Error(message);
};

export const range = (start: number, end: number): number[] => {
  return [...Array(end - start).keys()].map((index) => start + index);
};

export const Id = {
  nanoid(size?: number): string {
    return nanoid.nanoid(size);
  },
};
