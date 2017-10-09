import DS from 'ember-data';

const { RESTAdapter } = DS;

export default RESTAdapter.extend({
  host: 'http://www.beenverified.com/hk/dd/',
  namespace: '',

  pathForType: function(modelName) {
    return modelName;
  },
  ajaxOptions: function(url, type, options) {
    var hash = this._super(url, type, options);
    hash.dataType = "jsonp";
    return hash;
  }
});
