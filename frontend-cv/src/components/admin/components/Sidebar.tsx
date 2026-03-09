'use client';

import { GetUserMutation } from '@/gql/graphql';
import { getUserResources } from '@/query/permissions';
import { adminVariables, resourceConfig } from '@/variables/admin/resource';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface SidebarProps {
  user: GetUserMutation['getUser'];
}

export default function Sidebar({ user }: SidebarProps) {
  const searchParams = useSearchParams();
  const currentResource = searchParams.get(adminVariables.searchParamResourse);
  const userResources = getUserResources(user);

  return (
    <aside className="w-64 liquidGlass-elem p-4 h-screen fixed">
      <nav className="flex flex-col gap-2">
        {userResources.map((resource) => {
          const config = resourceConfig[resource];
          if (!config) return null;
          const isActive = currentResource === resource + 's' || currentResource === resource;

          return (
            <Link
              key={resource}
              href={config.path}
              className={`flex items-center gap-3 padding-button rounded-lg transition-colors ${
                isActive
                  ? 'bg-adminGr0 text-light font-extrabold'
                  : 'hover:bg-adminGr33 text-adminTx100'
              }`}
            >
              <span className="text-lg">{config.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
