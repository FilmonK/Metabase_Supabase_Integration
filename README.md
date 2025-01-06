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
- Deno

## API calls to gather data
First, we need to identify the correct API call and understand the structure of its response. While a proper API simplifies this process, in our case, we must examine the browser's network calls. This involves reviewing elements such as the URL, headers, and parameters.  
Here's a link to the sample code [Player Start Usage JavaScript](https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/espn_calls/playerStartUsage.js)


<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/player_api_call.png?raw=true" alt="Player API Call" width="600">

<br>

<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/json_playerinfo.png?raw=true" alt="JSON Player Info" width="600">

<br>

With this information, we can create a table in Supabase to store the data retrieved from the API call. 
https://supabase.com/docs/guides/database/tables  

<br>

You can create this table either through the Table Editor or by using the [SQL Editor](https://supabase.com/docs/guides/database/overview#the-sql-editor) with a query like the one below. Here's a link to the sample code [Player Table SQL](https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/sql/player_table.sql)  


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
   - Run the command *"supabase init"* to set up the project folder structure.

<br>

3. Create and deploy an Edge Function:
   - In the Supabase portal, go to Edge Functions and select Deploy a new Function.
   - There will be a modal that will show the commands needed to deploy a sample function, which you can use to build other functions.

     <img width="565" alt="newsamplefunction" src="https://github.com/user-attachments/assets/4b5534a0-b763-4235-8ed7-af4f029cc891" />

   - If you run into authentication related errors in the CLI, you may have to log back in using the following command *"supabase login"*  
     This should return the following response: *"Hello from Supabase! Press Enter to open browser and login automatically."*  
     Proceed to open the browser to receive a verification code which will be entered in the CLI  
     <img width="614" alt="cli_login" src="https://github.com/user-attachments/assets/7414bd19-bbd7-4738-8c83-abcc3a53bf43" />

   - To continue with the ESPN project, we'll run the same commands to create a new function.
  
```
supabase functions new player_usage
```

  

<br>

4. Edit Your Function:
   - A *"player_usage"* folder should be created and the folder structure should look similar to this. Replace the sample code in index.ts with your logic for fetching player information. Here's a link to the sample code [Supabase Edge Function](https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/espn_calls/playerStartUsage.js)
  

<img width="252" alt="vscode" src="https://github.com/user-attachments/assets/20502c3b-25ed-4aa0-8aa9-8b38b6437eaf" />

 
<img src="https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/supabase-edge-function.png?raw=true" alt="Player SQL" width="600">


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

7. Handling Secrets  
If your function depends on environment variables or secrets, such as PROJECT_URL or ESPN_S2, step 6 may fail without them properly set up. Supabase provides a straightforward way to manage these secrets.  
<img width="600" alt="localsecrets" src="https://github.com/user-attachments/assets/be0f0e4e-77ea-4a92-8943-409b9b1c092b" />  

<br>  
<br> 

Supabase provides a straightforward way to manage these secrets in *Project Settings → Edge Functions → Edge Function Secrets Management*   

 <br>
 
<img width="600" alt="supasecrets" src="https://github.com/user-attachments/assets/5704ce7d-4d60-4e2d-9d5b-c02a5015a234" />     

<br>  
<br> 
 
8. Scheduling  
You have the ability to schedule when these Edge Functions are executed if this needs to be a recurring event.  
Integrations → Cron
https://supabase.com/blog/supabase-cron

<img width="430" alt="cronjobs" src="https://github.com/user-attachments/assets/c7ba2647-05c6-4102-9345-fca268f001ca" />



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
