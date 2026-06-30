'use client'

import { Role } from "@/gql/graphql";
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Stack,
    Paper,
    Alert,
    Divider,
    Box
} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import ShieldIcon from '@mui/icons-material/Shield';
import ActionChip from "../components/ActionChip";
import Summary from "../components/Summary";
import AffectedElements from "../components/AffectedElements";
import SmallText from "@/components/text/SmallText";

interface Props {
    resource: Role;
}

export default function RoleDeleteList({ resource }: Props) {
    if (!resource) {
        return (
            <Alert severity="error" className="mb-4">
                No role data available
            </Alert>
        );
    }

    const summary = [
        {
            text: 'Role Name',
            lable: `${resource.name}`,
            size: 'large',
            color: 'text-red-600 font-bold'
        },
        {
            text: 'Permissions',
            lable: `${resource.permissions?.length || 0}`,
            size: 'large',
            color: 'text-blue-600 font-bold'
        },
        {
            text: 'Affected Users',
            lable: `${resource.users?.length || 0}`,
            size: 'large',
            color: 'text-orange-600 font-bold'
        },
        {
            text: 'Role ID',
            lable: `${resource.id}`,
            size: 'small',
            color: 'text-gray-600 font-bold'
        },
    ];


    return (
        <div className="w-full mx-auto space-y-6">


            <AffectedElements name={resource.name} id={resource.id} affectedElements={resource.users?.map((user) => user.login) || []} affectedElementsName="Users" />
            {resource.permissions && resource.permissions.length > 0 ? (
                <div className="space-y-4">
                    {resource.permissions.map((permission, index) => (
                        <div
                            key={permission.id}
                            className="bg-gradient-to-r from-adminGr0 to-adminGr100 rounded-lg p-5 border border-adminGr33 hover:shadow-sm  hover:shadow-adminTx transition-shadow"
                        >
                            <div className="flex gap-1 items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-adminGr33 rounded-full flex items-center justify-center text-amdinTx font-bold">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-adminTx100 capitalize">
                                            {permission.resource}
                                        </h4>
                                    </div>
                                </div>
                                <div
                                    key={permission.actions.length}

                                    className="rounded-full px-4 py-1 text-adminTx text-center bg-transparent border border-adminGr33"
                                >
                                    <SmallText>{permission.actions.length} Actions</SmallText>
                                </div>
                            </div>

                            <Divider className="my-3" />

                            <div>
                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                    {permission.actions.map((action) => (
                                        <ActionChip action={action} key={action} />
                                    ))}
                                </Stack>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <SecurityIcon sx={{ fontSize: 48, color: 'var(--adminTx)' }} />
                    <p className="text-gray-500 mt-2">No permissions found for this role</p>
                </div>
            )}

            <Summary heading="Summary" summary={summary} />
        </div>
    );
}