export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth, email, loginDate } =
    JSON.parse(localStorage.getItem("auth")) || {};
  return { name, profilePhoto, userID, isAuth, email, loginDate };
};
