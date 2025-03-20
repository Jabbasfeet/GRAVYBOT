require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
const Discord = require('discord.js');
const client = new Discord.Client();
const Wait = require('util').promisify(setTimeout);//Allows the bot to wait
const { prefix, token } = require('./config.json');
var mcBool = false;
var http = require('http');

http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
  resp.on('data', function(ip) {
    pubIP = ip;
  });
});

client.once('ready', () => {
	client.user.setActivity('Munter Hunter?');

	console.log('Ready! - ' + pubIP);
});

client.on('message', message => {
  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();
  //console.log('The Message is:' + message.content); //This was checking if the messages were coming through. If for whatever reason the bot isnt responding we can uncomment this.

  if(command === 'help'){

    message.channel.send('!ip: Sends public ip for server use.\n!owo <message here>: Sends an owoized message.\n!creeper: Sends a FuNnY mEsSaGe <:catblushy:987464891323543582>\n!startmc: will start up our minecraft server\n!stopmc: will shut down the server (Use when everyone is done)');
    return;
  }

  if(message.content.includes('3080') || message.content.includes('ray tracing') || message.content.includes('raytracing') || message.content.includes('nvidia') || message.content.includes('4k')){

    message.channel.send('<:noosethink:1250437902744424569>' + 'Le Based Ray Tracing!' + '<:noosethink:1250437902744424569>') 
      .then(message.react('1250437902744424569'));
    return;
  }

  if(message.content.includes('gamer girl') || message.content.includes('gamergirl')){

    message.channel.send('A girl.... AND a gamer? Whoa mama! Hummina hummina hummina bazooooooooing! eyes pop out AROOOOOOOOGA! jaw drops tongue rolls out WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF WOOF tongue bursts out of the mouth uncontrollably leaking face and everything in reach WURBLWUBRLBWURblrwurblwurlbrwubrlwburlwbruwrlblwublr tiny cupid shoots an arrow through heart Ahhhhhhhhhhh me lady... heart in the shape of a heart starts beating so hard you can see it through shirt ba-bum ba-bum ba-bum ba-bum ba-bum milk truck crashes into a bakery store in the background spiling white liquid and dough on the streets BABY WANTS TO FUCK inhales from the gas tank honka honka honka honka masturabtes furiously ohhhh my gooooodd~')
    return;
  }
  
  if(message.content.includes('gorbo')){
	  message.channel.send('Gorbo just want to fuck')
	  message.channel.send({ files: [{attachment: 'image/gorbo.jpg'}] })
		.then(message.delete());
  }

////////DO COMMANDS AFTER THIS LINE FOR NEATNESS AND I ACTUALLY THINK IT MIGHT MATTER HAHA/////////////////
  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }

  if(command === 'owo'){

    const regExsl = /l/g;
    const regExsr = /r/g;
    const regExL = /L/g;
    const regExR = /R/g;
    var repeatMsg;

    message.delete()
      .then(repeatMsg = message.content)
        .then(message.channel.send(repeatMsg.replace(/^!owo/gi, "").replace(regExsl, 'w').replace(regExsr, 'w').replace(regExL, 'W').replace(regExR, 'W') + " OwO"));

    return;
    }

  if(command === 'creeper'){

    message.channel.send('Awwwww Maaaan.');
    return;
  }

  if (command === 'testing'){
	  message.channel.send('The minecraft bool is ' +mcBool);
	  message.channel.send('This command is working');
	  return;
  }
  
  /*if (command === 'eepy'){
	  //const user = message.mentions.users.first();
	  message.channel.send('Oh look ${message.author} is so eeeepy...');
	  return;
  }*/
  
//Lines here kept for re-using code for setting up other servers. No longer need Minecraft server for spice discord.
  /*if(command === 'startmc' && (message.member.roles.cache.find(r=>r.name==="Creeper"))){
	  if(!mcBool){
	  const {exec} = require ('child_process');
	  console.log('Server was started by ' + message.author.username);
	  message.channel.send('OwO Starting your Minecrap servor Mastur...');
	  exec('start MCserver.bat')
	  mcBool = true;
	  client.user.setActivity('MCserver?: ' +mcBool);
	  return;
	  }

	  else if(mcBool){
	  message.channel.send('Server is already running retard.');
	  message.channel.send('Or its broken.');
	  return;
	  }

	  console.log('Im not seeing the crap bool for some reason');
	  return;
  }
  else if (command === 'startmc' && (message.member.roles.cache.find(r=>r.name!=="Creeper"))){ //Using a Strict inequality operand so it checks that the user is NOT a creeper specifically
      message.channel.send('You\'re not a Creeper! You need to have the role before you can start the Server')
        .then(message.delete());
      return;
  }

  if (command === 'stopmc' && (message.member.roles.cache.find(r=>r.name==="Creeper"))){
	  if (mcBool){
		  const {exec} = require ('child_process');
		  exec('start killJava.bat')
		  mcBool = false;
      message.channel.send('Minecraft and by proxy; fun, has now stopped.')
		  client.user.setActivity('MCserver?: ' +mcBool);
		  return;
	  }

	  else if (!mcBool){
		  message.channel.send('The Minecraft server is not started')
			   .then(message.delete());
		  return;
	  }

	  return;
  }
  else if (command === 'stopmc' && (message.member.roles.cache.find(r=>r.name!=="Creeper"))){ //Using a Strict inequality operand so it checks that the user is NOT a creeper specifically
      message.channel.send('You\'re not a Creeper! Nice Try stopping our fun.')
        .then(message.delete());
      return;
  }
*/

  if(command === 'ip' && (message.member.roles.cache.find(r=>r.name==="iphaver"))){

    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      resp.on('data', function(ip) {
        pubIP = ip;
      });
    });

    message.author.send('The server IP is ' + pubIP.toString())
      .then(console.log('!ip was called by ' + message.author.username + ' on the server ' + message.guild.name + ' in channel ' + message.channel.name + ' on ' + message.createdAt + '.\nThe current IP is ' + pubIP))
          .then(message.delete());

    /*process.on('unhandledRejection', error => {

      console.error('Unhandled promise rejection:', error);

      if ('MaxListenersExceededWarning' == err.name){
        process.exit(1);
      };
    });*/

    return;
  }

  else if (command === 'ip' && (message.member.roles.cache.find(r=>r.name!=="Creeper"))){ //Using a Strict inequality operand so it checks that the user is NOT "iphaver" specifically
    message.channel.send('You\'re not allowed! You\'re not even my friend.')
      .then(message.delete());
    return;
  }
  else{
    message.channel.send('I seem to not have understood your command please use !help')
      .then(message.delete());
    return;
  }
});

client.login(token);
