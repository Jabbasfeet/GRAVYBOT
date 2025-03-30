///////////////////////////////////////////////////GRAVY BOT///////////////////////////////////////////////////
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;
const Discord = require('discord.js');
const client = new Discord.Client();
const Wait = require('util').promisify(setTimeout);//Allows the bot to wait (I don't remember what this means or why I want it)
const { prefix, token } = require('./config.json');
var mcBool = false;
var rustBool = false;
var http = require('http');

//Public IP getter, log posts it too so I can see it in the CMD, if this doesnt work I'll know right away
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

    message.channel.send('!ip: Sends public ip for server use.\n!owo <message here>: Sends an owoized message.\n!creeper: Sends a FuNnY mEsSaGe <:catblushy:987464891323543582>\nMore features to come, maybe....hopefully');
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

  //Gorbo Time everyone, You can't have Henry Cavill if you don't help out and take some Gorbo too.
  if(message.content.includes('gorbo')){
	  message.channel.send('Gorbo just want to fuck')
	  message.channel.send({ files: [{attachment: 'image/gorbo.jpg'}] })
		.then(message.delete());
  }

////////DO COMMANDS AFTER THIS LINE FOR NEATNESS AND I ACTUALLY THINK IT MIGHT MATTER HAHA/////////////////
  if(!message.content.startsWith(prefix) || message.author.bot){
    return;
  }

  //If I remember correctly this was a bastard to set up and uses regexs to find the vowels and stuff to change them into uwu text.
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

  //Haha funnie
  if(command === 'creeper'){
    message.channel.send('Awwwww Maaaan.');
    return;
  }

  if (command === 'testing'){
	  message.channel.send('The rust bool is ' +rustBool);
	  message.channel.send('This command is working');
	  return;
  }

  //really wanted this to work, wanted it to @ the person who was eepy, can also kick them from chat using this. Could be exploited.
  /*if (command === 'eepy'){
	  //const user = message.mentions.users.first();
	  message.channel.send('Oh look ${message.author} is so eeeepy...');
	  return;
  }*/

  //Lines here are being re-used for rust server, Can be used for any type of server. Just requires a new batch to be made.
  if(command === 'startrust' && (message.member.roles.cache.find(r=>r.name==="ruster"))){
	  if(!rustBool){
	  const {exec} = require ('child_process');
	  console.log('Server was started by ' + message.author.username);
	  exec('start startRust.bat')
	  rustBool = true;
	  client.user.setActivity('Rust Server online?: ' +rustBool);
	  message.channel.send('Starting the rust server now. Get ready to Lust in Rust buddy.')
		.then(message.delete());
	  return;
	  }

	  else if(rustBool){
	  message.channel.send('Server is already running retard.');
	  message.channel.send('Or its broken. oopie?');
	  return;
	  }

	  console.log('Im not seeing the crap bool for some reason');
	  return;
  }
  else if (command === 'startrust' && (message.member.roles.cache.find(r=>r.name!=="ruster"))){ //Using a Strict inequality operand so it checks that the user is NOT a creeper specifically
      message.channel.send('You\'re not a in on the rust crew! You need to have the role before you can start the Server')
        .then(message.delete());
      return;
  }

  if (command === 'stoprust' && (message.member.roles.cache.find(r=>r.name==="ruster"))){
	  if (rustBool){
		  const {exec} = require ('child_process');
		  exec('start killRust.bat')
		  rustBool = false;
      message.channel.send('Rust server and by proxy; fun, has now stopped.')
		  client.user.setActivity('Rust Server online? : ' +rustBool);
		  return;
	  }

	  else if (!rustBool){
		  message.channel.send('The rust server is not running, I cannot stop what isnt started')
			   .then(message.delete());
		  return;
	  }

	  return;
  }

	else if (command === 'stoprust' && (message.member.roles.cache.find(r=>r.name!=="ruster"))){ //Using a Strict inequality operand so it checks that the user is NOT a creeper specifically
		message.channel.send('Sorry buddy you are not a rustard you cannot stop the server.')
		 .then(message.delete());
		return;
	}

  //Starting and stopping Conan Server below. Must create new flag as per rust above so we can't start or stop multiple times consecutively
	if(command === 'startconan' && (message.member.roles.cache.find(r=>r.name==="iphaver"))){
	  const {exec} = require ('child_process');
	  console.log('Conan Exiles server was started by ' + message.author.username);
	  exec('start startconon.bat')
	  message.channel.send('Starting Conan server now, Give me some time to hang dong before connection')
		.then(message.delete());
	  return;
    }

    if (command === 'stopconan' && (message.member.roles.cache.find(r=>r.name==="iphaver"))){
		  const {exec} = require ('child_process');
		  exec('start killConan.bat')
		  message.channel.send('Conon iz ded')
		  return;
	}

// Prototype username maker for server if you run out of ideas you can run it for sime sillies. Want to have adjective wordlist + noun wordlist in the end not just full random. Works as is. Nice exercise. (Test command made Junkie Gorbo)
  if (command === 'newname'){
	  message.delete()
	  const wordGenerator = () => {
		  const wordBank = [
			'Fuck ',
			'Nugget ',
			'Soggy ',
			'Gorbo ',
			'Neanderthal ',
			'Baby ',
			'Thalidomide ',
			'Deformed ',
			'Junkie ',
			'Sopping ',
			'Egg ',
			'Man '
		  ]

		  let result = ''
		  for (let i = 0; i <= 1; i++){
			  result = result.concat(wordBank[Math.floor(Math.random() * wordBank.length)])
		  }
		  return result
	  }
	  console.log('------NEWNAME------ called by ' + message.author.username + ' on the server ' + message.guild.name + ' in channel ' + message.channel.name + ' on ' + message.createdAt);
	  console.log(wordGenerator())
	  return;
  }

  if(command === 'ip' && (message.member.roles.cache.find(r=>r.name==="iphaver"))){

    http.get({'host': 'api.ipify.org', 'port': 80, 'path': '/'}, function(resp) {
      resp.on('data', function(ip) {
        pubIP = ip;
      });
    });

    message.author.send('The server IP is ' + pubIP.toString())
      .then(console.log('!ip was called by ' + message.author.username + ' on the server ' + message.guild.name + ' in channel ' + message.channel.name + ' on ' + message.createdAt + '.\nThe current IP is ' + pubIP))
          .then(message.delete());

    // This is some sort of error handling but I would hope I wouldnt require this for the member roles. Will try implement this again so the bot doesnt instantly die on error
    /*process.on('unhandledRejection', error => {

      console.error('Unhandled promise rejection:', error);

      if ('MaxListenersExceededWarning' == err.name){
        process.exit(1);
      };
    });*/

    return;
  }

  else if (command === 'ip' && (message.member.roles.cache.find(r=>r.name!=="ruster"))){ //Using a Strict inequality operand so it checks that the user is NOT "iphaver" specifically
    message.channel.send('You\'re not allowed! You\'re not even my friend.')
      .then(message.delete());
    return;
  }

  //If none of the commands match any of the statement's above.
  else{
    message.channel.send('I seem to not have understood your command please use !help')
      .then(message.delete());
    return;
  }
});

client.login(token);
