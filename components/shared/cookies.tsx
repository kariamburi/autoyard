import Cookies from "js-cookie";

export const setUserIDInCookie = (userID: string, days: number = 7) => {
  Cookies.set("userId", userID, { expires: days });
};
export const getUserIDFromCookie = (): string | undefined => {
  return Cookies.get("userId");
};

export const removeUserIDFromCookie = () => {
  Cookies.remove("userId");
};
export const setuserNameInCookie = (userName: string, days: number = 7) => {
  Cookies.set("userName", userName, { expires: days });
};
export const getuserNameFromCookie = (): string | undefined => {
  return Cookies.get("userName");
};

export const removeuserNameFromCookie = () => {
  Cookies.remove("userName");
};
export const setuserImageInCookie = (userImage: string, days: number = 7) => {
  Cookies.set("userImage", userImage, { expires: days });
};
export const getuserImageFromCookie = (): string | undefined => {
  return Cookies.get("userImage");
};

export const removeuserImageFromCookie = () => {
  Cookies.remove("userImage");
};
