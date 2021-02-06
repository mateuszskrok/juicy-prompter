import {Transpose} from '../components/Transpose';

describe('Transpose', () => {
    it.each([
        [["C"],true,0,["C"]],
        [["D"],true,0,["D"]],
        [["Es"],true,0,["Dis"]],
        [["C","D","F"],true,0,["C","D","F"]],
        [["c","d","f"],true,0,["c","d","f"]],
        [["h","dis","f"],true,0,["h","dis","f"]],
        [["C"],true,12,["C"]],
        [["D"],true,12,["D"]],
        [["Es"],true,12,["Dis"]],
        [["C","D","F"],true,12,["C","D","F"]],
        [["c","d","f"],true,12,["c","d","f"]],
        [["h","dis","f"],true,12,["h","dis","f"]],
        [["C"],true,-12,["C"]],
        [["D"],true,-12,["D"]],
        [["Es"],true,-12,["Dis"]],
        [["C","D","F"],true,-12,["C","D","F"]],
        [["c","d","f"],true,-12,["c","d","f"]],
        [["h","dis","f"],true,-12,["h","dis","f"]],
    ])('converts %s using sharp: %s by %d semitones to %s', (input, useSharp, semitones, output) => {
        expect(Transpose(input, useSharp, semitones)).toEqual(output);
    })
})