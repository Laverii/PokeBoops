Milestone 13

DEVELOPMENT PLAN (5/23/17)
 
Andrew: Working on boostrap/UI
Austin: Search bar (HTML)
Peter: Look into EasyKVS database
Inkan: Seperate lost and found onto seperate pages, get form to post on map when using circle/polyline.


Inkan:
Alok and Kandarp helped us set up the Keeling.js to put information onto our homepage as well as put information into data.json when you submit the found form form. Over the weekend, I implemented the cirlce draw tool is to show the form and when it is submitted it appears on the map. I also moved the found form onto the home page and got it to print a list of items everytime the found form was submitted. However this would just post onto the home page once you refresh. So I tried getting the information from data.json as a popup that would open everytime the user draws a circle, but the problem is that instead of just recording individual submissions the popup will show all previous submissions. So I pivoted a bit and decided that the user cna first draw a shape onto the map, and then a popup will ask them to fill out the form. So I was able to get the circle (and to a degree polyline) draw tools to make a popup that first asks if the user has lost or found the item. Then depending on what button they pressed, it takes them to the appropriate form (either lost or found) where they can fill out the details and submit it onto the map. However polyline somewhat works but it breaks a little bit (it stores the information, but the popup closes when the buttons are pressed. So you have to press the line again for the next popup to show) so I may go to office hours about this. I was also looking into databses like PostgreSQL and Alok introduced me to EasyKVS as a database. I tried implementing PostgreSQL at the least but it didn't work so well. I also looked into EasyKVS a bit as well.

Austin:
This week I looked into search bar functionality for locations within the map, in case users weren't exactly familiar with the visual representation of lost/found items within areas. Specifically, I looked into Openstreetmap's Nominatim and was able to access its database with jQuery. From there it was just a matter of displaying the results based on user inquiry and directing to the appropriate location within the map. Additionally, I found other tilesets that could be used within Leaflet that remove the icons of the standard OSM render. I decided to include both for the user, one that gives detailed information, and one that removes all 'clutter' aside from the lost and found item postings themselves. 

Peter:
This week, I looked into the EasyKVS that was provided from Alok, but I was having a lot of problems trying to connect this API to our application. So I decided to work on another database called Firebase. I'm still in the process pushing our data to the firebase project.
If we are able to get EasyKVS to work or the Keeling.js to pull the correct data, then we may switch back. For now, I will continue to work on Firebase. 

Functionality Screenshots:

![Draw Circle Posting Function](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function4.PNG) 

![Draw Circle Posting Function 2](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function5.PNG) 

![Draw Circle Posting Function 3](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function9.png) 

![Draw Circle Posting Function 4](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function10.png) 

![Search Bar Function](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function1.PNG) 

![Search Bar Function 2](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function2.PNG) 

![Tileset Function](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function3.PNG) 

![Found Form/data Function 1](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function6.png)

![Found Form/data Function 2](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function7.png)  

![Found Form/data Function 3](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function8.png)

![Draw Line Posting Function](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function11.png) 

![Draw Line Posting Function 2](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function12.png) 

![Draw Line Posting Function 3](https://github.com/Laverii/PokeBoops/blob/master/markdown/M13Function13.png)   
