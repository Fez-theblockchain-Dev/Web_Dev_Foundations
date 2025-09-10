/* this file will be dedicated to building a spinning 'roulette wheel' 
that will randomly select a workout for the user to do when they feel lost in the gym */


// created array that will store the string values containing dif workouts a person can do
const excercises = {
    0: "Barbell Squats 3 x 8 reps, 60% max weight", 
    1: "Incline dumbell bench press, 3 x 8 reps, 60% max weight",
    2: "Chest supported lat row (elbows 45 degrees from body), 3 x 8 reps, 60% max weight",
    3: "Ab circuit (crunches, scissor kicks, and windshield wipers) 3 x 20 seconds each excercise",
    4: "Barbell Front Squats 3 x 10 reps, 50% max weight",
    5: "Deadlifts 4 x 6-8 reps 70% max weight",
    6: "cable flys 3 x 8 reps, 75% max weight",
    7: "hamstring curl machine 3 x 10 reps, 50% max weight",
    8: "T-bar rows, 4 x 8 reps, 75% max weight",
    9: "Pull-ups 3 x AMRAP ('as many as possible')",
    10: "Walking lunges 3 x 20 reps, 20lb kettle bells each hand",
    11: "hip thrust machine 3 x 12 reps (Contract each rep at top)",
    
}

// math.rand operator that I will be implementing for random index selection in the array

function getRandomExercise() {
    const keys = Object.keys(excercises);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return excercises[randomKey];
}

console.log(getRandomExercise());

// create function that allows the .wheel element to spin when button onClick() event occurs
document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.querySelector('.wheel');
    if (!wheel) return;

    const labels = wheel.querySelectorAll('.wheel-label');
    const count = labels.length || 12;

    wheel.style.setProperty('--count', count);
    labels.forEach((el, idx) => el.style.setProperty('--i', idx));

    // Spin behavior
    let currentRotation = 0;
    const button = wheel.querySelector('.wheel-button');
    if (button) {
        button.addEventListener('click', () => {
            const sliceAngle = 360 / count;
            const spins = 5; // full rotations before landing
            const randomSlice = Math.floor(Math.random() * count);
            const rotation = spins * 360 + randomSlice * sliceAngle;

            currentRotation += rotation;
            wheel.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0, 1)';
            wheel.style.transform = `rotate(${currentRotation}deg)`;
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
     let wheelButton = document.querySelector(".wheel-button");
     let userMsg = document.querySelector(excercises)

});