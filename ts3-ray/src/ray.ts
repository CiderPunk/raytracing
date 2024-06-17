import { Point3, Vec3 } from "./vec3";

export class Ray{

  constructor(private readonly _orig:Point3, private readonly _dir:Vec3){
  }

  public get origin(): Point3 {
    return this._orig;
  }
  public get direction(): Vec3 {
    return this._dir;
  }

  at(t:number):Point3 {
    return this._orig.add(this._dir.scale(t));
  }
}