import { useState } from "react";

const ShareButtonWithIcon = ({
  ShareButton,
  Icon,
  iconSize,
  media,
  custom = false,
}) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      {!custom && (
        <ShareButton
          url={window.location.href}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          media={media}
        >
          <Icon
            round={custom ? undefined : true}
            bgStyle={
              custom ? undefined : { fill: isHover ? null : "transparent" }
            }
            size={custom ? iconSize / 1.8 : iconSize}
            color="white"
          />
        </ShareButton>
      )}

      {custom && (
        <ShareButton
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <svg viewBox="-256 -256 1024 1024" height={iconSize} width={iconSize}>
            <circle
              cx="256"
              cy="256"
              r="512"
              fill="#3a3a3a"
              style={{
                fill: isHover ? null : "transparent",
              }}
            ></circle>
            <Icon />
          </svg>
        </ShareButton>
      )}
    </>
  );
};

export default ShareButtonWithIcon;
