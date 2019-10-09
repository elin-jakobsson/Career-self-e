export class Coord {
  public x: number = 0;
  public y: number = 0;
}

export class ElementCorners {
  public bottomLeft: Coord = new Coord();
  public bottomRight: Coord = new Coord();
  public topLeft: Coord = new Coord();
  public topRight: Coord = new Coord();
}

export class Item {
  public id: string = '';
  public name: string = '';
  public categories: string[] = [];
  public imgUrl: string = '';
}

export class GraphItem extends Item {
  public coord: Coord = new Coord();
}
