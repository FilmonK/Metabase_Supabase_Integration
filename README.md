# Visualizing data in Metabase brought in by Supabase Edge Functions
What to do when I want my league’s fantasy stats in Metabase but there’s not an easy way to download that information?
Cough cough … ESPN … cough

Well, look at the API calls being made of course and grab that data. Before embarking on journeys like this, I always look to see if anyone else has already solved the problem. 
Sure enough there are python wrappers, some more updated than others, but then you’re relying on someone just like you to maintain a hobby project. 
Life and/or boredom get in the way.

This is not a walk through on how to look at your browser’s development tools to parse the calls made using your preferred programming language. There’s already plenty of those.
We’re going through the process of making these calls using Edge Functions that are scheduled Cron jobs in Supabase, then displaying the tables in Metabase.

## Table of Contents
* [Technologies Used](#technologies-used)
* [API calls to gather data](#api-calls-to-gather-data)
* [Creating Edge Function](#creating-edge-function)
* [Connect to Metabase](#connect-to-metabase)


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
<br>

Using this information, we can create a table within Supabase.  
https://supabase.com/docs/guides/database/tables

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/player_sql.png?raw=true" alt="Player SQL" width="600">


## Creating Edge Function
Docker and the CLI will need to be installed before Edge Functions can be created, which Supabase has a walkthrough.  
https://supabase.com/docs/guides/local-development/cli/getting-started  

Running the "supabase init" command will create folder structure in the directory you created to house the Supabase project.

Next go to Edge Functions → Deploy a new Function within the Supabase portal.  
There will be a modal that will show the commands needed to deploy a sample function, which you can use to build other functions.

<img width="565" alt="newsamplefunction" src="https://github.com/user-attachments/assets/4b5534a0-b763-4235-8ed7-af4f029cc891" />

To continue with the ESPN project, we'll run the same commands to create a new function.
```
supabase functions new player_usage
```

The folder structure should look something like this.  

<img width="252" alt="vscode" src="https://github.com/user-attachments/assets/20502c3b-25ed-4aa0-8aa9-8b38b6437eaf" />

We can now replace the sample code in index.ts with what we'll need to get player information.  

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/supabase-edge-function.png?raw=true" alt="Player SQL" width="600">


## Connect to Metabase
Within Supabase, go to Project Settings → Database → Connect → Session pooler to get the necessary information.  
<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/sessionpool.png?raw=true" alt="Player SQL" width="600">


<br>

In Metabase, go to Admin Settings → Databases →  Add a database → and add a PostgreSQL database.  
Use the session pool information from Supabase.  
https://www.metabase.com/docs/latest/databases/connections/postgresql









