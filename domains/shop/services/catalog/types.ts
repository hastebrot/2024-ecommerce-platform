export type ServiceContext = {
  kv: Deno.Kv;
};

export type ClientContext = {
  kv: Deno.Kv;
  workspace: string;
};
