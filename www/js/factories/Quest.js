/**
 * Created by decipher on 25.1.16.
 */
function Quest() {

  'use strict';

  return {
    get: function () {
      var quests = [
        {
          id: 'question1',
          title: {
            en: 'How do you rate your English skills?',
            ru: 'Как вы оцениваете свой уровень английского языка?'
          },
          rate: '5'

        },
        {
          id: 'question2',
          title: {
            en: 'How do you rate your HTML5 skills?',
            ru: 'Как вы оцениваете свои знания HTML5?'
          },
          rate: '5'

        }
        {
          id: 'question3',
          title: {
            en: 'How do you rate your CSS3 skills?',
            ru: 'Как вы оцениваете свои знания CSS3?'
          },
          rate: '5'

        }
      ];
      return quests;
    }
  }
};
