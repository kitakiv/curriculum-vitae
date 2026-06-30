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
