import { AppError } from "@app/shared";

type User = {
  id: string;
  email: string;
  password: string;
};

type RegisterInput = {
  email?: string;
  password?: string;
};

type LoginInput = {
  email?: string;
  password?: string;
};

const users: User[] = [];

export const authService = {
  register(input: RegisterInput) {
    if (!input.email || !input.password) {
      throw new AppError(400, "email and password are required");
    }

    const existingUser = users.find((user) => user.email === input.email);
    if (existingUser) {
      throw new AppError(409, "user already exists");
    }

    const user = {
      id: `user_${users.length + 1}`,
      email: input.email,
      password: input.password,
    };

    users.push(user);

    return {
      id: user.id,
      email: user.email,
    };
  },

  login(input: LoginInput) {
    if (!input.email || !input.password) {
      throw new AppError(400, "email and password are required");
    }

    const user = users.find((entry) => entry.email === input.email);
    if (!user || user.password !== input.password) {
      throw new AppError(401, "invalid credentials");
    }

    return {
      token: `fake-jwt-token-for-${user.id}`,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },

  listUsers() {
    return users.map(({ password, ...user }) => user);
  },
};
