Milestone 9

Team PokeBoop, K1

Inkan:
What I did this week is created the toolbar that allows the users to draw shapes like the square/polyline/circle/polygon/marker onto the map. By following the tutorial provided by leaflet.draw( leaflet_Draw/Leaflet.draw-master/docs/examples/basic.html) and with Professor Guo's help, I was able to source the leaflet.draw files correctly into our index.html files as well as make the toolbar. Thus I was able to get the basic functions of drawing shapes to work on the map. After that I researched php files and other javascript variables because I want to figure out how to save the data that was entered onto the lost form or the found form. So I made an itemDatabaseLost.php and itemDatabaseFound.php file that should echo the inputs on each form based on if it is lost or found, and I also fixed the lostForm.html and foundForm.html to referenced the two php files as well change some formatting on it (like submit). However we are now looking for a way for that saved data to be saved and appear when the files are run, so now I am researching more about php to understand how it works. (Note: for both the leaflet.draw and the php files, I looked at tutorials as well. Sources are also on each html/php files in the public folder.)

Peter:
Andrew and I did research on how to use GeoJSON in order to save marker locations that the user would input as well as other properties that are associated with the user's lost item, including name of the owner, the item name, description of the item, the finder's name, the finder's contact information, and whether the item is confirmed to be found. However, we were unable to implement GeoJSON into our application with the our limited time. So our team ended up using a mSQL-based database via php and XAMPP. So I spent most of the time researching php and mSQL but was unable to completely implement it. Andrew and I are still working on this part of the app. I was also testing some CSS on the lost and found form pages.

Andrew:
Peter and I did research on how to use GeoJSON in order to save marker locations that the user would input. We unforunately were not able to comprehend how to implement this into our application in the amount of time we had, so we decided to go with a mySQL based database instead. I helped Inkan and Austin with PHP coding, debugging, showed them a bit on how XAMPP and mySQL worked, and cleaning up the layout a bit. I also linked Inkan's lostForm.html and foundForm.html files to the index page along with centering the buttons and cleaning the page up a tad. 

Austin:
I got the editing functionality for the toolbar buttons working this week. I found that the layers themselves weren't being detected despite their appearance within the map. The user will now be able to correct for any mistakes in their lines, shapes, or points placed on the map. I also looked into getting a working database to post/pull the posted lost and found items with their characteristics (shape and coordinates in map, time lost, taglines, etc.); this included php files, XXAMP, and mySQL.

Functionality Screenshots:
![Toolbar-created circle](https://github.com/Laverii/PokeBoops/blob/master/markdown/M9Function1.PNG)
![Toolbar-edited circle](https://github.com/Laverii/PokeBoops/blob/master/markdown/M9Function2.PNG)
