import { Chip, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';


interface ActionConfig {
    label: string
    icon: React.ReactNode
    color: string

}

 const actionsElements: Record<string, ActionConfig> =  {
        ['update']: {
            label: 'Edit',
            icon: <EditIcon />,
            color: 'warning',
        },
        ['read']: {
            label: 'View',
            icon: <PreviewIcon />,
            color: 'primary',
        },
        ['create']:
        {
            label: 'Create',
            icon: <CheckCircleIcon />,
            color: 'success',
        },
        ['delete']:
        {
            label: 'Delete',
            icon: <DeleteIcon />,
            color: 'error',
        },
    }
interface Props {
    action: string
    size?: string 
    svg?: boolean
}
export default function ActionChip({ action, size = "medium", svg = true }: Props) {
    const actionConfig = actionsElements[action.toLowerCase() as string] || {
        label: action,
        icon: null,
        color: 'default',
    };
    return (
        <Tooltip
            key={actionConfig.label}
            title={actionConfig.label}
            arrow
            enterDelay={200}
        >
            <Chip
                icon={svg ? actionConfig.icon : null}
                label={actionConfig.label}
                color={actionConfig.color}
                size={size}
                variant="outlined"
                className="font-bold"
            />
        </Tooltip>
    )
}