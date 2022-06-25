CATCH -- NSS Frontend Capstone -- June 2022

Purpose:
    The motivation behind Catch was staying in touch with friends after college to plan fishing trips and record the "catches" from the trip.

How does it work:
    A new user will sign up for Catch and will have the ability to create fishing trip plans, keep track of their planned/completed trips, and the fish that they caught on the trip.

How it was developed:
    Catch was developed using JSx in react framework v18.2, react router dom 6.3

To run:
    Main repository can be cloned down from GitHub along with necessary databases
        - Catch (main application)
            - Use 'npm start' to run application on port 3000
        - Catch API (json database)
            - Use 'json-server -p 9000 database.json' to run database on port 9000
        - us-states-counties API (json database)
            - Use 'json-server -p 3030 database.json' to run database on port 3030

Difficulties
    - Having too high aspirations for initial MVP (social media type application)
    - Wanting to have data objects that multiple users can access and edit
    - Flexbox styling with CSS (even spacing specifically)
    - Using local images vs. online linked images
    - Minimizing code into re-usable chunks rather than re-writing large functions
    - Using props to be passed into components to determine what elements are displayed/hidden
    - Assigning the ID of an object in the database before it is actually posted
    - Giving instructions on how to download, install, and run the application
    - Changing some of the react default settings (icon, logo, etc.)
    - Every time I run npm start it 