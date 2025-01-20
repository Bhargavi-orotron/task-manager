import { and, asc, count, desc, eq, inArray } from "drizzle-orm";
import { db } from "../connection/dbConnection";
import { DBNewRecord, DBNewRecords, DBTable, DBTableRow, InQueryData, OrderByQueryData, UpdateRecordData, WhereQueryData } from "../types/db.types";
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

const saveSingleRecord = async<R extends DBTableRow>(table: DBTable, record: DBNewRecord, trx?: any) => {
  const query = trx ? trx.insert(table).values(record).returning() : db.insert(table).values(record).returning();
  const recordSaved = await query;
  return recordSaved[0] as R;
};

export{
  getSingleRecordByAColumnValue,saveSingleRecord,getRecordsConditionally
}