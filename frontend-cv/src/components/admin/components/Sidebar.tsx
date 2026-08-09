'use client';

import { GetUserMutation } from '@/gql/graphql';
import { getUserResources } from '@/query/permissions';
import { Resource, resourceConfig } from '@/variables/admin/resource';
import BurgerIconAdmin from './BurgerIconAdmin';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleBurgerMenu } from "@/features/position/PositionSlice";
import SideBarWrapper from './SideBarWrapper';

interface SidebarProps {
  user: GetUserMutation['getUser'];
  currentResource?: string | null;
}

export default function Sidebar({ user, currentResource }: SidebarProps) {
  const userResources = getUserResources(user);

  return (  
    <SideBarWrapper>
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
                  ? 'bg-adminGr0 text-light font-extrabold'
                  : 'hover:bg-adminGr33 text-adminTx100'
                }`}
            >
              <span className="text-lg transition-all duration-700">{config.title}</span>
            </Link>
          );
        })}
      </SideBarWrapper>
  );
}
