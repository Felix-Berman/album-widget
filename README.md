# Album Widget
This is a script for the Scriptable ios app that lets you display a 3x3 grid of album covers based on last.fm user data on your iphone home screen. Running the widget through the Scriptable app saves a copy of your album chart to your photo library.

The album widget is only optimised for large widgets. Optimisation for small and medium widgets may come in the future.

# Setup
To set up the widget follow these steps:

1. Copy the code from [album-widget.js](https://github.com/Felix-Berman/album-widget/blob/main/album-widget.js) and paste it into a new Scriptable script.

2. In order to use this script you must obtain your own private last.fm api key [here](https://www.last.fm/api#getting-started). Once you have an api key copy it into the variable apiKey in the script you've just made.

3. Update the user specific data in the script to your preference
    * user : The last.fm username of the user you would like to track
    * period : The time period of last.fm user data to obtain (overall | 7day | 1month | 3month | 6month | 12month)
    * imageQuality: the resolution of album covers (0 - 3, low - high)
    * tight : display the album covers tightly packed or loosely packed (true | false)

4. Add a large Scriptable widget anywhere on your homescreen.

5. Long press on the new widget and select Edit Widget from the pop up menu

6. Choose the script you created and edited from [album-widget.js](https://github.com/Felix-Berman/album-widget/blob/main/album-widget.js) 

7. Select When Interacting: Run Script to enable saving album chart to photos when tapping on widget.

The widget will now update itself periodically with new top album data.