export const errors = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  EMAIL_EXISTS: 'User with this email already exists',
  INVALID_CREDENTIALS: (resource: string) => `Invalid ${resource} credentials`,
  NOT_CREATED: (resource: string) => `${resource} not created`,
  NOT_UPDATED: (resource: string) => `${resource} not updated`,
  NOT_DELETED: (resource: string) => `${resource} not deleted`,
  NOT_ATTACHED: (resource: string) => `${resource} not attached`,
  NOT_DETACHED: (resource: string) => `${resource} not detached`,
  NOT_AUTHORIZED: (resource: string) => `Not authorized to ${resource}`,
  NOT_AUTHENTICATED: 'Not authenticated',
  NOT_AUTHORIZED_TO_ACCESS: 'Not authorized to access this resource',
  NOT_AUTHORIZED_TO_PERFORM_ACTION: 'Not authorized to perform this action',
  NOT_AUTHORIZED_TO_PERFORM_ACTION_ON_RESOURCE:
    'Not authorized to perform this action on this resource',
  NOT_AUTHORIZED_TO_PERFORM_ACTION_ON_RESOURCE_WITH_ID:
    'Not authorized to perform this action on this resource with id',
};