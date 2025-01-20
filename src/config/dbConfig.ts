import * as dotenv from 'dotenv'

dotenv.config()

const dbConfig ={
    host:process.env.HOST!,
    port:Number(process.env.PORT)!,
    user:process.env.USER!,
    password:process.env.PASSWORD!,
    database:process.env.DATABASE_NAME!,
}

export default dbConfig;