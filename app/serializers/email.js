import DS from 'ember-data';
import Ember from 'ember';

const { A, Object: EObject } = Ember;
const { RESTSerializer } = DS;

export default RESTSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType){
    payload.principalEmail = payload.emails[0].email_address;
    return this._super(store, primaryModelClass, EObject.create({ emails: A([payload]) }), id, requestType);
  },

  normalize(modelClass, resourceHash) {
    var data = {
      id:            resourceHash.report_info.report_id,
      type:          modelClass.modelName,
      attributes:    resourceHash
    };
    return { data: data };
  }
});
