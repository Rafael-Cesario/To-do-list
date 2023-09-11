export const jwtConstants = {
  secret: process.env.SECRET,
  expiresIn: 60 * 60 * 24 * 7, // 1 week
};
