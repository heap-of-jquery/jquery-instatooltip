** Instructions

This is a very simple block of jQuery code. It adds tooltips. Call it instatooltip. I built it because there didn't appear to be any equivalent library that added the hover element automatically. Its not perfect, but its simple enough you can probably fix it if you need changes

The first four variables here set up the parameters. The ``instatooltip_attribute`` variable defines what attributes to search for to add tooltips. I recommend using something you haven't used anywhere else, as it will append elements to all elements that have that attribute. By default it is tooltip, which means:

````
<p tooltip="This is a tooltip">Hello world</p>
````

Will become, automagically, after loading this JS

````
<p tooltip="This is a tooltip">Hello world <span class='hoverable'>?</span></p>
````

Where the ``<span class='hoverable'>?</span>``, on hover, adds a ``instatooltip_tooltip_element_type`` that contains the tooltip itself. After ``instatooltip_hide_delay`` ms with the mouse not in the element, that element disappears.

Out of the box, this uses jQuery's hide/show methods with defaults set to 500ms all around. You may wish to change these.

** Future

This actually doesn't support tooltips that show upon themselves, though it would be trivially easy to change it to. It didn't appear to be trivially easy to change it to show tooltips that either add an element OR show on themselves on the same page, using the existing code, so I just left it as is. Would love to see a if(hover_element == "self") type option as well as a  "show tooltip in other location" option, I will likely never get around to this though and there are many other libraries meant for exactly those things.

I don't really expect to invest much more in this. There's tons of great Javascript tooltip libraries.

** License 
You must retain this notice in ALL redistributions

Copyright 2011 Giuseppe Burtini      https://github.com/gburtini

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this library except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
