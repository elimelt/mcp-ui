import { DatabaseService, DatabaseConnection } from "@agentdb/sdk";
import type { DatabaseType } from "@agentdb/sdk";

const createDatabaseConnection = (
  apiUrl: string,
  apiKey: string,
  token: string,
  dbName: string,
  dbType: DatabaseType
) => new DatabaseConnection(apiUrl, apiKey, token, dbName, dbType, false);

const fetchTableData = async (connection: DatabaseConnection, tableName: string, limit = 10) => {
  const response = await connection.execute([
    { sql: `SELECT * FROM ${tableName} LIMIT ${limit}` }
  ]);
  return response.results[0].rows;
};

const renderTableHtml = (data: any[]) => {
  if (!data || data.length === 0) return '<p>No data available</p>';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    `<tr>${headers.map(header => `<td>${row[header]}</td>`).join('')}</tr>`
  ).join('');

  return `
    <table border="1">
      <thead>
        <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
};

const displayDatabaseTable = async () => {
  const connection = createDatabaseConnection(
    "https://api.agentdb.dev",
    "agentdb_64f5aab112abba5febae041ee147c66c055277c1ed584b5a072308b9889e1724",
    "f0f72b48-7fa5-4e50-8053-05aac4177b33",
    "crime_data_from_to_present1",
    "sqlite"
  );

  const data = await fetchTableData(connection, "crime_data_from_to_present1");
  if (!data) {
    console.log("No data available");
    return;
  }
  const tableHtml = renderTableHtml(data);
  console.log(tableHtml);
};

displayDatabaseTable().catch(console.error);
