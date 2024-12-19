const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") !== -1) {
      console.log("\nPostgres está pronto e aceitando conexões");
    } else {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
  }
}

process.stdout.write("Aguardando postgres aceitar conexões");
checkPostgres();
