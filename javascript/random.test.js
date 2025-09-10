const { getRandomExercise } = require('./random')

test('getRandomExercise returns valid exercise', () => {
    const exercise = getRandomExercise();
    expect(exercise).toBeDefined();
    expect(typeof exercise).toBe('string');
    expect(exercise.length).toBeGreaterThan(0);
});