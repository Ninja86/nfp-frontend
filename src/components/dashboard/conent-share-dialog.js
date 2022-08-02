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
  PinterestIcon, TelegramIcon, RedditIcon, FacebookMessengerIcon, FacebookMessengerShareButton,
} from "react-share";

const WithSubtitle = ({Component, title}) => {
  return (
    <Stack direction="column">
      <Component />
      <Typography variant="caption" display="block">Facebook</Typography>
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
          <Stack direction="column">
            <FacebookShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              quote={"NFP STUDIO"}
              hashtag="#nfp"
            >
              <FacebookIcon
                borderRadius={48}
                size={48}
              />
            </FacebookShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Facebook</Typography>
          </Stack>
          <Stack direction="column">
            <WhatsappShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              separator=":: "
            >
              <WhatsappIcon
                borderRadius={48}
                size={48}
              />
            </WhatsappShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">WhatsApp</Typography>
          </Stack>
          <Stack direction="column">
            <TwitterShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
              hashtags={["nfp"]}
            >
              <TwitterIcon
                borderRadius={48}
                size={48}
              />
            </TwitterShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Twitter</Typography>
          </Stack>
          <Stack direction="column">
            <TelegramShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <TelegramIcon
                borderRadius={48}
                size={48}
              />
            </TelegramShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Telegram</Typography>
          </Stack>
          <Stack direction="column">
            <RedditShareButton
              url={"https://app.nfpstudio.io/"}
              title={"NFP STUDIO"}
            >
              <RedditIcon
                borderRadius={48}
                size={48}
              />
            </RedditShareButton>
            <Typography alignSelf={"center"} variant="caption" display="block">Reddit</Typography>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

ContentShareDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
