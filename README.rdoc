#squawkr.me

squawkr is a Backbone.js and RoR blogging site that uses the HTML5 canvas element to convert your blog post text to an image, which is then uploaded to the user's Twitter account using the Twitter API. @mentions and #hashtags are automatically extracted from the post and added to the Twitter status as space permits. 

View it live at http://squawkr.me

##Features include: 
* Username autofill using Twitter's typeahead.js
* Posts are restricted to 14 lines long. Since a line can have a variable number of characters, lines are drawn to a canvas word by word, the width is measured, and a new line is registered if a the width exceeds some set value
* Sign up/in via Omniauth Twitter gem
* Hand-rolled session management to avoid hitting Twitter every time a user revisits the site
* @mentions and #hashtags are extracted from posts with regex
* Overrides Rails's named route parameters so user's page path is u/username instead of u/99999 (ugly, hard to remember)
* Twitter Bootstrap used for styling
* Google Analytics
