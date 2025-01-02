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
* [Workflows](#workflows)
* [Screenshots and Recordings](#screenshots-recordings)


## Technologies Used
- Metabase
- Supabase
- Javascript/Typescript
- Jsonwebtoken

## Workflows


## Screenshots and Recordings
![alt text](https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/json_player_info.png?raw=true)

<br>
<br>

![alt text](https://github.com/FilmonK/Metabase_Supabase_Integration/blob/main/readme_media/player_api_call.png?raw=true)

