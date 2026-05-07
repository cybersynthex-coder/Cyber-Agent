export function detectProjectMode(input) {
  const normalized = input.toLowerCase();

  const projectKeywords = [
    'build',
    'create app',
    'expo',
    'uygulama',
    'proje',
    'react native'
  ];

  return projectKeywords.some(keyword => normalized.includes(keyword));
}
