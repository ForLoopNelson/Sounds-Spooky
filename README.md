![spookylogo2](https://user-images.githubusercontent.com/72758221/236322035-d9defb3f-5ac9-44e2-bb29-720a07f2fcbc.JPG)


# About

`A full stack app to upload audio pertaining to Horror Movie Sound Design using Cloudinary, MongoDB, express`

# Install

`npm install`

---

# Things to add

- Create a `.env` file in config folder and add the following as `key = value`
  - PORT = 2121 (can be any port example: 3000)
  - DB_STRING = `your database URI`
  - CLOUD_NAME = `your cloudinary cloud name`
  - API_KEY = `your cloudinary api key`
  - API_SECRET = `your cloudinary api secret`

  - GOOGLE_CLIENT_ID = `your google client id`
  - GOOGLE_CLIENT_SECRET = `your google client secret`
  

---

# Run

`npm start`
...Or to run in Development mode: `npm run dev`

--Production: `node server.js`


# NPM UPDATES!!!
-- 7 pkgs need updates. Only one is giving a deprecation Warning but not crashing the app yet. 
-- Made a branch to test with updates and it was a nightmare
-- NPM updates done. things seem okay. Will remove this section after further testing.

--Also check for pkgs that can be removed. I believe ffmpeg isn't used at all.

# TODO's

`CHECK TO UPDATE CONNECT-MONGO DRIVER TO 4x`

`Create a forgot password, reset password feature`

`User Profile Picture`

`Clean up CSS. Organize and maybe setup color variables.`

`Create a way for user to delete their profile`

`In Post page change Add a comment to stand out more from the background`

`Audio plays for 30 seconds regarless if the audio file stops before that` --This seems resolved

`Get more info into about page and style it cleaner.`

# Google OAuth fixes
-- Try this in passport.js 
``` userName: profile.displayName || `user_${profile.id}`, ```
-- fix 'E11000 duplicate key error collection: horrorSoundDesign.users index: userName_1 dup key: { userName: null }' error. Maybe remove need to display name from google account and show email or have the google user choose an account name.


# Mobile 
`Maybe change the go to current sfxs button placement and design`
`Audio posts on feed page can get stacked weird looking on mobile devices.`

