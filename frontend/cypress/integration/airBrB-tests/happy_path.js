context('signup, creation and booking flow - happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('successfully signs up', () => {
    const name = 'Jar Jar Binks';
    const email = 'jarjar.binks@naboo.ort';
    const password = 'mesaWantHighMarks';

    // Click icon in nav bar to expand dropdown and check it is expanded
    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');

    // Since not logged in, dropdown should have two options: Login & Register
    cy.contains('Login')
      .should('be.visible');
    cy.contains('Register')
      .should('be.visible');

    // Click register button in dropdown
    cy.get('[id=button-register]')
      .click();
    
    // Registration form should have four fields
    cy.get('input')
      .should('have.length', 4);

    // User must input an email, name, password and confirm password
    cy.get('input[name=email]')
      .focus()
      .type(email);
    
    cy.get('input[name=name]')
      .focus()
      .type(name);
    
    cy.get('input[name=password]')
      .focus()
      .type(password);

    cy.get('input[name=confirm-password]')
      .focus()
      .type(password);
    
    // User submits
    cy.get('button[type=submit]')
      .click();

    cy.contains('Successfully signed up!');
    
    // // // Click login button in dropdown
    // cy.get('[id=button-login]')
    //   .click();
    
    // // Login form should have two fields
    // cy.get('input')
    //   .should('have.length', 2);
    
    // // User must input an email and password
    // cy.get('input[name=email]')
    // .focus()
    // .type(email);
  
    // cy.get('input[name=password]')
    //   .focus()
    //   .type(password);

    // // User then submits which should take us back to listing page
    // cy.get('button[type=submit]')
    //   .click();
    
    // cy.contains('Successfully logged in!');
    
    // Click icon in nav bar to expand dropdown and check it is expanded again
    cy.get('[id=open-dropdown]')
    .click()
    .should('have.attr', 'aria-expanded')
    .and('eq', 'true');

    // Since logged in, dropdown should have three options: All Listings, 
    // Your Listings, and Logout
    cy.contains('All Listings')
      .should('be.visible');
    cy.contains('Your Listings')
      .should('be.visible');
    cy.contains('Logout')
      .should('be.visible');

    cy.contains('Your Listings')
      .parent()
      .click();

    // Go to the 'Your Listings' page, which has no listings initially
    cy.contains('You have no listings yet...');

    // Click the link to add a new listing
    cy.get('a[href*="create-listing"]')
      .click()
    
    // Enter data for the new listing
    const listingName = 'Cute Hut For Banished Gungans';
    const street = '42 Mud Lane';
    const city = 'Western Swamp';
    const roomType = 'Private Room';
    const price = '80';
    const bathrooms = '1';
    const bedroom = {
      name: 'Jar Jar\'s crib',
      num: '1'
    }
    const imagePath = './naboo.jpeg';

    cy.get('input[name=title]')
      .focus()
      .type(listingName);
    
    cy.get('input[name=street')
      .focus()
      .type(street);
    
    cy.get('input[name=city]')
      .focus()
      .type(city);
    
    cy.get('select[name=propertyType]')
      .select(roomType);
    
    cy.get('input[name=price]')
      .focus()
      .type(price);
    
    cy.get('input[name=bathrooms]')
      .focus()
      .type(bathrooms);
    
    cy.get('input[name=bedroom]')
      .focus()
      .type(bedroom.name);
    
    cy.get('input[name=numBeds]')
      .focus()
      .type(`{backspace}`)
      .type(bedroom.num);

    cy.get('[id=Waterfront]')
      .check();
    
    cy.get('[id="Free Parking"]')
      .check();
    
    cy.get('[id=file-upload]')
      .attachFile(imagePath, { subjectType: 'drag-n-drop' });

    cy.wait(1000);
    cy.get('[id=submit-new-listing')
      .click();
    
    // User is taken back to the Host Listings page, which should
    // display the listing details
    cy.wait(3000);
    cy.contains(roomType);
    cy.contains(listingName);
    cy.contains(city);
    cy.contains(street);
    cy.contains(`$${price}`);
    cy.contains('1 x Beds');
    cy.contains('1 x Baths');

    // User navigates to edit listing page
    cy.get('div[name=edit-listing]')
      .click();

    const newListingName = "Gungan Swamp Retreat";
    const newImagePath = './naboo_alt.png'
    
    // User enters a new name and uploads a new thumbnail
    cy.get('input[name=title]')
      .focus()
      .clear()
      .type(newListingName);
    
    // Delete old thumbnail
    cy.get('svg[name=delete-image]')
      .click();

    cy.get('[id=file-upload]')
      .attachFile(newImagePath, { subjectType: 'drag-n-drop' });

    cy.wait(1000);
    // Submit the edited listing
    cy.get('button[id=submit-edit-listing]')
      .click();

    // Check new name appears on listing card
    cy.wait(3000);
    cy.contains(newListingName);

    // Since the listing is not yet published, the 'publish' icon should be
    // showing and glowing red
    cy.get('div[name=publish]')
      .should('have.class', 'text-red-400')
      .click();

    // Clicking it shows the 'Publish Listing' modal with a 'From'
    // and a 'To' date
    cy.get('input[type=date]')
      .should('have.length', 2);

    // Set property to be available in January 2022
    cy.get('input[name=startDate]')
      .type('2022-01-01');
    
    cy.get('input[name=endDate]')
      .type('2022-02-01');
    
    cy.get('button[type=submit]')
      .click()
    
    // Toast alerts the user it has published successfully
    cy.contains('Listing successfully published!');

    // Since the listing has now been published, the 'publish' icon should be
    // showing and glowing green
    cy.get('div[name=unpublish]')
      .should('have.class', 'text-green-500')
      .click();
    
    // Toast allerts the user it has unpublished successfully
    cy.contains('Listing successfully unpublished!')

    // Once again, the green publish icon should now be showing
    cy.get('div[name=publish]')
      .should('have.class', 'text-red-400')

    // User then opens the dropdown and navigates to listings home page
    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');

    cy.contains('All Listings')
      .click();

    // Wait for all data to be fetched
    cy.wait(7000);

    // User selects the 'Wayne Manor' listing and makes a booking
    cy.contains('Wayne Manor')
      .click()
    
    cy.get('input[name=startDate]')
      .type('2022-01-01');
    
    cy.get('input[name=endDate')
      .type('2022-01-03');

    cy.get('button[name=make-booking]')
      .click()
    // Toast indicates a successful booking
    cy.contains('Congratulations! Your booking request was successful!');

    // User logs out
    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');

    cy.get('[id=button-logout]')
      .click();
    
    // Toast indicates successful logout
    cy.contains('Successfully logged out!');

    // User has now logged out, and must log back in
    cy.get('[id=open-dropdown]')
      .click()
      .should('have.attr', 'aria-expanded')
      .and('eq', 'true');

    // Click login button in dropdown
    cy.get('[id=button-login]')
      .click();
  
    // Login form should have two fields
    cy.get('input')
      .should('have.length', 2);
  
    // User must input an email and password
    cy.get('input[name=email]')
    .focus()
    .type(email);
  
    cy.get('input[name=password]')
      .focus()
      .type(password);

    // User then submits which should take us back to listing page
    cy.get('button[type=submit]')
      .click();
    
    // The user has successfully logged back in, ending this happy path
    cy.contains('Successfully logged in!');
  })
})