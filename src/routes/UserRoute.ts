import { UserController } from '../controller/UserController';

export const UserRoutes = [
    {
        path: '/users',
        method: 'get',
        controller: UserController,
        action: 'getAll'
    },
    {
        path: '/users/:id',
        method: 'get',
        controller: UserController,
        action: 'get'
    },
    {
        path: '/users',
        method: 'post',
        controller: UserController,
        action: 'post'
    },
    {
        path: '/users/:id',
        method: 'put',
        controller: UserController,
        action: 'put'
    },
    {
        path: '/users',
        method: 'delete',
        controller: UserController,
        action: 'delete'
    }
];

