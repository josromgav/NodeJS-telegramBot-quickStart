# NodeJS-telegramBot-quickStart
Easy solution for a custom multipurpose telegram bot made with Javascript on NodeJS platform.
---------------------------------------------------------------------------------------------

One page start solution fully working and ready to start development. 

-This code can run as a standalone server but can also be implemented in another nodeJS project with a simple import. It currently supports no savestate, so it will evaluate the last message received by the bot on every startup. By saving the current value of lastUpdateId variable on your database of choice, and restoring it at the initial run, the bot will only answer the messages it didnt respond in the last runtime.

-In order to make it answer more frequently, just decrease the polling rate in the run() function which is currently set to 4 seconds(4000).

How to install(requires NPM and NodeJS installed):
  npm install
  
how to run:
  npm start
  
How to create a telegram bot and obtain bot token:
-Add botfather to your telegram contacts.
-/newbot on botfather conversation window.
-Give the bot a name.
-Copy the obtained token into this javascript code.
