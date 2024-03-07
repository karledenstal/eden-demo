import { edenTreaty } from '@elysiajs/eden';
import type { App } from '../../backend/src';

export const client = edenTreaty<App>('http://localhost:1111');
