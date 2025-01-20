import { NewUser, User, UsersTable } from "../connection/schema/users";



export type DBTable =
  | UsersTable

export type DBTableRow =
  | User

export type DBNewRecord =
  | NewUser

export type DBNewRecords =
  | NewUser[]

export type DBTableColumns<T extends DBTableRow> = keyof T;
export type SortDirection = "asc" | "desc";

export type WhereQueryData<T extends DBTableRow> = {
  columns: Array<keyof T>;
  values: any[];
};

export type OrderByQueryData<T extends DBTableRow> = {
  columns: Array<DBTableColumns<T>>;
  values: SortDirection[];
};

export type InQueryData<T extends DBTableRow> = {
  key: keyof T;
  values: any[];
};

export type MultiColumnInQueryData<T extends DBTableRow> = {
  keys: (keyof T)[];
  values: any[][];
};

export type QueryOptions = {
  columns?: string[];
  values?: ('asc' | 'desc')[];
  limit?: number;
};


export type UpdateRecordData<R extends DBTableRow> = Partial<Omit<R, "id" | "created_at" | "updated_at">>;

