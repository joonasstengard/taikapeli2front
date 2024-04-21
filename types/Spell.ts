export default interface Spell {
  id: number;

  name: string;
  description: string;
  manaCost: number;
  baseDamageTarget: number;
  baseHealTarget: number;
  type: string;
  spellRange: number;
}
