import { GridColDef } from '@mui/x-data-grid';
import TableImage from "@/components/admin/components/TableImage";
import { Resource } from '../admin/resource';
import EditAdminButton from "@/components/admin/components/EditAdminButton";
interface Table {
    [key: string]: {
        columns: GridColDef[]
    }
}

export const editColumns = (resource: Resource): GridColDef => ({
    field: 'edit',
    headerName: 'Edit',
    width: 100,
    renderCell: (params) => (<EditAdminButton params={params || null} resource={resource} />),
})


const table: Table = {

    contactsTable: {
        columns: [
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
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.CONTACT} />),
            }

        ]
    },
    sliderTable: {
         columns: [
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
                type: 'string',
            },
            {
                field: 'sliderImage',
                filterable: true,
                headerName: 'Slider Image',
                width: 150,
                sortable: false,
                renderCell: (params) => (<TableImage params={params || null} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.SLIDER} />),
            }

         ]
    },
    certificateTable: {
        columns: [
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
                headerName: 'Start date',
                width: 300,
                filterable: true,
                sortable: true,
                type: 'string',
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
                type: 'date',
            },
            {
                field: 'certificatePeriodEnd',
                headerName: 'Period End',
                width: 150,
                sortable: true,
                filterable: true,
                type: 'date',
            },
            {
                field: 'certificateImage',
                headerName: 'Certificate Image',
                width: 150,
                renderCell: (params) => (<TableImage params={params || null} />),
            },
            {
                field: 'edit',
                headerName: 'Edit',
                width: 100,
                renderCell: (params) => (<EditAdminButton params={params || null} resource={Resource.CERTIFICATE} />),
            }
        ]
    }

}
export default table;