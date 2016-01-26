function Popup(){

  var self = this;
  this.onAddCallback;

  this.spriteSheet;
  this.options = [];
  this.selectedOptionIdx;

  //TODO vs Popup.prototype.hide = function()? convention? answer: .prototype properties/methods are not visible (with console.log, etc.)
  this.hide = function(){
    self.popupElement.className = "hidden";
    self.popupElement.setAttribute('style', 'top:0;left:0;');
  }
  this.show = function(x, y){
    self.popupElement.className = "";
    self.popupElement.setAttribute('style', 'top:'+y+'px;left:'+x+'px;');
    self.steadingNameInput.focus();
  }

  this.selectObjectOptions = function(x, y, callback){
    self.onAddCallback = callback;
    self.show(x, y);
  }

  this.keyPressed = function(e){
    console.log(e);
    if(e.keyCode=='13'){
      self.addButtonClicked();
    }
  }

  this.addButtonClicked = function(e) {
    if (self.selectedOptionIdx > -1) {
      var steading = new Steading({
        name: self.steadingNameInput.value,
        img: self.options[self.selectedOptionIdx].img,
        offsetX: self.options[self.selectedOptionIdx].offsetX,
        width: self.options[self.selectedOptionIdx].width
      });

      self.steadingNameInput.value = "";
      self.hide();
      self.onAddCallback(steading);
    }
  }
  this.cancelButtonClicked = function(e) {
    self.hide();
    self.steadingNameInput.value = "";
  }
  this.optionItemClicked = function(e) {
    var allItems = document.getElementsByClassName("popup-item");
    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i] === this) {
        allItems[i].className = "popup-item selected";
        self.selectedOptionIdx = i;
      } else {
        allItems[i].className = "popup-item";
      }
    }
  }

  function init() {
    //populate array of options to present
    self.spriteSheet = new Image();
    self.spriteSheet.src = 'images/cowboyspritestrip.png';
    var spriteWidth = 64;
    var numSprites = 10;
    for (var i = 0; i < numSprites; i ++){
      self.options.push({
        img: self.spriteSheet,
        offsetX: i*spriteWidth,
        width: spriteWidth,
      });
    }

    //construct and style the popup element
    var popup = document.createElement("div");
    popup.setAttribute('id', 'popup');
    popup.setAttribute('class', 'hidden');

    var nav = document.createElement("div");
    nav.setAttribute('class', 'popup-nav');

    var navItem1 = document.createElement("input");
    navItem1.setAttribute('class', 'nav-title nav-left');
    navItem1.setAttribute('placeholder', 'Title (optional)');
    self.steadingNameInput = navItem1;

    var navItem2 = document.createElement("div");
    navItem2.onclick = self.cancelButtonClicked;
    navItem2.setAttribute('class', 'nav-item nav-right');
    navItem2.appendChild(document.createTextNode("x"));

    var navItem3 = document.createElement("div");
    navItem3.onclick = self.addButtonClicked;
    navItem3.setAttribute('class', 'nav-item nav-right');
    navItem3.appendChild(document.createTextNode("+"));

    var navItems = [
      navItem1,
      navItem2,
      navItem3,
    ];

    for (i in navItems){
      nav.appendChild(navItems[i]);
    }
    popup.appendChild(nav);

    var body = document.createElement("div");
    body.setAttribute('class', 'popup-window');

    var list = document.createElement("ul");
    list.setAttribute('class', 'popup-options');

    var optionsDivs = [];

    var img,imgDiv,optionItem;
    for (var i = 0; i < self.options.length; i ++){

      img = document.createElement('img');
      img.src = self.options[i].img.src;
      img.className = "popup-icon-image";
      img.style.left = "-"+self.options[i].offsetX+"px";
      img.style.top = self.options[i].offsetY+"px";

      imgDiv = document.createElement("div");
      imgDiv.className = "popup-icon-frame";
      imgDiv.style.height = "64px";
      imgDiv.style.width = "64px";
      imgDiv.appendChild(img);

      optionItem = document.createElement("li");
      optionItem.appendChild(imgDiv);
      optionItem.className = "popup-item";
      optionItem.onclick = self.optionItemClicked;
      optionsDivs.push(optionItem);
    }

    for (i in optionsDivs) {
      list.appendChild(optionsDivs[i]);
    }
    body.appendChild(list);
    popup.appendChild(body);

    //support for submitting with the enter key
    popup.onkeydown = self.keyPressed;

    self.popupElement = popup;

    if (!document.getElementById("popup")) {
      document.getElementById("canvas-container").appendChild(self.popupElement);
    }
  }
  init();
}
