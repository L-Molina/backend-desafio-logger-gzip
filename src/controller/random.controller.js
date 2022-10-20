const getRandoms = (x) => {
  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
	let valueAppearances = [];

  for (let index = 1; index <= 1000; index++) {
    valueAppearances.push({ valor: index, apariciones: 0 });
  }

  for (let i = 0; i <= x; i++) {
    let randomIndex = random(1, 1000);
    valueAppearances[randomIndex - 1].apariciones++;
  }    
	
  return valueAppearances;
}

process.on("message", (msg) => {
  if (msg[0] == "start") {
    const randoms = getRandoms(msg[1]);
    process.send(randoms);
  }
});