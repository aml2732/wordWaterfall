var currentStage;
var colorTable = ['6DA4CE','447295', '29506D', '153046', '07141E'];
var lines = 100;
var content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet facilisis mi, laoreet tincidunt mauris euismod id. Etiam id urna ut arcu rhoncus tincidunt at non est. Nulla bibendum nulla nec bibendum laoreet. Nam commodo eu nulla in vestibulum. Nulla viverra orci neque, at lobortis mauris mollis sed. Duis eu lectus nulla. Cras convallis fermentum tortor, sit amet fringilla dui interdum sit amet. Cras iaculis est tortor, vitae hendrerit lacus dignissim sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec sit amet erat venenatis, tincidunt tortor in, pulvinar velit. Pellentesque tristique sagittis leo, a interdum ante interdum id. Sed erat eros, viverra vel ex at, fermentum convallis sapien. Etiam id odio sit amet ipsum ornare egestas quis in diam.  Morbi justo nunc, tristique in massa eu, egestas suscipit elit. Nam at iaculis mauris. Aliquam vitae quam eget dolor ullamcorper porttitor gravida eu elit. Nunc aliquam sapien mi, sed fermentum turpis sollicitudin vel. Integer non quam ornare nibh dignissim fermentum. Donec dolor neque, tempor vitae risus vel, pretium iaculis mi. Pellentesque non facilisis augue, sed posuere nisl.  Nullam sed purus eget magna elementum bibendum. Etiam et elit sed tellus vulputate sodales. Duis et venenatis orci. In nisi enim, rhoncus vitae augue quis, placerat lacinia sem. Nulla vulputate ipsum ullamcorper egestas aliquet. Sed et nibh sit amet est faucibus mollis. Vivamus convallis diam at enim congue imperdiet. Nulla eleifend, augue vitae lacinia venenatis, sem mi sodales odio, et tincidunt massa nisl vel velit.  Pellentesque pellentesque ipsum ut euismod efficitur. Mauris accumsan nisi felis, ut gravida sem porta sed. Nulla ac blandit ex. Duis congue diam eu orci sollicitudin, et rhoncus risus convallis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut eget dapibus leo. In id justo risus. Proin arcu augue, vulputate aliquet imperdiet et, placerat ac neque. Donec venenatis euismod lectus, et scelerisque lorem scelerisque congue. Aenean scelerisque libero consequat orci hendrerit scelerisque. Mauris lobortis, sapien sit amet aliquam fringilla, dui eros molestie tellus, sed lobortis mi lacus vel enim.  Fusce in magna rutrum, rutrum dolor ut, auctor purus. In vulputate convallis ex, at mattis lectus accumsan sit amet. Mauris quis feugiat eros, sit amet feugiat velit. Fusce volutpat ligula nec felis porta, at elementum nisl accumsan. Aenean lacinia sodales ligula vel semper. Curabitur vehicula vel augue at rutrum. Pellentesque accumsan leo vitae risus tempus malesuada. In sit amet malesuada quam, id euismod dolor. Aliquam scelerisque nunc eget mauris iaculis dignissim. Morbi at lorem vestibulum, tempor elit sit amet, aliquet elit. Cras egestas mauris in lectus semper, eget fringilla libero condimentum. Fusce pretium tincidunt enim, at accumsan est pretium in.';
var contentArray;

//Main execution ---------------------------------------------------------------

let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "canvas"
}

let app = new PIXI.Application({width:1024,height:768});
var graphics = new PIXI.Graphics();
let loader = PIXI.loader;
let Sprite = PIXI.Sprite;
let resources = PIXI.loader.resources;
document.body.appendChild(app.view);

loader
  .add('silhouette_01','./img/silhouette_01.png')
  .load(setup);

function arrayifyContent(){
  contentArray = [];
  var head = 0;
  var len = 10;
  while(head+len < content.length){
    contentArray.push(content.substr(head,head+len));
    head = head+len;
    len = Math.ceil(Math.random()*10);
  }
}

function verticalizeLine(line){
  let newLine = "";
  for(let c=0; c<line.length; c++){
    newLine += line[c] + "\n";
  }
  return newLine;
}

function getLine(){
  let number = Math.random() * 100;
  let line =  contentArray[Math.ceil(number)%(contentArray.length -1)];
  return line;
}

function getColor(){
  let number = Math.random() * 10;
  return colorTable[Math.ceil(number)%(colorTable.length -1)];
}

function getRandomX(){
  return (Math.ceil(Math.random()*1000) % (app.renderer.width -1))
}

function getRandomY(){
  return (Math.ceil(Math.random()*1000) % (app.renderer.height -1))
}

function getRandomSpeed(){
  return (Math.ceil(Math.random()*5));
}

function drawWords(){
  //new PIXI.Text
  for(let i =0; i<lines; i++){
    let text = new PIXI.Text(verticalizeLine(getLine()), {"fill": "#"+(getColor()) });
    text.x = getRandomX();
    text.y = getRandomY();
    let speed = getRandomSpeed();
    currentStage.addChild(text);

    app.ticker.add(function(delta){
      let d = Math.ceil(delta);
      if((text.y+(d*speed)) < app.renderer.height){
        text.y += (d*speed);
      }else{
        text.y = 0 - text.height;
      }

    });
  }
}

function drawPerson(){
  var foreground = new Sprite(resources.silhouette_01.texture);
  foreground.x = app.renderer.width/2 - foreground.width/2;
  currentStage.addChild(foreground);
}

function setup(){
  arrayifyContent();

  currentStage =  new PIXI.Container();
  app.stage.addChild(currentStage);
  app.renderer.backgroundColor = "0x1A5276";

  drawWords();
  drawPerson();
}
