# Community Hass.io Add-ons: MagicMirror²

[![GitHub Release][releases-shield]][releases]
![Project Stage][project-stage-shield]
![Project Maintenance][maintenance-shield]
[![GitHub Activity][commits-shield]][commits]

## About

MagicMirror² is an open source modular smart mirror platform. With a growing list 
of installable modules, the MagicMirror² allows you to convert your hallway or 
bathroom mirror into your personal assistant. 

Learn more about MagicMirror² [here](https://magicmirror.builders/)

## Installation

The installation of this add-on is pretty straightforward and not different in
comparison to installing any other Hass.io add-on.

1. [Add our Hass.io add-ons repository][repository] to your Hass.io instance.
1. Install the "MagicMirror²" add-on.
1. Start the "MagicMirror²" add-on
1. Check the logs of the "MagicMirror²" add-on to see if everything went well.
1. Open the dashboard at this url `http://hassio.local:8181`

## Addon Configuration

**Note**: _Remember to restart the add-on when the configuration is changed._

Example add-on configuration:

```json
{
    "gitupdate": true,
    "npmupdate": false,
    "npminstall": false,
    "modules": [
        { "name": "MMM-OnScreenMenu", "git": "https://github.com/shbatm/MMM-OnScreenMenu" },
        { "name": "DailyXKCD", "git": "https://github.com/Blastitt/DailyXKCD.git" }
    ]
}
```

### Option: `gitupdate`

The `gitupdate` option will run a git pull to get the latest version of MagicMirror² 
from [https://github.com/MichMich/MagicMirror](https://github.com/MichMich/MagicMirror) 
when the addon starts up. 

### Option: `npmupdate`

This option will call a npm update to ensure it is latest, this may be needed
if you are using your own modules or have a security issue. 

### Option: `npminstall`

If enabled npm install will be run after the git update. Off by default.

### Option: `modules`

This is a collections of modules you want to have installed for your system. It
will pull them down and run a `npm install` on them for you. 

## Example

When installed it will place a pre-configured config file in place to get you started. Thie
can be edited. Please make sure you do not change the Home Assistant urls as they are for
the internal API Proxy used by HASS.

Default home page showing some sensor data
![Default home with some sensor data](https://raw.githubusercontent.com/sytone/hassio-addons/master/magic_mirror/mm-home.png)

Using the menu you can navigate to the full Home Assistant UI, handy for tablets.
![Using menu to access ha layer](https://raw.githubusercontent.com/sytone/hassio-addons/master/magic_mirror/mm-ha-menu.png)


## MagicMirror² configuration and user manuals

The add-on does not configure MagicMirror² for you. When it starts it will create
a default configuration file in your Home Assistant configuration directory. 

Under the root of the Home Assistant directoy a folder called `magicmirror` will
be created. Uner that there will be three more folders. These are

* config - Contains the config.js and example. 
* css - Any custom css changes will be copied over. 
* modules - Any custom modules will be copied over.

When the addon starts it will copy these settings into the container and start the 
MagicMirror² process. If you edit or update these you will need to restart the
MagicMirror² addon in the HASS.IO interface.

If you use the modules folder in the Home Assistant configuration make sure you 
have done a `npm install` as it is just copied across. 

For more information about configuring MagicMirror², please go to 
[https://magicmirror.builders/](https://magicmirror.builders/)

## Embedding into Home Assistant

It is possible to embed Magic Mirror directly into Home Assistant.
Home Assistant provides the `panel_iframe` component, for these purposes.

Example configuration:

```yaml
panel_iframe:
  MagicMirror:
    title: Magic Mirror
    icon: mdi:image-filter-frames
    url: http://addres.to.your.hass.io:8181
```

## Changelog & Releases

This repository keeps a [change log](CHANGELOG.md). The format of the log
is based on [Keep a Changelog][keepchangelog].

Releases are based on [Semantic Versioning][semver], and use the format
of ``MAJOR.MINOR.PATCH``. In a nutshell, the version will be incremented
based on the following:

- ``MAJOR``: Incompatible or major changes.
- ``MINOR``: Backwards-compatible new features and enhancements.
- ``PATCH``: Backwards-compatible bugfixes and package updates.

## Support

Got questions?

Ask on the Home Assistant [Community Forum][forum]

You could also [open an issue here][issue] GitHub.

## Contributing

This is an active open-source project. We are always open to people who want to
use the code or contribute to it.

[commits-shield]: https://img.shields.io/github/commit-activity/y/sytone/hassio-addons.svg
[commits]: https://github.com/sytone/hassio-addons/commits/master
[sytone]: https://github.com/sytone
[home-assistant]: https://home-assistant.io
[issue]: https://github.com/sytone/hassio-addons/issues
[keepchangelog]: http://keepachangelog.com/en/1.0.0/
[license-shield]: https://img.shields.io/github/license/sytone/hassio-addons.svg
[maintenance-shield]: https://img.shields.io/maintenance/yes/2018.svg
[project-stage-shield]: https://img.shields.io/badge/project%20stage-experimental-yellow.svg
[releases-shield]: https://img.shields.io/github/release/sytone/hassio-addons.svg
[releases]: https://github.com/sytone/hassio-addons/releases
[repository]: https://github.com/sytone/hassio-addons
[semver]: http://semver.org/spec/v2.0.0.htm
