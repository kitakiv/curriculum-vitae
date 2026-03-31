import { GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid';
import TableImage from "@/components/admin/components/TableImage";
import Link from "next/link";
import { Resource } from '../admin/resource';
import { EditAdminButton, DeleteAdminButton, ViewAdminButton } from "@/components/admin/components/ActionAdminButton";
import Table from '@/components/admin/components/Table';
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
                field: 'id', headerName: 'ID', width: 70,
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
                field: 'id', headerName: 'ID', width: 70,
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
                field: 'id', headerName: 'ID', width: 70,
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
                field: 'id', headerName: 'ID', width: 70,
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
                field: 'id', headerName: 'ID', width: 70,
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
                renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
                    const value = params.value as string[];
                    if (!value || value.length === 0) {
                        return <TableImage params={{ value: null }} />
                    }
                    return (
                        <>
                        {
                            value.map((photo: string) => 
                            <TableImage key={photo.at(-1)} params={{ value: photo }} />
                        )}
                        </>
                    )
                }
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
                field: 'id', headerName: 'ID', width: 70,
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
                renderCell: (params) => (<TableImage params={params || null} />),
            },
        ]
    },


}
export default table;