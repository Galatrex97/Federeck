export let myMention = new RegExp(`^<@!?849395994973700117>( |)$`); //Acá tenemos una expresión regular (o regex) de menciones hacia mi, esto nos sirve para responder cuando nos mencionan.

let pacmansReplies = [
    //Un array que contiene las respuestas a los pacmans.
    ":v",
    "#HailGrasa",
    "La grasa no muere, evoluciona...",
    "Viva la grasa",
    "En la grasa habian buenos momos :pensive:",
    "El shitposting es un pasatiempo, la grasa es un sentimiento.",
    "¿Quieres ser el : de mi v?",
  ];
  let randomizePacmanReplies = Math.floor(
    Math.random() * pacmansReplies.length //Hacemos las respuestas randoms para más variedad.
  );

  export let randomsPacmansReplies = pacmansReplies[randomizePacmanReplies];

  export let otp = {
        deafenOnJoin: true,
        leaveOnEmpty: true,
        leaveOnEnd: true,
        leaveOnStop: true,
        timeout: 3000,
        volume: 100,
        quality: '"high"',
  }