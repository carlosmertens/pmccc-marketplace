import debug from 'debug';

const db = debug('dev:db');
const server = debug('dev:server');
const error = debug('dev:error');
const http = debug('dev:http');

export const log = { db, server, error, http };
