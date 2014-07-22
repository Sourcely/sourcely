
(function(angular){
  "use strict";

  angular.module('fx.animations.assist', [])

  .factory('Assist', ['$filter', '$window', '$timeout', function ($filter, $window, $timeout){
    return {

      emit: function(element, animation, motion){
        var $scope = angular.element(element).scope();
        $scope.$emit(animation + ' ' +motion);
      },

      parseClassList: function(element){
        var ease,
            list    = element[0].classList,
            results = {trigger: false, duration: 0.3, ease: $window.Back};

        angular.forEach(list, function (className){
          if(className.slice(0,9) === 'fx-easing'){
            ease = className.slice(10);
            results.ease = $window[$filter('cap')(ease)] ? $window[$filter('cap')(ease)] : $window.Elastic;
          }
          if(className === 'fx-trigger'){
            results.trigger = true;
          }
          if(className.slice(0,8) === 'fx-speed'){
            results.duration = parseInt(className.slice(9))/1000;
          }
        });
        return results;
      },

      addTimer: function(options, element, end){
        var self = this;
        var time = options.stagger ? (options.duration * 3) * 1000 : options.duration * 1000;
        var timer = $timeout(function(){
          if(options.trigger){
            self.emit(element, options.animation, options.motion);
          }
          end();
        }, time);
        element.data(options.timeoutKey, timer);
      },

      removeTimer: function(element, timeoutKey, timer){
        $timeout.cancel(timer);
        element.removeData(timeoutKey);
      }
    };
  }])

  .filter('cap', [function(){
    return function (input){
      return input.charAt(0).toUpperCase() + input.slice(1);
    };
  }]);
}(angular));
(function(angular, TweenMax, TimelineMax){
  "use strict";
  var timeoutKey = '$$fxTimer';
  angular.module('fx.animations.create', ['fx.animations.assist'])

  .factory('FadeAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var inEffect        = effect.enter,
          outEffect       = effect.leave,
          outEffectLeave  = effect.inverse || effect.leave,
          fx_type         = effect.animation;

      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        Assist.addTimer(options, element, done);
        inEffect.ease = options.ease.easeOut;
        TweenMax.set(element, outEffect);
        TweenMax.to(element, options.duration, inEffect);
        return function (canceled){
          var timer = element.data(timeoutKey);
          if(canceled){
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.leave = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'leave';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        Assist.addTimer(options, element, done);
        outEffectLeave.ease = options.ease.easeIn;
        TweenMax.set(element, inEffect);
        TweenMax.to(element, options.duration, outEffectLeave);
        return function (canceled){
          var timer = element.data(timeoutKey);
          if(canceled){
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.to(element, options.duration, outEffectLeave);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };

      this.removeClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'removeClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          TweenMax.set(element, outEffect);
          TweenMax.to(element, options.duration, inEffect);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };
    };
  }])

  .factory('BounceAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var start       = effect.first,
          mid         = effect.mid,
          third       = effect.third,
          end         = effect.end,
          fx_type     = effect.animation,
          startTime   = 0.1;


      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'enter';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        options.stagger = true;
        Assist.addTimer(options, element, done);
        var enter = new TimelineMax();
        enter.to(element, 0.01, start);
        enter.to(element, options.duration, mid);
        enter.to(element, options.duration, third);
        enter.to(element, options.duration, end);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.leave = function(element, done){
        var options = Assist.parseClassList(element);
        options.motion = 'leave';
        options.animation = fx_type;
        options.timeoutKey = timeoutKey;
        options.stagger = true;
        Assist.addTimer(options, element, done);
        var leave = new TimelineMax();
        leave.to(element, startTime, end);
        leave.to(element, options.duration, third);
        leave.to(element, options.duration, mid);
        leave.to(element, options.duration, start);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          var bac = new TimelineMax();
          bac.to(element, startTime, end);
          bac.to(element, options.duration, third);
          bac.to(element, options.duration, mid);
          bac.to(element, options.duration, start);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };

      this.removeClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'removeClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          var rc = new TimelineMax();
          rc.to(element, startTime, start);
          rc.to(element, options.duration, mid);
          rc.to(element, options.duration, third);
          rc.to(element, options.duration, end);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };
    };
  }])

  .factory('RotateAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var start       = effect.start,
          end         = effect.end,
          leaveEnd    = effect.inverse,
          fx_type     = effect.animation;

      this.enter = function(element, done){
        var options = Assist.parseClassList(element);
            options.motion = 'enter';
            options.animation = fx_type;
            options.timeoutKey = timeoutKey;

        end.ease = options.ease.easeOut;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, start);
        TweenMax.to(element, options.duration, end);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.leave = function(element, done){
        var options = Assist.parseClassList(element);
            options.motion = 'leave';
            options.animation = fx_type;
            options.timeoutKey = timeoutKey;

        leaveEnd.ease = options.ease.easeIn;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, end);
        TweenMax.to(element, options.duration, leaveEnd);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, end);
          TweenMax.to(element, options.duration, start);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };

       this.removeClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, start);
          TweenMax.to(element, options.duration, end);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };
    };
  }])

  .factory('ZoomAnimation', ['$timeout', '$window', 'Assist', function ($timeout, $window, Assist){
    return function (effect){
      var start       = effect.start,
          end         = effect.end,
          fx_type     = effect.animation;

      this.enter = function(element, done){
        var options             = Assist.parseClassList(element);
            options.motion      = 'enter';
            options.animation   = fx_type;
            options.timeoutKey  = timeoutKey;
        end.ease = options.ease.easeOut;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, start);
        TweenMax.to(element, options.duration, end);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.leave = function(element, done){
        var options             = Assist.parseClassList(element);
            options.motion      = 'lave';
            options.animation   = fx_type;
            options.timeoutKey  = timeoutKey;

        start.ease = options.ease.easeIn;
        Assist.addTimer(options, element, done);
        TweenMax.set(element, end);
        TweenMax.to(element, options.duration, start);
        return function (canceled){
          if(canceled){
            var timer = element.data(timeoutKey);
            if(timer){
              Assist.removeTimer(element, timeoutKey, timer);
            }
          }
        };
      };

      this.move = this.enter;

      this.removeClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, start);
          TweenMax.to(element, options.duration, end);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };

      this.addClass = function(element, className, done){
        if(className === 'ng-hide'){
          var options = Assist.parseClassList(element);
          options.motion = 'addClass';
          options.animation = fx_type;
          options.timeoutKey = timeoutKey;
          Assist.addTimer(options, element, done);
          TweenMax.set(element, end);
          TweenMax.to(element, options.duration, start);
          return function (canceled){
            if(canceled){
              var timer = element.data(timeoutKey);
              if(timer){
                Assist.removeTimer(element, timeoutKey, timer);
              }
            }
          };
        } else {
          done();
        }
      };
    };
  }]);
}(angular, TweenMax, TimelineMax));



