const { execSync } = require('child_process');
const fs = require('fs');

try {
  let log = "";
  log += "=== ADD ===\n";
  try {
    log += execSync('git add src/app/globals.css src/app/page.tsx', { encoding: 'utf8' }) + "\n";
  } catch(e) {
    log += e.stdout + "\n" + e.stderr + "\n";
  }
  
  log += "=== STATUS ===\n";
  log += execSync('git status', { encoding: 'utf8' }) + "\n";
  
  log += "=== COMMIT ===\n";
  try {
    log += execSync('git commit -m "Deploy: actualizar a version unificada de taller RM"', { encoding: 'utf8' }) + "\n";
  } catch(e) {
    log += e.stdout + "\n" + e.stderr + "\n";
  }
  
  log += "=== PUSH ===\n";
  try {
    log += execSync('git push', { encoding: 'utf8' }) + "\n";
  } catch(e) {
    log += e.stdout + "\n" + e.stderr + "\n";
  }
  
  fs.writeFileSync('commit_output.txt', log);
} catch (e) {
  fs.writeFileSync('commit_output.txt', e.toString());
}
