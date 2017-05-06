window.onload = function() {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update:update });
  var card;
  var dropZone;
  var dragPosition;
  var text;
  var style;
	var json;
  var currentItem = 0;

	function preload () {
		game.load.image('zone', 'platform.png');
		game.load.image('eye', 'phaser.png');
		game.load.image('card-bg', 'card-bg.png');

		json = loadJSON();
		console.log(json.items);
	}

	function create() {
		dropZone = game.add.sprite(500, 0, 'zone');
		dropZone.width = 300;
		dropZone.height = 600;
		style = { font: "12px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: game.cache.getImage("card-bg").width, align: "center", backgroundColor: "#ffff00" };

		nextCard();
	}


	function onOver(sprite, pointer) {
		sprite.tint = 0xff7777;
	}

	function onOut(sprite, pointer) {
		sprite.tint = 0xffffff;
	}

	function onDragStart(sprite, pointer) {
		dragPosition.set(sprite.x, sprite.y);
	}

	function onDragStop(sprite, pointer) {

		//if (!sprite.overlap(dropZone))
		//{
		//    game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
		//}
		// game.add.tween(sprite.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);
		// game.add.tween(text.scale).to( { x: 0, y: 0 }, 1000, Phaser.Easing.Linear.None, true);

		game.add.tween(sprite).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
		game.add.tween(text).to( { alpha: 0}, 500, Phaser.Easing.Linear.None, true);

		nextCard();
	}

	function update () {
		text.x = Math.floor(card.x + card.width / 2);
		text.y = Math.floor(card.y + card.height / 2);
	}

	function nextCard(){
		card = game.add.sprite(100, 100, 'card-bg');
		// card.scale.setTo(0.4, 0.4);

		card.inputEnabled = true;
		card.input.enableDrag();

		card.events.onInputOver.add(onOver, this);
		card.events.onInputOut.add(onOut, this);
		card.events.onDragStart.add(onDragStart, this);
		card.events.onDragStop.add(onDragStop, this);

		dragPosition = new Phaser.Point(card.x, card.y);
		text = game.add.text(0, 0, json.items[currentItem].title, style);
		currentItem++;
		text.anchor.set(0.5);
	}

	function loadJSON() {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open('GET', 'feeds.json', false);
		xobj.send();
		if (xobj.status==200)
		{
			return JSON.parse(xobj.responseText);
		}
		else {
			return null;
		}
	}
};
