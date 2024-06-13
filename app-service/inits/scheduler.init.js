const Agenda = require('agenda');
const agenda = new Agenda({ 
  db: { address: process.env.SCHEDULER_DATABASE_URL },
  useUnifiedTopology: true
});
const logger = require('../utils/logger.util');

// listen for the ready or error event.
agenda
  .on('ready', () => logger.info('Agenda started!'))
  .on('error', () => logger.info('Agenda connection error!'));

agenda.start();

module.exports = agenda;
