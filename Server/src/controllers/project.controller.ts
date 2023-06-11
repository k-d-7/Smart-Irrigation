import { NextFunction, Request, Response } from "express";
import { IProject } from "@interfaces/project.interface";
import ProjectService from "@services/project.service";
import { CreateProjectParams } from "@params/params";
import Cache from "@cache";
import FilterProjectService from "@/services/filterproject.service";

export default class ProjectController {
    public projectService = new ProjectService();
    public filerProjectService = new FilterProjectService();
    public redisCache = Cache.getInstance();

    // user must be logged in to create a project
    public createProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const params: CreateProjectParams = req.body;
            const project: IProject = await this.projectService.createProject(
                params
            );
            res.status(201).json({
                data: project,
                message: "Project created successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public listAllProjects = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const projects: IProject[] =
                await this.projectService.listAllProjects();
            res.status(200).json({ Project: projects });
        } catch (error) {
            next(error);
        }
    };

    public getProjectById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const project = await this.redisCache.get(req.params.id);
            if (project) {
                return res.status(200).json({
                    data: project,
                    message: "Project retrieved successfully from cache",
                });
            } else {
                const id: string = req.params.id;
                const project: IProject =
                    await this.projectService.getProjectById(id);
                await this.redisCache.set(id, project);
                return res.status(200).json({
                    data: project,
                    message: "Project retrieved successfully",
                });
            }
        } catch (error) {
            next(error);
        }
    };

    public getProjectByUserId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId: string = req.params.id;
            const project: IProject[] =
                await this.projectService.getProjectsByUserID(userId);
            res.status(200).json({
                data: project,
                message: "Project retrieved successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public getProjectByTitle = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const title: string = req.params.title;
            const project: IProject =
                await this.projectService.getProjectByTitle(title);
            res.status(200).json({
                data: project,
                message: "Project retrieved by title successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public updateProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id: string = req.params.id;
            const params: CreateProjectParams = req.body;
            const project: IProject = await this.projectService.updateProject(
                id,
                params
            );
            res.status(200).json({ project });
        } catch (error) {
            next(error);
        }
    };

    public deleteProject = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const id: string = req.params.id;
            const project: IProject = await this.projectService.deleteProject(
                id
            );
            res.status(200).json({
                data: project,
                message: "Project deleted successfully",
            });
        } catch (error) {
            next(error);
        }
    };

    public FilterProjectService = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const order = req.params.order;
            const projects: IProject[] =
                await this.filerProjectService.filterByMoneyRaised(
                    parseInt(order)
                );
            res.status(200).json(projects);
        } catch (error) {
            next(error);
        }
    };
}