/*
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Using Angular's '.animate', all fade animations are created with javaScript.

    @BounceAnimation
      Constructor function that returns a new animation object that has all
      required methods for ngAnimate ex: this.enter(), this.leave(), etc

    @effect
      The actual animation that will be applied to the element, staggered
       first: the style to applied to the element 1/4 through the animtion
       mid: style to be applied to to the element 2/4 through the animation
       third: style to be applied to the element 3/4 through the animation
       end: style to be applied to the element when it's complete
       animation: the name of the animtion for the eventing system
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/

(function(angular){
  "use strict";

  angular.module('fx.animations.bounces', ['fx.animations.create'])

  .animation('.fx-bounce-normal', ['BounceAnimation', function (BounceAnimation){
    var effect = {
      first: {opacity: 0, transform: 'scale(.3)'},
      mid: {opacity: 1, transform: 'scale(1.05)'},
      third: {transform: 'scale(.9)'},
      end: {opacity: 1, transform: 'scale(1)'},
      animation: 'bounce-normal'
    };

    return new BounceAnimation(effect);
  }])

  .animation('.fx-bounce-down', ['BounceAnimation', function (BounceAnimation){
    var effect = {
      first: {opacity: 0, transform: 'translateY(-2000px)'},
      mid: {opacity: 1, transform: 'translateY(30px)'},
      third: {transform: 'translateY(-10px)'},
      end: {transform: 'translateY(0)'},
      animation: 'bounce-down'
    };


    return new BounceAnimation(effect);
  }])

  .animation('.fx-bounce-left', ['BounceAnimation', function (BounceAnimation){
    var effect = {
      first: {opacity: 0,  transform: 'translateX(-2000px)'},
      mid: {opacity: 1, transform: 'translateX(30px)'},
      third: {transform: 'translateX(-10px)'},
      end: {transform: 'translateX(0)'},
      animation: 'bounce-left'
    };

    return new BounceAnimation(effect);
  }])

  .animation('.fx-bounce-up', ['BounceAnimation', function (BounceAnimation) {
    var effect = {
      first: {opacity: 0,   transform: 'translateY(2000px)'},
      mid: {opacity: 1, transform: 'translateY(-30px)'},
      third: {transform: 'translateY(10px)'},
      end: {transform: 'translateY(0)'},
      animation: 'bounce-up'
    };
    return new BounceAnimation(effect);
  }])

  .animation('.fx-bounce-right', ['BounceAnimation', function (BounceAnimation) {
    var effect = {
      first: {opacity: 0,   transform: 'translateX(2000px)'},
      mid: {opacity: 1, transform: 'translateX(-30px)'},
      third: {transform: 'translateX(10px)'},
      end: {transform: 'translateX(0)'},
      animation: 'bounce-right'
    };
    return new BounceAnimation(effect);
  }]);
}(angular));

/*
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Using Angular's '.animate', all fade animations are created with javaScript.

    @FadeAnimation
      Constructor function that returns a new animation object that has all
      required methods for ngAnimate ex: this.enter(), this.leave(), etc

    @effect
      The actual animation that will be applied to the element
       enter: style to be applied when angular triggers the enter event
       leave: style to be applied when angular triggers the leave event
       inverse: style to be appiled to offset the enter event
       animation: the name of the animtion for the eventing system
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/


(function(angular){
  "use strict";

  angular.module('fx.animations.fades', ['fx.animations.create'])

  .animation('.fx-fade-normal', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1},
      leave: {opacity: 0},
      animation: 'fade-normal'
    };
    return new FadeAnimation(effect);
  }])


  .animation('.fx-fade-down', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateY(0)'},
      leave: {opacity: 0, transform: 'translateY(-20px)'},
      inverse: {opacity: 0, transform: 'translateY(20px)'},
      animation: 'fade-down'
    };
    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-down-big', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateY(0)'},
      leave: {opacity: 0, transform: 'translateY(-2000px)'},
      inverse: {opacity: 0, transform: 'translateY(2000px)'},
      animation: 'fade-down-big'
    };
    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-left', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateX(0)'},
      leave: {opacity: 0, transform: 'translateX(-20px)'},
      inverse: {opacity: 0, transform: 'translateX(20px)'},
      animation: 'fade-left'
    };
    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-left-big', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateX(0)'},
      leave: {opacity: 0, transform: 'translateX(-2000px)'},
      inverse: {opacity: 0, transform: 'translateX(2000px)'},
      animation: 'fade-left-big'
    };

    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-right', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateX(0)'},
      leave: {opacity: 0, transform:'translateX(20px)'},
      inverse: {opacity: 0, transform: 'translateX(-20px)'},
      animation: 'fade-right'
    };

    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-right-big', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateX(0)'},
      leave: {opacity: 0, transform:'translateX(2000px)'},
      inverse: {opacity: 0, transform: 'translateX(-2000px)'},
      animation: 'fade-right-big'
    };

    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-up', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateY(0)'},
      leave: {opacity: 0, transform:'translateY(20px)'},
      inverse: {opacity: 0, transform: 'translateY(-20px)'},
      animation: 'fade-up'
    };

    return new FadeAnimation(effect);
  }])

  .animation('.fx-fade-up-big', ['FadeAnimation', function (FadeAnimation){
    var effect = {
      enter: {opacity: 1, transform: 'translateY(0)'},
      leave: {opacity: 0, transform:'translateY(2000px)'},
      inverse: {opacity: 0, transform: 'translateY(-2000px)'},
      animation: 'fade-up-big'
    };

    return new FadeAnimation(effect);
  }]);
}(angular));

/*
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Using Angular's '.animate', all fade animations are created with javaScript.

    @BounceAnimation
      Constructor function that returns a new animation object that has all
      required methods for ngAnimate ex: this.enter(), this.leave(), etc

    @effect
      The actual animation that will be applied to the element, staggered
       first: the style to applied to the element 1/4 through the animtion
       mid: style to be applied to to the element 2/4 through the animation
       third: style to be applied to the element 3/4 through the animation
       end: style to be applied to the element when it's complete
       animation: the name of the animtion for the eventing system
  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

*/

