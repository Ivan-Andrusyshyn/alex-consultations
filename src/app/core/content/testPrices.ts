type PricesValidNames =
  | 'RoleInRelationships'
  | 'YouCoffee'
  | 'Traumatic'
  | 'ToxicalRelationships'
  | 'BeYourself'
  | 'Attractiveness';

export const MainTestPrices: Record<PricesValidNames, string | null> = {
  RoleInRelationships: '200',
  ToxicalRelationships: '250',
  Attractiveness: null,
  BeYourself: '300',
  Traumatic: null,
  YouCoffee: '150',
};
