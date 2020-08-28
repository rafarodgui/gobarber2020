"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
var AppointmentsController_1 = __importDefault(require("@modules/appointments/infra/http/controllers/AppointmentsController"));
var appointimetsRouter = express_1.Router();
appointimetsRouter.use(ensureAuthenticated_1.default);
var appointmentsController = new AppointmentsController_1.default();
// appointimetsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json({ appointments });
// });
appointimetsRouter.post('/', appointmentsController.create);
exports.default = appointimetsRouter;
