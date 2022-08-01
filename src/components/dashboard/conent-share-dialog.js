import { Fragment, useState } from 'react';
import {
  Badge,
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment, Stack,
  TextField,
  Typography
} from '@mui/material';
import { wait } from '../../utils/wait';
import { X as XIcon } from '../../icons/x';
import PropTypes from 'prop-types';
import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  PinterestIcon,
} from "react-share";

const WithSubtitle = Component => {
  return (
    <Stack direction="column">
      {/*<Component />*/}
      <Typography variant="caption" display="block">{"FACEBOOK"}</Typography>
    </Stack>
  )
};

export const ContentShareDialog = (props) => {
  const { onClose, open, ...other } = props;
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Do search here
    await wait(1500);
    setIsLoading(false);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={onClose}
      open={open}
      {...other}>
      <Box
        sx={{
          alignItems: 'center',
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          display: 'flex',
          justifyContent: 'space-between',
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h6">
          Share
        </Typography>
        <IconButton
          color="inherit"
          onClick={onClose}
        >
          <XIcon fontSize="small" />
        </IconButton>
      </Box>
      <DialogContent>
        <Stack direction="row" spacing={2} justifyContent="center"
               alignItems="center">
          <WithSubtitle Component={
            <FacebookShareButton quote={"Steadylearner Website"}>
              <FacebookIcon
                borderRadius={32}
                size={32}
              />
            </FacebookShareButton>}
            >
          </WithSubtitle>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

ContentShareDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
