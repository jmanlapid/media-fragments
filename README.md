### Installing Dependencies

``bower install``

### Running

Open index.html in a browser after installing dependencies. The sample rugby video is already included.

### Whats left to do but don't have time for better app
* Wrap all the inputs in forms so you can press enter 
* More commenting to show whats going on in my code
* Use webserver to serve template urls (component templates are empty but thats where they should be instead of index.html)
* Use protractor to build out angular unit tests
* Better design (not my strong point)
* Overlay the spinner over the video instead of hiding the video

### Optional Features Developed

* ✓ The ability to automatically jump to the next clip after it finishes, with a 3 second waiting period and appropriate loading animation.
 * Keep track of the play index in the ListSrv. When the video pauses, check if the stopped time is greater than the current media fragment end value.
* ✓ The ability to ‘save’ clips for persistent use.
 * Using angular-local-storage bower package. Save data whenever a fragment is added, deleted, or edited. Load data when the service is loaded. 
* ✓ The ability to add arbitrary ‘tags’ to clips so that they can be filtered by the tag name.
 * Each media fragment object has an tags object of which tags are properties. Their values default to true. The challenge was making the ListController update its scope from another controller using $scope.$watch. I needed to make the service list a private var instead of public. 
* ✓ Hotkeys to jump between the current clip and next and previous clips (if there are any)
 *  Document level key listeners in the player controller and utilizing the play index in the ListSrv. 
* X Markers on the video player timeline that denote where a clip starts (full video only).
 * I don't have the time to do this, but the steps to do this are
  * 1. Hide the default HTML5 controls. 
  * 2. Create custom play controls with listeners
  * 3. The timeline is a div of which there are css spans % from start to end time as a calculation divided by the total time. For example if start time is 50, end time is 100, and total time is 200. Start a different colored span at 50/200 and end at 100/200 using % based css.
  * 4. Add a listener that watches clicks on these spans to play that fragment
Clicking the marker chooses that clip and plays it from that point.
* ✓ The ability to reuse the the player and playlist on another page without the editing capabilities
 * I'm using ng-route. There are two top level components - page1 and page2. These components are reusing the add, list, player, and filter directives. These directives in turn are reusing the service providers. 

