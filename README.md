Swim App

1. Project Overview

    Name: NextSwim

    Tagline: Your next step in the water.

    Problem Statement: 

        Supports individuals as they improve their swimming by performing an accurate swim level analysis done through a quiz. Helps them achieve their aquatic goals by providing fitness exercises (on land and in water) based on the given swim level and sharing resources. Alleviates fear and anxiety surrounding water activities with education.


    Target Users:

        Swimmers of all levels.


2. Feature Breakdown

    MVP Features: 

        Swim level quiz, aquatic resources, set a goal


    Extended Features: 

        Recommended activities based on user's swim level, find nearby aquatic locations/events, timer, posting to other users


3. Data Model Planning

    Core Entities: 

        User information- ID, account info, level, goals
        Aquatic resources- resource ID, resource type, category, title  


    Key Relationships: 

        Users can access multiple resources (one to many)
        Aquatic resources can be recommended based on the user's level 
        Multiple users can access multiple resources (many to many)
        A user can have multiple goals (one to many)


4. User Experience

    User Flows:

        After logging into their account, the user will take a quiz to assign them with a swim level. They can set a goal for themselves that they can view under their account details. They can access aquatic resources for their own use, helping them achieve their goals.


    Wireframes/Sketches:

        Wireframe: 
            https://wireframe.cc/3jeA9w 



    Next Features to work on:

        * Add additional tabs to the resource pages: Water Safety, Stroke Technique, Swim Songs, Breath Control, etc
        * In each tab have different collapsable sections that have resources inside, for instance Swim Strokes would have Kicking Techniques, Backstroke Funcamentals, etc 
        * Improved database functionality (can fill db with dummy data)
        
5. Testing & Docker  
    
    To run the full test suite, ensure you have Docker installed. No other local dependencies are required.  

    Running Tests via Docker: From the root directory, run the following command to build and execute all tests:
        docker-compose up --build

        


        Which best describes your swimming ability/aquatic expertise? 
        How much do you know about water safety? How do you confident feel in the water? Follow up on if they click 3 or 4 -> How do you confident feel in deep water (>7 ft)? 
        How comfortable are you with putting your face and eyes in the water? 
        Can you float on your front and back? if no or only on one side then end quiz. 
        How far(yards) can you swim on your front with arm and leg action? Follow up on if they click 12.5yds or 25 yds -> 
        How confident are you with rhythmic or rotary breathing? If clicked 1 or 2 then end quiz.
        Do you know the streamline position? 
        Do you know front crawlstroke (freestyle)? if no end quiz
        Do you know back crawlstroke? if no end quiz
        Do you know elementary backstroke?
        Do you know sidestroke?
        Do you know breaststroke? if no end quiz
        Do you know dolphin kick? if no end quiz
        Can you do a surface dive?
        Can you kneeling dive, standing dive, or start?
        Do you know butterfly? 
        How long can you tread water? if less than 1 min end quiz
        Can you do an open turn? if no end quiz
        Do you know the standard scull either on the front and back? 
        Can you do a flip turn?
