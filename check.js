const { execSync } = require('child_process');
try {
  console.log("=== GIT STATUS ===");
  console.log(execSync('git status', { encoding: 'utf8' }));
  console.log("=== GIT LOG ===");
  console.log(execSync('git log -2 --stat', { encoding: 'utf8' }));
} catch (e) {
  console.error("ERROR:");
  console.error(e.stdout);
  console.error(e.stderr);
}
