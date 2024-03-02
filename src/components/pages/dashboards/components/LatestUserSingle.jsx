import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export const LatestUserSingle = ({ api }) => {
  const date = new Date(api.created_at).toLocaleString('lt-LT');
  return (
    <>
      <ListItem sx={{ py: 0.5 }} key={api.id}>
        <ListItemAvatar>
          <Avatar>{api.name.slice(0, 1)}</Avatar>
        </ListItemAvatar>
        <ListItemText primary={api.email} secondary={date} />
        <IconButton edge="end" aria-label="more">
          <MoreVert />
        </IconButton>
      </ListItem>
    </>
  );
};
