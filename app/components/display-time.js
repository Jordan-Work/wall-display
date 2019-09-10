import Component from '@ember/component';
import { set, computed } from '@ember/object';
const time = new Date;

export default Component.extend({
  didInsertElement: function() {
    this.tick();
  },
  tick: function() {
    var nextTick = Ember.run.later(this, function() {
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
