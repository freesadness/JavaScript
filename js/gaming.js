const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);

function display_message_with_animation(tag, animation) {
  tag.classList.add(animation);
  setTimeout(function () {
    tag.classList.remove(animation);
  }, 1000);
}

function create_tag(tag, classes, innerText = "") {
  const new_tag = document.createElement(tag);
  new_tag.innerText = innerText;
  new_tag.classList.add(classes);
  return new_tag;
}

function reset_dollar() {
  let dollar_tags = document.querySelectorAll('.dollar');
  let dollar_tag = document.querySelector('.highlighted');
  dollar_tag.classList.remove('highlighted');
  let start_dollar = document.querySelector(`.dollar:nth-child(${dollar_tags.length})`);
  start_dollar.classList.add("highlighted");
}

const message_tag = document.querySelector("#message");
const timer_tag = document.querySelector(".timer");
const money_tree_tag = document.querySelector(".money_tree");
const banked_money_tag = document.querySelector(".bank");

const name = localStorage.getItem("name");
const age = localStorage.getItem("age");
const sex = localStorage.getItem("sex");
let greeting = '';
if (sex === "male") {
  greeting = "Mr.";
} else if (sex === "female") {
  greeting = "Ms.";
}

let money_banked = 0;
let win = false;
let game_over = false;
let round_3_number_of_questions = ['❔', ' ❔', '❔ '].length;

class Question {
  constructor(question, correct_answer, option1, option2, option3) {
    this.question = question;
    this.correct_answer = correct_answer;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
  }

  display_question(bank, is_sudden_death) {
    let clicked = false;
    message_tag.innerHTML = "";
    let options = [this.correct_answer, this.option1, this.option2, this.option3];
    shuffleArray(options);
    let question_tag = create_tag('div', 'question', this.question);
    message_tag.appendChild(question_tag);
    options.forEach(function (option) {
      let option_tag = create_tag('div', 'option', option);
      message_tag.appendChild(option_tag);
    });
    display_message_with_animation(message_tag, "animation_welcome");
    let option_tags = document.querySelectorAll(".option");
    let correct_answer = this.correct_answer;
    let check = (option) => {
      option_tags.forEach(function (o) {
        if (correct_answer === o.innerText) {
          o.style.backgroundColor = "lightgreen";
        } else {
          o.style.backgroundColor = "lightcoral";
        }
      });
      console.log(option + is_sudden_death);
      if (!clicked) {
        clicked = true;
        if (correct_answer === option.innerText) {
          let choice_container = create_tag('button', 'choice_container');
          let dollar_tag = document.querySelector('.highlighted');
          if (!is_sudden_death) {
            try {
              dollar_tag.previousSibling.classList.add('highlighted');
              dollar_tag.classList.remove('highlighted');
              let bank_button = create_tag('button', 'bank_button', "BANK");
              let next_button = create_tag('button', 'next_button', "NEXT");
              message_tag.appendChild(choice_container);
              choice_container.appendChild(bank_button);
              choice_container.appendChild(next_button);
              bank_button.addEventListener("click", function () {
                let dollar_tag = document.querySelector('.highlighted');
                let gonna_bank = dollar_tag.innerText.replace('$', '').replace(/,/g, '');
                console.log("bank buttom");
                console.log(gonna_bank);
                money_banked += parseInt(gonna_bank);
                banked_money_tag.innerText = `$${money_banked}`;
                reset_dollar();
                bank.pop().display_question(bank, is_sudden_death);
              });
              next_button.addEventListener("click", function () {
                console.log("next buttom");
                console.log(dollar_tag);
                console.log(dollar_tag.previousSibling);
                bank.pop().display_question(bank, is_sudden_death);
              });
            } catch (TypeError) {
              let gonna_bank = dollar_tag.innerText.replace('$', '').replace(/,/g, '');
              money_banked += parseInt(gonna_bank);
              banked_money_tag.innerText = `$${money_banked}`;
              reset_dollar();
              bank.pop().display_question(bank, is_sudden_death);
            }
          } else {
            try {
              dollar_tag.innerText = '✔';
              dollar_tag.previousSibling.classList.add('highlighted');
              round_3_number_of_questions -= 1;
              if (round_3_number_of_questions !== 0) {
                bank.pop().display_question(bank, is_sudden_death);
              }
            } catch (TypeError) {
              game_over = true;
              win = true;
            }
          }
        } else if (!is_sudden_death) {
          reset_dollar();
          display_message_with_animation(message_tag, "animation_error");
          setTimeout(function () {
            bank.pop().display_question(bank, is_sudden_death)
          }, 1500);
        } else {
          message_tag.innerHTML = `<div>Goodbye, ${greeting} ${name}, you are The Weakest Link.</div>`;
          game_over = true;
          console.log("you are the link");
        }
      }
    };
    option_tags.forEach(function (option) {
      option.addEventListener("click", function () {
        check(option);
      }, { once: true })
    });
  }

}

