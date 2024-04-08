import debug from 'debug';

const db = debug('dev:db');
const server = debug('dev:server');
const error = debug('dev:error');
const http = debug('dev:http');

export const logs = { db, server, error, http };
