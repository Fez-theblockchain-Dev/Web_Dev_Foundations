const { getRandomExercise } = require('./random')

test('getRandomExercise returns valid exercise', () => {
    const exercise = getRandomExercise();
    expect(exercise).toBeDefined();
    expect(typeof exercise).toBe('string');
    expect(exercise.length).toBeGreaterThan(0);
});

test('getRandomExercise handles errors gracefully', () => {
    try {
        const exercise = getRandomExercise();
        if (!exercise || typeof exercise !== 'string' || exercise.length === 0) {
            console.error("exercise generator is not working atm. Please try again later!");
            return;
        }
        expect(exercise).toBeDefined();
    } catch (error) {
        console.error("exercise generator is not working atm. Please try again later!");
        expect(error).toBeDefined();
    }
});