import { getProfile } from "../../api/profile/read.js";

const profilePage = () => {
  getProfile();
};

export default profilePage;

import "../../ui/listings/create.js";
