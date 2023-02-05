import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  useTheme,
} from "@mui/material";
import React, { useRef } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PinterestIcon from "@mui/icons-material/Pinterest";
import ShareRoundedIcon from "@mui/icons-material/ShareRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TelegramIcon from "@mui/icons-material/Telegram";
import { FaFacebookMessenger } from "react-icons/fa";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const CopyLinkButton = React.forwardRef((props, ref) => {
  const copyLinkToClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      ref={ref}
      url={props.url}
      onClick={copyLinkToClipboardHandler}
      style={{
        display: "none",
      }}
    ></button>
  );
});

const ShareButtons = () => {
  const theme = useTheme();

  const twitterRef = useRef();
  const facebookRef = useRef();
  const facebookMessangerRef = useRef();
  const pinterestRef = useRef();
  const whatsappRef = useRef();
  const telegramRef = useRef();
  const emailRef = useRef();
  const copyLinkRef = useRef();

  const shareComponents = [
    {
      name: "Twitter",
      buttonRef: twitterRef,
      icon: <TwitterIcon />,
      color: "#00acee",
    },
    {
      name: "Facebook",
      buttonRef: facebookRef,
      icon: <FacebookRoundedIcon />,
      color: "#4267B2",
    },
    {
      name: "Facebook Messenger",
      buttonRef: facebookMessangerRef,
      icon: <FaFacebookMessenger size={24} />,
      color: "#006AFF",
    },
    {
      name: "Pinterest",
      buttonRef: pinterestRef,
      icon: <PinterestIcon />,
      color: "#E60023",
    },
    {
      name: "WhatsApp",
      buttonRef: whatsappRef,
      icon: <WhatsAppIcon />,
      color: "#25D366",
    },
    {
      name: "Telegram",
      buttonRef: telegramRef,
      icon: <TelegramIcon />,
      color: "#0088cc",
    },
    {
      name: "E-mail",
      buttonRef: emailRef,
      icon: <EmailRoundedIcon />,
      color: theme.palette.secondary.main,
    },
    {
      name: "Copy Link",
      buttonRef: copyLinkRef,
      icon: <ContentCopyIcon />,
      color: theme.palette.primary.main,
    },
  ];

  return (
    <>
      <TwitterShareButton ref={twitterRef} url={window.location.href} />
      <FacebookShareButton ref={facebookRef} url={window.location.href} />
      <FacebookMessengerShareButton
        ref={facebookMessangerRef}
        url={window.location.href}
      />
      <PinterestShareButton
        ref={pinterestRef}
        url={window.location.href}
        media="asaf"
      />
      <WhatsappShareButton ref={whatsappRef} url={window.location.href} />
      <TelegramShareButton ref={telegramRef} url={window.location.href} />
      <EmailShareButton ref={emailRef} url={window.location.href} />
      <CopyLinkButton ref={copyLinkRef} url={window.location.href} />

      <SpeedDial
        ariaLabel="Share Buttons SpeedDial"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={
          <SpeedDialIcon
            openIcon={<CancelRoundedIcon />}
            icon={<ShareRoundedIcon />}
          />
        }
      >
        {shareComponents.map((shareComponent) => (
          <SpeedDialAction
            key={shareComponent.name}
            icon={shareComponent.icon}
            sx={{
              "&:hover": { color: shareComponent.color },
            }}
            tooltipTitle={shareComponent.name}
            onClick={() => shareComponent.buttonRef.current.click()}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default ShareButtons;