function loading_questions() {
  let questions = [];
  questions.push(new Question(
    "The planet where there exists a situation like pressure cooker:",
    "Venus",
    "Jupiter",
    "Mars",
    "Mercury"));
  questions.push(new Question(
    "If the radius of the earth is reduced by half, then the day-night on the earth would be of: ",
    "6 hrs",
    "12 hrs",
    "18 hrs",
    "36 hrs"));
  questions.push(new Question(
    "Which of the following planet is the nearest to the earth?",
    "Venus",
    "Mercury",
    "Mars",
    "Jupiter"));
  questions.push(new Question(
    "The earth has the size among all the planets:",
    "Fifth",
    "Third",
    "Fourth",
    "Seventh"));
  questions.push(new Question(
    "The largest satellite of the planet Jupiter is:",
    "Gantmede",
    "Uropa",
    "Calisto",
    "None of these"));
  questions.push(new Question(
    "The largest satellite of the planet Saturn is:",
    "Titan",
    "Atlas",
    "Tethis",
    "None of these"));
  questions.push(new Question(
    "Who had invented the planet Uranus?",
    "William Herschel",
    "William John",
    "Max Dewar",
    "None of these"));
  questions.push(new Question(
    " The planet whose relevance as a planet has been ended at Prague Summit of IAU is:",
    "Pluto",
    "Uranus",
    "Mars",
    "Ceres"));
  questions.push(new Question(
    "How many HIV positive infections that are occurring everyday in the world?",
    "6,000",
    "60,000",
    "600,000",
    "1,000,000"));
  questions.push(new Question(
    "Bombyx mori, that produces fine filaments of silk inside the cocoon, is a:",
    "Moth",
    "Butterfly",
    "Dipteran (silkworm)",
    "Mulberry plant hemipteran"));
  questions.push(new Question(
    "What is the weight of human heart?",
    "300 gms",
    "100 gms",
    "800 gms",
    "1000 gms"));
  questions.push(new Question(
    "Which of the following  gland controls the blood pressure?",
    "Adrenal gland",
    "Thalamus gland",
    "Thyroid gland",
    "Pancreas gland"));
  questions.push(new Question(
    "In which organ of the human body are the lymphocyte cells formed?",
    "Long bone",
    "Liver",
    "Pancreas",
    "Spleen"));
  questions.push(new Question(
    " Which of the following process that does not involve evolution of CO2?",
    "Photosynthesis",
    "Combustion",
    "Respiration",
    "Fermentation"));
  questions.push(new Question(
    "The basis of the classification of the element in the modern periodic table is:",
    "Atomic number",
    "Atomic mass",
    "Atomic volume",
    "Atomic density "));
  questions.push(new Question(
    "Which of the following is the heaviest metal?",
    "Platinum",
    "Silver",
    "Gold",
    "Mercury"));
  questions.push(new Question(
    "Which of the following is the lightest metal?  ",
    "Lithium",
    "Magnesium",
    "Aluminium",
    "Platinum"));
  questions.push(new Question(
    "Which of the following is the lightest element?  ",
    "Hydrogen",
    "Helium",
    "Mercury",
    "Platinum "));
  questions.push(new Question(
    "Which of the following is the most fundamental property of the element?",
    "Atomic number",
    "Atomic weight",
    "Molecular weight",
    "Atomic density "));
  questions.push(new Question(
    "The process employed to remove the magnetic impurities from the Ores is called:",
    "Magnetic separation process",
    "Gravity separation process",
    "Forth floatation process",
    "Physical process "));
  questions.push(new Question(
    "The concentration process of sulphide ores is:",
    "Forth floatation process",
    "Gravity separation process",
    "Magnetic separation process",
    "Physical process "));
  questions.push(new Question(
    "The main ore of the mercury is:",
    "Cinnabar",
    "Pyrite",
    "Bauxite",
    "Pyrolusite"));
  questions.push(new Question(
    "The element radium was extracted from:",
    "Pinch blend",
    "Lime stone",
    "Retile",
    "Haematite"));
  questions.push(new Question(
    " Aluminium metal is extracted mainly from its ore:",
    "Bauxite",
    "Magnetite",
    "Dolomite",
    "Lime Pigment"));
  questions.push(new Question(
    "Which of the following is the world's deepest Ocean?",
    "Pacific Ocean",
    "Indian Ocean",
    "Atlantic Ocean",
    "Arctic Ocean"));
  questions.push(new Question(
    "What is ebb?",
    "Withdrawl of tide",
    "Ocean Current",
    "Withdrawl of monsson",
    "Climate Change"));
  questions.push(new Question(
    "Which of the following is the cold Atlantic Currents?",
    "Cayenne Current",
    "California Current",
    "Kuroshino Current",
    "Peruvian Drift"));
  questions.push(new Question(
    "The North Pole lies in the middle of which Ocean?",
    "Arctic Ocean",
    "Pacific Ocean",
    "Atlantic Ocean",
    "Indian Ocean"));
  questions.push(new Question(
    "Which of the following Ocean is 'S' shaped?",
    "Atlantic Ocean",
    "Pacific Ocean",
    "Arctic Ocean",
    "Indian Ocean"));
  questions.push(new Question(
    "Mariana Trench lies in which of the following Ocean?",
    "Pacific Ocean",
    "Atlantic Ocean",
    "Arctic Ocean",
    "Indian Ocean"));
  questions.push(new Question(
    " Which of the following are responsible for evolution of amphibians and further terrestrial animals?",
    "Tides",
    "Monsoon",
    "Climate Change",
    "Coral Reef"));
  questions.push(new Question(
    "Which of the following part of the Sun is visible by human?",
    "Photosphere",
    "Corona",
    "Chromospheres",
    "Core"));
  questions.push(new Question(
    "Which of the following part of the Sun is visible at the time of eclipse?",
    "Corona",
    "Photosphere",
    "Chromosphere",
    "Core"));
  questions.push(new Question(
    "Which is the deepest point from the sea level on the Earth?",
    "Mariana Trench",
    "North Channel",
    "Pacific Ocean",
    "Red Sea"));
  questions.push(new Question(
    "What is the time taken by the light of the Sun to reach on the Earth?",
    "8 Minute 18 Second",
    "8 Minute",
    "9 Minute",
    "7 minute 20 Second"));
  questions.push(new Question(
    "Which of the following is the largest planet of the Solar System according to size?",
    "Jupiter",
    "Satrun",
    "Neptune",
    "Uranus"));
  questions.push(new Question(
    "Which of the following planets in the Solar System takes shortest revolution?",
    "Mercury",
    "Neptune",
    "Mars",
    "Venus"));
  questions.push(new Question(
    "Find the Jovial Planets among the following.",
    "Uranus",
    "Mars",
    "Earth",
    "Venus"));
  questions.push(new Question(
    " Which planet in the Solar System has highest density?",
    "Earth",
    "Uranus",
    "Neptune",
    "Jupiter"));
  questions.push(new Question("What is the next number in the following sequence– 7, 14, 21, 28?",
    "35",
    "20",
    "17",
    "42"));
  questions.push(new Question("What makes up (approx.) 80% of our brain’s volume?",
    "Water",
    "Skin",
    "Bone",
    "Blood"));
  questions.push(new Question("How many months do we have in a year?",
    "12 months",
    "2 months",
    "120 months",
    "20 months"));
  questions.push(new Question("How many colors are there in a rainbow?",
    "7",
    "8",
    "9",
    "10"));
  questions.push(new Question(" Without fingers I point, without arms I strike, without feet I run. What am I?",
    "A clock.",
    "A rock.",
    "A wheel.",
    "A Pen."));
  questions.push(new Question(" How many days are there in a year?",
    "365 days",
    "265 days",
    "465 days",
    "165 days"));
  questions.push(new Question("What is the answer of this difficult math question?\n 2 * 3 - 3 = ?",
    "3",
    "2",
    "0",
    "1"));
  questions.push(new Question("Info.cern.ch is famous for being what?",
    "The world's very first website.",
    "The world's very first chat room.",
    "The world's very first company.",
    "The world's very first develop team."));
  questions.push(new Question(" I'm strong as a rock, but a word can destroy me. What am I?",
    "Silence",
    "Love",
    "Hate",
    "Freedom"));
  questions.push(new Question("I'm called thick when close to the ground, but people smile when I'm high. What am I?",
    "A cloud.",
    "A bird.",
    "A umbrella",
    "A airplane."));
  questions.push(new Question("The more you cut me the bigger I grow. What am I?",
    "A Hole",
    "A Paper",
    "A hope",
    "A key"));
  questions.push(new Question("What flies when it’s born, lies when it’s alive, and runs when it’s dead?",
    "A snowflake",
    "A drop of water",
    "A bullet",
    "A voice"));
  questions.push(new Question("If you throw me out of a window, you’ll leave a grieving wife. If you leave me in the middle of the door, you might just save a life. What am I?",
    "The letter “N”.",
    "The letter “E”.",
    "The letter “B”.",
    "The letter “Q”."));
  questions.push(new Question("What question can someone ask all day long, always get totally different answers, and yet all the answers could be correct?",
    "What time is it?",
    "How are you?",
    "What is the weather today?",
    "Doesn't it look cool?"));
  questions.push(new Question("Which insect is the smallest?",
    "Ant",
    "Bee",
    "Butterfly",
    "Spider"));
  questions.push(new Question("What day it is on the third day of the week if the week starts with Tuesday?",
    "Thursday",
    "Monday",
    "Holiday",
    "Summer day"));
  questions.push(new Question("Why do we stop when the traffic light turns red?",
    "Because we obey the traffic rule.",
    "Because it's fun.",
    "Because we decide to show off at the intersection.",
    "Because we want to take a rest."));
  questions.push(new Question("How many consonants are there in the English alphabet?",
    "21",
    "22",
    "20",
    "31"));
  questions.push(new Question("What is the Italian word for pie?",
    "Pizza",
    "Pipe",
    "Pip",
    "Peach"));
  questions.push(new Question("What grows quicker?",
    "Hair",
    "Toenails",
    "Finger",
    "Head"));
  questions.push(new Question("After you go through a fall I will take over. All life will stall, or at least grow slower. What am I?",
    "Winter",
    "Faith",
    "Perseverance",
    "Insubordination"));
  questions.push(new Question("Name the French novelist and poet, born in 1802, who was exiled to Jersey and who wrote about a hunchback.",
    "Victor Hugo",
    "Colette",
    "Marcel Proust",
    "George Sand"));
  questions.push(new Question("What takes place in Hong Kong's Happy Valley?",
    "Horse racing",
    "Horse flying",
    "Horse eating",
    "horse jumping"));
  questions.push(new Question("Which reptile, according to the song, should you never smile at?",
    "Crocodile",
    "Chameleon",
    "Turtle",
    "Snake"));
  questions.push(new Question("Which Saint’s Day is celebrated on 14th February?",
    "Saint Valentine",
    "Christmas",
    "New Year",
    "Saint Holiday"));
  questions.push(new Question("In which ocean did the famous Titanic sink in 1912?",
    "North Atlantic Ocean",
    "pacific Ocean",
    "Ocean Habitat",
    "Mediterranean"));
  questions.push(new Question("Which two parts of the body continue to grow for your entire life?",
    "Nose and ears",
    "Head and hand",
    "Mouth and eyes",
    "Heart and soul"));
  questions.push(new Question("What has 13 hearts but no organs?",
    "A deck of cards",
    "A demon from hell",
    "A monster",
    "An angel from heaven"));
  questions.push(new Question("I can bring a smile to your face, a tear to your eye, or even a thought to your mind. But, I can’t be seen. What am I?",
    "A Memory",
    "A gust of wind",
    "A smile",
    "A glance"));
  questions.push(new Question("I can be made and I can be played. I can be cracked and I can be told. What am I?",
    "A joke",
    "A game",
    "A story",
    "A portrait"));
  shuffleArray(questions);
  return questions;
}
const bank = loading_questions();



