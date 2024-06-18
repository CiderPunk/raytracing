import { Vec3 } from "./vec3";

export class Color extends Vec3{
  public get r(): number {
    return this._x;
  }
  public get g(): number {
    return this._y;
  }
  public get b(): number {
    return this._z;
  }

  public write(buffer:Uint8ClampedArray, offset:number){
    buffer[offset] = Math.floor(this.r * 255.999)
    buffer[offset+1] = Math.floor(this.g * 255.999)
    buffer[offset+2] = Math.floor(this.b * 255.999)
    buffer[offset+3] = 255
  }
}