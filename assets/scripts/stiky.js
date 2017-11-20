
var sinaz = function(option) {
  this.rExtend = function(to, from) {
    for (var n in from) {
      if (typeof to[n] != 'object') {
        to[n] = from[n];
      } else if (typeof to[n] == 'object') {
        to[n] = rExtend(to[n], from[n]);
      }
    }

    return to;
  }

  this.defConfig = {
    header: 'data-he',
    content: 'data-co',
    activeClass: 'sticky-header--active',
    tspace: true
  };

  this.option = this.rExtend(this.defConfig, option);

  this.headers = [];
  this.contents = [];

  this.seaHeaders = function() {
    var headers = document.querySelectorAll('*['+ this.option.header +']');
    var arr = [], arr2 = [];

    if (headers.length == 0)
      return { sea: false, h: 0, c: 0 };

    for (var i = 0; i < headers.length; i++) {
      var attr = headers[i].getAttribute(this.option.header);
      var content = document.querySelector('*[' + this.option.content + '="' + attr + '"]');

      arr.push(headers[i]);

      if (content)
        arr2.push(content);
    }

    this.headers = arr;
    this.contents = arr2;

    var hL = this.headers.length, cL = this.contents.length;

    if (hL != cL)
      return { sea: false, h: hL, c: cL };

    return { sea: true, h: hL, c: cL };
  }

  this.getHeaders = function() {
    return this.headers;
  }

  this.getContents = function() {
    return this.contents;
  }

  this.headersMove = function(top, type) {
    var tSpace = this.option.tspace;
    var activeClass = this.option.activeClass;
    var headers = this.getHeaders();
    var contents = this.getContents();

    var removeSticky = function (n, type) {
      if (headers[n].classList.contains(activeClass)) {
        if (tSpace)
          contents[n].style['padding-top'] = '';
 
        headers[n].classList.remove(activeClass);
      }
    };

    var addSticky = function (n, h) { 
      var spaceP = 0;

      if (tSpace)
        spaceP = (contents[n].style['padding-top'] + h);

      headers[n].style['position'] = '';
      headers[n].style['top'] = '';

      contents[n].style['padding-top'] = spaceP + 'px';
      headers[n].classList.add(activeClass);
    };

    for (var i = 0; i < headers.length; i++) {
      var headerHTop = (tSpace) ? headers[i].offsetHeight : top * headers[i].offsetHeight;
      var headerHBottom = (tSpace) ? headers[i].offsetHeight : headers[i].offsetHeight / 0.9;
      var headerH = (type == 'top') ? headerHTop : headerHBottom;
      var contentH = contents[i].offsetHeight;
      var contentTop = contents[i].offsetTop;

      var topOrBottomScroll = (type == 'top') ? (contentTop + (headerH / 2)) : (contentTop - headerH);
      var isActiveCalss = headers[i].classList.contains(activeClass);
      var isEmptySpace = (top + headerH) < contentTop || (top + headerH) > (contentTop + contentH);

      if (topOrBottomScroll < top) {
        if (!isEmptySpace && !isActiveCalss) {
          addSticky(i, headerH);
        }

        if (isEmptySpace)
          removeSticky(i);

        if (i != 0) {
          var im = (i - 1);
          removeSticky(im);
        }

      } else if (topOrBottomScroll > top) {
        removeSticky(i);
      }
    }
  }

  this.headersMoveTop = function(top) {
    this.headersMove(top, 'top');
  }

  this.headersMoveBottom = function(top) {
    this.headersMove(top, 'bottom');
  }

  this.scrollRun = function(type) {
    var self = this;
    var lastScroll = 0;

    var eScroll = function(ev) {
      var scrolled = window.pageYOffset || document.documentElement.scrollTop;

      if (scrolled > lastScroll)
        self.headersMoveBottom(scrolled);
      else
        self.headersMoveTop(scrolled);

      lastScroll = scrolled;
    };

    if (type == 'start')
      document.addEventListener('scroll', eScroll, false);
    else
      document.removeEventListener('scroll', eScroll, false);
  }

  this.rasizeEv = function() {
    var self = this;

    window.addEventListener('resize', function() {
      self.scrollRun('stop');
      self.scrollRun('start');
    });
  };

  this.run = function() {
    var isSeaHeader = this.seaHeaders();

    if (isSeaHeader.sea == true) {
      this.scrollRun('start');
      this.rasizeEv();
    } else {
      console.warn('Sinaz (sticky headers):', 'Not found sticky headers or contents');
      console.warn('Sinaz (sticky headers):', 'Headers: ' + isSeaHeader.h);
      console.warn('Sinaz (sticky headers):', 'Contents: ' + isSeaHeader.c);
    }
  };

  this.run();
};
