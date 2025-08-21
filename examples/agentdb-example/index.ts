import { DatabaseService, DatabaseConnection } from "@agentdb/sdk";


const AGENTDB_API_KEY = "agentdb_64f5aab112abba5febae041ee147c66c055277c1ed584b5a072308b9889e1724";
const AGENTDB_API_URL = "https://api.agentdb.dev";
const AGENTDB_TOKEN = "f0f72b48-7fa5-4e50-8053-05aac4177b33";
const dbName = "crime_data_from_to_present1"
const dbType = "sqlite"
const tableName = "crime_data_from_to_present1"

const service = new DatabaseService(AGENTDB_API_URL, AGENTDB_API_KEY, false)
const connection = new DatabaseConnection(AGENTDB_API_URL, AGENTDB_API_KEY, AGENTDB_TOKEN, dbName, "sqlite", false)

console.log(await service.listDatabases(AGENTDB_TOKEN));

const response = await connection.execute([{sql: `SELECT * FROM ${tableName} LIMIT 10`}]);
console.log(response.results[0].rows);
