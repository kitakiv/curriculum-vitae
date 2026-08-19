import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import TableImage from "@/components/admin/components/TableImage";
import Link from "next/link";
import { adminVariables, Resource } from '../admin/resource';
import { EditAdminButton, DeleteAdminButton, ViewAdminButton, AttachRoleAdminButton } from "@/components/admin/components/ActionAdminButton";
import Table from '@/components/admin/components/Table';
import { GetRoleQuery, Permission, Role } from '@/gql/graphql';
import ActionChip from '@/components/admin/components/ActionChip';
interface Table {
    [key: string]: {
        columns: GridColDef[]
    }
}



const table: Table = {

    contactsTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.CONTACT} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.CONTACT} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.CONTACT} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'contactName',
                headerName: 'Contact name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'contactLink',
                filterable: true,
                headerName: 'Contact link',
                width: 150,
                sortable: true,
                type: 'string',
            },
            {
                field: 'contactSvg',
                filterable: true,
                headerName: 'Contact Image',
                width: 150,
                sortable: false,
                renderCell: (params) => (<TableImage params={params || null} />),
            },


        ]
    },
    sliderTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.SLIDER} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.SLIDER} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.SLIDER} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'sliderName',
                headerName: 'Slider name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'sliderText',
                filterable: true,
                headerName: 'Descripstion of slider',
                width: 300,
                sortable: true,
                type: 'longText',
            },
            {
                field: 'sliderImage',
                filterable: true,
                headerName: 'Slider Image',
                width: 150,
                sortable: false,
                renderCell: (params) => (<TableImage params={params || null} />),
            },

        ]
    },
    techStackTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.TECHSTACK} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.TECHSTACK} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.TECHSTACK} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'techName',
                headerName: 'Tech stack name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'projects',
                headerName: 'Projects using this stack',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    const projects = params.value as { projectTitle: string }[];
                    return projects.map(project => project.projectTitle).join(', ');
                },
            },
            {
                field: 'techCategories',
                headerName: 'Tech stack categories',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    const categories = params.value as { categoryName: string }[];
                    return categories.map(category => category.categoryName).join(', ');
                }
            },
            {
                field: 'techSvg',
                filterable: true,
                headerName: 'Tech Stack Image',
                width: 150,
                sortable: false,
                renderCell: (params) => (<TableImage params={params || null} />),
            },
        ]
    },
    certificateTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.CERTIFICATE} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.CERTIFICATE} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.CERTIFICATE} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'certificateTitle',
                headerName: 'Certificate title',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'certificateCompany',
                headerName: 'Company name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'certificateDescription',
                headerName: 'Certificate description',
                width: 300,
                filterable: true,
                sortable: true,
                type: 'longText',
            },
            {
                field: 'certificateLink',
                headerName: 'Link to certificate',
                width: 150,
                type: 'string',
            },
            {
                field: 'certificatePeriodStart',
                headerName: 'Period Start',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'string',
            },
            {
                field: 'certificatePeriodEnd',
                headerName: 'Period End',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'string',
            },
            {
                field: 'certificateImage',
                headerName: 'Certificate Image',
                width: 150,
                renderCell: (params) => (<TableImage params={params || null} />),
            },
        ]
    },
    profileTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.PROFILE} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.PROFILE} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'name',
                headerName: 'Name',
                width: 150,
                type: 'string',
            },
            {
                field: 'surname',
                headerName: 'Surname',
                width: 150,
                type: 'string',
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 200,
                sortable: true,
                filterable: true,
                type: 'string',
            },
            {
                field: 'phone',
                headerName: 'Phone',
                width: 150,
                sortable: true,
                filterable: true,
                valueFormatter: (params: { value: string }) => {
                    const phone = params.value || '';
                    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
                },
                type: 'string',
            },
            {
                field: 'typingText',
                headerName: 'Text on the main page',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'longText',
            },
            {
                field: 'location',
                headerName: 'Location',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'string',
            },
            {
                field: 'profilePhotos',
                headerName: 'Profile photos',
                width: 150,
                sortable: false,
                renderCell: (params) => {
                return (
                    <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                whiteSpace: 'normal',
                                lineHeight: 1.6,
                            }}>
                                <TableImage params={params || null} />
                    </div>
                )
                },
          
            }
        ]
    },
    projectsTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.PROJECT} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.PROJECT} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.PROJECT} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'projectTitle',
                headerName: 'Project name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'projectDescription',
                headerName: 'Project description',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'longText',
            },
            {
                field: 'projectLink',
                headerName: 'Project link',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'string',
            },
            {
                field: 'techStacks',
                headerName: 'Project stack',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'string',
                renderCell: (params) => {
                    const techStacks = params.value as { techName: string }[];
                    return techStacks.map(techStack => techStack.techName).join(', ');
                }
            },
            {
                field: 'projectImages',
                headerName: 'Project images',
                width: 150,
                sortable: false,
                renderCell: (params) => {
                return (
                    <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                whiteSpace: 'normal',
                                lineHeight: 1.6,
                            }}>
                                <TableImage params={params || null} />
                    </div>
                )
            },
            },
        ]
    },
    categoryTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.CATEGORY} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.CATEGORY} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.CATEGORY} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'categoryName',
                headerName: 'Category name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'techStacks',
                headerName: 'Tech stacks in this category',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    const techStacks = params.value as { techName: string }[];
                    return techStacks.map(techStack => techStack.techName).join(', ');
                }
            }
        ]
    },
    userTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.USER} />),
            },
            {
                field: 'edit',
                headerName: 'Attach Role',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<AttachRoleAdminButton params={params || null} resource={Resource.USER} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.USER} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
                type: 'string',
            },
            {
                field: 'avatarPhoto',
                headerName: 'Profile photo',
                width: 150,
                type: 'string',
                renderCell: (params) => (<TableImage tailwind="rounded-full" params={params || null} />),
            },
            {
                field: 'isEmailVerified',
                headerName: 'Email verified',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'boolean',
            },
            {
                field: 'name',
                headerName: 'Username',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'login',
                headerName: 'Email',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'role',
                headerName: 'Role',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    return (<Link href={`${adminVariables.pathAdminPage}/${Resource.ROLE}/${adminVariables.view.path}/${(params.value as Role)?.id}`}>
                        {(params.value as Role)?.name || 'No role'}
                    </Link>)
                }
            }

        ]
    },

    roleTable: {
        columns: [
            {
                field: 'view',
                headerName: 'View',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<ViewAdminButton params={params || null} resource={Resource.ROLE} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.ROLE} />),
            },
            {
                field: 'delete',
                headerName: 'Delete',
                width: 70,
                type: 'actions',
                renderCell: (params) => (<DeleteAdminButton params={params || null} resource={Resource.ROLE} />),
            },
            {
                field: 'id', headerName: 'ID', width: 150,
            },
            {
                field: 'name',
                headerName: 'Role name',
                width: 150,
                filterable: true,
                sortable: true,
                type: 'string',
            },
            {
                field: 'permissions',
                headerName: 'Permissions',
                width: 200,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    const permissions = params.value as Permission[];
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                whiteSpace: 'normal',
                                lineHeight: 1.6,
                            }}
                        >
                            {permissions.map((permission) => (
                                <div key={permission.resource}>
                                    <strong>{permission.resource}:</strong>
                                    {permission.actions.map((action, index) => {
                                        console.log(action, 'action');
                                        return <ActionChip svg={false} size='small' key={index} action={action}></ActionChip>
                                    })}
                                </div>
                            ))}
                        </div>
                    );
                }
            },
            {
                field: 'users',
                headerName: 'Users with this role',
                width: 200,
                filterable: true,
                sortable: true,
                type: 'string',
                renderCell: (params) => {
                    const users = params.value as GetRoleQuery['role']['users'];
                    if (!users || users.length === 0) {
                        return 'No users'
                    }
                    return (
                        users.map(user => {
                            return (<Link key={user.login} href={`${adminVariables.pathAdminPage}/${Resource.USER}/${adminVariables.view.path}/${user.id}`}>
                                {user.login}
                            </Link>)
                        })
                    )
                }
            }
        ]
    }


}
export default table;