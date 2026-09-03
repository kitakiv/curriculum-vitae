import {  User } from "@/gql/graphql";
import { List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import React from "react";
export default function UserInfo({user}: {user: User}) {
    return (<List sx={{ width: '100%', }}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`${user.avatarPhoto}`} />
        </ListItemAvatar>
        <ListItemText
          sx={{ color: 'var(--admin-tx0)' }}
          primary={`${user.name}`}
          secondary={
            <React.Fragment>
                <span className="text-footerTx">{user.login}</span>
            </React.Fragment>
          }
        />
      </ListItem>
      
    </List>)
}