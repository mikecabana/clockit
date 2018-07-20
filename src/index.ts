import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as Routes from './routes';


import { User } from './entity/User';

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());


    // register routes for the api
    Routes.UserRoutes.forEach((route) => {
        app[route.method](route.path, (req: Request, res: Response, next: NextFunction) => {

            const result = (new (route.controller))[route.action](req, res, next);

            if (result instanceof Promise) {
                result
                    .then((result) => {
                        return result !== null && result !== undefined ? res.json(result) : undefined;
                    })
                    .catch((err) => {
                        const query = err.query;
                        res.status(500).json({
                            name: err.name,
                            message: err.message,
                            data: {
                                query
                            }
                        });
                    });
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }

        });
    });

    // set up express app here
    // 
    // 
    // =======================

    app.listen(3000);

    console.log('Seeding database...');


    const existingUser = await connection.manager.find(User, { email: 'user@example.com' });
    if (!existingUser) {
        await connection.manager.save(connection.manager.create(User, {
            firstName: 'Timber',
            lastName: 'Saw',
            email: 'user@example.com',
            isLocked: true,
            password: '!Password001',
            creationDate: new Date()
        }));
    }

    // console.log('Loading users from the database...');
    // const users = await connection.manager.find(User);
    // console.log('Loaded users: ', users);

}).catch(error => console.log(error));
