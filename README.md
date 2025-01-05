# Visualizing data in Metabase brought in by Supabase Edge Functions
What to do when I want my league’s fantasy stats in Metabase but there’s not an easy way to download that information?
Cough cough … ESPN … cough

Well, look at the API calls being made of course and grab that data. Before embarking on journeys like this, I always look to see if anyone else has already solved the problem. 
Sure enough there are python wrappers, some more updated than others, but then you’re relying on someone just like you to maintain a hobby project. 
Life and/or boredom get in the way.

This isn’t a tutorial on using developer tools to analyze API calls—there are plenty of those out there. Instead, we’ll focus on integrating Supabase Edge Functions and displaying the results in Metabase.  

## Table of Contents
* [Technologies Used](#technologies-used)
* [API calls to gather data](#api-calls-to-gather-data)
* [Creating Edge Function](#creating-edge-function)
* [Connect to Metabase](#connect-to-metabase)
* [Wrapping Up](#wrapping-up)


## Technologies Used
- Metabase
- Supabase
- Javascript/Typescript
- Jsonwebtoken
- Docker

## API calls to gather data
We'll need to first figure out the proper call we need to make, as well as identify the structure of the response.

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/player_api_call.png?raw=true" alt="Player API Call" width="600">

<br>

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/json_playerinfo.png?raw=true" alt="JSON Player Info" width="600">

<br>

Using this information, we can create a table within Supabase.  
https://supabase.com/docs/guides/database/tables

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/player_sql.png?raw=true" alt="Player SQL" width="600">

<br>
<br>

## Creating Edge Function
To create and deploy Edge Functions in Supabase, follow these steps:
1. Install Prerequisites:
   - Install Docker and the Supabase CLI. Supabase’s guide walks you through the installation process.
   - https://supabase.com/docs/guides/local-development/cli/getting-started  

<br>

2. Initialize Your Project:
   - Run the command supabase init to set up the project folder structure.

<br>

3. Create and deploy an Edge Function:
   - In the Supabase portal, go to Edge Functions and select Deploy a new Function.
   - There will be a modal that will show the commands needed to deploy a sample function, which you can use to build other functions.

     <img width="565" alt="newsamplefunction" src="https://github.com/user-attachments/assets/4b5534a0-b763-4235-8ed7-af4f029cc891" />
     

   - To continue with the ESPN project, we'll run the same commands to create a new function.  
```
supabase functions new player_usage
```

<br>

4. Edit Your Function:
   - A "player_usage" folder should be created and the folder structure should look similar to this. Replace the sample code in index.ts with your logic for fetching player information.    

<img width="252" alt="vscode" src="https://github.com/user-attachments/assets/20502c3b-25ed-4aa0-8aa9-8b38b6437eaf" />

 
<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/supabase-edge-function.png?raw=true" alt="Player SQL" width="600">

<br>

5. Deploy your function to Supabase.  

```
supabase functions deploy player_usage
```

<br>

6. Test function
   - Test a deployed function by directly invoking it with a curl command.  
```
curl -L -X POST 'https://yourprojectID.supabase.co/functions/v1/player_usage' -H 'Authorization: Bearer [YOUR ANON KEY]' --data '{"name":"Functions"}'  
```

The project ID will be the same from the modal you viewed earlier which showed the commands to deploy functions. You also get it from Project Settings → General → General Settings.  
If successful, you should see a response like: "Player data synced successfully".

<br>
<br>

## Connect to Metabase
Within Supabase, go to Project Settings → Database → Connect → Session pooler to get the necessary information.  
<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/sessionpool.png?raw=true" alt="Player SQL" width="600">


<br>

In Metabase, go to Admin Settings → Databases →  Add a database → and add a PostgreSQL database.  
Use the session pool information from Supabase.  
https://www.metabase.com/docs/latest/databases/connections/postgresql

<br>
<br>

## Wrapping Up

There you have it — your fantasy league data, finally tamed and visualized with a little help from Supabase and Metabase. Now it's a case of repeating the process of finding the needed calls from ESPN and creating functions in Supabase? And if you really want, get historical context to get an edge for next year. :smile:







