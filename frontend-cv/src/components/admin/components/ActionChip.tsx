import { Chip, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from '@mui/icons-material/Preview';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ChipProps } from "@mui/material/Chip";
import React from "react";


interface ActionConfig {
    label: string;
    icon?: React.ReactElement;
    color: ChipProps['color'];
    size?: ChipProps['size'];
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
                icon={svg ? actionConfig.icon : actionConfig.icon}
                label={actionConfig.label}
                color={actionConfig.color}
                size={size as ChipProps['size']}
                variant="outlined"
                className="font-bold"
            />
        </Tooltip>
    )
}