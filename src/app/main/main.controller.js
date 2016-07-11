export class MainController {
  constructor($http, $log, toaster, moment) {
    'ngInject';

    this.posts = [];
    this.toaster = toaster;
    this.$http = $http;
    this.$log = $log;
    this.topic = null;
    this.topics = ['poland', 'cats', 'funny', 'gaming', 'gifs'];
    this.moment = moment;

    this.randomTopic();
  }

  randomTopic() {
    let top = this.topics[Math.floor(Math.random() * this.topics.length)];

    if (top === this.topic) {
      this.randomTopic();
    }

    return top;
  }

  fetch() {
    this.topic = this.randomTopic();
    this.$log.info('Fetching', this.topic);
    this.$http.jsonp('//www.reddit.com/r/' + this.topic + '.json?limit=25&jsonp=JSON_CALLBACK')
      .then(success => {
        this.posts = success.data.data.children;
        this.$log.log(this.posts);
        this.$log.log('Posts fetched!');
        this.toaster.pop('success', 'Success', 'Posts fetched.');
      })
      .catch(err => {
        this.$log.error(err);
        this.toaster.pop('error', 'Error', 'Error while fetching reddit posts.')
      });
  }

  showAuthor() {
    this.toaster.pop('info', 'Author', 'Daniel Kaczmarek (mr.dannael@gmail.com)');
  }

  pointless() {
    this.toaster.pop('info', 'Hah!', 'I told you so...');
  }
}
