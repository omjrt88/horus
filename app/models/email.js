import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';

const { computed } = Ember;

export default Model.extend({
  principalEmail: attr('string'),
  addresses: attr(),
  bvids: attr(),
  dob: attr('string'),
  educations: attr(),
  emails: attr(),
  ethnicities: attr(),
  gender: attr('string'),
  images: attr(),
  jobs: attr(),
  languages: attr(),
  names: attr(),
  origin_countries: attr(),
  phones: attr(),
  report_info: attr(),
  social: attr(),
  user_ids: attr(),
  usernames: attr(),
  password: attr('string', {
    defaultValue: 'BV-API-Challenge'
  }),
  isGhost: computed('names', function() {
    return this.get('names.length') === 0;
  })
});