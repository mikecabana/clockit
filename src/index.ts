import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as Routes from './routes';


import { User } from './entity/User';

createConnection().then(async connection => {

    console.log('Seeding database...');

    const user = new User();
    user.firstName = 'Timber';
    user.lastName = 'Saw';
    user.email = 'user@example.com';
    user.isLocked = true;
    user.creationDate = new Date();
    user.password = '!Password001'
    await connection.manager.save(user);


    console.log('Loading users from the database...');
    const users = await connection.manager.find(User);
    console.log('Loaded users: ', users);



}).catch(error => console.log(error));
