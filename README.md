# Angular Fastclick

Integrating the FTLabs' fastlick library with angular's ng-click-directive.

# Why?

Most browsers wait approximately 300 ms between the start of a touch and firing a click event.
This results in bad user experience in mobile web-apps, due to the delay.

AngularJS provides an ng-touch library, which unfortunately as of now does not work, when combined withh
the full version of jQuery (not jQLite) and additionally has proven to fail on various occasions
like focusing input elements or selects.

FTLabs has published a dedicated Fastclick-library which bypasses all the problems above
but is intented to be bound to a general 'layer', like the whole document.

We had to overcome this fact, as we only need the Fastclick-handling on those elements
that are annoated with an ng-click directive. 
