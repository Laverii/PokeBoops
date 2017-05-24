Milestone 13

DEVELOPMENT PLAN (5/23/17)
 
Andrew: Working on boostrap/UI
Austin: Search bar (HTML)
Peter: Look into EasyKVS database
Inkan: Seperate lost and found onto seperate pages, get form to post on map when using circle/polyline.


Inkan:
Alok and Kandarp helped us set up the Keeling.js to put information onto our homepage as well as put information into data.json when you submit at least the submit form. Over the weekend, I implemented the cirlce draw tool is to show the form and when it is submitted it appears on the map. I also moved the found form onto the home page. I was also looking into databses like PostgreSQL and Alok introduced me to EasyKVS as a database. I tried implementing PostgreSQL at the least but it didn't work so well. I was able to get the circle (and to a degree polyline) to make a popup that first asks if the user has lost or found the item. THen depending on what button they pressed, it takes them to the appropriate form where they can fill out the details and submit it onto the map. However polyline somewhat works but it breaks a little bit (it stores the information, but the popup closes when the buttons are pressed) so I may go to office hours about this.

Austin:
This week I looked into search bar functionality for locations within the map, in case users weren't exactly familiar with the visual representation of lost/found items within areas. Specifically, I looked into Openstreetmap's Nominatim and was able to access its database with jQuery. From there it was just a matter of displaying the results based on user inquiry and directing to the appropriate location within the map. Additionally, I found other tilesets that could be used within Leaflet that remove the icons of the standard OSM render. I decided to include both for the user, one that gives detailed information, and one that removes all 'clutter' aside from the lost and found item postings themselves. 

Functionality Screenshots:
![Draw Circle Posting Function]() 

![Draw Circle Posting Function 2]() 

![Search Bar Function]() 

![Search Bar Function 2]() 

![Tileset Function]() 