# Neighborhood Map Project

## Introduction

This app displays the favorite locations in the neighborhood which demonstrates the ability of using the **Google Maps API** and **Foursquare API**, and the **library**(`knockout.js`).

### The Code Information

JavaScript:
The JavaScript folder(js) contains:
  - libs:
    - knockout-3.4.2.js which links the `model` which here is the locations data and the `ViewModel` directly.
    - jquery-3.2.1,min.js which is used for the AJAX requests made for the **Foursquare API**.
  - application's js files
    - app.js which runs the application
    - markers.js which contains all the locations for the app which are to be displayed.
    - mapStyles.js is the custom map style theme which are available by default in **Google Maps API Services**. We can also make our own custom styles using these services.

### Description About the Map
The map contains some hangout locations that you will enjoy visiting. These locations are located in Visakhapatnam, Andhra Pradesh, India.

### Run the application
The ways to run the application are:
- Clone or Download the respository
    - Extract the zip file.
    - Open the index.html file in the extracted folder.
- Another way to run the application after downloading the respository is:
    - All you need is [Python]('https://www.python.org/downloads/') and a command line.
    - Open the terminal (Mac and Linux) or command prompt (Windows) in the folder containing the index.html file.
    - Run `python --version`. If Python is installed, you'll see "Python X.Y.Z". The "X" will be 2 or 3, indicating Python 2 or 3. If nothing shows up or the command produces an error, I recommend that you download Python.
    - If you have Python 2, `run python -m SimpleHTTPServer 8000`. If you have Python 3, run `python -m http.server 8000`.
    - Navigate your browser to http://localhost:8000/.

### Operating the App
Once you have run the app, you must see my neighborhood map in which you can search the locations from the search box or directly select them from the list or by clicking on the marker for more details about the location.

### Attributions
- [Google Maps API]('https://developers.google.com/maps/')
- [Foursquare API]('https://developer.foursquare.com/')