class Round {
  constructor(round_number, money_tree, time_out, sudden_death, message) {
    this.round_number = round_number;
    this.money_tree = money_tree;
    this.sudden_death = sudden_death;
    this.time_out = time_out;
    this.message = message;
  }

  welcome_the_player() {
    message_tag.innerText = this.message;
    display_message_with_animation(message_tag, "animation_welcome");
  }

  loading_question() {
    let box_div = create_tag('div', "loading_box", `LOADING ROUND ${this.round_number} QUESTIONS`);
    message_tag.appendChild(box_div);
  }

  render_money_tree() {
    money_tree_tag.innerHTML = "";
    let len = this.money_tree.length;
    this.money_tree.reverse().forEach(function (money, i) {
      let dollar_tag = create_tag("div", "dollar", money);
      dollar_tag.style.width = `${80 + i * 4}%`;
      dollar_tag.style.height = `100%`;
      setTimeout(function () {
        dollar_tag.classList.add("class", "animation_drop");
        money_tree_tag.prepend(dollar_tag);
        if (i === len - 1) {
          let start_dollar = document.querySelector(`.dollar:nth-child(${i + 1})`);
          start_dollar.classList.add("highlighted");
        }
      }, 100 * i);
    });
  }
}

const round_1 = new Round(1, ["$500,000", "$250,000", "$125,000", "$75,000", "$50,000", "$10,000", "$5000", "$1000", "$0"], 120, false, `Welcome to The Weakest Link, ${greeting} ${name}, let's go right to Round 1`);
const round_2 = new Round(2, ["$500,000", "$125,000", "$75,000", "$10,000", "$1000", "$0"], 90, false, "Round 2, don't be afraid!");
const round_3 = new Round(3, ['❔', ' ❔', '❔ '], 60, true, "round 3, FACE THE STORM!");
const rounds = [round_1, round_2, round_3];

function set_up_timer(round) {
  let timer = round.time_out;
  let countdown = setInterval(function () {
    timer -= 1;
    timer_tag.innerText = timer;
    if (win) {
      message_tag.innerHTML = `<div> Good job, ${greeting} ${name}, you are The Strongest Link, be happy go home with $${money_banked}.</div>`;
      game_over = true;
      console.log("well play");
      clearInterval(countdown);
    }
    else if (timer === 0) {
      clearInterval(countdown);
      if (!round.sudden_death) {
        gaming(rounds[rounds.indexOf(round) + 1]);
      } else
        message_tag.innerHTML = `<div>Sorry, ${greeting} ${name},you couldn't answer all the questions, you are The Weakest Link. Goodbye</div>`;
    } else if (game_over) {
      clearInterval(countdown);
    }
  }, 1000);
}

async function gaming(round) {
  round.welcome_the_player();
  round.loading_question();
  await myTimer(1000, round.render_money_tree.bind(round))
  await myTimer(2000, function () {
    bank.pop().display_question(bank, round.sudden_death);
    set_up_timer(round);
  }.bind(round))
}
gaming(rounds[0]);

function myTimer(time, callback) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback()
      resolve()
    }, time);
  })
}