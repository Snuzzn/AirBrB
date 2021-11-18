Please note we assume that a `yarn reset` is run before testing. To test, please run `yarn test` in the `frontend` folder. 

After the component testing completes, Cypress will automatically open a window to run the first happy path and, when that completes and closes, Cypress will open a new window to run the second path. The second path assumes the first path has been run to completion (to take advantage of the first path's listings in the database).

We have set 'trashAssetsBeforeRun' to `false` in Cypress' config file, so a video of each path will be saved to `cypress/integration/videos`.

### Path 1: Registering, creating a listing, publishing, booking, and logging out and in.
We created a thorough test for the 'happy' path required in the spec. This path touched on functionality from the perspective of a guest (by making a booking) and from the perspective of a host (by creating a listing). Since we start with a fresh database, we used a `before` function to create a listing (Wayne Manor) that our test path can interact with (via Jar Jar Binks). 

### Path 2: Accepting a booking, checking profits, and reviews
At the core of the AirBrB business are host profits and guest experiences. Since this was not covered in the first path, we thought it would be appropriate to test it for our second path. First we have Bruce Wayne log in and accept the booking made by Jar Jar. Bruce then checks his profits at Wayne Manor for the year, expecting to see profits from Jar Jar's booking. Then, to test the guest's perspective, we have Jar Jar log in and leave a review for the property. 

The combination of paths 1 and 2 cover off the most common happy paths experienced by guests and hosts of AirBrB and the fundamental components of AirBrb's business.

### Approach to Testing
To test that our web page responds as expected, we took the approach of checking that the contents displayed on the page match the expected page state (since this is what the user sees). For example, we check that dropdowns are expanded when appropriate, menu options exist or do not exist depending on log-in status, that certain text appears and elements are visible, and that toast messages indicate success. This is done where relevant on each step of the user's journey. 