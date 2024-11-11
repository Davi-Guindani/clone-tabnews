test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  const expectedDatabaseVersion = "16.0";
  const expectedDatabaseMaxConnections = 100;
  const expectedDatabaseActiveConnections = 1;

  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(responseBody.dependencies.database.version).toBe(
    expectedDatabaseVersion,
  );
  expect(responseBody.dependencies.database.max_connections).toBe(
    expectedDatabaseMaxConnections,
  );
  expect(responseBody.dependencies.database.active_connections).toBe(
    expectedDatabaseActiveConnections,
  );
});
