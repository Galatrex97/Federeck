const glob = require("glob");

module.exports = {
  name: "reload",
  aliases: [],
  usage: 'reload',
  category: 'Útil',
  description: 'Actualiza los cambios del bot, se necesita ser el desarrollador del bot',

run: (client, message, args) => {

if(message.author.id !== process.env.botOwner) return;

glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
    if(err) { 
        console.log(err)
        
         

    }
    filePaths.forEach((file) => {
    delete require.cache[require.resolve(file)];

    const pull = require(file);

        if(pull.name) {
            client.commands.set(pull.name, pull);
        }

        if(pull.aliases && Array.isArray(pull.aliases)) {
            pull.aliases.forEach((alias) => {
                client.aliases.set(alias, pull.name);
            })
        }


    })
})

try {
     message.react("✅")
} catch (err) {
    console.log(err)
}

 }

}