import Component from '@ember/component';
import { observer, computed, get, set } from '@ember/object';
import { later, cancel } from '@ember/runloop';

export default Component.extend({
  didInsertElement: function() {
    this.tick();
  },
  tick: function() {
    var nextTick = Ember.run.later(this, function() {

      let time = new Date;
      this.notifyPropertyChange('value');
      let twelveHours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
      let zeroMinues = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
      set(this, 'fullTime', `${twelveHours}:${zeroMinues}.${time.getSeconds()}`);
      this.tick();
    }, 1000);
    this.set('nextTick', nextTick);
  },
  willDestroyElement: function() {
    var nextTick = this.get('nextTick');
    Ember.run.cancel(nextTick);
  }

});
