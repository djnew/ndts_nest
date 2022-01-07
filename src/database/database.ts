import { MongooseModule } from '@nestjs/mongoose';

const User = process.env.MONGO_CONNECT_USERNAME || 'root';
const Password = process.env.MONGO_CONNECT_PASSWORD || 'example';
const DbName = process.env.MONGO_CONNECT_DB || 'todos';
const Host = process.env.MONGO_CONNECT_URL || 'mongodb://localhost:27017/';

export const databaseConnection = MongooseModule.forRoot(Host, {
  user: User,
  pass: Password,
  dbName: DbName,
});
