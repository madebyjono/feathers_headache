// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver
} from './users.schema'

const { 
  addVerification, 
  removeVerification 
} = require("feathers-authentication-management");
const authNotifier = require("../auth-management/notifier");

const sendVerify = () => {
  return async (context: { app: any; result: any }) => {
    const notifier = authNotifier(context.app);

    const users = Array.isArray(context.result) 
      ? context.result
      : [context.result];

    await Promise.all(
      users.map(async user => notifier("resendVerifySignup", user))
    )
  };
}


import type { Application } from '../../declarations'
import { UserService, getOptions } from './users.class'

export const userPath = 'users'
export const userMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export * from './users.class'
export * from './users.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [],
      find: [authenticate('jwt')],
      get: [authenticate('jwt')],
      create: [],
      update: [authenticate('jwt')],
      patch: [authenticate('jwt')],
      remove: [authenticate('jwt')]
    },
    before: {
      all: [],
      find: [],
      get: [],
      create: [addVerification("auth-management")],
      patch: [],
      remove: []
    },
    after: {
      all: [],
      create: [
        sendVerify(),
        removeVerification()
      ]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userPath]: UserService
  }
}
