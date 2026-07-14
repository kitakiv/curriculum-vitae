import { GetUserMutation } from '@/gql/graphql';
import { Action, Resource, resourceConfig } from '@/variables/admin/resource';

export function hasPermission(
  user: GetUserMutation['getUser'] | undefined | false,
  resource: Resource,
  actions: Action[]
): boolean {
  if (!user || !user.role) return false;

  const permission = user.role.permissions?.find(
    (p) => p.resource.toLowerCase() === resource.toLowerCase()
  );

  if (!permission) return false;

 const access = actions.map(a => {
    return permission.actions.includes(a.toLowerCase())
 });
 return access.includes(false) ? false : true;
}

export function hasPermissions(user: GetUserMutation['getUser'] | undefined | false,
  permissions: { resource: Resource; actions: Action[] }[]
) {
  return permissions.map(p => hasPermission(user, p.resource, p.actions)).includes(false) ? false : true;
}

export function getUserResources(
  user: GetUserMutation['getUser'] | undefined | false
): Resource[] {
  if (!user || !user.role) return [];

  return user.role.permissions?.map((p) => p.resource.toLowerCase() as Resource) || [];
}

export function getResourceActions(
  user: GetUserMutation['getUser'] | undefined | false,
  resource: Resource
): Action[] {
  if (!user || !user.role) return [];

  const permission = user.role.permissions?.find(
    (p) => p.resource.toLowerCase() === resource.toLowerCase()
  );

  return permission?.actions.map((a) => a.toLowerCase() as Action) || [];
}

export function checkResource(currentResource: string | null, resourse: Resource) {
    if (currentResource === resourse + 's' || currentResource === resourse) {
        return true;
    }
    return false;
}

export function returnResourceData(currenctResource: string | null) {
  // @ts-ignore
  if (resourceConfig[currenctResource as Resource]) {
    // @ts-ignore
    return resourceConfig[currenctResource as Resource]
  }
  // @ts-ignore
  if (resourceConfig[currenctResource + "s" as Resource]) {
    // @ts-ignore
    return resourceConfig[currenctResource + "s" as Resource]
  }
  return null
}