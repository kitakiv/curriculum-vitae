'use client';

import { GetUserMutation } from '@/gql/graphql';
import { getUserResources } from '@/query/permissions';
import { Resource, resourceConfig } from '@/variables/admin/resource';
import Link from 'next/link';
import SideBarWrapper from './SideBarWrapper';
import ThemeIcon from '@/components/header/components/ThemeIcon';
import header from '@/variables/header/header';

interface SidebarProps {
  user: GetUserMutation['getUser'];
  currentResource?: string | null;
}

export default function Sidebar({ user, currentResource }: SidebarProps) {
  const userResources = getUserResources(user);

  return (  
    <SideBarWrapper>
      <>
       <div className="flex items-center justify-center"><span><ThemeIcon key={header.keyIcons} /></span></div>
        {userResources.map((resource: Resource) => {
          // @ts-ignore
          const config = resource ? resourceConfig[resource]: null;
          if (!config) return null;
          const isActive = currentResource?.toLocaleLowerCase() === resource.toLocaleLowerCase() + 's' 
          || currentResource?.toLocaleLowerCase() === resource.toLocaleLowerCase();
          console.log(currentResource, resource);
          return (
            <Link
              key={resource}
              href={config.path}
              className={`flex items-center w-full gap-3 padding-button rounded-lg transition-colors ${isActive
                  ? 'bg-adminGr0 text-adminTx font-extrabold'
                  : 'hover:bg-adminGr33 text-adminTx100'
                }`}
            >
              <span className="text-lg transition-all duration-700">{config.title}</span>
            </Link>
          );
        })}
        </>
      </SideBarWrapper>
  );
}
