import Ember from 'ember';
import RouteBaseMixin from 'horus/mixins/route-base';

const { Route } = Ember;

export default Route.extend(RouteBaseMixin, {
  model() {
    return this.get('sessionManager').userInfo();
  }
});
