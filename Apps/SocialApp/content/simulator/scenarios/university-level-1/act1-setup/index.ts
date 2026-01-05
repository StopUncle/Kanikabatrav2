import type { ForkScene } from '../../../types';
import { dormRoomScenes } from './dorm-room';
import { forkScenes } from './the-fork';

export const act1Scenes: ForkScene[] = [...dormRoomScenes, ...forkScenes];

export { dormRoomScenes, forkScenes };
