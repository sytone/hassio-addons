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
    address: "0.0.0.0", // Empty will only run on 127.0.0.1 - share on all addresses inside docker container.
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
                    notify3: {  title: "Home Assistant", 
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
                        [ "calendar", "clock","weatherforecast","currentweather","newsfeed", "MMM-HASS", "MMM-homeassistant-sensors" ],
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
                location: "",
                locationID: "",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: ""
            }
        },
        {
            module: "weatherforecast",
            position: "top_right",
            header: "Weather Forecast",
            config: {
                location: "",
                locationID: "",  //ID from http://www.openweathermap.org/help/city_list.txt
                appid: ""
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
        },
        {
                module: "MMM-HASS",
                position: "top_left",
                config: {
                        host: "hassio/homeassistant", // Special docker ha api proxy
                        port: "",
                        https: false,
                        hassiotoken: true,
                        devices: [
                        { deviceLabel: "Exterior",
                                deviceReadings: [
                                { sensor: "sensor.dark_sky_temperature", icon: "wi wi-thermometer", suffix: "°"},
                                { sensor: "sensor.dark_sky_humidity", icon: "wi wi-humidity", suffix: "%"}
                                ]
                        },
                        { deviceLabel: "Interior",
                                deviceReadings: [
                                { sensor: "sensor.main_floor_temperature", icon: "wi wi-thermometer", suffix: "°", notification: "INDOOR_TEMPERATURE"},
                                { sensor: "sensor.main_floor_humidity", icon: "wi wi-humidity", suffix: "%"}
                                ]
                        },
                        { deviceLabel: "Internet",
                                deviceReadings: [
                                { sensor: "sensor.speedtest_ping", icon: "fa fa-tachometer-alt", suffix: ""}
                                ]
                        }
                        ]
                  }
        },        
        {
		    module: 'MMM-homeassistant-sensors',
		    position: 'top_left',
		    config: {
			    url: 'http://hassio/homeassistant/api/states', // Special docker ha api proxy
			    prettyName: false,
			    stripName: false,
			    values: [{
					sensor: "sensor.processor_use",
					icons: [{
							"default": "chip"
						}
					]
				}, {
					sensor: "binary_sensor.downstairs_occupancy",
					icons: [{
							"state_off": "run",
							"state_on": "run-fast"
						}
					]
				}, {
					sensor: "switch.study",
					icons: [{
							"state_off": "lightbulb-outline",
							"state_on": "lightbulb-on-outline"
						}
					]
				}
			]

		}
	}        
    ]

};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
