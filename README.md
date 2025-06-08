# Auction Website Frontend

## Demo

You can view the live project here: [Live Demo Link](https://asora-auction-site.netlify.app)

This is the frontend for an auction website where users can register, login, create listings, and place bids on items. It is a part of my semester project and integrates with the **Noroff Auction API**.

## Features

- [x] **User Registration & Login:** Users with a valid email can register and log in.
- [x] **Create Listings:** Registered users can create auction listings with a title, description, media, and deadline.
- [x] **Place Bids on Listings:** Registered users can place bids on auction listings.
- [x] **Search Listings:** Unregistered users can search through available listings.
- [x] **Profile Management:** Users can view their credit balance and update their avatar.

## Installation

To set up the project locally, follow these steps:

### Prerequisites

Before you begin, make sure you have the following installed:

- **[Git](https://git-scm.com/downloads):** To clone the repository and manage version control. If you don't have Git installed, follow the instructions on the linked page to download and install Git.

- **[Node.js](https://nodejs.org/):** To run the project locally. You can download and install the latest stable version.

### Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Asora7/semester-project-2.git
    ```

2. **Navigate into the project directory:**
    ```bash
    cd semester-project-2
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

After following these steps, the project will be available at `http://localhost:3000`.

## Technologies Used

- **Vite:** A fast, modern build tool
- **Bootstrap:** For responsive design and UI components
- **Noroff Auction API:** For auction-related backend functionality

## Known Issues

- [x] **Pagination Issue:** Tried implementing pagination, but only the same 10 listings were shown on each page. As a result, I opted to display all listings at once, and just move on to the next feature since time is limited.
- [x] **Search and Bidding Issue:**  Users cannot place bids on listings accessed via search results. Bidding works only on listings shown on the homepage. This issue was not resolved before delivery due to time constraints.
- [x]  **Gant Chart issue:**  I lost the Gantt chart I created earlier because I forgot to save it. Unfortunately, I realized this right before delivery, so I did not have time to recreate it.
- [x]  **Errors in console:** Some console errors are present. While it's not ideal to leave them unresolved, I chose to focus on feature implementation. The project works as expected despite these errors. I will atempt to resolve this after submission.
- [ ]  **Console logs:** I didn't have time to remove console logs, so they are still present in the code.

## Future Improvements

With more time, I would focus on the following improvements:

- [ ] Fix pagination to display different listings on each page.
- [ ] Resolve the issue where users cannot place bids on search results.
- [ ] Enhance error handling and form validation for a smoother user experience.
- [ ] Fix errors in console
- [ ] remove unrelated console logs
- [ ] Redo Gant Chart


## Thoughts
This project has been one of the most challenging tasks I've undertaken. While it's not flawless, it represents my best effort within the given timeframe and with my current level of experience. I encountered unexpected issues right before delivery (e.g., avatar update functionality worked until the final test but stopped working unexpectedly). I've done everything I could to address these problems, and I'm proud of the work I've submitted. I welcome any feedback on how I can fix these issues after submission.



## How to Contribute

If you'd like to contribute, feel free to fork the repository, make changes, and submit a pull request. Contributions are always welcome!

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

---

### Resources

- [API Documentation](https://docs.noroff.dev/docs/v2/auction-house/listings)
- [Swagger UI for API](https://v2.api.noroff.dev/docs/static/index.html)
- [Kanban board](https://github.com/users/Asora7/projects/3)
- [Figma Design Prototype](https://www.figma.com/proto/cBoSJTCvK7jzYLa8CSdDw5/Untitled?page-id=1%3A4&node-id=10-2693&viewport=-537%2C318%2C0.25&t=riBC52qzxDjHhMnk-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=10%3A2659)
