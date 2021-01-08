## Scrape Stack Overflow

A simple scrapper for stack overflow, built with express.js

## Features

1. Search feature for any tag.
2. Retrieves only latest 10 posts and top 10 voted posts of all time
3. Convenient modal view, with the available accepted answer

## How to use

Just write the name of your preferred language or tool (eg. python) in the search box and click search. The autocomplete may assist you for some of the popular tags. There will be two lists, one for the top posts, another one for the latest posts. Click details to see the post, and find the accepted answer at the bottom, if the post has one. Click "Post URL" to see the actual post in a new tab.

## For local build

1. Install Node.js from https://nodejs.org/en/
2. Clone this repo in your local machine.
```
		$ git clone https://pcborty@bitbucket.org/pcborty/stackoverflow.git
```
3. Run the server.js in the project folder
```
		$ cd stackoverflow
		$ node server.js
```
