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

In addition, we wanted to have any elements that can be clicked / tapped different states
like in native mobile apps. E.g. on the iPhone, whenever the user touches a tappable element
it is immediately colored, until
a) the user moves the touch further than a certain threshold
b) the user stops touching and executes a click / tap that way

For this reason, we extended the excellent FastClick-library with two differnt states
`touched` and `active`, which correspond to the ancient `:hover` and `:active` CSS-pseudo-classes
on desktops. More information can be found on https://github.com/benediktreiser/fastclick.

# How?

# Dependencies

This module extends the angular-touch module and requires it to be loaded before this lib, like so:
(The FastClick-lib is also required but installed automatically via bower)

```
<script src="bower_components/angular-touch/angular-touch.js"></script>
<script src="bower_components/fastclick/lib/fastclick.js"></script>
<script src="bower_components/angular-fastclick/lib/angular-fastclick.js"></script>
```
