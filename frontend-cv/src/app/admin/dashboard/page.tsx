import { GetUserMutation } from "@/gql/graphql";
import { getMe } from "@/query/auth.query";
import { getResourceActions, getUserResources } from "@/query/permissions";



export default async function Admin() {
  const user: GetUserMutation['getUser'] | false = await getMe() as GetUserMutation['getUser'];
  const userResources = getUserResources(user);
  return (
    <>
      {userResources.map((resource) => {
        const userActions = getResourceActions(user, resource);
        if (userActions) {
          return (
            <div className="w-full" key={`resource-${resource}`}>
              {resource}
              {userActions.map((action) => {
                return (
                  <div className="flex" key={`action-${action}`}>
                    {action}
                  </div>
                )
              })}
            </div>
          )
        }
      })
      }
    </>
  );
}