/**
 * Router tests
 */

import createRouter from '../createRouter';
import * as path from 'path';

describe('Router', () => {
  it('should parse routes', async () => {
    const testDir = path.join(__dirname, '..', '__fixtures__');
    const { routes, match } = await createRouter(testDir);
    expect(match).toBeDefined();
  });
});
