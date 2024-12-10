import { getProfile } from "../../api/profile/read.js";
import { updateProfile } from "../../api/profile/update.js";

document.addEventListener("DOMContentLoaded", () => {
  getProfile(); // Fetch and display profile info

  const updateForm = document.getElementById('update-profile-form');
  updateForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const avatarUrl = document.getElementById('avatar-url').value;
    const bio = document.getElementById('bio').value;
    const bannerUrl = document.getElementById('banner-url').value;
    const updatedData = {
      name: localStorage.getItem('name'), 
      avatarUrl,
      bio,
      bannerUrl
    };

    updateProfile(updatedData).then(() => {
      getProfile(); // Re-fetch profile to show updated info
    });

    updateForm.reset(); 
  });
});
