/* *******************************************************************************
License - you must retain this notice in ALL redistributions

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

End of License - you can remove below here if you wish.
**********************************************************************************

Instructions

    This is a very simple block of jQuery code. It adds tooltips. Call it instatooltip.
    I built it because there didn't appear to be any equivalent library that added the
    hover element automatically. Its not perfect, but its simple enough you can probably
    fix it if you need changes

    The first four variables here set up the parameters. The instatooltip_attribute
    variable defines what attributes to search for to add tooltips. I recommend using
    something you haven't used anywhere else, as it will append elements to all elements
    that have that attribute. By default it is tooltip, which means:

        <p tooltip="This is a tooltip">Hello world</p>

    Will become, automagically, after loading this JS

        <p tooltip="This is a tooltip">Hello world <span class='hoverable'>?</span></p>

    Where the <span class='hoverable'>?</span>, on hover, adds a instatooltip_tooltip_element_type that contains
    the tooltip itself. After instatooltip_hide_delay ms with the mouse not in the element,
    that element disappears.

    Out of the box, this uses jQuery's hide/show methods with defaults set to 500ms all around. You
    may wish to change these.

Future

    This actually doesn't support tooltips that show upon themselves, though it would be trivially
    easy to change it to. It didn't appear to be trivially easy to change it to show tooltips that
    either add an element OR show on themselves on the same page, using the existing code, so I just
    left it as is. Would love to see a if(hover_element == "self") type option as well as a 
    "show tooltip in other location" option, I will likely never get around to this though and
    there are many other libraries meant for exactly those things.

******************************************************************************** */

jQuery(document).ready(function($) {

    /* Variables */

    instatooltip_attribute = "tooltip";             // attribute that contains tooltip text. i.e. <label tooltip="This is the text.">
    instatooltip_selector_class = "instatooltip";   // class to create tooltip in. MUST NOT OCCUR ON YOUR PAGE.
    instatooltip_hide_delay = 500;                  // ms
    instatooltip_hover_element = "<span class='hoverable'>?</span>";
    instatooltip_tooltip_element_type = "div";      // this could be span, even p or strong, if you really wanted.

    instatooltip_hide_speed = "slow";
    instatooltip_show_speed = "fast";

    /////////////////////////////////////////////////////////////
    // probably don't change below here.
    // although this isn't very complicated if you do want to...
    /////////////////////////////////////////////////////////////

    /*
        This function returns a function which determines what happens when hiding
        the tooltip needs to occur by default, it simply plays a hide animation,
        then destroys the element. This function should always delete the instatooltip_timeoutref
        variable.

        By having this function as a closure we can display multiple tooltips on the screen
        at the same time.
    */

    instatooltip_hide_function = function (killit) {
        return function() {
            killit.children("." + instatooltip_selector_class).hide(instatooltip_hide_speed,
                function() { $(this).remove();  }
            );
            delete(killit.data("instatooltip_timeoutref"));
        };
    }

    /*
        This is the jQuery "has attribute" selector, which searches for any element on
        your page that contains the instatooltip_attribute. When it finds one, it appends
        an element that when hovered displays the tooltip.
    */

    $("[" + instatooltip_attribute + "]").append(

        $(instatooltip_hover_element).mouseover(function() {
            if($(this).children("." + instatooltip_selector_class).length == 0) {    // if tooltip doesn't (yet) exist.
                $(this).append(                                 // create it.
                    "<" + instatooltip_tooltip_element_type + " class='" + instatooltip_selector_class + "' style='display:none;'>" + ($(this).parent().attr(instatooltip_attribute)) + "</" + instatooltip_tooltip_element_type + ">"
                );
                                                                // and animate it being displayed.
                $("." + instatooltip_selector_class).show(instatooltip_show_speed);
            }

            if(typeof($(this).data("instatooltip_timeoutref")) == "number") {   // if we have a delete timeout running
                window.clearTimeout($(this).data("instatooltip_timeoutref"));   // clear it (because the mouse is back in the hover element)
            }
        }).mouseout(function() {
            if($(this).children("." + instatooltip_selector_class).length != 0) {    // if there are tooltips out there.
                                                                                     // prepare to destroy them.

                instatooltip_timeoutref = window.setTimeout(instatooltip_hide_function($(this)), instatooltip_hide_delay);
                $(this).data("instatooltip_timeoutref", instatooltip_timeoutref);
            }
        })

    );
});
