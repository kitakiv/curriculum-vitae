import { GetUserMutation } from '@/gql/graphql';
import SideBar from './components/Sidebar';

interface AdminDashboardProps {
  user: GetUserMutation['getUser'];
  children: React.ReactNode; 
}



export default function AdminDashboard({ user, children }: AdminDashboardProps) {
  return (
    <>
      <div className='lg:col-span-6 md:col-span-3 sm:col-span-6'>
        <SideBar user={user}/>
      </div>
      <div className='lg:col-span-6 md:col-span-9 sm:col-span-6'>
        {children}
      </div>
    </>
  );
}
