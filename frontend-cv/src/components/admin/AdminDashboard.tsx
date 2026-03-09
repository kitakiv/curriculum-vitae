import { GetUserMutation } from '@/gql/graphql';
import SideBar from './components/Sidebar';

interface AdminDashboardProps {
  user: GetUserMutation['getUser'];
  children: React.ReactNode; 
}



export default function AdminDashboard({ user, children }: AdminDashboardProps) {
  return (
    <div className="grid grid-cols-12 pt-24">
      <div className='col-span-2'>
        <SideBar user={user}/>
      </div>
      <div className='col-span-10'>
        {children}
      </div>
    </div>
  );
}
// {userResources.map((resource) => {
//         const config = resourceConfig[(resource)];
//         if (!config) return null;
//         const canCreate = hasPermission(user, resource, [Action.CREATE]);
//         const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
//         const canDelete = hasPermission(user, resource, [Action.DELETE]);
//         const canRead = hasPermission(user, resource, [Action.READ]);

//         return (
//           <div
//             key={resource}
//             className="liquidGlass-elem liquidGlass-shadow"
//           >
//             <div className="flex flex-col gap-4">
//               {/* <img src={config.icon} alt={config.title} className="w-12 h-12" /> */}
//               <h3 className="text-xl font-bold">{config.title}</h3>
//               <div className="flex gap-2 flex-wrap">
//                 {canRead && <span className="text-xs px-2 py-1 bg-blue-500 rounded">Read</span>}
//                 {canCreate && <span className="text-xs px-2 py-1 bg-green-500 rounded">Create</span>}
//                 {canUpdate && <span className="text-xs px-2 py-1 bg-yellow-500 rounded">Update</span>}
//                 {canDelete && <span className="text-xs px-2 py-1 bg-red-500 rounded">Delete</span>}
//               </div>
//             </div>
//           </div>
//         );
//       })
//       }