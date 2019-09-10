import Component from '@ember/component';
import { get, set, computed } from '@ember/object';

const BIBLE_ID = '06125adad2d5898a-01';
const API_KEY = 'hidden';
export default Component.extend({
  tagName: 'section',
  classNames: 'daily-verse',
  didInsertElement: function() {
    this.getVerse();
  },
  verse: '',
  reference: '',
  getVerse() {
    let promise = new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      let dateDay = new Date;
      
        xhr.addEventListener('readystatechange', function() {
          if (this.readyState === this.DONE) {
            const {data} = JSON.parse(this.responseText);
            resolve(data);
          }
        });
      
      xhr.open('GET', `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=Proverbs.${dateDay.getDate()}.1-5`);
      xhr.setRequestHeader('api-key', API_KEY);
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    }).then((data) => {
      let [passage] = data.passages;
      set(this, 'verse', passage.content);
      set(this, 'reference', passage.reference);
    });
  }
});
