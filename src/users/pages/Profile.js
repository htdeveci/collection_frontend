import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import classes from "./Profile.module.css";
import DisplayProfileOrCollection from "../../shared/components/elements/DisplayProfileOrCollection";
import ShareButtons from "../../shared/components/share/ShareButtons";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Profile = () => {
  const userId = useParams().userId;
  const [user, setUser] = useState(null);
  const { error: getUserError, sendRequest: getUserSendRequest } =
    useHttpClient();

  const fetchUser = useCallback(async () => {
    const responseData = await getUserSendRequest(
      `/users/${userId}`,
      "GET",
      null,
      true
    );
    setUser(responseData);
  }, [userId, getUserSendRequest]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <DisplayProfileOrCollection
        type="profile"
        id={userId}
        data={user}
        setData={setUser}
        dataError={getUserError}
        updateData={fetchUser}
      />
      <ShareButtons iconSize={40} color="orange" />
    </>
  );
};

export default Profile;
