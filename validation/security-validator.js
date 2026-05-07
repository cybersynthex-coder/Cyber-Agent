const blockedPatterns = [
  'rm -rf',
  'process.exit',
  'child_process.exec',
  'fs.rm'
];

export function validateSecurity(code) {
  return !blockedPatterns.some(pattern => code.includes(pattern));
}
