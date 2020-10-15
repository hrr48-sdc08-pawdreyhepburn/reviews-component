# target_reviews_component

This service provides the reviews component of a Target item page.

To start this service:

Install dependancies via "npm install"

Start the server via "npm start"

In another terminal window, seed the database by typing "npm run db:seed"

Have webpack watch the files via "npm run build"

Reviews should now be rendered on port 3004.

CRUD operations:

- GET /api/reviews/:id - Returns all the reviews for a given product id
- POST /api/reviews/:id - Creates a new review for a given product id
- PUT /api/reviews/:id/:reviewId - Updates a specific review
- DELETE /api/reviews/:id/:reviewId - Deletes a specific review from a list of reviews for a given product id

