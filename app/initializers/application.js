export function initialize(container, application) {
  application.inject('service', 'cookie', 'cookie:main');
}

export default {
  name: 'test-initializer',
  after: ['cookie'],
  initialize: initialize
};