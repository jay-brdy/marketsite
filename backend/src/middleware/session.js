import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { pool } from '../db/pool.js';
import { config } from '../config.js';

const PgSession = connectPgSimple(session);

export const sessionMiddleware = session({
  store: new PgSession({ pool }),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax'
  }
});
