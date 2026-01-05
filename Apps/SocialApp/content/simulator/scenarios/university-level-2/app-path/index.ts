/**
 * App Path - Dating Apps
 * Mission 2: Navigate digital dynamics, spot the catfish
 */
import { matchScenes } from './the-matches';
import { chatScenes } from './the-chat';
import { appEndingScenes } from './endings';

export const appScenes = [...matchScenes, ...chatScenes, ...appEndingScenes];
