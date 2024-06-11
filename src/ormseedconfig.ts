// import { DataSource } from "typeorm";

import { DataSourceOptions } from "typeorm"
import ormConfig from "./ormconfig"

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


const ormSeedConfig : DataSourceOptions = {
    ...ormConfig,
    migrations: [__dirname + '/seeds/**/*{.ts,.js}'],
}    
export default ormSeedConfig