import StorageArray from 'ember-local-storage/local/array';

const STORAGE = StorageArray.extend();

STORAGE.reopenClass({
  initialState() {
    return [];
  }
});

export default STORAGE;