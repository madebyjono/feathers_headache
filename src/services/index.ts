import { user } from './users/users'
const authManagement = require("./auth-management/auth-management.service.js");

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(user)
  app.configure(authManagement);
  // All services will be registered here
}
