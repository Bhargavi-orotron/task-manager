import { and, asc, count, desc, eq, inArray } from "drizzle-orm";
import { db } from "../connection/dbConnection";
import {users} from "../connection/schema/users"
import {refreshTokens,NewRefreshToken} from '../connection/schema/refreshTokens'
import { DBNewRecord, DBNewRecords, DBTable, DBTableRow, PaginationInfo,InQueryData, OrderByQueryData, UpdateRecordData, WhereQueryData } from "../types/db.types";
import { executeQuery, prepareInQueryCondition, prepareOrderByQueryConditions, prepareSelectColumnsForQuery, prepareWhereQueryConditions } from "../utills/dbUtils";

const getRecordsConditionally = async<R extends DBTableRow, C extends keyof R = keyof R>(
  table: DBTable,
  whereQueryData?: WhereQueryData<R>,
  columnsToSelect?: any,
  orderByQueryData?: OrderByQueryData<R>,
  inQueryData?: InQueryData<R>,
) => {
  
  const columnsRequired = prepareSelectColumnsForQuery(table, columnsToSelect);
  const whereConditions = prepareWhereQueryConditions(table, whereQueryData);
  const inQueryCondition = prepareInQueryCondition(table, inQueryData);
  const orderByConditions = prepareOrderByQueryConditions(table, orderByQueryData);



  let whereQuery = whereConditions ? and(...whereConditions) : null;

  const results = await executeQuery<R, C>(table, whereQuery, columnsRequired, orderByConditions, inQueryCondition);

  if (!results || results.length === 0) {
    return null;
  }

  return results;
};
const getRecordById = async<R extends DBTableRow, C extends keyof R = keyof R>(
  table: DBTable,
  id: number,
  columnsToSelect?: any
): Promise<R | Pick<R, C> | null> => {
  const columnsRequired = prepareSelectColumnsForQuery(table, columnsToSelect);

  const result = columnsRequired ?
    await db.select(columnsRequired).from(table).where(eq(table.id, id)) :
    await db.select().from(table).where(eq(table.id, id));

  if (result.length === 0) {
    return null;
  }

  if (columnsRequired) {    
    return result[0] as Pick<R, C>;
    // return result[0] as SelectedKeys<R, C>
    // return result[0] as Record<C, any>
  }
  return result[0] as R;
};
const getSingleRecordByAColumnValue = async<R extends DBTableRow, C extends keyof R = keyof R>(
  table: DBTable,
  column: C,
  value: any,
  columnsToSelect?: any,
  orderByQueryData?: OrderByQueryData<R>,
  inQueryData?: InQueryData<R>
) => {
  const whereQueryData: WhereQueryData<R> = {
    columns: [column],
    values: [value]
  };

  const results = await getRecordsConditionally<R, C>(table, whereQueryData, columnsToSelect, orderByQueryData, inQueryData);

  if (!results) {
    return null;
  }
  return results[0];
};

const saveSingleRecord = async <R extends DBTableRow>(
  table: DBTable,
  record: DBNewRecord,
  trx?: any
): Promise<R> => {
  const query = trx ? trx.insert(table).values(record).returning() : db.insert(table).values(record).returning();
  const recordSaved = await query;
  return recordSaved[0] as R;
};

export async function saveRefreshToken(data: NewRefreshToken): Promise<void> {
  await db.insert(refreshTokens).values(data);
}
const getUserByIdFromDB = async (userId: number) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
      return user;
  } catch (error) {
      console.log('Error fetching user by ID:', error);
      throw new Error('Database error');
  }
};
const updateRecordById = async<R extends DBTableRow>(table: DBTable, id: number, record: UpdateRecordData<R>) => {
  const dataWithTimeStamps = { ...record };

  const recordUpdated = await db
    .update(table)
    .set(dataWithTimeStamps)
    .where(eq(table.id, id))
    .returning();
  return recordUpdated[0] as R;
};

export{
  getSingleRecordByAColumnValue,saveSingleRecord,getRecordsConditionally,getUserByIdFromDB,getRecordById,updateRecordById
}

