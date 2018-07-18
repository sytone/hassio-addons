/* Magic Mirror Config for HASS.IOSample
 *
 * Orginal by Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information how you can configurate this file
 * See https://github.com/MichMich/MagicMirror#configuration
 *
 * When running in HASS.IO the address and ipWhitelist need to be 
 * empty and any access mcontrols need to be on the host
 * and not in the container.
 */

var config = {
    address: "", // Empty as running in a docker container.
    port: 8080, // Update port in HASS.IO configuration and not here.
    ipWhitelist: [], // Empty as in docker container, ACL from the host.

    //
    // The settings below are for a basic setup, please modifiy as needed. 
    //
    language: "en",
    timeFormat: 24,
    units: "imperial",
    customCss: "css/custom.css",

    modules: [
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: 'MMM-OnScreenMenu',
            position: 'bottom_right',
            config: {
                touchMode: true,
                enableKeyboard: true,
                menuItems: {
                    notify1: {  title: "Home", 
                        icon: "eye", 
                        notification: "PAGE_CHANGED", 
                        payload: 0 },
                    notify2: {  title: "Comics", 
                        icon: "eye", 
                        notification: "PAGE_CHANGED", 
                        payload: 1 },
                    notify3: {  title: "HA", 
                        icon: "eye", 
                        notification: "PAGE_CHANGED", 
                        payload: 2 }
                }
            }
        },
        {
            module: "MMM-pages",
            config: {
                modules: [
                        [ "calendar", "clock","weatherforecast","currentweather","newsfeed" ],
                        [ "DailyXKCD" ],
                        [ "MMM-iFrame" ]
                ],
                excludes: ["alert", "updatenotification", "MMM-OnScreenMenu"],
            }            
        },    
        {
            module: 'MMM-iFrame',
            position: 'fullscreen_below',	// This can be any of the regions.
            config: {
                    url: ["http://hass.local:8123"],
                    updateInterval: 60 * 60 * 1000,// Refresh every 60 minutes
                    width: "100%",
                    height: "1000px"
                }
        },
        {
            module: "DailyXKCD",
            position: 'top_left',
            config: {
                invertColors: true,
                showTitle: true,
                showAltText: false
            }            
        },
        {
            module: "clock",
            position: "top_left"
        },
        {
            module: "calendar",
            header: "US Holidays",
            position: "top_left",
            config: {
                calendars: [
                    {
                        symbol: "calendar-check-o ",
                        url: "webcal://www.calendarlabs.com/templates/ical/US-Holidays.ics"
                    }
                ]
            }
        },
        {
            module: "compliments",
            position: "lower_third"
        },
        {
          module: "currentweather",
          position: "top_right",
          config: {
            location: "New York",
            locationID: "",  //ID from http://www.openweathermap.org/help/city_list.txt
            appid: "YOUR_OPENWEATHER_API_KEY"
          }
        },
        {
          module: "weatherforecast",
          position: "top_right",
          header: "Weather Forecast",
          config: {
            location: "New York",
            locationID: "5128581",  //ID from http://www.openweathermap.org/help/city_list.txt
            appid: "YOUR_OPENWEATHER_API_KEY"
          }
        },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [
                    {
                        title: "New York Times",
                        url: "http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                    }
                ],
                showSourceTitle: true,
                showPublishDate: true
            }
        }       
    ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
