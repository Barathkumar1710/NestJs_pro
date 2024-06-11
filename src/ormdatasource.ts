import { DataSource } from "typeorm";
import ormSeedConfig from "./ormseedconfig";
import ormConfig from "./ormconfig";

export default new DataSource(ormConfig)