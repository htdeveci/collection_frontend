import { useState } from "react";
import { IoShareSocial } from "react-icons/io5";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { CSSTransition } from "react-transition-group";

import classes from "./ShareButtons.module.css";
import ShareButtonWithIcon from "./ShareButtonWithIcon";

const CopyLinkButton = ({ children, onMouseEnter, onMouseLeave }) => {
  const copyLinkToClipboardHandler = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <button
      url={window.location.href}
      onClick={copyLinkToClipboardHandler}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

const CopyIcon = () => {
  return (
    <>
      <path
        d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"
        fill="white"
      />
      <path
        d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"
        fill="white"
      />
    </>
  );
};

const shareComponents = [
  { name: "twitter", button: TwitterShareButton, icon: TwitterIcon },
  { name: "facebook", button: FacebookShareButton, icon: FacebookIcon },
  {
    name: "facebookMessenger",
    button: FacebookMessengerShareButton,
    icon: FacebookMessengerIcon,
  },
  {
    name: "pinterest",
    button: PinterestShareButton,
    icon: PinterestIcon,
    media: "asaf",
  },
  {
    name: "whatsapp",
    button: WhatsappShareButton,
    icon: WhatsappIcon,
  },
  {
    name: "email",
    button: EmailShareButton,
    icon: EmailIcon,
  },
  {
    name: "copyLink",
    button: CopyLinkButton,
    icon: CopyIcon,
  },
];

const ShareButtons = ({ iconSize = 50, color = "green" }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        className={classes.buttonsContainer}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        style={{ color: color }}
      >
        <IoShareSocial className={classes.icon} size={iconSize * 1.2} />

        {shareComponents.map((component) => {
          return (
            <CSSTransition
              key={component.name}
              in={isHover}
              mountOnEnter
              unmountOnExit
              timeout={500}
              classNames={classes}
            >
              <ShareButtonWithIcon
                ShareButton={component.button}
                Icon={component.icon}
                iconSize={iconSize}
                media={
                  component.name === "pinterest" ? component.media : undefined
                }
                custom={component.name === "copyLink"}
              />
            </CSSTransition>
          );
        })}
      </div>
    </>
  );
};

export default ShareButtons;
