import type Spell from "../../types/Spell";

export const getSpellGifPath = (spell: Spell) => {
  // put unique spell gifs here, by checking from spell.name, before moving on to generic type switch-case
  switch (spell.type) {
    case "fire":
      return "/effects/spells/FireBurst_64x64.gif";
    case "frost":
      return "/effects/spells/IceShatter_2_96x96.gif";
    case "shock":
      return "/effects/spells/TornadoMoving_96x96.gif";
    case "holy":
      return "/effects/spells/HolyExplosion_96x96.gif";
    default:
      return "/effects/spells/MagicBarrier_64x64.gif";
  }
};
