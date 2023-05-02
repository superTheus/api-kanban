import { Router, Request, Response } from "express";

interface ControllersUSer {
  getAllUsersController: (req: Request, res: Response) => {},
  insertUsersController: (req: Request, res: Response) => {},
  getUsersByIdController: (req: Request, res: Response) => {},
  updateUserByIdController: (req: Request, res: Response) => {},
  deleteUserByController: (req: Request, res: Response) => {}
}


const UserController: ControllersUSer = require('./Controllers/UserController');

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const HTML = `<html>
                  <body>
                      <h2>Bem Vindo a API do Kanban</h2>
                      <a href="https://gitlab.com/j.matheussouza2019/ranking-api" > Documentação </a>
                  </body>
                </html>`;
  res.send(HTML);
});

router.get("/users", UserController.getAllUsersController);
router.get("/users/:id", UserController.getUsersByIdController);
router.post("/users", UserController.insertUsersController);
router.put("/users/", UserController.updateUserByIdController);
router.delete("/users/:id", UserController.deleteUserByController);

router.post("/card", (req: Request, res: Response) => {
});

export { router }