import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { renderRoutes } from './routes';

import '../../ui/stylesheets/ReGovTech.css';
import '../../ui/stylesheets/skins/skin-blue.css';
import '../../ui/stylesheets/misc.css';

import '../../ui/scripts/app.js';

Meteor.startup(() => {
  render(renderRoutes(), document.getElementById('render-div'));
});
