var dog,sadDog,happyDog, database;
var foods,foodStock;
var addFood;
var foodObj;
var FeedTheDog
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedTheDog=createButton("Feed The Dog");
  FeedTheDog.position(500,100);
  FeedTheDog.mousePressed(feedDog);

}
function draw() {
  background(46,139,87);
  foodObj.display();

  
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
fill(255,255,254)
 textSize(15)
 if(lastFed>=12){
text("Last Feed :"+ lastFed%12 +"PM",350,30);
 }else if(lastFed==0){
   text("Last Feed : 12AM",350,30);
 }else{
   text("Last Feed : "+ lastFed + "AM",350,30);
 }

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foods=data.val();
  foodObj.updateFoodStock(foods);
}


function feedDog(){
  dog.addImage(happyDog);

 var foodStockval=foodObj.getFoodStock();
 if(foodStockval<=0){
   foodObj.updateFoodStock(foodStockval*0)
 }
 else{
  foodObj.updateFoodStock(foodStockval*-1)
 }
 database.ref("/").update({
   Food:foodObj.getFoodStock(),
   FeedTime:hour()
 })
  

}
//function to add food in stock
function addFoods(){
  foods++;
  database.ref("/").update({
    Food:foods
  })
}

