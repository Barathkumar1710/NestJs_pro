// import { DataSource } from "typeorm";

import { DataSourceOptions } from "typeorm"

// const  config: DataSource = {
//     type: "postgres",
//     host: "localhost",
//     port: 5432,
//     username: "postgres",
//     password: "BarathPG",
//     database: "sample_db", 
//     entities: [__dirname + "/**/*.entity{.ts,.js}"],
//     // Don't use this in production.
//     synchronize: false,
//     migrations: [__dirname + "/migrations/**/*{.ts,.js}"],
// }

// export default config;


const ormConfig : DataSourceOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'BarathPG',
    database: 'sample_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // autoLoadEntities: true
    synchronize: false, // WARNING: don't use in production.
    // migrations needed for the autoLoadEntities to work.
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
}    
export default ormConfig