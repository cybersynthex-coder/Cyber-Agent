import { runCommand } from './action-engine.js';

export async function createExpoProject(projectPath) {
  runCommand(
    'npx create-expo-app . --template expo-template-blank-typescript',
    projectPath
  );

  runCommand(
    'npm install @react-native-async-storage/async-storage',
    projectPath
  );
}
