'use client'

import { AllPermission, Role } from "@/gql/graphql"
import {
    Card,
    CardContent,
    CardHeader,
    Chip,
    Stack,
    Tooltip,
    Paper
} from "@mui/material"
import PreviewIcon from '@mui/icons-material/Preview'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import SecurityIcon from '@mui/icons-material/Security'
import { Action } from "@/variables/admin/resource"
import ActionChip from './ActionChip'

interface ListProps {
    permissions: AllPermission[];
    role: Role;
    resourceId: string
}

interface Resource {
    id: string
    name: string
    description?: string
    status?: 'active' | 'inactive'
    type?: string
    actions: string[]
}


export default function List({ role, resourceId, permissions }: ListProps) {
    const resources: Resource[] = role.permissions.map(({resource, actions, id}) => {
        return {
            id: id,
            name: resource,
            description: `${resource.charAt(0).toUpperCase() + resource.slice(1)} Management`,
            status: 'active',
            type: resource,
            actions: actions,
        }
    })

    const summary = [
        {
            text: 'Total Resources',
            lable: `${permissions.length}`,
            size: 'large',
            color: 'text-adminTx font-bold'
        },
        {
            text: 'Active',
            lable: `${resources.filter(r => r.status === 'active').length}`,
            size: 'large',
            color: 'text-green-500 font-bold'
        },
        {
            text: 'Your Role',
            lable: `${role?.name || 'Admin'}`,
            size: 'medium',
            color: 'text-txFirst100 font-bold'
        },
        {
            text: 'Resource ID',
            lable: `${resourceId}`,
            size: 'small',
            color: 'text-txFirst100 font-bold'

        },
    ]
    return (
        <div className="w-full min-h-screen bg-gradient-to-t from-adminGr0 to-adminGr100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-adminTx mb-2 flex items-center gap-3">
                        <SecurityIcon className="text-txFirst100" sx={{ fontSize: 40 }} />
                        Resource Management
                    </h1>
                    <p className="text-adminTx text-lg">All your resources and permissions</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource) => (
                        <Paper
                            key={resource.id}
                            elevation={0}
                            className="bg-adminGr33 hover:shadow-adminTx hover:shadow-sm transition-all duration-300 border border-adminTx100 hover:border-adminTx"
                            sx={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                backgroundColor: 'var(--adminGr33)',
                            }}
                        >
                            <Card sx={{ backgroundColor: 'linear-gradient(to bottom, var(--adminTx), var(--adminGr100))' }} className="shadow-none border-0 h-full flex flex-col">
                                <CardHeader
                                    className="pb-3 pt-5 px-6 border-b border-adminGr33"
                                    title={
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-xl font-bold text-adminTx">
                                                {resource.name}
                                            </h3>
                                            {resource.status === 'active' && (
                                                <Chip
                                                    icon={<CheckCircleIcon />}
                                                    label="Active"
                                                    color="success"
                                                    size="small"
                                                    variant="outlined"
                                                    className="bg-green-100"
                                                />
                                            )}
                                        </div>
                                    }
                                />

                                <CardContent className="flex-grow px-6 py-4">
                                    <p className="text-adminTx100 text-sm mb-4">
                                        {resource.description}
                                    </p>
                                    {resource.type && (
                                        <Chip
                                            label={`Type: ${resource.type}`}
                                            size="small"
                                            variant="filled"
                                            sx={{ backgroundColor: 'var(--form)' }}
                                        />
                                    )}
                                </CardContent>
                                <div className="px-6 py-4 border-t border-slate-100 bg-gradient-to-r from-adminGr100 to-adminGr0">
                                    <p className="text-xs font-semibold text-adminTx mb-3 uppercase tracking-wider">
                                        ✓ Available Actions
                                    </p>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        sx={{ flexWrap: 'wrap', gap: 1, margin: 0 }}
                                        className="flex justify-between items-center"
                                    >
                                        {resource.actions.map((action: string) => (
                                            <ActionChip key={action} action={action} />
                                        ))}
                                    </Stack>
                                </div>
                            </Card>
                        </Paper>
                    ))}
                </div>

                <div className="mt-12 p-6 liquidGlass-elem">
                    <h3 className="font-semibold text-adminTx mb-4 text-lg">📊 Summary</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {
                            summary.map((item, index) => (
                                <div key={`${item.text}-${index}`} className="p-4 bg-gradient-to-br from-adminGr50 to-adminGr100 rounded-lg border-adminTx border-[1px]">
                                    <p className={`${item.color} text-sm text-adminTx100`}>{item.text}</p>
                                    <p className={`text-2xl text-adminTx100 font-bold ${item.size === 'large' ? 'text-3xl' : item.size === 'medium' ? 'text-xl' : 'text-base'} mt-1 `}>{item.lable}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}