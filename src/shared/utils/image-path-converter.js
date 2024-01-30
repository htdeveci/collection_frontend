export const getImageSrc = (type, data) => {
  try {
    let result = null;

    switch (type) {
      case "profile":
        result = data.profilePicture;
        break;
      case "collection":
        result = data.coverPicture;
        break;
      default:
        break;
    }

    if (result) {
      return result.replace("../public_html", "");
    } else {
      return "/blank-profile-picture.png";
    }
  } catch (err) {
    return "/blank-profile-picture.png";
  }
};

export const getImageSrcByRawPath = (rawImagePath) => {
  if (rawImagePath.includes("../public_html"))
    return rawImagePath.replace("../public_html", "");
  else return "/blank-profile-picture.png";
};

export const getImageName = (rawImagePath) => {
  let pathParts = rawImagePath.split("/");
  return pathParts[pathParts.length - 1];
};
