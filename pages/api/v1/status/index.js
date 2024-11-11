import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionQueryResult = await database.query(
    "SHOW server_version;",
  );
  const databaseVersion = databaseVersionQueryResult.rows[0].server_version;

  const databaseMaxConnectionsQueryResult = await database.query(
    "show max_connections",
  );
  const databaseMaxConnections =
    databaseMaxConnectionsQueryResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const databaseActiveConnectionsQueryResult = await database.query({
    text: "SELECT COUNT (*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const databaseActiveConnections =
    databaseActiveConnectionsQueryResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        active_connections: parseInt(databaseActiveConnections),
      },
    },
  });
}

export default status;
