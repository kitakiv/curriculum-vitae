import { GetUserMutation } from '@/gql/graphql';
import { hasPermission } from '@/query/permissions';
import LiquidGlassButton from '@/components/button/LiquidButton';
import { Resource, Action } from '@/variables/admin/resource';

interface ResourceManagerProps {
  user: GetUserMutation['getUser'];
  resource: Resource;
  items: any[];
  onCreate?: () => void;
  onUpdate?: (id: string) => void;
  onDelete?: (id: string) => void;
  renderItem: (item: any) => React.ReactNode;
}

export default function ResourceManager({
  user,
  resource,
  items,
  onCreate,
  onUpdate,
  onDelete,
  renderItem,
}: ResourceManagerProps) {
  const canCreate = hasPermission(user, resource, [Action.CREATE]);
  const canUpdate = hasPermission(user, resource, [Action.UPDATE]);
  const canDelete = hasPermission(user, resource, [Action.DELETE]);
  const canRead = hasPermission(user, resource, [Action.READ]);

  if (!canRead) {
    return <div className="p-6 text-center">No permission to view this resource</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold capitalize">{resource}s</h1>
        {canCreate && onCreate && (
          <LiquidGlassButton onClick={onCreate}>
            Create New
          </LiquidGlassButton>
        )}
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="liquidGlass-elem liquidGlass-shadow p-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex-1">{renderItem(item)}</div>
            <div className="flex gap-2">
              {canUpdate && onUpdate && (
                <button
                  onClick={() => onUpdate(item.id)}
                  className="px-3 py-1 bg-yellow-500 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              )}
              {canDelete && onDelete && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
