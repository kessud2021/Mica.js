/**
 * API Route: POST /api/users
 * Create a new user
 */

import { RouteContext, utils } from '@webframework/core';

interface CreateUserInput {
  name: string;
  email: string;
}

export async function POST(ctx: RouteContext) {
  try {
    const body = ctx.request.body as CreateUserInput;

    // Validation
    if (!body.name || !body.email) {
      return utils.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!utils.validateEmail(body.email)) {
      return utils.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // In a real app, would save to database
    const newUser = {
      id: utils.uuid(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    };

    return utils.json(newUser, { status: 201 });
  } catch (error) {
    return utils.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}
