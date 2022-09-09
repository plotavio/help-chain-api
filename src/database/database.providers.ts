import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'us-cdbr-east-06.cleardb.net',
        port: 3306,
        username: 'b9fcab37226587',
        password: 'feb0b914',
        database: 'heroku_71de422d18707d7',
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false,
      });

      return dataSource.initialize();
    },
  },
];