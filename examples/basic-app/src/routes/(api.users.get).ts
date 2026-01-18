/**
 * API Route: GET /api/users
 * Fetch all users
 */

import { RouteContext, utils } from '@webframework/core';

export async function GET(ctx: RouteContext) {
  try {
    // In a real app, would query database
    const users = [
      { id: '1', name: 'Alice', email: 'alice@example.com' },
      { id: '2', name: 'Bob', email: 'bob@example.com' },
    ];

    return utils.json(users, { status: 200 });
  } catch (error) {
    return utils.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
