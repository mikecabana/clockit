import { getRepository, Repository } from 'typeorm';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/User';

export class UserController {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public async getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userRepository.find();
    }

    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userRepository.findOne(req.params.id);
    }

    public async post(req: Request, res: Response, next: NextFunction): Promise<any> {
        req.body.creationDate = new Date();
        return this.userRepository.save(req.body);
    }

    public async put(req: Request, res: Response, next: NextFunction): Promise<any> {
        return this.userRepository.update(req.params.id, req.body);
    }

    public async delete(req: Request, res: Response, next: NextFunction): Promise<any> {
        await this.userRepository.remove(req.params.id);
    }

}