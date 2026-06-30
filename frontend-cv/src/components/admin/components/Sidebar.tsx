'use client';

import { GetUserMutation } from '@/gql/graphql';
import { getUserResources } from '@/query/permissions';
import { Resource, resourceConfig } from '@/variables/admin/resource';
import Link from 'next/link';

interface SidebarProps {
  user: GetUserMutation['getUser'];
  currentResource?: Resource | null;
}

export default function Sidebar({ user, currentResource }: SidebarProps) {
  const userResources = getUserResources(user);

  return (
    <aside className="w-full liquidGlass-elem p-4 sticky top-20 rounded-lg">
      <nav className="flex flex-col gap-2">
        {userResources.map((resource) => {
          const config = resource ? resourceConfig[resource] : null;
          if (!config) return null;
          const isActive = currentResource?.toLocaleLowerCase() === resource.toLocaleLowerCase() + 's' 
          || currentResource?.toLocaleLowerCase() === resource.toLocaleLowerCase();
          console.log(currentResource, resource);
          return (
            <Link
              key={resource}
              href={config.path}
              className={`flex items-center gap-3 padding-button rounded-lg transition-colors ${isActive
                  ? 'bg-adminGr0 text-light font-extrabold'
                  : 'hover:bg-adminGr33 text-adminTx100'
                }`}
            >
              <span className="text-lg transition-all duration-700">{config.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