(function(angular){
  "use strict";

  angular.module('fx.animations.rotations', ['fx.animations.create'])

  .animation('.fx-rotate-counterclock', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(-200deg)'},
      end: {opacity: 1, transformOrigin: 'center center', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(200deg)'},
      animation: 'rotate-counterclock'
    };
    return new RotateAnimation(effect);
  }])

  .animation('.fx-rotate-clock', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(200deg)'},
      end: {opacity: 1, transformOrigin: 'center center', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'center center', transform: 'rotate(-200deg)'},
      animation: 'rotate-clock'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-clock-left', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(-90deg)'},
      end: {opacity: 1, transformOrigin: 'left bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(90deg)'},
      animation: 'rotate-clock-left'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-counterclock-right', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(90deg)'},
      end: {opacity: 1, transformOrigin: 'right bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(-90deg)'},
      animation: 'rotate-counterclock-right'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-counterclock-up', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(90deg)'},
      end: {opacity: 1, transformOrigin: 'left bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'left bottom', transform: 'rotate(-90deg)'},
      animation: 'rotate-counterclock-up'
    };
    return new RotateAnimation(effect);
  }])
  .animation('.fx-rotate-clock-up', ['RotateAnimation', function(RotateAnimation){
    var effect = {
      start: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(-90deg)'},
      end: {opacity: 1, transformOrigin: 'right bottom', transform: 'rotate(0)'},
      inverse: {opacity: 0, transformOrigin: 'right bottom', transform: 'rotate(90deg)'},
      animation: 'rotate-clock-up'
    };
    return new RotateAnimation(effect);
  }]);

}(angular));
(function(angular){
  "use strict";

  angular.module('fx.animations.zooms', ['fx.animations.create'])

  .animation('.fx-zoom-normal', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.3)'},
      end: {opacity: 1, transform: 'scale(1)'},
      animation: 'zoom-normal'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-down', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateY(-2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateY(0)'},
      animation: 'zoom-down'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-up', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: "scale(.1) translateY(2000px)"},
      end: {opacity: 1, transform: "scale(1) translateY(0)"},
      animation: 'zoom-up'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-right', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateX(2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateX(0)'},
      animation: 'zoom-right'
    };

    return new ZoomAnimation(effect);
  }])

  .animation('.fx-zoom-left', ['ZoomAnimation', function (ZoomAnimation){
    var effect = {
      start: {opacity: 0, transform: 'scale(.1) translateX(-2000px)'},
      end: {opacity: 1, transform: 'scale(1) translateX(0)'},
      animation: 'zoom-left'
    };

    return new ZoomAnimation(effect);
  }]);
}(angular));
// Collect all the animations into one master module. this module is the main module

(function(angular){
  "use strict";
  angular.module('fx.animations',
    ['fx.animations.fades',
      'fx.animations.bounces',
      'fx.animations.rotations',
      'fx.animations.zooms']
      );
}(angular));

