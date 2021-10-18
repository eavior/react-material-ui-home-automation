# About this project

This home automation project currently allows a user to control Sensibo AC remotes. At this stage, it is usable only for testing purposes (the Sensibo API key is saved for one session only).

This app is created with React, MUI and NodeJS. It is deployed on [Netlify][identifier] with <https://sensibo.avior.online> as custom domain.
[![Netlify Status](https://api.netlify.com/api/v1/badges/79e0fee7-1162-46a4-9e9e-ea5876deac74/deploy-status)](https://app.netlify.com/sites/home-automation-app/deploys)

[identifier]: https://home-automation-app.netlify.app

The back-end server can be found here: <https://github.com/eavior/home-automation-nodejs-server>

<i>Update: I am creating another back-end server here: <https://github.com/eavior/django-server>.
This one is created with Django, to improve my Python skills. I intend the functionality to be a copy of the NodeJS server. This server is deployed on AWS (<http://ec2-18-185-249-86.eu-central-1.compute.amazonaws.com/admin/>)</i>

Future enhancements that should make it user-friendly, include:

- account creation (email/Google/Apple/Facebook)
- further development of the back-end server (saving all relevant data like API key, account data, 'friendly' AC names, data history in MongoDB; correctly dealing with exceptions/errors; further development of the Django server)
- 'climate react' control (including disabling 'climate react' when the AC is turned off by a user or by a scheduler)
- graphs
- schedules
- enabling/disabling 'climate react' by schedule
- maintain a constant room temperature (by making use of fan speed, target temperature etc. instead of Sensibo's 'climate react')
- setting a night mode (higher temperature than during the day)
- connection to movement sensors & Shelly relays (to control fans)
- inclusion of other home automation products

<br><br>

# No Sensibo API key?

This is how the app looks like when a Sensibo API key is entered.
All Sensibo AC remotes connected to that API key will show up and will be controllable.

![Sensibo AC remote controls](/public/screenshot.png "Sensibo AC remote controls")
