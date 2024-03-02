import List from '@mui/material/List';

import { LatestUserSingle } from './LatestUserSingle';

export default function LatestUsersList({ api }) {
  return (
    <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', p: 0 }}>
      {api && api.map((api) => <LatestUserSingle api={api} key={api.id} />)}
    </List>
  );
}
