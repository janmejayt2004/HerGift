// 16 hand-picked positions, perfectly dragged and customized by the user.

export const STICKER_POSITIONS = [
  { x: '65.96%', y: '39.51%' },
  { x: '33.68%', y: '39.08%' },
  { x: '7.56%', y: '85.07%' },
  { x: '65.94%', y: '63.57%' },
  { x: '33.40%', y: '65.42%' },
  { x: '78.28%', y: '16.41%' },
  { x: '27.52%', y: '82.46%' },
  { x: '8.26%', y: '28.46%' },
  { x: '8.10%', y: '52.91%' },
  { x: '22.34%', y: '42.28%' },
  { x: '93.53%', y: '23.10%' },
  { x: '80.85%', y: '39.80%' },
  { x: '78.95%', y: '63.26%' },
  { x: '91.88%', y: '55.78%' },
  { x: '16.97%', y: '68.95%' },
  { x: '18.12%', y: '14.81%' },
];

export const FOOD_POSITIONS = [
  { x: '10%', y: '10%' },
  { x: '80%', y: '20%' },
  { x: '15%', y: '40%' },
  { x: '75%', y: '50%' },
  { x: '20%', y: '70%' },
  { x: '85%', y: '80%' }
];

// Outer 14 cells of a 5x4 grid (excluding the center 6 cells: 6, 7, 8, 11, 12, 13)
// We need exactly 13 cells for the 13 food items.
export const OUTER_CELLS = [
  0, 1, 2, 3, 4, 
  5,          9, 
  10,         14, 
  15, 16, 17, 18
];
