import { describe, it, expect } from 'vitest';
import { searchEmptyValues } from '../searchEmptyValues';

describe('Search empty values', () => {
  it('Returns false when there is no empty values', () => {
    const values = { email: 'not empty', name: '    not empty   ' };
    const hasEmptyValues = searchEmptyValues(values);
    expect(hasEmptyValues).toBe(false);
  });

  it('Returns a object with all the emtpy values', () => {
    const values = { email: '', name: '    ' };
    const hasEmptyValues = searchEmptyValues(values);
    expect(hasEmptyValues).toEqual({
      email: 'Este campo não pode ficar vazio.',
      name: 'Este campo não pode ficar vazio.',
    });
  });
});
