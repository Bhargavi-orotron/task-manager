import { NewUser, User, UsersTable } from "../connection/schema/users";
import { NewRefreshToken, RefreshToken, RefreshTokenTable } from "../connection/schema/refreshTokens";
import { NewResetPasswordToken, ResetPasswordToken, ResetToken } from "../connection/schema/resetPasswordTokens";


export type DBTable =
  | UsersTable| ResetToken 
  | RefreshTokenTable

export type DBTableRow =
  | User |ResetPasswordToken 
  | RefreshToken

export type DBNewRecord =
  | NewUser | NewResetPasswordToken 
  | NewRefreshToken 

export type DBNewRecords =
  | NewUser[] | NewResetPasswordToken[] 
  | NewRefreshToken[] 

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

export type PaginationInfo = {
  total_records: number;
  total_pages: number;
  page_size: number;
  current_page: number;
  next_page: number | null;
  prev_page: number | null;
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

