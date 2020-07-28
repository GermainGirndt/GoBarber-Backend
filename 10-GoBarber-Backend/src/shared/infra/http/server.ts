// import postgrees connection
import '@shared/infra/typeorm';
// for typeorm
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import cors from 'cors';

import 'express-async-errors';

// src/server.tsyarn
import routes from './routes';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';

const app = express();

// cors - just for browser requests - neither insomnia or react
app.use(cors());

// static files
app.use('/files', express.static(uploadConfig.directory));

app.use(express.json());
app.use(routes);

// after the routes: error handling

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        // if error already defined by me,
        // return defined message
        if (err instanceof AppError) {
            return response
                .status(err.statusCode)
                .json({ status: 'error', message: err.message });
        }

        console.log(err);
        // unexpected error
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server started on port 3333!');
});
